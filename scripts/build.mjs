// Builds the site into dist/.
//
// Every page in content/ becomes dist/<path>/index.html: a Markdown page (.md) goes through marked, an HTML page
// (.html) is used as it is, and both are put in the page shell below. The options page gets its tables from
// data/recof-cvars.json, the list ReCoF ships for its launcher. The stylesheet and the script get a hash of their
// content in their URL, so a browser or Cloudflare never keeps an old one. Then a sitemap, and a check that every
// link inside the site points at a page, a file or a heading that exists: a broken link fails the build.
//
//   node scripts/build.mjs        (pnpm build)

import { createHash } from 'node:crypto';
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { Marked } from 'marked';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT = join(ROOT, 'content');
const DIST = join(ROOT, 'dist');

const CALLOUTS = { NOTE: 'Note', TIP: 'Tip', IMPORTANT: 'Important', WARNING: 'Warning', CAUTION: 'Caution' };

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function slugify(html) {
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/&[a-z0-9#]+;/gi, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// content/docs/install.md is the page "docs/install", served at /docs/install/; an index page is its folder.
function urlOf(id) {
  if (id === '404') return '/404.html';
  if (id === 'index') return '/';
  if (id.endsWith('/index')) return '/' + id.slice(0, -'index'.length);
  return '/' + id + '/';
}

function outFileOf(id) {
  if (id === '404') return join(DIST, '404.html');
  return join(DIST, ...urlOf(id).split('/').filter(Boolean), 'index.html');
}

function parseSource(file) {
  const raw = readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
  const meta = {};
  let body = raw;
  const m = /^---\n([\s\S]*?)\n---\n/.exec(raw);
  if (m) {
    for (const line of m[1].split('\n')) {
      const i = line.indexOf(':');
      if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
    }
    body = raw.slice(m[0].length);
  }
  if (!meta.title) throw new Error(`${relative(ROOT, file)}: the front matter has no title`);
  return { meta, body };
}

// The options reference: one section per group of data/recof-cvars.json, in the order the list has them.
function cvarsMarkdown() {
  const data = JSON.parse(readFileSync(join(ROOT, 'data', 'recof-cvars.json'), 'utf8'));
  const groups = new Map();
  for (const c of data.cvars) {
    if (!groups.has(c.group)) groups.set(c.group, []);
    groups.get(c.group).push(c);
  }
  const cell = (s) => String(s).replace(/\|/g, '\\|').replace(/\n/g, ' ');
  let md = '';
  for (const [group, list] of groups) {
    md += `## ${group}\n\n| Option | Default | What it does |\n|---|---|---|\n`;
    for (const c of list) {
      const name = c.type === 'flag' ? `-${c.name}` : c.name;
      let def;
      if (c.type === 'bool' || c.type === 'flag') def = c.default === '1' ? 'on' : 'off';
      else def = `\`${c.default}\``;
      let what = `**${cell(c.label_en)}.** ${cell(c.desc_en)}`;
      if (c.min !== undefined && c.max !== undefined) what += ` From ${c.min} to ${c.max}.`;
      if (c.type === 'flag') what += ' A launch option.';
      md += `| \`${name}\` | ${def} | ${what} |\n`;
    }
    md += '\n';
  }
  return md;
}

function makeMarked(state) {
  const marked = new Marked({ gfm: true });
  marked.use({
    renderer: {
      heading({ tokens, depth }) {
        const inner = this.parser.parseInline(tokens);
        if (depth === 1) return `<h1>${inner}</h1>\n`;
        let id = slugify(inner) || 'section';
        if (state.ids.has(id)) {
          let n = 2;
          while (state.ids.has(`${id}-${n}`)) n++;
          id = `${id}-${n}`;
        }
        state.ids.add(id);
        if (depth <= 3) state.headings.push({ depth, id, html: inner.replace(/<\/?a[^>]*>/g, '') });
        return `<h${depth} id="${id}">${inner}<a class="anchor" href="#${id}" aria-label="Link to this section">#</a></h${depth}>\n`;
      },
    },
  });
  return marked;
}

function renderMarkdown(body) {
  const state = { ids: new Set(), headings: [] };
  let html = makeMarked(state).parse(body);
  // GitHub's callouts: > [!WARNING] at the start of a quote
  html = html.replace(
    /<blockquote>\s*<p>\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*/g,
    (_, kind) => `<blockquote class="callout ${kind.toLowerCase()}"><p class="callout-title">${CALLOUTS[kind]}</p><p>`,
  );
  html = html.replace(/<p>\s*<\/p>/g, '');
  html = html.replace(/<table>/g, '<div class="table-wrap"><table>').replace(/<\/table>/g, '</table></div>');
  return { html, headings: state.headings };
}

function assetVersion() {
  const h = createHash('sha256');
  for (const f of walk(join(ROOT, 'assets')).sort()) h.update(readFileSync(f));
  return h.digest('hex').slice(0, 10);
}

function headerLinks(cfg, url) {
  // the longest internal link the page's address starts with is the active one
  let active = null;
  for (const l of cfg.header) {
    if (!l.external && url.startsWith(l.href) && (!active || l.href.length > active.length)) active = l.href;
  }
  return cfg.header
    .map((l) => {
      const cur = l.href === active ? ' class="active" aria-current="true"' : '';
      const ext = l.external ? ' rel="noopener"' : '';
      return `<a href="${esc(l.href)}"${cur}${ext}>${esc(l.label)}</a>`;
    })
    .join('');
}

function shell(cfg, page, main, version) {
  const { site } = cfg;
  const title = page.meta.head || (page.id === 'index' ? site.name : `${page.meta.title} | ${site.name}`);
  const description = page.meta.description || site.description;
  const canonical = site.url + page.url;
  const year = new Date().getUTCFullYear();
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="dark">
<meta name="theme-color" content="#07080a">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
${page.id === '404' ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${esc(canonical)}">`}
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:title" content="${esc(page.meta.title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${esc(canonical)}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="/assets/style.css?v=${version}">
<script src="/assets/site.js?v=${version}" defer></script>
</head>
<body class="layout-${page.layout}">
<a class="skip" href="#content">Skip to the content</a>
<header class="top">
<a class="brand" href="/"><img src="/favicon.svg" alt="" width="22" height="22">${esc(site.name)}</a>
<nav class="links" aria-label="Site">${headerLinks(cfg, page.url)}</nav>
</header>
${main}
<footer class="site">
<p>ReCoF is a fan project by caixax, free and open source. It is not affiliated with or endorsed by Team Psykskallar, who made <a href="https://store.steampowered.com/app/223710/" rel="noopener">Cry of Fear</a>, or by Valve. No game files are distributed: ReCoF needs your own copy of the game, free on Steam.</p>
<p><a href="${esc(site.github)}" rel="noopener">GitHub</a><a href="/docs/credits/">Credits and license</a><span class="muted">${year}</span></p>
</footer>
</body>
</html>
`;
}

function docMain(cfg, page, pages, order) {
  const sidebar = cfg.nav
    .map((g) => {
      const items = g.pages
        .map((id) => {
          const p = pages.get(id);
          const cur = id === page.id ? ' aria-current="page"' : '';
          return `<li><a href="${p.url}"${cur}>${esc(p.meta.nav || p.meta.title)}</a></li>`;
        })
        .join('');
      return `<p class="group">${esc(g.title)}</p><ul>${items}</ul>`;
    })
    .join('');
  const toc = page.headings.filter((h) => h.depth === 2);
  const tocHtml =
    toc.length >= 2 && page.meta.toc !== 'false'
      ? `<aside class="toc" aria-label="On this page"><p class="group">On this page</p><ul>${toc
          .map((h) => `<li><a href="#${h.id}">${h.html}</a></li>`)
          .join('')}</ul></aside>`
      : '';
  const i = order.indexOf(page.id);
  const prev = i > 0 ? pages.get(order[i - 1]) : null;
  const next = i >= 0 && i < order.length - 1 ? pages.get(order[i + 1]) : null;
  const pager =
    prev || next
      ? `<nav class="pager" aria-label="Previous and next">${
          prev ? `<a class="prev" href="${prev.url}"><span>Previous</span>${esc(prev.meta.nav || prev.meta.title)}</a>` : '<span></span>'
        }${next ? `<a class="next" href="${next.url}"><span>Next</span>${esc(next.meta.nav || next.meta.title)}</a>` : ''}</nav>`
      : '';
  const lead = page.meta.description ? `<p class="lead">${esc(page.meta.description)}</p>` : '';
  return `<div class="docs">
<nav class="sidebar" id="sidebar" aria-label="Documentation"><button class="menu-toggle" type="button" aria-expanded="false" aria-controls="sidebar-links">Documentation menu</button><div id="sidebar-links">${sidebar}</div></nav>
<main id="content" class="doc">
<article>
<h1>${esc(page.meta.title)}</h1>
${lead}
${page.html}
</article>
${pager}
</main>
${tocHtml}
</div>`;
}

// Every link that stays on the site must reach a file, and a #fragment must name an id on its page.
function checkLinks() {
  const files = walk(DIST).filter((f) => f.endsWith('.html'));
  const idsOf = new Map();
  const ids = (file) => {
    if (!idsOf.has(file)) {
      const set = new Set();
      for (const m of readFileSync(file, 'utf8').matchAll(/\sid="([^"]+)"/g)) set.add(m[1]);
      idsOf.set(file, set);
    }
    return idsOf.get(file);
  };
  const bad = [];
  for (const file of files) {
    const html = readFileSync(file, 'utf8');
    for (const m of html.matchAll(/\s(?:href|src)="([^"]*)"/g)) {
      const link = m[1].replace(/&amp;/g, '&');
      if (/^[a-z][a-z0-9+.-]*:/i.test(link) || link.startsWith('//')) continue;
      const [pathAndQuery, hash] = link.split('#');
      const path = pathAndQuery.split('?')[0];
      let target = file;
      if (path) {
        if (!path.startsWith('/')) {
          bad.push(`${relative(DIST, file)}: ${link} (use a link that starts with /)`);
          continue;
        }
        const p = join(DIST, ...path.split('/').filter(Boolean));
        if (path.endsWith('/')) target = join(p, 'index.html');
        else if (existsSync(p) && statSync(p).isFile()) target = p;
        else {
          bad.push(`${relative(DIST, file)}: ${link} (no such page or file; pages end with /)`);
          continue;
        }
        if (!existsSync(target)) {
          bad.push(`${relative(DIST, file)}: ${link} (no such page)`);
          continue;
        }
      }
      if (hash && target.endsWith('.html') && !ids(target).has(hash)) bad.push(`${relative(DIST, file)}: ${link} (no such heading)`);
    }
  }
  return bad;
}

export async function build() {
  const cfg = await import(pathToFileURL(join(ROOT, 'site.config.mjs')).href + `?t=${Date.now()}`);
  const started = Date.now();
  // empty dist/ rather than delete it: on Windows a folder that the preview server or a shell is in cannot be removed
  mkdirSync(DIST, { recursive: true });
  for (const name of readdirSync(DIST)) rmSync(join(DIST, name), { recursive: true, force: true });

  const pages = new Map();
  for (const file of walk(CONTENT)) {
    if (!/\.(md|html)$/.test(file)) continue;
    const id = relative(CONTENT, file).replace(/\\/g, '/').replace(/\.(md|html)$/, '');
    if (pages.has(id)) throw new Error(`content/${id}: both a .md and an .html page`);
    const { meta, body } = parseSource(file);
    let html = body;
    let headings = [];
    if (file.endsWith('.md')) {
      ({ html, headings } = renderMarkdown(body.replace('{{cvars}}', () => cvarsMarkdown())));
    }
    const layout = meta.layout || (id.startsWith('docs/') ? 'doc' : 'page');
    pages.set(id, { id, url: urlOf(id), meta, html, headings, layout });
  }

  const order = cfg.nav.flatMap((g) => g.pages);
  for (const id of order) if (!pages.has(id)) throw new Error(`site.config.mjs lists ${id}, but content/${id}.md does not exist`);
  for (const id of pages.keys()) {
    if (id.startsWith('docs/') && !order.includes(id)) console.warn(`warning: content/${id} is not in the sidebar (site.config.mjs)`);
  }

  cpSync(join(ROOT, 'assets'), join(DIST, 'assets'), { recursive: true });
  cpSync(join(ROOT, 'public'), DIST, { recursive: true });
  const version = assetVersion();

  for (const page of pages.values()) {
    let main;
    if (page.layout === 'doc') main = docMain(cfg, page, pages, order);
    else if (page.layout === 'home') main = `<main id="content" class="home">\n${page.html}\n</main>`;
    else main = `<main id="content" class="page"><article><h1>${esc(page.meta.title)}</h1>\n${page.html}</article></main>`;
    const out = outFileOf(page.id);
    mkdirSync(dirname(out), { recursive: true });
    writeFileSync(out, shell(cfg, page, main, version));
  }

  const urls = [...pages.values()].filter((p) => p.id !== '404').map((p) => `  <url><loc>${cfg.site.url}${p.url}</loc></url>`);
  writeFileSync(
    join(DIST, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`,
  );

  const bad = checkLinks();
  if (bad.length) {
    console.error('Broken links:');
    for (const b of bad) console.error('  ' + b);
    throw new Error(`${bad.length} broken link${bad.length === 1 ? '' : 's'}`);
  }
  console.log(`built ${pages.size} pages into dist/ in ${Date.now() - started} ms`);
}

if (process.argv[1] && resolve(fileURLToPath(import.meta.url)) === resolve(process.argv[1])) {
  build().catch((e) => {
    console.error(e.message);
    process.exit(1);
  });
}

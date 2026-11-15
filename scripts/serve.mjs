// Local preview: builds the site, serves dist/ on http://localhost:4321 as nginx will (pages end with /, a missing
// page gets 404.html) and builds again whenever a file under content/, assets/, public/ or data/ changes.
//
//   node scripts/serve.mjs [port]        (pnpm dev)

import { createReadStream, existsSync, statSync, watch } from 'node:fs';
import { createServer } from 'node:http';
import { dirname, extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from './build.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const PORT = Number(process.argv[2] || 4321);

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
  '.json': 'application/json',
};

async function rebuild() {
  try {
    await build();
  } catch (e) {
    console.error('build failed: ' + e.message);
  }
}

await rebuild();

let timer = null;
for (const dir of ['content', 'assets', 'public', 'data']) {
  watch(join(ROOT, dir), { recursive: true }, () => {
    clearTimeout(timer);
    timer = setTimeout(rebuild, 150);
  });
}
watch(join(ROOT, 'site.config.mjs'), () => {
  clearTimeout(timer);
  timer = setTimeout(rebuild, 150);
});

function send(res, status, file) {
  res.writeHead(status, { 'Content-Type': TYPES[extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
  createReadStream(file).pipe(res);
}

createServer((req, res) => {
  const path = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  const file = normalize(join(DIST, path));
  if (!file.startsWith(DIST)) {
    res.writeHead(400).end();
    return;
  }
  if (existsSync(file) && statSync(file).isFile()) return send(res, 200, file);
  if (existsSync(join(file, 'index.html'))) {
    if (!path.endsWith('/')) {
      res.writeHead(301, { Location: path + '/' }).end();
      return;
    }
    return send(res, 200, join(file, 'index.html'));
  }
  send(res, 404, join(DIST, '404.html'));
}).listen(PORT, '127.0.0.1', () => console.log(`preview on http://localhost:${PORT}/`));

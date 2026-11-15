// What the site is called, the links in its header and the order of the documentation.
// A page is the Markdown file content/<path>.md; its title comes from the file's front matter.

export const site = {
  name: 'ReCoF',
  url: 'https://recof.dev',
  description:
    'ReCoF is Cry of Fear rebuilt from its source: the original game with its bugs fixed, faster, ' +
    'with co-op servers and a launcher that installs and updates it.',
  github: 'https://github.com/caixax/ReCoF',
  launcher: 'https://github.com/caixax/ReCoF-Launcher/releases/latest',
};

// The links at the top of every page. An external link opens the page it names.
export const header = [
  { href: '/docs/', label: 'Docs' },
  { href: '/docs/server/', label: 'Servers' },
  { href: site.launcher, label: 'Download', external: true },
  { href: site.github, label: 'GitHub', external: true },
];

// The documentation's sidebar, in reading order. Previous and next links follow it too.
export const nav = [
  {
    title: 'Getting started',
    pages: ['docs/index', 'docs/install', 'docs/install-by-hand', 'docs/updates', 'docs/troubleshooting'],
  },
  {
    title: 'Playing',
    pages: ['docs/options', 'docs/multiplayer', 'docs/speedrun'],
  },
  {
    title: 'Hosting a server',
    pages: [
      'docs/server/index',
      'docs/server/windows',
      'docs/server/linux',
      'docs/server/config',
      'docs/server/metamod',
      'docs/server/amxmodx',
    ],
  },
  {
    title: 'Project',
    pages: ['docs/credits'],
  },
];

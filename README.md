# ReCoF Website

The website of [ReCoF](https://github.com/caixax/ReCoF), served at **recof.dev**: a home page and the documentation (installing, updating, options, co-op, speedrunning, and hosting a server with Metamod-R and AMX Mod X).

It is a static site. The pages are Markdown files in `content/`, a small Node script builds them into plain HTML in `dist/`, and nginx serves that folder behind a Cloudflare Tunnel. No database, no backend, no framework; the only dependency is [marked](https://github.com/markedjs/marked).

## Working on it

Node 20 or newer and pnpm.

```sh
pnpm install
pnpm dev        # builds, serves http://localhost:4321 and rebuilds on every change
pnpm build      # builds dist/ once
pnpm check      # no em or en dashes anywhere, then a build
```

A build fails on a broken link: every link inside the site must reach a page, a file or a heading that exists.

## Layout

| Path | What it is |
|---|---|
| `content/` | the pages: `content/docs/install.md` is served at `/docs/install/`, an `index` page at its folder's address |
| `content/index.html` | the home page, written in HTML |
| `site.config.mjs` | the site's name, the header links and the documentation sidebar, in reading order |
| `assets/` | `style.css` and `site.js`, linked with a hash of their content so caches never keep an old one |
| `public/` | files copied as they are: the icon, `robots.txt` |
| `data/recof-cvars.json` | ReCoF's option list, which the [Options](content/docs/options.md) page is built from |
| `scripts/` | the build, the preview server, the checks and `update.sh` for the server |
| `deploy/` | the nginx config and an example Cloudflare Tunnel config |

## Writing a page

A page starts with front matter:

```md
---
title: Server on Windows
nav: On Windows
description: One sentence, shown under the title and in search results.
---
```

`nav` is the shorter name in the sidebar, if the title is long. Then plain Markdown (GitHub flavored):

- Link to other pages with their address, starting with `/` and ending with `/`: `[Server settings](/docs/server/config/)`, or to a heading with `#`: `/docs/troubleshooting/#bad-image-error-on-windows-11`. Headings get their id from their text.
- Callouts as on GitHub: a quote starting with `[!NOTE]`, `[!TIP]`, `[!IMPORTANT]`, `[!WARNING]` or `[!CAUTION]`.
- A new page under `docs/` goes into the sidebar in `site.config.mjs`; the build warns about pages that are not there.
- No em or en dashes.

When ReCoF's options change, refresh the list with `pnpm sync-cvars` (from a ReCoF checkout next to this folder) or `pnpm sync-cvars <url of recof-cvars.json>`.

## Hosting

The site runs on a Linux VPS: nginx serves `dist/` on `127.0.0.1:5780` only, and `cloudflared` carries it to recof.dev, so no port is open to the Internet.

First time, on the VPS (Debian or Ubuntu):

```sh
sudo apt install nginx rsync git
# Node 20 or newer, then pnpm: corepack enable
git clone <this repository> ~/recof-website
cd ~/recof-website
./scripts/update.sh
```

`update.sh` pulls, installs, builds, publishes `dist/` to `/var/www/recof` and installs `deploy/nginx.recof.conf` as `/etc/nginx/sites-enabled/recof` when it changed (and only if `nginx -t` passes). Run it again after every change pushed to the repository.

Then the tunnel: create one with `cloudflared tunnel create recof`, route both names to it (`cloudflared tunnel route dns recof recof.dev` and `www.recof.dev`), and merge `deploy/cloudflared.example.yml` into `/etc/cloudflared/config.yml` with the tunnel's id. `www.recof.dev` redirects to `recof.dev`.

## License

MIT, see [LICENSE](LICENSE). The pages describe ReCoF and its sister projects, each under its own license. ReCoF is not affiliated with or endorsed by Team Psykskallar or Valve.

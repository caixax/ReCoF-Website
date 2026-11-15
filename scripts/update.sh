#!/usr/bin/env bash
# VPS update: pull, install, build, publish the site. The nginx config is installed only when it changed.
# Safe to run any time; the published site is only replaced after a build that passed its link check.
set -euo pipefail

cd "$(dirname "$0")/.."

WEB_ROOT=/var/www/recof
NGINX_CONF=/etc/nginx/sites-enabled/recof

before=$(git rev-parse --short HEAD)
git pull --ff-only
after=$(git rev-parse --short HEAD)

pnpm install --frozen-lockfile
pnpm build

sudo mkdir -p "$WEB_ROOT"
sudo rsync -a --delete dist/ "$WEB_ROOT"/

if ! sudo cmp -s deploy/nginx.recof.conf "$NGINX_CONF"; then
  echo "nginx config changed, installing and reloading"
  # Keep the working config until the new one passes nginx -t, so a bad file is
  # never left in place for the next restart to trip over.
  backup=$(mktemp)
  [ -f "$NGINX_CONF" ] && sudo cp "$NGINX_CONF" "$backup"
  sudo cp deploy/nginx.recof.conf "$NGINX_CONF"
  if sudo nginx -t; then
    sudo systemctl reload nginx
  else
    echo "nginx -t failed, putting the previous config back" >&2
    if [ -s "$backup" ]; then
      sudo cp "$backup" "$NGINX_CONF"
    else
      sudo rm -f "$NGINX_CONF"
    fi
    rm -f "$backup"
    exit 1
  fi
  rm -f "$backup"
fi

echo "updated $before -> $after"

#!/usr/bin/env bash
# Assemble the static site into ./dist for the Cloudflare Worker (static assets).
# Everything in the repo root is site content except tooling, docs and the
# dev/lab folders that were never deployed (see .gitignore).
set -euo pipefail
cd "$(dirname "$0")/.."
rm -rf dist
mkdir -p dist
rsync -a --delete \
  --exclude '/.git' --exclude '/.gitignore' --exclude '/.vercel' --exclude '/.wrangler' \
  --exclude '/node_modules' --exclude '/dist' --exclude '/functions' --exclude '/scripts' \
  --exclude '/work' --exclude '/ui-lab' --exclude '/lovable' \
  --exclude '/wrangler.toml' --exclude '/*.md' --exclude '/CHANGELOG_PORTFOLIO_100_PATCH.txt' \
  --exclude '.DS_Store' --exclude '__MACOSX' \
  ./ dist/
echo "dist/: $(find dist -type f | wc -l | tr -d ' ') files, $(du -sh dist | cut -f1)"

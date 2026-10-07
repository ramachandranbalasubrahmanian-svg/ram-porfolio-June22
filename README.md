# Ram Balasubrahmanian — Portfolio

Executive portfolio site for **Ram Balasubrahmanian** — Data & AI Governance leader (ex-FICO, DAMA CDMP).

**Live site:** [ram-bala.com](https://www.ram-bala.com)

## What's included

| Path | Purpose |
|------|---------|
| `index.html` | Main portfolio homepage |
| `perspectives/` | Leadership articles (SEO) |
| `enterprise-data-platform/` | EDP knowledge hub |
| `assets/` | CSS, JS, images, PDFs, fonts, EDP runbook & templates |
| `data/` | Recommendations carousel & newsletter stats |
| `functions/_middleware.js` | Cloudflare Pages Function: ram-bala.com → www redirect |
| `_headers` | Security + cache headers (Cloudflare Pages) |
| `wrangler.toml`, `scripts/build-pages.sh` | Cloudflare Pages project + deploy-folder build |

## Local preview

Static site — needs a local HTTP server (do not open `index.html` via `file://`):

```bash
python3 -m http.server 8888 --bind 127.0.0.1
# → http://127.0.0.1:8888/
```

## Deploy

Hosted on [Cloudflare Pages](https://pages.cloudflare.com) (project `ram-portfolio`, free plan;
DNS for ram-bala.com is already on Cloudflare). No build step — `scripts/build-pages.sh`
just copies the site into `dist/` without tooling, docs and lab folders.

```bash
./scripts/build-pages.sh && npx wrangler pages deploy   # first time: npx wrangler login
```

## Related projects (external)

- [MediGovern RAG](https://github.com/ramachandranbalasubrahmanian-svg/medigovern-rag) — production RAG pipeline
- [Pipeline Pulse](https://pipeline-pulse-79.lovable.app) — EDP platform demo (Lovable)

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
| `api/` | Vercel serverless (newsletter subscriber count) |
| `middleware.js` | Legacy Vercel hostname redirects |
| `vercel.json` | Deployment headers & redirects |

## Local preview

Static site — needs a local HTTP server (do not open `index.html` via `file://`):

```bash
python3 -m http.server 8888 --bind 127.0.0.1
# → http://127.0.0.1:8888/
```

## Deploy

Configured for [Vercel](https://vercel.com). Connect this repo and deploy — no build step required.

## Related projects (external)

- [MediGovern RAG](https://github.com/ramachandranbalasubrahmanian-svg/medigovern-rag) — production RAG pipeline
- [Pipeline Pulse](https://pipeline-pulse-79.lovable.app) — EDP platform demo (Lovable)

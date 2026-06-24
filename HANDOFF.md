# ram-bala.com — Session Handoff

_Last updated: 2026-06-22. This file lets a fresh Claude Code / Cursor session resume with full context. Read it first._

---

## 1. Project basics
- **What:** Ram Balasubrahmanian's executive portfolio — https://www.ram-bala.com
- **Repo:** this directory (`Cursor-Projects/Ram-Portfolio`); remote `github.com/ramachandranbalasubrahmanian-svg/ram-porfolio-June22`.
- **Stack:** static HTML/CSS/JS, **no build step**, no package.json. Deploys via **Vercel auto-deploy from `main`**.
- **Run locally (in your own terminal — servers an agent starts get sandbox-killed):**
  ```bash
  bash scripts/serve-local.sh          # → http://localhost:8888/
  ```
  Add `?perf=0` to any URL to hide the localhost-only dev metrics panel.
- **Owner / strict rule:** never invent metrics, employers, credentials, or claims. Use only facts in the repo or verified READMEs. Preserve the premium **Apple-style dark** aesthetic. Prefer free tools; single source of truth; test before sharing; keep responses short.

## 2. Current git state ⚠️
- **Branch:** `feat/live-proof-lab`. Commits on it: `5a767d2` (Live Proof Lab + round-1 polish), `34f8f0b` (this HANDOFF.md), plus a follow-up commit updating this section. **`main` is untouched. NOTHING is pushed.** Run `git log --oneline` for the current HEAD.
- **Author email:** all commits used the machine-local default (`...@SrihariRamachandrans-MacBook-Pro.local`), not the GitHub email — so GitHub won't link them to the account. Before pushing, set identity and reset authorship across the branch:
  ```bash
  git config user.email "ramachandran.balasubrahmanian@gmail.com"
  git config user.name "Ramachandran Balasubrahmanian"
  # rebase from the last shared commit to reset author on ALL branch commits:
  git rebase --reset-author-date --exec 'git commit --amend --no-edit --reset-author' 55851db
  # (or, if only the latest commit matters: git commit --amend --reset-author --no-edit)
  ```
- **Deploy when ready:** `git checkout main && git merge feat/live-proof-lab && git push origin main`

## 3. What this session delivered

### Round 1 — polish (all in working tree)
- **A11y:** skip-link + global `:focus-visible` ring (were missing) across all pages; `id="main"` landmarks.
- **Perf:** removed render-blocking analytics from subpage `<head>` (lazy-load like homepage); **fixed duplicate-analytics bug on the GCC page**; deferred below-fold CSS (`dama-credential-wall.css`, `recommendations-carousel.css` via `media="print"`→onload); lazy-loaded DAMA badge images; removed the redundant floating one-pager CTA.
- **SEO:** fixed stale "Associate Director" keyword; added `og:image` dims + `theme-color` to subpages.
- **Content:** enriched AI-proof cards (Proves / Why it matters / governance chips / architecture); added "Executive takeaway" to each case-study bento card.
- **Cache-bust versions (current):** `style.css?v=24`, `executive-upgrade.css?v=11`, `recommendations-carousel.css?v=7`, `dama-credential-wall.css?v=1`, `motion.js?v=6`, `demo-window.{css,js}?v=1`. **Bump these when editing the file.**

### Round 2 — the "Live Proof Lab" (the differentiator)
Three live systems are now experienceable in-context. Pattern is reusable.
- **Reusable in-page app window:** `assets/demo-window.css` + `assets/demo-window.js`. Any element with `data-app-window="<url>" data-app-title="..." data-app-host="..."` opens that URL in an iframe modal over the page (lazy iframe, ESC/close, focus-trap, scroll-lock, "open in new tab" fallback). Public API: `window.AppWindow.open(url,title,host)` / `.close()`.
- **Three demo hub pages** (dark, portfolio theme, scoped `gr-*` CSS, full nav/footer/SEO/JSON-LD/breadcrumb):
  - `demos/golden-record/index.html`
  - `demos/medigovern/index.html`
  - `demos/pipeline-pulse/index.html`
- **Three bespoke dark animated architecture diagrams** (self-contained HTML, shared scene-engine + CSS framework, `prefers-reduced-motion` aware, keyboard Space/R/S):
  - `assets/demos/golden-record/architecture.html`
  - `assets/demos/medigovern/architecture.html`
  - `assets/demos/pipeline-pulse/architecture.html`
- **Golden Record extra:** dark-themed guided playbook `assets/demos/golden-record/playbook.html` (content copied verbatim from user's artefact, restyled).
- **Pipeline Pulse extras:** walkthrough video (`assets/demo.mp4`) + 5 EDP preview screens (`assets/edp/previews/*.png`).
- **Homepage `#ai-proof`** now reads "Three working systems": Golden Record **flagship** card + MediGovern & Pipeline Pulse cards, each with an "Open demo hub →" link. `sitemap.xml` includes all three `/demos/*` pages.
- **Verified:** all three hubs render, diagrams animate, in-page windows load the live apps, 0 console errors, all local refs resolve. (Pipeline Pulse app cold-starts ~6s — spinner + fallback shown meanwhile.)

## 4. Verified facts for the three systems (no re-fetching needed)
**Golden Record RAG** — app `golden-records-demo.lovable.app` · repo `golden-record-pipeline` · API `refreshing-liberation-production-8a25.up.railway.app/docs`. Stats: 89,198 source → 20,502 golden records · 51.9% multi-source · 35,000 RAG chunks · 150,000 transactions · 0.637 avg confidence · 99 PEP · 20 sanctioned. Stack: FastAPI, Postgres+pgvector, SQLAlchemy 2.0, sentence-transformers MiniLM, Railway, Lovable.

**MediGovern RAG** — app `medigovern-insight.lovable.app` · repo `medigovern-rag` · API `medigovern-rag-production.up.railway.app/docs`. Healthcare prior-auth, 100% synthetic (no PHI). Six-rule DQ gate (pass/warn/quarantine) before embedding; bge-small embeddings in pgvector; confidence High/Med/Low computed (not asserted); explicit **ABSTAIN** on conflicting clauses; immutable audit packet (JSON+HTML). Built around **CMS-0057-F** (7-day PA SLA 2026 / 72-hour urgent 2027, FHIR APIs). Stack: Python 3.11, FastAPI, SQLAlchemy, Postgres+pgvector, Anthropic Claude, fastembed/ONNX, Docker.

**Pipeline Pulse (EDP)** — app `pipeline-pulse-79.lovable.app` (+ `/demo`) · **no public repo** · EDP knowledge hub at `/enterprise-data-platform/` + runbook `assets/edp/enterprise-data-platform-runbook.{pdf,html}`. DMBOK-aligned control plane (ingestion controls → metadata-driven DQ → lineage/stewardship → governance/evidence → AI governance → consumption). 6 learning tracks, 5 DMBOK control screens, 5 field templates. **Do not attach FICO production metrics (95% / 232M / $2M) to this demo** — those are Ram's career outcomes, not the demo's.

## 5. Pending / next (prioritized)
1. **Deploy + test on real mobile + re-run Lighthouse** before building more. The in-page app windows on a phone are the one thing NOT verified (iframe of a desktop app on mobile may be poor — consider defaulting small screens to "open in new tab").
2. **`/demos/` "Proof Lab" landing page** that lists all three systems + add a nav link to it. (One shareable URL, better internal-link SEO.)
3. **A social/OG image** for the demos (currently all share generic `og-image.jpg`) — highest-leverage polish for LinkedIn sharing.
4. **Analytics events** on "Launch app" clicks (`analytics.js` already exposes `trackEvent`).
5. Optional: diagram density tuning at mid widths; commit this HANDOFF.md; the author-email fix above.

## 6. Known fragilities / gotchas
- In-page windows depend on the three external **Lovable apps** staying up + embeddable. They currently send no `X-Frame-Options`/CSP, so framing works; if that changes, the new-tab fallback kicks in.
- Shell sandbox has an inconsistent PATH (sed/awk/sort missing) — **use `python3`** for scripting, and `dangerouslyDisableSandbox` for read-only inspection/curl.
- Unused dead asset `assets/demo-original.mp4` (7.3 MB) left in place deliberately (likely the hi-res master).
- `ui-lab/` is a separate embedded project — ignore it.

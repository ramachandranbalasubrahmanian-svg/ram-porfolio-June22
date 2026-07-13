# RECON — Portfolio Verification Alignment

Branch: `fix/verified-record` (off `main`). No deploy performed.

## Repo type & templating
- **Static site**, no framework/build for the main site. Root `index.html` is **minified** (single-line sections). Sub-pages are hand-authored HTML.
- Deploy: Vercel (`vercel.json`, `.vercel/`), `middleware.js` for routing/redirects. Git push updates GitHub only; production deploy is a separate `vercel --prod` (left to Ram).
- A separate React app lives in `ui-lab/` (component lab, has its own build/`dist`) — **not** part of the public claims surface; not edited.

## Where homepage sections live (all in `index.html`)
- Hero: `.hero` cluster (H1 `Ram Balasubrahmanian`, eyebrow `.hero-tag`, trust logos `.trust-logo`).
- Metrics bento / KPI bar: `.bento-metric`, `.cs-kpi`, `.metrics-strip`.
- About: `#about`.
- Experience timeline: `#experience` → `.timeline` → `.tl-entry`/`.tl-card` (FICO Sr Mgr, FICO Sr IC [new], Manager, Lead, HCL, EY-block, Independent Practice).
- Independent-Practice showcase: `#sabbatical-proof` (`.sabbatical-*` CSS class names retained — see note).
- Case-study cards: `.pov-grid` / `.pov-card` (3 cards; none claimed production AI/ML model-lifecycle governance).
- FAQ: `#faq` → `.faq-item` (`<details>`), mirrored in a JSON-LD `FAQPage` block near end of file.
- Meta/OG/Twitter + JSON-LD `Person`/`FAQPage` in `<head>` and end of `<body>`.

## Rotating headlines
`assets/motion.js` holds region-targeted headline strings (default/India, `europe`, etc.) injected into the hero.

## Downloadable assets (linked from many pages)
- `assets/resume.pdf` (served as `download="…Master-Resume.pdf"`), cache-bust `?v=8`.
- `assets/Ram-Bala-Executive-Summary.pdf`, cache-bust `?v=4` (→ bumped to `?v=5`).
- Source HTMLs that generate these: `resume.source.html` → resume PDF; `exec-summary.source.html` → executive-summary PDF (both `@page { size: A4; margin: 0 }`, print-CSS, self-contained).

## Cache-busting
Query-string `?v=N` appended to asset URLs (`style.css?v=26`, `motion.js?v=10`, `resume.pdf?v=8`, `Executive-Summary.pdf?v=4`, …). Bump N to force refresh when the asset's bytes change.

## Testimonials / demos / newsletter (guardrailed — not altered except as noted)
- Testimonials: `data/recommendations.json` + `assets/recommendations-carousel.*`. Quote text untouched; only the `workContext` **title label** corrected (Assoc. Director → Senior Manager).
- Demo apps: `demos/*`, `assets/demos/*` — untouched (their GDPR references are on **synthetic** records and are legitimate).
- Newsletter: `assets/newsletter-live.js`, `data/newsletter-stats.json` — untouched; `2,000+` count is injected live.

## Note on `sabbatical-*` CSS identifiers
The user-facing word "sabbatical" is fully removed from copy. The CSS **class/id tokens** (`sabbatical-showcase`, `#sabbatical-proof`, `sabbatical-card`, …) are retained because renaming them means editing the design system (`assets/*.css`) and every anchor — high breakage risk, zero recruiter/verification visibility. Logged as an intentional exception in CHANGELOG.

# CHANGELOG — Verified-Record Alignment (`fix/verified-record`)

Truth-alignment only. Styling, layout, SEO plumbing, and links preserved. No deploy.
Verified against the facts bank in the task brief. **9 files changed + 3 new docs.**

---

## `index.html` (homepage)

**Titles / identity**
- Hero trust badge: `FICO Assoc. Director` → **`FICO Senior Manager`** (×2).
- Hero trust badge: `EY Senior Consultant` → **`ex-EY`** (×2).
- Hero eyebrow: `… DAMA CDMP · GDPR run in production` → `… DAMA CDMP · GDPR-aligned controls (vendor-side)`.

**Experience timeline — one FICO senior entry split into two (verified titles/dates)**
- Was: `Associate Director / Senior Manager · Enterprise Data Platform` · `Jun 2022 – Mar 2025 · 3 years`, 3 bullets (incl. "Governed AI/ML models…").
- Now two entries:
  - **Senior Manager — Data Management, Enterprise Data Platform · Jun 2022 – Sep 2024 (2.3 years)** — governance for 50+ clients, 95% incident cut, worst-case resolution 20–100h→<4h; led 11-member team within 25+ org (India/US/Canada); PII safeguards protecting 232M+ records, $10M+ ARR, $2M+ savings.
  - **Senior Individual Contributor (Sr. Engineer) · Oct 2024 – Mar 2025 · lateral move at my request** — same grade, comp unchanged, family caregiving; FY24 merit + full bonus Dec 2024; six DPL/ADE releases + COGS work; resigned Dec 2024, full 90-day notice, good-standing exit.
- Removed the "Governed AI/ML models … model governance" production claim (Task 4).

**Sabbatical → Independent Practice**
- Showcase kicker: `Planned Sabbatical · Apr 2025 – May 2026 · Concluded` → `Independent Practice · Apr 2025 – Present`.
- Showcase title/lead rewritten to the verified narrative (lateral move → raise+bonus → resignation → 90-day notice → independent practice since Apr 2025; caregiving "now well-supported").
- Added **Toptal — Data Steward** consulting card to the deliverables grid (all existing cards kept).
- Metric `CDMP · Master approval pending` → `CDMP · Master submitted 2026`.
- Footnote: `Family caregiving need is behind me` → `Family caregiving is now well-supported`.
- Timeline card `Planned Sabbatical · Independent Practice` / `Concluded · 1 year` → `Independent Practice — Data & AI Governance` / `Apr 2025 – Present`; context bullet rewritten; added Toptal consulting bullet; `Advanced DAMA CDMP toward Master (approval pending)` → `DAMA CDMP Master submitted 2026 (Practitioner ID 20023851)`.
- Nav link text `Sabbatical Deliverables` → `Independent Practice`; aria-label `Sabbatical period highlights` → `Independent practice highlights`.

**About**
- Sabbatical paragraph rewritten to "independent data & AI governance practice since April 2025 … caregiving now well-supported."
- `GDPR and DMBOK foundation I have run in production` → `GDPR-aligned controls and DMBOK foundation I have delivered vendor-side`.
- Pillar 04: `GDPR run in regulated EU production` → `GDPR-aligned controls delivered vendor-side for global financial-services clients`.

**Metrics**
- Bento tile `4×` "faster resolution" → `<4h` "worst-case resolution".

**FAQ (visible + JSON-LD mirror)**
- Question `What was Ram doing during his career break?` → **`Why did Ram leave FICO, and what has he done since?`** — answer now leads with lateral move → raise+bonus → resignation → full notice → independent practice.
- EU FAQ: `he has run it in regulated production on real EU customer data` → vendor-side GDPR-aligned controls + advisory analysis.
- GCC FAQ: `both of which Ram has run in regulated production (…)` → `frameworks Ram has worked with directly — GDPR-aligned controls delivered vendor-side …, and DAMA-DMBOK applied across enterprise platforms (…)`.

**Meta**
- `<meta name="description">`: `backed by real GDPR & EU AI Act experience` → `backed by GDPR-aligned controls delivered vendor-side and published EU-AI-Act advisory analysis`.

**Cache-busting**
- `motion.js?v=10`→`?v=11`; `Executive-Summary.pdf?v=4`→`?v=5`.

## `assets/motion.js`
- `europe` headline: `GDPR run in regulated production on real EU customer data …` → `GDPR-aligned controls delivered from the vendor side for global financial-services clients … plus published EU-AI-Act advisory analysis and three live governed-AI demos`.
- Default headline: `GDPR and DMBOK foundation I have run in production` → `GDPR-aligned controls and DMBOK foundation I have delivered vendor-side`.
- `Executive-Summary.pdf?v=3` → `?v=5`.

## `data/recommendations.json` (testimonials — quotes untouched)
- `workContext: "FICO · Associate Director / Senior Manager, Enterprise Data Platform"` → `"FICO · Senior Manager, Enterprise Data Platform"` (×2). **Only the title label; testimonial text unchanged.**

## `perspectives/eu-gdpr-ai-act-data-governance/index.html`
- Title/meta/OG/Twitter "GDPR run in (regulated )production …" (×4) → "GDPR-aligned controls delivered vendor-side, EU-AI-Act advisory analysis, …".
- Body: `Associate Director / Senior Manager, leading 25+ engineers` → `Senior Manager, leading a 25+ engineer organization`.
- Body: `95% incident-reduction and 4× faster resolution` → `95% incident-reduction and worst-case resolution cut from 20–100 hours to under 4`.
- Body: `I have run it in regulated production` → `I have delivered GDPR-aligned controls in regulated production for global financial-services clients — vendor-side, not as an EU controller`.
- Heading `GDPR I have already run` → `GDPR controls I have delivered vendor-side`; list item `run in regulated production` → `delivered vendor-side for global financial-services clients`.

## `perspectives/gcc-pdpl-data-governance/index.html`
- `PDPL is modelled closely on GDPR, which I have run in regulated production.` → `… for which I have delivered GDPR-aligned controls in regulated production for global financial-services clients (vendor side).`

## `resume.source.html` (source of `resume.pdf` — PDF NOT regenerated; see VERIFY item 1)
- Headline `Director, Enterprise Data Platforms · …` → `Director / Head of Data Governance · …` (dropped plural "Enterprise Data Platforms" as a title-noun; kept aspirational Director/Head). Same in footer.
- Position `Associate Director / Senior Manager` / `Jun 2022 – Mar 2025 (at FICO since Oct 2016)` → `Senior Manager, then Senior Engineer (lateral IC move)` / `Jun 2022 – Mar 2025 (Senior Manager to Sep 2024; Sr. Engineer to Mar 2025)`.
- `Professional Development Sabbatical … Apr 2025 – May 2026 · concluded` → `Independent Practice — Data & AI Governance … Apr 2025 – Present`.
- `4×` metric + two `4×` resolution mentions → `<4h` / "worst-case resolution from 20–100 hours to under 4".

## `exec-summary.source.html` + `assets/Ram-Bala-Executive-Summary.pdf` (regenerated, `?v=5`)
- `At FICO — Associate Director, Enterprise Data Platform` → `At FICO — Senior Manager, Enterprise Data Platform`.
- Title `Director / Head of Data Governance — Enterprise Data Platforms · …` → `Director / Head of Data Governance · Data Quality & DataOps`.
- `4× faster mean-time-to-resolution` → `<4h worst-case mean-time-to-resolution`.
- Edge line `GDPR run in real production` → `GDPR-aligned controls delivered vendor-side`.
- PDF re-rendered from corrected source (A4, style preserved); original backed up in session scratchpad.

## `demos/index.html`
- `Executive-Summary.pdf?v=4` → `?v=5` (cache-bust only).

---

## Intentional exceptions (not "hits")
- `sabbatical-*` CSS **class/id tokens** retained (invisible; renaming = design-system change). All visible "sabbatical"/"Concluded" copy removed.
- Demo pages (`demos/*`, `assets/demos/*`): GDPR references are on **synthetic** records — legitimate, untouched.
- `4x` substrings inside the base64 blob in `assets/edp/enterprise-data-platform-runbook.html` are encoded bytes, not content.

## Not done (see VERIFY-WITH-RAM.md)
- `assets/resume.pdf` binary NOT regenerated — `Ram-Resume-Master.docx` absent (HALT per brief). Source corrected; `?v=8` left unbumped.

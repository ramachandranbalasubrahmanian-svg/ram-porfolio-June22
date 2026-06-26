# ram-bala.com — Session Handover

_Last updated: 2026-06-27. This file lets a fresh Claude Code / Cursor session resume with full context. Read it first._

---

## 1. Project basics
- **What:** Ram Balasubrahmanian's executive portfolio — https://www.ram-bala.com
- **Repo:** this directory (`Cursor-Projects/Ram-Portfolio`); remote `github.com/ramachandranbalasubrahmanian-svg/ram-porfolio-June22`.
- **Stack:** static HTML/CSS/JS, **no build step**, no package.json.
- **Deploy:** **Vercel CLI, NOT git auto-deploy** → `npx vercel --prod --yes` from repo root. Project `ram-portfolio-amber`; the CLI uploads the working dir (so untracked files deploy too); `www.ram-bala.com` is the production alias. `git push origin main` only updates GitHub.
- **Run locally:** `bash scripts/serve-local.sh` (port 8888) — run in the USER's own terminal; servers an agent starts get sandbox-killed. Add `?perf=0` to hide the localhost-only dev metrics panel.
- **Git identity** is already set on this machine (`ramachandran.balasubrahmanian@gmail.com`) — new commits link to GitHub correctly. The whole branch's authorship was fixed earlier (don't redo).
- **Owner's strict rules:** never invent/inflate metrics, employers, credentials, or claims — **flag, don't fabricate**. Preserve the premium Apple-dark aesthetic on the site. Prefer free tools; single source of truth; verify before sharing; keep responses short.

## 2. Current production state ✅
- **`main` @ `a9545e7`** (Iterations 1–11c) — in sync with `origin/main`, **LIVE** via `npx vercel --prod`.
- **Lighthouse:** homepage **95 / 100 / 100 / 100**; perspective/demo pages ~**100 / 100 / 96 / 100**.
- **Stale branches** (work already merged to main — ignore/delete): `portfolio-upgrade`, `positioning-refresh`, `gcc-focus`, `feat/live-proof-lab`, `feat/mg-pp-demos`.
- **Untracked, do NOT commit yet:** `assets/demos/golden-record/walkthrough.html` + `shots/` (pending ElevenLabs voice bake). `NEXT-ARTIFACTS-PLAN.md` (runbook, left uncommitted by design).

## 3. The positioning (the spine — don't drift from this)
Right-sized over many iterations to be **credible and honest**, calibrated to the real résumé (top title = **Associate Director / Senior Manager** at FICO; led 25+ engineers; owned data-control governance for 50+ FS clients).
- **Target role:** **Director / Head of Data Governance** (Data Quality / DataOps / AI Governance). **NOT VP, NOT CDO** — those were removed as over-reach (recruiter panels unanimous).
- **Four regions, one spine, honest per-region level:**
  - **India / GCC / APAC →** Director / Head.
  - **Europe →** Lead / Principal / Senior Manager (matches his real title; Director as in-region progression).
- **Regional differentiators:** GCC = PDPL/NDMO crosswalk from GDPR/DMBOK. Europe = **GDPR run in REAL production** + EU AI Act-ready + DORA (his strongest regulatory fit). Region-specific pages: `perspectives/gcc-pdpl-data-governance/` and `perspectives/eu-gdpr-ai-act-data-governance/`.
- **Domains:** "**BFSI & other data-intensive domains**" on forward-looking POSITIONING statements; "regulated BFSI" kept on FICO/EY HISTORY lines (accurate — never rewrite history to claim retail/telecom delivery).
- **The differentiator to always surface:** a governance leader who **personally ships production AI** — the 3 live systems (Golden Record flagship, MediGovern, Pipeline Pulse).

## 4. Owner-confirmed canonical facts (do NOT re-litigate)
- Newsletter = **2,000+** subscribers (owner-confirmed; was 1,500+ on old résumé — now fixed everywhere).
- Sabbatical = **Apr 2025 – May 2026** (concluded; immediately available). Consistent across résumé + site.
- German = **beginner / A1, in progress** (stated honestly on the EU page; never claim fluency).
- Three live systems are real: Golden Record (89,198→20,502 golden records, repo + API), MediGovern (repo + API, synthetic/no-PHI), Pipeline Pulse (live demo, **no public repo**). Per-system OG cards at `assets/og/*.png`.
- Approved metrics (FICO): 95% incident reduction · 232M+ records/cycle · $2M+ saved · $10M+ ARR · 50+ clients · 4× MTTR.

## 5. Editable document sources (NEW — important)
The one-pager and résumé are no longer opaque binary PDFs. Both are now **HTML→PDF**:
- `exec-summary.source.html` → renders `assets/Ram-Bala-Executive-Summary.pdf` (+ `assets/ram-one-page-summary.pdf`), linked as `?v=4`. One A4 page; centerpiece = 3-system "Live Systems I Designed & Run" band.
- `resume.source.html` → renders `assets/resume.pdf`, linked as `?v=8`. Two A4 pages; matching light/blue style.
- **To edit either:** change the `.source.html`, then render with headless Chrome and copy to assets:
  ```bash
  CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
  "$CHROME" --headless=new --disable-gpu --no-pdf-header-footer \
    --print-to-pdf=out.pdf "file://$PWD/resume.source.html"
  cp out.pdf assets/resume.pdf   # then bump the ?v=N link in the HTML files
  ```
  (System Chrome is the renderer; `pdftoppm`/ImageMagick/cairosvg are NOT installed.)

## 6. Open / next (prioritized) — the real gap to "top 1%"
A 5-panel review process (recruiter, hiring-manager, data-leader, GCC-market, EU-market) concluded the site is **top-1% for getting hired / top-~10% as a pure artifact**. The remaining gap needs artifacts only Ram can supply — see `NEXT-ARTIFACTS-PLAN.md` + `scripts/` (gitignored dev tooling):
1. **Leadership-scoped recommendations (Item 1)** — current 11 recs read as senior-IC, not leader-of-leaders. `scripts/gen_rec_requests.py` drafts personalized asks; `scripts/add_recommendation.py` inserts received ones. This is what lets Europe credibly stretch toward Director.
2. **A 60–90s demo walkthrough video (Item 2)** — `scripts/tts_elevenlabs.py` + `scripts/build_demo_video.sh`. **Prereqs MISSING on this machine:** `brew install ffmpeg`; ElevenLabs key (memory said `~/.config/gr-tts/elevenlabs.key` but it's NOT there). The `walkthrough.html` artifact already exists, pending the voice bake.
3. Optional: per-page OG image for `/demos/` (currently uses `og-ram-portfolio.png`); analytics events on demo clicks.

## 7. Gotchas / lessons
- **Workflow panels HALLUCINATE specifics** — verify every finding against real files before acting. Caught this session: a non-existent `RAM_WellsFargo...pdf`, a fake "Platform P&L Ownership" résumé line, and "11 direct reports" (résumé says "25+ engineers"). The core *judgments* were sound; the invented *facts* were not.
- **Honesty is the product** — this is an auditability portfolio; one inflated number (e.g. the old "2,000+" vs recorded "1,731", since reconciled) discredits everything. Always verify claims against `assets/resume.pdf` and the demo READMEs.
- **Shell sandbox:** PATH is inconsistent (sed/awk/sort flaky) — use `python3` for scripting; `scripts/` is gitignored (dev tooling).
- **`.claude/launch.json`** in this repo is a real tracked file (port 8000 config) — don't delete it. The Claude_Preview MCP uses a separate launch.json with a `ram-portfolio` server (port 8010).
- Old `assets/Ram-Bala-Resume-*.pdf` targeted variants are gitignored; only `assets/resume.pdf` (the rebuilt one) is the live/canonical résumé.

## 8. What this session (2026-06-26 → 27) delivered
Iterations 8–11c, all live: right-sized positioning to Director/Head (killed VP/CDO); made **GCC** a genuine focus (PDPL/NDMO crosswalk page); added **Europe** as a 4th region (new GDPR/EU-AI-Act page, honest Lead/Principal level, visa routes, A1-German); per-system OG cards; **rebuilt the executive one-pager** (3-system Live Proof centerpiece, dropped unverified HIPAA/RBI/SEBI/IFSCA) and the **résumé** (added Golden Record + MediGovern, newsletter→2,000+), both as editable HTML→PDF in a shared style; broadened domains to "BFSI & other data-intensive domains"; aligned all docs (résumé ↔ one-pager ↔ site) — same metrics, systems, dates, positioning.

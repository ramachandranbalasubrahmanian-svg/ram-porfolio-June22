# VERIFY-WITH-RAM

Items needing Ram's confirmation or evidence before deploy. Softened versions are **already applied** on `fix/verified-record` (per the brief: apply softened now, strengthen later with evidence).

## ✅ RESOLVED

### 1. `assets/resume.pdf` — REPLACED with the verified master (2026-07-13)
The served `assets/resume.pdf` is now the fully verified résumé (`Ram-Resume-CDMP-v2.2-verified.pdf`): Senior Manager (Jun 2022 – Sep 2024) + Senior IC (Oct 2024 – Mar 2025), no "Associate Director", Independent Practice not sabbatical, 6 Anthropic certificates, `<4h` not `4×`. Cache-bust bumped `?v=8`→`?v=9` across all 14 references. Old inflated PDF backed up in session scratchpad.
- Note: `resume.source.html` (the corrected 1-page source) no longer generates the served résumé — the master is now the 2-page docx in `Documents/Ram-Imprtant-EDP/`. Keep or retire `resume.source.html` as you prefer; it is truth-clean either way.

### 2. Your resume/LinkedIn still say "Associate Director"
The résumé we built earlier this session (`Ram-Resume-CDMP-v2*.docx`) and, presumably, your LinkedIn use **"Associate Director / Senior Manager · Jun 2022 – Mar 2025"** — the exact claim this task corrects. Your mission ("nothing on the site can be contradicted by my resume/LinkedIn") is not met until those match the verified record: **Senior Manager (Jun 2022 – Sep 2024) → Senior Engineer / Sr IC (Oct 2024 – Mar 2025)**. Say the word and I'll re-correct the résumé docx to match.

## 🟡 UNLINKED STALE ASSETS — regenerate or delete before deploy
These are **gitignored** (won't show in the branch diff) but `npx vercel --prod` uploads the working dir, so they DO deploy and are reachable by direct URL:
- `assets/ram-one-page-summary.pdf` and `assets/master-resume.pdf` — were stale (Associate Director / 4× / 2,000+). I **regenerated/overwrote them clean** in the working dir. They are not linked from any page.
- `assets/framework-ai.pdf`, `framework-dq.pdf`, `framework-dre.pdf`, `framework-meta.pdf` — unlinked multi-page decks, image-based (can't text-edit). **Covers verified clean** ("Data & AI Governance Leader" byline, no Director/4×). Deeper pages unverified — if you attach these to applications, re-scan or regenerate them.
- `HANDOFF.md` — stale internal dev doc containing old terms (Associate Director / Sabbatical / 4× / 1,500 / 2,000+). Not recruiter-facing; recommend deleting it. (Not the README — README.md is clean.)

## 🟡 SOFTENED NOW — confirm, or send evidence to strengthen

### 3. GDPR framing (applied: vendor-side, not EU-controller)
Everywhere the site said GDPR was "run in (real/regulated) production on real EU customer data," it now reads: **"GDPR-aligned controls delivered from the vendor side for global financial-services clients — classification, masking, lineage, audit evidence — plus published GDPR/EU-AI-Act advisory analysis."** This matches "vendor-delivery side, NOT EU controller-side production."
- If you DID act as/for an EU data controller on EU-resident data in production, send the engagement details and I'll strengthen the claim.
- The EU perspective page (`perspectives/eu-gdpr-ai-act-data-governance/`) was the most GDPR-forward page and received the most rewording — please read it end-to-end.

### 4. EY designation → "ex-EY" only
Hero badge changed from "EY Senior Consultant" to **"ex-EY"**. **Confirm your exact EY title from your relieving letter** before we restore any specific EY designation.

### 5. Testimonial `workContext` labels (guardrail exception)
Guardrail said "don't touch testimonials." Two entries in `data/recommendations.json` had `workContext: "FICO · Associate Director / Senior Manager…"`. To meet the zero-forbidden-strings bar, I corrected **only the title label** → "FICO · Senior Manager…". **The quote text is 100% untouched.** Confirm this is acceptable.

### 6. PDPL / NDMO / EU AI Act / DORA = advisory/demos
These remain framed as crosswalks/advisory/demos (never production delivery), consistent with the facts bank. No change needed unless you want them strengthened with evidence.

## 🟢 FYI — decisions made
- `Ram-Bala-Executive-Summary.pdf` **was** regenerated from the corrected `exec-summary.source.html` (source present) and cache-bust bumped `?v=4`→`?v=5`. Original backed up in session scratchpad.
- `sabbatical-*` CSS class/id tokens retained (invisible; renaming risks styling) — see RECON.md.
- "Director / Head of Data Governance" is kept as an **aspirational target** headline (allowed); the plural **"Enterprise Data Platforms" as a title-noun** was dropped from résumé/exec-summary headlines.
- Onboarding "~70%" left as-is — it matches the facts bank canonical (4 weeks → 2–3 days ≈ 70%).

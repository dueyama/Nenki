# 2026-11-06 Next.js security maintenance

- Scope: Next.js / eslint-config-next 16.4.1 → 16.4.5 and aligned @next packages only.
- React / ReactDOM remain 19.2.4; Vitest 5.0.3 and the Vite 8.3.3 security resolution remain unchanged.
- Official release: https://nextjs.org/blog/november-2026-security-release
- Package manifest, lockfile and installed versions agree. Next's bundled RSC files are supplied by the verified Next 16.4.5 package; they do not declare an independent package version.

## Validation

- Passed: lint, TypeScript check, five existing unit tests, production build, diff check.
- Passed: local production HTTP 200, expected form/preview/memorial HTML, eight JS/CSS assets returning 200.
- Production dependency audit: zero vulnerabilities. Full audit: one High (zod) and eight Moderate (ESLint/minimatch chain), development-only and outside this patch.
- Existing Vitest configuration emits a future-native-loader warning; tests pass.
- Initial attempt: Codex in-app browser returned `Browser is not available: iab`; interactive checks were initially not run. A subsequently authorized follow-up used the existing official Chrome connection in a dedicated Nenki tab (see below).
- Source, data handling, authentication, public URL and publication settings are unchanged. No attack payloads or real user data were used.

## Production and recovery evidence

- Publish through the existing `main` Git integration to `https://nenki.vercel.app/`.
- Recovery baseline: commit `27216e8bf1273ceb477c10f462c3afb14ebf5220`, its tracked lockfile, production `dpl_BW2rGTtGxx7g7xe28m8RXABeiNXt`.
- Final deployment ID, full release commit, alias/READY/HTTP checks and completion time are retained in `/Volumes/Media/Artifacts/Nenki/evidence/next-security-20261106/release.json`, finalized after deployment. This file is a reference to that evidence, not a claim that an unverified deployment succeeded.
- Vercel project setting: Node 24.x; `engines.node` is `>=20.10.0`. The existing build log explicitly says this engine range overrides the project setting and selects Node 26.x (including cache invalidation from 24.x to 26.x). Build selection is therefore 26.x, not 24.x. Exact build patch and independently measured runtime version remain unverified; no settings were changed.
- Provider assurance: https://vercel.com/kb/bulletin/node-js-security-advisory states that deployments created after 2026-10-29 03:00 JST use patched Node. This assurance is distinct from independent runtime measurement.
- Model policy reviewed: central 2026-10-21 Sol / medium-or-higher requirement; existing strong setting requested to be retained. Actual runtime model/effort are independently unverified.

Evidence belongs to Nenki's existing maintenance task, is retained to reproduce this release, and is not disposable build cache. No recovery action was executed during this maintenance.

## Browser-only follow-up (2026-11-06)

- Existing deployment/commit remain `dpl_jhA8w1ZviZBsBnAZRLdWwi5RPgma` / `e31b8876c03c7b17cb05f1c7bb98013db51ac159`; no dependency update, build, commit, push, or deployment was repeated.
- Official browser inventory exposed the existing Chrome connection. Only the dedicated Nenki tab and its print dialog were operated; no browser/tool installation, permission, authentication, network or application setting changes were made.
- Passed: synthetic name/age reflection; death-date change to 2000-11-29; first weekly memorial 2000-12-05 (Tuesday), hundredth day 2001-03-08 (Thursday), anniversary years 2001 through 2049; empty required-name error and disabled print; long-name warning and disabled print; normal-input recovery; optional empty religious name.
- Console: no application-origin error/warning observed. Six warnings came from an existing extension; the extension was not changed.
- Print dialog opened and PDF saved using the existing print conditions (A4, all pages, default margins, header/footer enabled). **Finding:** the PDF has two pages: all expected memorial content is on page 1, while page 2 has no text (only a faint background strip). Single-page output is not verified/passed under these conditions. Existing versus newly introduced behavior and its cause are unproven; no code or print-setting fix was attempted.
- PDF's Japanese content and all 53 font ToUnicode mappings were checked; all pages were visually reviewed through the available PDF rendering tools. The PDF is retained as validation evidence, not a defect-free final document.
- Tool limitations encountered: one read-only selector evaluation timed out; a browser mouse dispatch timed out. Current state was checked before using the same dedicated tab's native print button. No access/approval denial occurred. Date `fill` did not change the controlled date; the native date stepper changed it and the resulting UI was verified.
- Evidence: `production-interactive.png`, `print-preview.png`, `production-synthetic-2000-11-29.pdf`, page renders, and `interactive-followup.json` under the existing Media evidence directory above. The local maintenance record is intentionally left uncommitted because this follow-up authorizes verification/recording only and forbids duplicate publication.

## PDF before/after comparison (2026-11-06)

- Classification: **pre-existing PDF pagination problem, not newly introduced by the 16.4.1 → 16.4.5 update in the reproduced case**. Security publication and successful main operations remain completed; the PDF issue is a separate existing residual.
- Baseline deployment `dpl_BW2rGTtGxx7g7xe28m8RXABeiNXt` was verified against commit `27216e8bf1273ceb477c10f462c3afb14ebf5220` and opened through ordinary existing Chrome access, without an access bypass, new credentials or protection changes. No new build or isolated dependency installation was needed.
- Old and new PDF inputs: religious name `検証用釋太郎`, secular name `検証用太郎`, death date `2000-11-29`, age `88`. Same Chrome connection and unmodified print conditions: A4, all pages, default margins, header/footer enabled, background graphics disabled.
- Both PDFs have two A4 pages. Their normalized text and rendered pixels match on **both pages**, independently in PyMuPDF and Poppler. Page 2 contains no text in either version; only the same paper-background strip.
- App source, print CSS, React and Vite were unchanged across the two commits. Actual served CSS rules are also identical: SHA-256 `fe3ea8b73943acefacdf86f82c80ee1ad577e5e85b3d1b9ad75b93a5b6772720` for both versions.
- Cause supported by source and PDF geometry: the unqualified `@media (max-width: 1120px)` in `src/app/globals.css` also applies to A4 print and leaves `.a4-page { min-height: 297mm }`. `src/styles/print.css` sets its height to 285mm for A4 with two 6mm margins but does not reset the minimum. The minimum wins over the smaller height. PDF paper-background rectangles total about 297.13mm; about 11.91mm spills onto page 2, consistent with the 297mm versus 285mm conflict.
- Minimal proposed fix, **not applied or effect-tested**: add `min-height: 0 !important;` to the existing print-only `.a4-page` rule. This keeps the 285mm print height and screen layout intact; no font reduction or permanent print-setting change is proposed.
- Safe regression plan: on a separately authorized patch, repeat the same synthetic case and print conditions; require exactly one A4 page, all expected Japanese text and dates, no clipping or extra background page, and all-page inspection in both renderers. Also check empty religious name, valid near-limit names, leap-day date, and narrow/wide screen previews; retain existing required/long-input print-disable checks. No real data, physical printing or production write test is needed.
- Comparison evidence in the same Media directory: `baseline-27216e8-synthetic-2000-11-29.pdf`, `baseline-27216e8-print-preview.png`, both CSS snapshots, baseline page renders, and `pdf-comparison.json`. Original evidence and the uncommitted Node-setting/build-selection correction are preserved. No source fix, dependency update, commit, push or redeploy was performed.

## One-page print fix (2026-11-06)

- After the comparison, the user directly authorized the proposed minimal fix, verification, normal commit/push and production publication. The preceding investigation and Node correction above are retained as history in this release record.
- Only application change: `min-height: 0 !important;` in the existing print-only `.a4-page` rule. Screen styles, font sizes, calculations, dependencies, authentication and public settings are unchanged.
- Passed: lint, typecheck, five tests, production build and diff check. Existing Vitest native-loader warning remains non-fatal.
- Actual Chrome PDF saves with unchanged baseline print conditions passed for three local synthetic cases: standard 2000-11-29/age88; empty religious name with leap date 2000-02-29; valid combined-name length24 (12+12) with the leap date. Every PDF is one A4 page. The standard PDF has exactly the same normalized body text as the pre-fix PDF's content page.
- All three PDFs passed Japanese text checks, ToUnicode mapping checks and visual inspection in PyMuPDF and native Poppler without render warnings or clipped content.
- In-app browser connection was available again: required-input/long-input print suppression, normal-input recovery and optional empty religious name passed; app console warnings/errors were absent. Screen layout at widths768 and1400 retains the expected single/two columns; the temporary viewport override was reset. Chrome was retained for PDF generation to match the original comparison's browser and print conditions; its six extension-origin warnings were separated from app logs.
- Recovery baseline for this fix: `e31b8876c03c7b17cb05f1c7bb98013db51ac159` / `dpl_jhA8w1ZviZBsBnAZRLdWwi5RPgma`. The Node setting24.x / engines-based build selection26.x / exact-patch-unverified distinction remains unchanged.
- Evidence belongs to Nenki's existing task and is retained under `/Volumes/Media/Artifacts/Nenki/evidence/pdf-onepage-20261106/`: three local PDFs, their independent renders, `local-validation.json`, and print screenshots. Final release commit, deployment and production PDF verification are recorded in `release.json` there after publication; no prior evidence is overwritten.

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
- Not run: interactive input/validation/print-to-PDF and browser console checks. Codex in-app browser returned `Browser is not available: iab`; no alternate browser or control path was used. HTTP checks do not prove these interactions.
- Source, data handling, authentication, public URL and publication settings are unchanged. No attack payloads or real user data were used.

## Production and recovery evidence

- Publish through the existing `main` Git integration to `https://nenki.vercel.app/`.
- Recovery baseline: commit `27216e8bf1273ceb477c10f462c3afb14ebf5220`, its tracked lockfile, production `dpl_BW2rGTtGxx7g7xe28m8RXABeiNXt`.
- Final deployment ID, full release commit, alias/READY/HTTP checks and completion time are retained in `/Volumes/Media/Artifacts/Nenki/evidence/next-security-20261106/release.json`, finalized after deployment. This file is a reference to that evidence, not a claim that an unverified deployment succeeded.
- Vercel project setting: Node 24.x. Build/runtime patch versions are recorded only if directly exposed by existing metadata/logs; otherwise unverified.
- Provider assurance: https://vercel.com/kb/bulletin/node-js-security-advisory states that deployments created after 2026-10-29 03:00 JST use patched Node. This assurance is distinct from independent runtime measurement.
- Model policy reviewed: central 2026-10-21 Sol / medium-or-higher requirement; existing strong setting requested to be retained. Actual runtime model/effort are independently unverified.

Evidence belongs to Nenki's existing maintenance task, is retained to reproduce this release, and is not disposable build cache. No recovery action was executed during this maintenance.

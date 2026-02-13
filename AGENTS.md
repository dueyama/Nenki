# Repository Workflow Policy

## Development Flow
- Primary development is done locally with local Git history.
- Do not assume GitHub is the source of truth during early development.
- Publish to GitHub only at meaningful milestones.

## GitHub Purpose
- GitHub is used for:
  - Public source publishing
  - Vercel deployment integration

## Release Gate (before milestone publish)
- Ensure local checks pass: lint, typecheck, unit tests, build.
- Only then push milestone commits to GitHub.

## Publish and Deploy Policy
- Local development and manual verification are done before any remote push.
- When ready to milestone-share, create a commit locally and push it to GitHub.
- GitHub is Public and used only for:
  - source publishing
  - Vercel production/preview deploy integration
- Push cadence is milestone-based; no continuous sync required during early experimentation.

## Branch and Deploy Mapping
- `main` branch is treated as Production in Vercel.
- Pull requests are for Preview deployment in Vercel.

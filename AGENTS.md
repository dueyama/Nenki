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

---
name: github-actions-cicd
description: >-
  Use when editing GitHub Actions workflows, debugging CI failures,
  adding new CI jobs, or understanding the pipeline stages.
  Covers ci.yml, deploy.yml, and release.yml.
---

# GitHub Actions CI/CD

Three workflows handle CI, deployment, and release automation. All use pnpm 9 + Node 20 on `ubuntu-latest`.

## When to Use

- Editing or debugging `.github/workflows/` files
- Adding new CI checks (e.g., tests, format check)
- Understanding why a pipeline failed
- When NOT to use: local build issues, Vercel config changes

## Pipeline Overview

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| `ci.yml` | Push to any branch, PRs to main/develop | Lint, typecheck, build |
| `deploy.yml` | Push to `main`, manual dispatch | Deploy to Vercel production |
| `release.yml` | Merged PR from `release/*` to `main` | Create GitHub release + tag |

## ci.yml — Continuous Integration

```
install → lint → typecheck → build (parallel after install)
```

| Job | Command | Fails on |
|-----|---------|----------|
| Install | `pnpm install --frozen-lockfile` | Lockfile mismatch |
| Lint | `pnpm lint` (eslint --max-warnings 0) | Any warning or error |
| Typecheck | `pnpm typecheck` (tsc -b --noEmit) | Any TS error |
| Build | `pnpm build` (tsc -b && vite build) | Compile or bundle error |

Uses `concurrency: ci-${{ github.ref }}` with `cancel-in-progress: true` to avoid stale runs.

Dependencies are cached with key `deps-${{ runner.os }}-${{ hashFiles('pnpm-lock.yaml') }}`.

## deploy.yml — Production Deployment

Runs only on `main`. Uses `concurrency: deploy-production` with `cancel-in-progress: false` (never cancel a running deploy).

Steps: install → pull Vercel env → `vercel build --prod` → `vercel deploy --prebuilt --prod` → health check (HTTP 200 on `https://gifav.veinpal.com`).

Required secrets: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`.

## release.yml — Release Automation

Triggers when a PR from `release/*` merges into `main`. Extracts semver from branch name, validates it, checks the tag doesn't exist, generates a changelog from conventional commits, and creates a GitHub release.

## Rules

1. **All CI jobs must pass before merging** — lint, typecheck, and build are mandatory
2. **Use `pnpm install --frozen-lockfile`** — never `pnpm install` without `--frozen-lockfile` in CI
3. **Node 20 + pnpm 9** — match the versions in all workflows
4. **Don't skip jobs** — `continue-on-error` is banned. Failures must block.
5. **New CI checks go in `ci.yml`** — don't create separate workflows for additional quality gates

## Common Mistakes

- Adding `npm` or `yarn` commands in workflows — this project uses `pnpm` exclusively
- Forgetting to update the cache key when changing dependency install paths
- Using `cancel-in-progress: true` on the deploy workflow — will corrupt deployments
- Creating release tags manually — use the `release/*` branch flow

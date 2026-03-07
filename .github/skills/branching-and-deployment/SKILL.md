---
name: branching-and-deployment
description: >-
  Use when pushing code, creating commits, checking branch names,
  or asking whether a fix has reached production. Covers AI agent
  push restrictions, pre-push checklist, branch naming, and commit format.
---

# Branching & Deployment

Modified Gitflow: `main` ← `release/*` ← `develop` ← feature branches.
Only `main` deploys to production. Everything else is CI-only.

## AI Agent Push Rules

**CAN:** push to the current feature branch only.

**NEVER:** merge branches, create PRs, push to `main`/`develop`/`release/*`, force-push, or delete remote branches.

> The human handles all merges, PRs, and deployments.

## Pre-Push Checklist (mandatory before every push)

```bash
pnpm lint          # zero errors required
pnpm build         # must compile successfully
git status         # no untracked files that should be committed
```

Push only when: lint passes, build passes, you understand every change, no experimental code. **Any doubt → do not push.**

Report: `Lint: passed | Build: passed | 100% certain | Ready to push: <branch>`

## Deployment Reality

A fix on a feature branch is **invisible to production** until merged to `main`.
Always tell the user: *"This fix is on `<branch>`. It reaches production only after merge to `main`."*

## Quick Reference

| Item | Value |
|------|-------|
| Branch prefixes | `feat/` `fix/` `refactor/` `chore/` `ci/` `doc/` `style/` `test/` |
| Commit format | `<type>[scope]: <description>` — imperative, lowercase, no period |
| Commit types | `feat` `fix` `refactor` `doc` `style` `chore` `ci` `test` `perf` `build` |

## References

- [Branch flow & strategy](references/branch-flow.md)
- [Commit format details](references/commit-format.md)
- [CI/CD pipeline](references/ci-pipeline.md)

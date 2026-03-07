# Branch Flow & Strategy

## Branch Structure

```
main                         # Production — deploys automatically
├── release/*                # Release prep, cut from develop
├── develop                  # Integration — all features merge here
│   ├── feat/xxx             # New features
│   ├── fix/xxx              # Bug fixes
│   ├── refactor/xxx         # Code restructuring
│   ├── chore/xxx            # Dependencies, tooling
│   ├── ci/xxx               # CI/CD changes
│   ├── doc/xxx              # Documentation
│   ├── style/xxx            # Formatting
│   └── test/xxx             # Tests
```

## Why Modified Gitflow?

1. **`main`** is always production-ready. Only `release/*` merges into `main`. Every production deploy has gone through integration testing and QA.

2. **`release/*`** branches are cut from `develop` when features are ready for release. They allow final stabilization without blocking new development. Once stable, `release/*` merges into `main` (triggering deploy) AND back into `develop` (capturing release fixes).

3. **`develop`** is the integration branch where all feature branches converge. Must always be buildable and lintable. CI runs on every push.

4. **Feature branches** (`feat/*`, `fix/*`, `doc/*`, etc.) are short-lived. Branch from `develop`, merge back via PR with mandatory code review.

## Deployment Reality

```
feat/xxx  →  CI only (lint + build)
develop   →  CI only
release/* →  CI only
main      →  CI + DEPLOY  ← ONLY HERE
```

A fix on a feature branch is **invisible to production** until merged all the way to `main`. After fixing a production bug on a feature branch, always tell the user: *"This fix is on branch `xxx`. It will only reach production after you merge it to `main`."*

## Branch Flow

```
feat/xxx ──→ develop ──→ release/x.y.z ──→ main
fix/xxx  ──→ develop ──→ release/x.y.z ──→ main
                            │
                            └──→ develop (back-merge release fixes)
```

**Step-by-step:**
1. Developer creates `feat/xxx` from `develop`
2. AI agent pushes commits to `feat/xxx`
3. Developer creates PR: `feat/xxx` → `develop` (requires review)
4. CI runs on PR (lint, build, tests)
5. Developer reviews and merges to `develop`
6. When ready, developer cuts `release/x.y.z` from `develop`
7. Final fixes go into `release/x.y.z`
8. Developer merges `release/x.y.z` → `main` → auto-deploy
9. Developer back-merges `release/x.y.z` → `develop`

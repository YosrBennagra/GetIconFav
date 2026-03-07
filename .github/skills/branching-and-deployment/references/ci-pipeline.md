# CI/CD Pipeline

## Pipeline Stages (every push)

```
Push → Install → Lint → Build → Verify
```

| Stage   | Command                          | Checks                            |
|---------|----------------------------------|-----------------------------------|
| Install | `pnpm install --frozen-lockfile`  | Dependencies resolve              |
| Lint    | `pnpm lint`                       | ESLint rules, unused imports      |
| Build   | `pnpm build`                      | TypeScript compiles, pages render |
| Verify  | Page count check                  | At least 10 static pages          |

## Triggers

| Branch      | On Push    | On PR to develop | On PR to main |
|-------------|------------|-----------------|---------------|
| `feat/*`    | CI         | CI              | —             |
| `fix/*`     | CI         | CI              | —             |
| `doc/*`     | CI         | CI              | —             |
| `develop`   | CI         | —               | —             |
| `release/*` | CI         | —               | CI            |
| `main`      | CI + Deploy| —               | —             |

## Deploy Pipeline (main only)

```
Main Push → Install → Vercel Pull → Vercel Build → Deploy → Health Check
```

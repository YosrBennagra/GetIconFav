---
name: vercel-deployment
description: >-
  Use when configuring Vercel deployment settings, modifying headers or caching
  rules, troubleshooting deployment failures, or checking production behavior.
  Covers vercel.json, regions, security headers, and the deploy pipeline.
---

# Vercel Deployment

Single-page Vite app deployed to Vercel. All config lives in `vercel.json`. Production deploys only from `main` via GitHub Actions (`.github/workflows/deploy.yml`).

## When to Use

- Editing `vercel.json` (headers, rewrites, caching)
- Debugging deploy failures or 404s
- Adding new security headers or cache rules
- When NOT to use: local development issues, CI failures unrelated to deploy

## Configuration

| Setting | Value |
|---------|-------|
| Framework | `vite` |
| Build command | `pnpm run build` |
| Output directory | `dist` |
| Region | `cdg1` (Paris) |
| URL | `https://gifav.veinpal.com` |

## Security Headers (global)

Applied to all routes `/(.*)`  :

| Header | Value | Purpose |
|--------|-------|---------|
| `X-Frame-Options` | `DENY` | Prevent clickjacking |
| `X-Content-Type-Options` | `nosniff` | Prevent MIME sniffing |

## Caching Rules

| Route | Cache-Control | Reason |
|-------|---------------|--------|
| `/assets/*` | `public, max-age=31536000, immutable` | Vite content-hashed assets |
| Everything else | Vercel default | HTML, manifest, robots.txt (short-lived) |

## SPA Routing

All paths rewrite to `/index.html` — this is a single-page app with no router.

```json
"rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
```

## Deploy Pipeline

Deploy workflow (`.github/workflows/deploy.yml`):

1. Triggers on push to `main` or manual dispatch
2. Installs deps with `pnpm install --frozen-lockfile`
3. Pulls Vercel environment, builds with `vercel build --prod`
4. Deploys with `vercel deploy --prebuilt --prod`
5. Health-checks `https://gifav.veinpal.com` (expects HTTP 200)

Required secrets: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`.

## Rules

1. **Never add server-side routes** — this is 100% client-side. No API endpoints, no serverless functions, no edge middleware.
2. **New static assets → add to PWA precache** — update `vite.config.ts` `includeAssets` if adding new public files.
3. **Test security headers locally** — run `pnpm preview` and check response headers before pushing.
4. **Don't bypass the deploy pipeline** — never run `vercel deploy` manually for production.

## Common Mistakes

- Adding `rewrites` that shadow static files — asset paths must not be caught by the SPA rewrite
- Forgetting to add new public files to the PWA `includeAssets` list
- Setting cache headers on HTML — only content-hashed assets should be immutable

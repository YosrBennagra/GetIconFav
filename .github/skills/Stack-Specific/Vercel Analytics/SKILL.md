---
name: vercel-analytics
description: >-
  Use when adding, configuring, or debugging Vercel Analytics or Web Vitals
  tracking. Covers the Analytics component setup, data privacy, and what
  metrics are collected automatically.
---

# Vercel Analytics

`@vercel/analytics` provides automatic page-view tracking and Web Vitals reporting — no manual event calls needed. One `<Analytics />` component in `App.tsx`.

## When to Use

- Adding or moving the `<Analytics />` component
- Checking what data Vercel collects automatically
- Ensuring analytics doesn't leak PII
- When NOT to use: custom event tracking (not implemented in this project)

## Setup

```tsx
// src/App.tsx — rendered once at the app root
import { Analytics } from '@vercel/analytics/react';

// Inside JSX return:
<Analytics />
```

The component auto-detects the environment (production vs development) and only sends data in production builds deployed to Vercel.

## What's Tracked Automatically

| Metric | Type | Notes |
|--------|------|-------|
| Page views | Navigation | Every client-side navigation |
| LCP | Web Vital | Largest Contentful Paint |
| FID | Web Vital | First Input Delay |
| CLS | Web Vital | Cumulative Layout Shift |
| TTFB | Web Vital | Time to First Byte |
| INP | Web Vital | Interaction to Next Paint |

No custom events are tracked. No user-identifiable data is sent.

## Rules

1. **Keep `<Analytics />` in the root component** — it must render on every page load
2. **No PII in URL paths** — analytics tracks page URLs. This app has no router so this is naturally safe, but never add user data to `window.location`
3. **Don't add custom events without discussion** — the project is privacy-first, 100% client-side
4. **Development mode is safe** — the component silently no-ops outside Vercel production

## Common Mistakes

- Removing `<Analytics />` during refactoring — always keep it in `App.tsx`
- Conditionally rendering it — let the library handle environment detection
- Adding `@vercel/speed-insights` without need — Web Vitals are already included in `@vercel/analytics`

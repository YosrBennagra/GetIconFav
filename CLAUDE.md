# GetIconFav

> **This is the single source of truth for all project rules, architecture, and conventions.**
> Used by all AI coding agents (GitHub Copilot, Claude, Cursor, etc.).
> Copilot-specific skill matching lives in `.github/copilot-instructions.md`.

## Overview

Free online favicon.ico generator — drag, preview in every context, and download. Converts PNG, JPG, SVG, WebP, BMP, GIF to multi-size `.ico` files and full icon packages. **100% client-side** — images never leave the browser.

**Stack:** React 19 · TypeScript 5.7 · Vite 6 · Tailwind CSS 3.4 · Vercel · PWA

## Critical Rules

1. No `any` types — `@typescript-eslint/no-explicit-any` is set to `error`
2. Strict TypeScript: `strict`, `noUnusedLocals`, `noUnusedParameters`, `noUncheckedIndexedAccess`, `noFallthroughCasesInSwitch`
3. All processing must be client-side only — no server endpoints, no external API calls for image conversion
4. Files: max 300 lines. Functions: max 50 lines.
5. Conventional commits: `feat:`, `fix:`, `docs:`, `refactor:`, `style:`, `test:`, `ci:`, `chore:`
6. Use `pnpm` exclusively — never `npm` or `yarn`
7. Prefer native browser APIs (Canvas, FileReader, Blob, URL.createObjectURL) over external image libraries
8. `eslint-plugin-react-hooks` rules enforced — follow Rules of Hooks strictly

## Architecture

```
src/
  App.tsx               → Single-page app (all state, orchestration)
  main.tsx              → React entry point
  index.css             → Global styles (Tailwind base)
  vite-env.d.ts         → Vite type declarations
  components/
    drop-zone.tsx       → Drag-and-drop file input
    advanced-controls.tsx → Background color, padding sliders
    favicon-previews.tsx → Browser tab/bookmark bar previews
    icon-package-grid.tsx → Category-grouped icon selector
    preview-grid.tsx    → ICO size preview grid
    size-slot-grid.tsx  → Individual size slots
    source-info.tsx     → Source image metadata display
    step-indicator.tsx  → 3-step wizard progress
    support-links.tsx   → Footer links
    tiny-preview-row.tsx → Compact icon preview strip
    favicon-guide.tsx   → Usage guide content
  lib/
    constants.ts        → Icon sizes, package definitions, categories
    ico-encoder.ts      → Binary ICO format encoder
    image-resizer.ts    → Canvas-based resize, SVG re-rendering, step-down scaling
    package-generator.ts → ZIP package builder (JSZip)
    use-theme.ts        → Dark/light theme hook
public/
  robots.txt, sitemap.xml, site.webmanifest, browserconfig.xml
scripts/
  generate-pwa-icons.mjs → PWA icon generator script
docs/
  BRANCHING.md, DESIGN_PROPOSALS.md, IMPROVEMENTS.md, USAGE.md
```

### Key Patterns

- **Single-component architecture**: `App.tsx` holds all state; child components are presentational
- **Canvas API for all image ops**: resize, crop, format conversion — no server needed
- **SVG-native rendering**: SVGs are re-rasterized at each target size for pixel-perfect PNG output
- **Step-down resizing**: Large-to-small conversions halve repeatedly for sharp results
- **JSZip for packaging**: Full icon packages generated client-side as ZIP downloads

## Commands

```bash
pnpm dev            # Start Vite dev server
pnpm build          # TypeScript check + Vite production build
pnpm preview        # Preview production build locally
pnpm lint           # ESLint with zero warnings tolerance
pnpm lint:fix       # Auto-fix lint issues
pnpm typecheck      # TypeScript type checking only
pnpm format         # Prettier formatting
pnpm format:check   # Check formatting without writing
```

## Git & Deployment

### Branch Strategy

```
main ← develop ← feat/*, fix/*, doc/*, refactor/*, chore/*
```

### AI Agent Rules

- **ONLY push to the current feature branch** — never merge, never create PRs, never push to main/develop
- **Verify locally before every push**: `pnpm lint` → `pnpm build` → both must pass with 0 errors
- **Conventional commits**: `feat:`, `fix:`, `docs:`, `refactor:`, `style:`, `test:`, `ci:`, `chore:`

### Deployment

- **Platform**: Vercel (auto-deploy from `main`)
- **Region**: `cdg1` (Paris)
- **Build**: `pnpm run build` → `dist/`
- **PWA**: Service worker via `vite-plugin-pwa` with `autoUpdate` strategy

## Dependencies

### Production
| Package | Purpose |
|---|---|
| `react` / `react-dom` | UI framework (v19) |
| `react-icons` | Icon library (Fi icons) |
| `jszip` | Client-side ZIP generation |
| `@vercel/analytics` | Usage analytics |

### Key Dev Dependencies
| Package | Purpose |
|---|---|
| `vite` + `@vitejs/plugin-react` | Build tooling |
| `vite-plugin-pwa` | PWA service worker |
| `tailwindcss` + `postcss` + `autoprefixer` | Styling |
| `typescript` | Type safety |
| `eslint` + plugins | Code quality |
| `prettier` | Formatting |

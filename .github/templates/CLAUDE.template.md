# [Project Name]

> **This is the single source of truth for all project rules, architecture, and conventions.**
> Used by all AI coding agents (GitHub Copilot, Claude, Cursor, etc.).
> Copilot-specific skill matching lives in `.github/copilot-instructions.md`.

## Overview

<!-- Describe your project in 1-2 sentences -->

**Stack:** <!-- e.g. Next.js 15 · TypeScript · Tailwind CSS · Prisma · PostgreSQL -->

## Critical Rules

1. <!-- No `any` types (if TypeScript) -->
2. <!-- Framework-specific rules -->
3. Files: max 200-400 lines. Functions: max 50 lines.
4. Conventional commits: `feat:`, `fix:`, `docs:`, `refactor:`, `style:`, `test:`, `ci:`, `chore:`

## Architecture

```
<!-- Describe your folder structure -->
src/
  app/       → Pages and routes
  components/ → UI components
  lib/       → Utilities and helpers
  server/    → Server-side logic
```

## Commands

```bash
<!-- List your dev commands -->
# npm run dev      # Start dev server
# npm run build    # Production build
# npm run lint     # Linting
# npm test         # Run tests
```

## Git & Deployment

### Branch Strategy

```
main ← develop ← feat/*, fix/*, doc/*, refactor/*, chore/*
```

### AI Agent Rules

- **ONLY push to the current feature branch** — never merge, never create PRs, never push to main/develop
- **Verify locally before every push**: lint → build → both must pass with 0 errors
- **Conventional commits**: `feat:`, `fix:`, `docs:`, `refactor:`, `style:`, `test:`, `ci:`, `chore:`

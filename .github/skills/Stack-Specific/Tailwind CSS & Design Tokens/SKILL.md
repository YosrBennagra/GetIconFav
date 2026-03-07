---
name: tailwind-design-tokens
description: >-
  Use when adding or modifying Tailwind utility classes, creating new
  components, changing colors/spacing/typography, or working with dark mode.
  Covers the project's Blueprint design system tokens and theme conventions.
---

# Tailwind CSS & Design Tokens

Tailwind CSS 3.4 with `class`-based dark mode. All design tokens live in `tailwind.config.ts`. Custom utilities and patterns live in `src/index.css`.

## When to Use

- Adding or editing UI component styles
- Choosing colors, spacing, or typography
- Implementing dark-mode variants
- When NOT to use: pure logic changes with no UI

## Design Tokens

### Blueprint Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `bp-blue` | `#5b9bd5` | Primary accent, interactive elements, links |
| `bp-steel` | `#7c8eb5` | Secondary text, muted interactive |
| `bp-green` | `#4caf7c` | Success states, completed steps |
| `bp-red` | `#d65f5f` | Error states, destructive actions |
| `bp-amber` | `#e5a84b` | Warnings, in-progress states |
| `bp-navy` | `#0b1929` | Dark backgrounds |
| `bp-dark` | `#0f2035` | Card/panel backgrounds |
| `bp-grid` | `#1a3a5c` | Grid lines, borders |
| `bp-line` | `#1e4a6e` | Dividers, subtle borders |

Usage: `text-bp-blue`, `bg-bp-dark`, `border-bp-grid/20` (with opacity).

### Typography

| Class | Font |
|-------|------|
| `font-sans` | Inter, system-ui |
| `font-mono` | JetBrains Mono, Fira Code |

Convention: UI labels use `font-mono`. Body text uses `font-sans`.

### Custom Animations

- `animate-pulse-slow` — 3s pulse for loading states
- `animate-progress-fill` — 1s ease-out width fill

## Rules

1. **Use `bp-*` tokens** — never hardcode hex colors. `text-bp-blue` not `text-[#5b9bd5]`.
2. **Dark mode via `dark:` variant** — the toggle uses `class` strategy. Always pair light/dark: `bg-zinc-100 dark:bg-bp-dark`.
3. **Custom CSS goes in `src/index.css`** — complex patterns (`.blueprint-grid`, `.checkerboard`, `.dropzone-active`) are defined there with Tailwind's `@apply` or raw CSS.
4. **Zinc scale for neutrals** — `zinc-100` through `zinc-900` for grays. Match existing components.
5. **Opacity modifiers** — use `/20`, `/40` etc. for transparency: `border-bp-blue/20`.

## Common Mistakes

- Using `bg-blue-500` instead of `bg-bp-blue` — breaks visual consistency
- Forgetting the `dark:` variant — light mode looks fine but dark mode breaks
- Adding colors in component files — put new tokens in `tailwind.config.ts`
- Using arbitrary values `[#hex]` when a token exists

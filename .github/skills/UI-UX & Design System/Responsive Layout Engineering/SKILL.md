---
name: responsive-layout-engineering
description: 'Use when requests involve responsive design, layout refactors, breakpoint strategy, mobile usability, adaptive UI behavior, or fixing layout regressions across screen sizes. Design and implement responsive layouts that work across mobile, tablet, laptop, large desktop, and constrained embedded contexts: breakpoints, content flow, spacing, grids, navigation behavior, touch targets, and overflow management.'
---

# Responsive Layout Engineering

## Overview

Design layouts around content behavior and task priority, not around a few screenshots.
Prefer fluid systems, resilient component behavior, and intentional breakpoint decisions over device-specific patchwork.

## Follow This Workflow

### 1. Identify layout-critical flows

- Find the screens where task completion breaks first on narrow or wide viewports.
- Identify dense tables, toolbars, forms, cards, media, and navigation patterns that need adaptive behavior.
- Define the primary reading order and interaction order before changing CSS.

### 2. Define layout strategy

- Use intrinsic sizing and fluid spacing before adding breakpoint overrides.
- Decide where single-column, multi-column, drawer, stacked, or condensed patterns should appear.
- Treat navigation changes, not just content width, as part of the responsive design system.

### 3. Adapt components, not just pages

- Define how cards, modals, tables, filters, tabs, and controls behave under width pressure.
- Handle overflow explicitly: wrap, scroll, collapse, paginate, truncate, or reformat.
- Preserve touch targets and readable line lengths.

### 4. Verify interaction quality

- Check keyboard reachability, sticky elements, safe areas, and zoom behavior.
- Check orientation changes, long localized strings, user-generated content, and empty or error states.
- Ensure responsive changes do not hide critical actions or system feedback.

### 5. Stabilize and document

- Record breakpoint intent and component behavior patterns.
- Remove one-off media queries that duplicate or fight the chosen system.
- Leave the layout easier to extend without guessing how it should collapse or expand.

## Decision Rules

| Situation | Action |
| --- | --- |
| Content reflows cleanly with fluid rules | Prefer fluid sizing over extra breakpoints. |
| Dense data cannot fit without losing meaning | Switch presentation pattern instead of shrinking everything. |
| Navigation competes with content on mobile | Reduce chrome and prioritize the primary task. |
| One component repeatedly breaks across layouts | Fix the component contract, not each page instance. |
| Large screens feel empty or stretched | Add max widths, richer composition, or secondary panels deliberately. |

## Quality Bar

- Layout should support the primary task at every supported size.
- Breakpoints should reflect content needs, not device brand assumptions.
- Components should degrade gracefully under stress.
- Mobile interactions should remain reachable and legible.
- Large-screen layouts should feel intentionally composed, not merely widened.

## Avoid These Failure Modes

- Do not design only for a desktop artboard and patch mobile later.
- Do not shrink text and controls below usable size to preserve layout symmetry.
- Do not rely on one breakpoint per device class as a full strategy.
- Do not hide important actions behind overflow without checking discoverability.
- Do not treat horizontally scrolling core workflows as the default answer.

## References

- Breakpoint and pattern guidance: `references/responsive-patterns.md`
- Responsive review checklist: `references/responsive-review-checklist.md`

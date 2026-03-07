---
name: component-library-engineering
description: 'Use when requests involve building shared components, refactoring UI primitives, library architecture, variant strategy, or improving reuse and consistency across a frontend codebase. Design, build, and evolve reusable UI component libraries: component APIs, composition patterns, slots, variants, accessibility contracts, theming, documentation, and governance across applications or design systems.'
---

# Component Library Engineering

## Overview

Build components as durable interfaces, not just extracted JSX.
Prefer composable primitives, clear state contracts, and disciplined API design over prop-heavy convenience layers.

## Follow This Workflow

### 1. Confirm the component’s role

- Identify whether the component is a primitive, composed pattern, or product-specific feature.
- Define the jobs it must support, the screens that rely on it, and the states it must handle.
- Avoid extracting a shared component before the behavior is truly repeatable.

### 2. Design the API deliberately

- Prefer a small, coherent prop surface.
- Use composition and slots for extensibility before adding many flags.
- Keep visual variants predictable and bounded.
- Define controlled versus uncontrolled behavior intentionally.

### 3. Encode behavioral contracts

- Specify required states: default, hover, focus, active, disabled, loading, error, empty, selected, or expanded as relevant.
- Ensure semantics, keyboard behavior, and screen-reader expectations are part of the component contract.
- Decide which concerns belong in the component and which belong to consumers.

### 4. Support theming and reuse

- Use tokens and semantic styles instead of component-specific hard-coded values.
- Keep layout assumptions minimal unless the component is explicitly layout-bearing.
- Design for composition across forms, lists, dialogs, tables, and navigation where applicable.

### 5. Govern evolution

- Add variants only when they are stable and justified by multiple use cases.
- Prefer additive API evolution over breaking changes when possible.
- Remove duplicate or overlapping components instead of letting the library fragment.
- Document usage guidance, anti-patterns, and migration notes for meaningful contract changes.

## Decision Rules

| Situation | Action |
| --- | --- |
| Consumers need many boolean props to shape the component | Re-evaluate the abstraction; composition or clearer variants may fit better. |
| A pattern is used only once or twice | Keep it local until the behavior proves stable. |
| Visual differences exist but semantics are shared | Use variants within one component family. |
| Behaviors differ materially | Split into separate components rather than overloading one API. |
| Consumers keep overriding internal styles heavily | The component contract is likely too rigid or too opinionated in the wrong place. |

## Quality Bar

- Component names should imply purpose and scope.
- APIs should be teachable from the type signature and a short usage note.
- Variants should feel intentional, not combinatorial.
- Accessibility should be built in, not delegated accidentally.
- Consumers should need fewer workarounds after adoption, not more.

## Avoid These Failure Modes

- Do not extract components that only share markup, not meaning.
- Do not let style props replace a coherent API.
- Do not mix product-specific logic into broadly shared primitives.
- Do not create near-duplicate components for minor stylistic differences.
- Do not hide important behavior behind undocumented defaults.

## References

- Component API and variant guidance: `references/component-api-playbook.md`
- Library review checklist: `references/component-library-checklist.md`

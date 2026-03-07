# Component API Playbook

## Component Categories

### Primitives

Low-level reusable building blocks such as:

- Button
- Input
- Dialog
- Tooltip
- Tabs

These should focus on core interaction and accessibility contracts.

### Composed Patterns

Reusable assemblies such as:

- Search bar with filters
- Empty state
- Command palette
- Sidebar navigation

These may encode stronger layout or workflow assumptions.

## API Rules

- Prefer semantic prop names over styling shortcuts.
- Prefer `variant`, `size`, and composition slots over many boolean toggles.
- Keep controlled and uncontrolled patterns explicit.
- Avoid props that combine multiple concerns in one option.

## Variant Rules

- Variants should represent stable roles, not temporary campaign styling.
- Keep the matrix small enough to reason about.
- If variants multiply quickly, split the component family.

## Documentation Rules

- Show intended usage.
- Show state behavior and accessibility expectations.
- Show when not to use the component.

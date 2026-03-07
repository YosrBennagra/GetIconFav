# Organization Patterns

## Feature-First

Use when teams deliver product workflows that cut across UI, API, and data layers.

Example:

```text
features/
  billing/
    components/
    server/
    schema/
    tests/
  onboarding/
    components/
    server/
    tests/
```

Benefits:

- Keeps related changes local.
- Clarifies ownership.
- Reduces cross-folder editing for one feature.

## Layer-First

Use for small, simple applications or libraries with one dominant abstraction.

Example:

```text
components/
services/
repositories/
lib/
```

Risks:

- Features get scattered across many folders.
- Domain ownership becomes implicit.

## Package-First

Use when parts of the system have separate release cadence, runtime, or ownership.

Example:

```text
apps/web
apps/admin
packages/ui
packages/domain
packages/config
```

Benefits:

- Stronger isolation.
- Clearer contracts.
- Better fit for monorepos.

## Hybrid Rules

- Choose one primary top-level pattern.
- Keep deviations explicit and rare.
- Introduce shared packages only when duplication cost is real and sustained.

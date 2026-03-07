# Pattern Selection Guide

## Start With the Smell, Not the Pattern

Map common smells to likely responses:

- Duplicated branching logic -> strategy, policy object, or better data modeling.
- External API differences leaking inward -> adapter.
- Complex coordination across multiple steps -> orchestrator or application service.
- Invalid object construction paths -> factory or builder.
- Tight coupling to infrastructure -> ports and adapters style boundaries.

## Selection Rules

- Prefer no pattern when straightforward code is clearer.
- Prefer composition when behavior varies.
- Prefer explicit data flow when indirection would hide the real logic.
- Prefer local refactors before architecture-wide framework changes.

## Warnings

- Base classes often centralize unrelated behavior.
- Generic managers and engines often hide missing domain concepts.
- Abstracting future possibilities that do not exist yet creates maintenance debt.

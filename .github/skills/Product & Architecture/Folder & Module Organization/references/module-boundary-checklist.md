# Module Boundary Checklist

## Public API Review

- What is the intended import path for consumers?
- Which exports are stable enough to support?
- Which files should remain internal only?

## Dependency Review

- Which modules may import this module?
- Which modules must this module avoid depending on?
- Are side effects or initialization order hidden in imports?

## Structure Smells

- `shared`, `core`, or `utils` contains product-specific business logic.
- A feature needs to import private files from another feature.
- Most files must update together, but they live in unrelated top-level folders.
- One module name is broad enough to hide many unrelated responsibilities.

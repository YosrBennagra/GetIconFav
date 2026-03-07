# Schema-First Playbook

## Source of Truth Rules

- Keep the contract in the schema first.
- Derive validation, docs, and generated artifacts from that source where practical.
- Review schema changes as API changes, not as documentation edits.

## Modeling Rules

- Make required versus optional explicit.
- Keep examples aligned with constraints.
- Use reusable components only when they improve comprehension.
- Define map-like and union-like structures intentionally.

## Evolution Rules

- Prefer additive changes for stable public contracts.
- Mark deprecated fields and behavior clearly.
- Treat renamed fields and semantic reinterpretation as breaking changes.

## Validation Rules

- Validate at the boundary.
- Keep request and response validation aligned with the schema.
- Map internal models into the contract rather than mutating the contract to fit internals.

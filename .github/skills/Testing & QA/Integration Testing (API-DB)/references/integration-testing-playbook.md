# Integration Testing Playbook

## Good Integration Targets

- Route or handler plus validation plus persistence.
- Service plus repository plus transaction behavior.
- Queue consumer plus storage side effects.
- Authorization checks at the server boundary.

## Environment Rules

- Use isolated and reproducible infrastructure.
- Reset or rollback state deterministically.
- Keep schema and migration state aligned with the code under test.
- Design for parallel execution if the suite will scale.

## Assertion Rules

- Assert returned responses or errors.
- Assert durable side effects where relevant.
- Assert constraint and transaction behavior explicitly when they matter.

## Scope Rules

- Keep browser workflows out of this layer.
- Keep pure branching logic out of this layer unless the real boundary is part of the risk.
- Stub only dependencies beyond the chosen integration surface.

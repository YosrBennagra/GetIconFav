# Test Data Playbook

## Data Shapes by Layer

- Unit: inline values or tiny builders.
- Integration: realistic relational factories or seeded state.
- E2E: scenario datasets that match user flows.

## Builder and Factory Rules

- Default to valid minimal objects.
- Expose clear overrides for meaningful variations.
- Keep impossible or invalid states explicit.

## Isolation Rules

- Prefer per-test ownership of created records.
- Clean up intentionally with rollback, teardown, or ephemeral environments.
- Design for parallel-safe execution.

## Privacy Rules

- Use synthetic or redacted data.
- Avoid production data copies unless heavily controlled.
- Treat example data as potentially sensitive if it reflects real users or secrets.

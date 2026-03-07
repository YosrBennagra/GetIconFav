# Unit Test Playbook

## Good Unit Test Targets

- Domain rules.
- Data transformations.
- State transitions.
- Validation logic.
- Formatting and parsing helpers.
- Small component logic when dependencies can be isolated cleanly.

## Assertion Rules

- Assert observable outputs.
- Assert meaningful side effects at the boundary.
- Avoid coupling to private internal call structure.

## Case Selection Rules

- Happy path.
- Boundary values.
- Invalid or rejected input.
- Meaningful branching differences.
- Regression cases for bugs that actually happened.

## Determinism Rules

- Freeze time or inject clocks.
- Control randomness.
- Avoid shared mutable fixtures across tests.
- Keep tests isolated and parallel-safe.

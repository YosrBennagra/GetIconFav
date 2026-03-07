# Refactoring Playbook

## Safe Sequence

1. Confirm the behavior that must remain.
2. Add or identify verification coverage.
3. Rename unclear concepts.
4. Isolate side effects and dependencies.
5. Extract or move logic in small steps.
6. Delete temporary compatibility code.

## Common Refactoring Triggers

- One function or class has multiple responsibilities.
- A change requires editing the same rule in several places.
- New features keep adding conditionals to the same block.
- Data shape and behavior ownership are unclear.
- Tests are hard to write because dependencies are tangled.

## Exit Criteria

- Fewer places to change the same behavior.
- Clearer ownership of rules.
- Smaller, more meaningful public APIs.
- Equivalent or better verification confidence.

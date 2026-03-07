# Mocking Playbook

## Double Selection

- Stub: fixed return values.
- Fake: lightweight working implementation.
- Spy: observe calls while preserving behavior where useful.
- Mock: explicit behavioral expectation at a boundary.

## Utility Types

- Builder or factory for domain objects.
- Render helper for component tests.
- Environment harness for config or globals.
- Clock or timer control.
- API or request helper for repeated setup.

## Design Rules

- Keep helpers close to the layer they support.
- Extract only after repetition proves value.
- Preserve explicitness in the test body.
- Keep fake contracts honest to the real interface.

## Warning Signs

- Tests assert mostly on mocks, not outcomes.
- Utilities hide more than they simplify.
- Fakes ignore important failure modes.
- Shared fixtures create accidental coupling between tests.

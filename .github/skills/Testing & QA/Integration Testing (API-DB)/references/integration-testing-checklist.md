# Integration Testing Checklist

## Boundary Review

- What real boundary is under test?
- Does this test prove something unit tests cannot?
- Are external dependencies stubbed only when outside scope?

## Environment Review

- Is setup reproducible?
- Is state reset or rollback deterministic?
- Is the suite parallel-safe?

## Assertion Review

- Are both returned outcomes and durable effects checked where needed?
- Are constraints or transaction semantics covered when relevant?
- Would failure point to a specific boundary rather than the whole system?

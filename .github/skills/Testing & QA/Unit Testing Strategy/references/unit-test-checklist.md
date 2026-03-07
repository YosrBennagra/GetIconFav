# Unit Test Checklist

## Boundary Review

- Is this truly unit-level logic?
- Are heavy dependencies kept outside the boundary?
- Could this be simpler as an integration test instead?

## Signal Review

- Does the test protect real behavior?
- Are assertions focused on outcomes, not internals?
- Are edge cases driven by actual risk?

## Quality Review

- Is the test deterministic?
- Is setup concise and readable?
- Would a harmless refactor break this test unnecessarily?

# E2E Checklist

## Flow Review

- Is this a real user-critical journey?
- Would lower-level tests miss this cross-stack regression?
- Is the scenario scope coherent and bounded?

## Stability Review

- Are selectors resilient?
- Are waits based on real completion signals?
- Is setup and cleanup deterministic?

## Maintenance Review

- Is the test redundant with lower layers?
- Will failure isolate the problem quickly?
- Is the runtime and flake risk justified by the value?

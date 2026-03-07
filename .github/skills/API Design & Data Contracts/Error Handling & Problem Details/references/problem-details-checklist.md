# Problem Details Checklist

## Status Review

- Does the HTTP status reflect the real failure class?
- Can the client tell whether the problem is client-fixable, retryable, or server-side?

## Contract Review

- Is `type` stable and documented?
- Are extension members consistent and useful?
- Are validation errors represented predictably?

## Safety Review

- Does the payload avoid leaking internals?
- Is retry guidance safe and accurate?
- Can operators correlate the failure without exposing sensitive data publicly?

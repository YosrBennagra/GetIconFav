# Concurrency Checklist

## Correctness Review

- What shared state is contested?
- What happens if two requests race?
- Is idempotency or deduplication required?

## Coordination Review

- Is the lock or transaction boundary minimal?
- Are optimistic conflicts handled clearly?
- Could retries amplify contention?

## Load Review

- Are queue limits and backpressure explicit?
- Is saturation observable?
- Does overload fail predictably?

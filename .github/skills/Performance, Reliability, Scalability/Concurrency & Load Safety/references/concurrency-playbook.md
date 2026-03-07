# Concurrency Playbook

## Common Risk Areas

- Hot rows or counters.
- Duplicate delivery or replay.
- Limited connection pools or worker slots.
- Shared caches and quotas.
- Burst-heavy write paths.

## Coordination Rules

- Use optimistic concurrency when conflicts are uncommon and safe to retry.
- Use stronger serialization when duplicate side effects are unacceptable.
- Keep lock scope narrow.
- Treat idempotency as part of concurrency safety when retries or duplicates are normal.

## Load Rules

- Bound queues.
- Apply backpressure or admission control.
- Measure saturation and contention directly.
- Prefer graceful rejection over total collapse.

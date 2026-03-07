# Idempotency Playbook

## Core Distinctions

- HTTP idempotent methods are not the whole story for application writes.
- A retriable mutation needs duplicate-intent handling at the application boundary.
- Idempotency prevents duplicate side effects; it does not create magical exactly-once guarantees.

## Key Design Rules

- Scope the key to the caller and operation semantics.
- Detect mismatched payload or intent under key reuse.
- Keep retention windows explicit and documented.
- Return stable replay behavior when the contract depends on it.

## Retry Rules

- Retry transient transport failures, not explicit business rejections.
- Use backoff and jitter.
- Bound retry attempts.
- Treat timeouts as unknown completion, not automatic failure.

## Conflict Rules

- If the same key maps to different intent, reject it.
- If the same operation already succeeded, replay or reference that result consistently.

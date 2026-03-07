---
name: idempotency-retries
description: 'Use when requests involve payment-like operations, write retries, duplicate submission handling, idempotency keys, safe retriable APIs, or protecting systems from repeated side effects. Design idempotent API operations and retry-safe clients: duplicate request handling, idempotency keys, conflict semantics, retry strategy, timeout recovery, and exactly-once illusions across distributed systems.'
---

# Idempotency & Retries

## Overview

Retries are normal in distributed systems; duplicate side effects are not.
Design mutating operations so clients can retry safely and servers can distinguish legitimate repetition from conflicting intent.

## Follow This Workflow

### 1. Identify retry and duplication risk

- User double-submits, mobile reconnects, gateway retries, worker retries, upstream timeouts, and webhook replays.
- Distinguish idempotent-by-HTTP-semantics operations from application-level duplicate side-effect protection.
- Identify which mutations create irreversible or costly side effects.

### 2. Choose the idempotency model

- Natural idempotency when repeating the same request is inherently safe.
- Client-supplied idempotency keys when duplicate write detection must survive transport uncertainty.
- Conflict or deduplication rules when two similar requests are not truly the same intent.

### 3. Define server behavior

- Bind idempotency to request identity intentionally: key, actor, route, payload fingerprint, or operation semantics as appropriate.
- Return a stable replayed result for the same accepted operation when the contract requires it.
- Reject key reuse when the payload or intent does not match the original request.
- Choose retention windows and storage boundaries deliberately.

### 4. Define client retry behavior

- Retry only when the operation and failure class justify it.
- Distinguish timeout uncertainty from explicit business rejection.
- Use bounded retries, backoff, and jitter for transport or transient failures.
- Keep clients from reusing keys across semantically different operations.

### 5. Re-check edge cases

- Partial execution and unknown completion after timeout.
- Concurrent duplicate requests.
- Async operations accepted but completed later.
- Expired idempotency records and late retries.

## Decision Rules

| Situation | Action |
| --- | --- |
| Mutation may be retried after timeout | Use an idempotency strategy rather than hoping the client guesses correctly. |
| Same key arrives with different payload or intent | Reject it as a conflict, not a replay. |
| Operation is naturally safe to repeat | Document the natural idempotency and keep retries bounded. |
| Side effect is costly or irreversible | Treat idempotency as a first-class contract requirement. |
| Client cannot tell whether the server completed work | Provide a replay-safe path or follow-up status retrieval model. |

## Quality Bar

- Server behavior on duplicate requests should be defined, not accidental.
- Retry strategy should match failure classes and business semantics.
- Key scope and retention should be explicit.
- Conflict handling should protect against semantic drift under reused keys.
- Clients should know when they may retry and when they must not.

## Avoid These Failure Modes

- Do not assume HTTP method semantics alone solve duplicate side effects.
- Do not accept the same idempotency key for different intent.
- Do not let retries run unbounded or without jitter on transient failures.
- Do not treat timeout ambiguity as proof the operation failed.
- Do not promise exactly-once behavior when the system only provides deduplicated or replay-safe behavior.

## References

- Retry-safe mutation guide: `references/idempotency-playbook.md`
- Idempotency review checklist: `references/idempotency-checklist.md`

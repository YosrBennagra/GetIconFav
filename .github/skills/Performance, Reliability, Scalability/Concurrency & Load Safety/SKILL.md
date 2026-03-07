---
name: concurrency-load-safety
description: 'Use when requests involve race conditions, load spikes, duplicate processing, hot rows, lock contention, or making systems behave safely under concurrent access. Design concurrency control and load safety for applications and services: contention management, idempotent writes, locks, optimistic concurrency, backpressure, queue depth, admission control, and shared resource protection under parallel traffic.'
---

# Concurrency & Load Safety

## Overview

Concurrency bugs usually appear as correctness failures first and performance failures second.
Design for parallel access, duplicate work, and bursty load explicitly so the system remains correct and stable when many requests or jobs arrive at once.

## Follow This Workflow

### 1. Identify shared state and hot paths

- Mutable records, counters, quotas, inventory, balances, locks, queues, and shared caches.
- Distinguish read contention from write contention.
- Identify which paths can tolerate eventual consistency and which require stronger coordination.

### 2. Choose the coordination model

- Optimistic concurrency when collisions are rare and retries are acceptable.
- Pessimistic locking or serialized execution when correctness requires exclusive access.
- Idempotent operations and deduplication when duplicate processing is likely.
- Admission control, rate limits, or backpressure when the issue is load safety rather than pure correctness.

### 3. Protect the write path

- Define transaction boundaries clearly.
- Keep critical sections short.
- Avoid wide locks that serialize unrelated work.
- Ensure retries and replays do not multiply side effects.

### 4. Control overload behavior

- Set concurrency limits, queue bounds, and load-shedding rules intentionally.
- Keep one saturated dependency from exhausting the whole service.
- Prefer predictable rejection or deferred processing over resource collapse.
- Measure queue depth, lock wait, saturation, and retry amplification.

### 5. Re-check recovery and observability

- Confirm operators can detect contention, backlog growth, and starvation.
- Confirm failed or rejected work has a clear recovery story.
- Confirm concurrency controls do not deadlock, starve, or silently corrupt correctness under stress.

## Decision Rules

| Situation | Action |
| --- | --- |
| Conflicts are infrequent and user retry is acceptable | Use optimistic concurrency with explicit conflict handling. |
| Shared state must never be double-consumed or double-applied | Use stronger coordination, serialization, or idempotent protection. |
| Traffic bursts can overwhelm finite resources | Apply backpressure, queue limits, or admission control deliberately. |
| One hot key or row dominates contention | Redesign partitioning, aggregation, or ownership rather than adding blind retries. |
| Rejected work can be deferred safely | Queue it or ask for retry-later instead of overcommitting the live path. |

## Quality Bar

- Correctness under parallel access should be explicit, not accidental.
- Load safety behavior should fail predictably before the system collapses.
- Critical sections and locks should be narrow and explainable.
- Metrics should reveal contention and saturation before user-facing failure becomes widespread.
- Retry and concurrency behavior should not compound each other into storms.

## Avoid These Failure Modes

- Do not assume low traffic means concurrency bugs are harmless.
- Do not retry conflicted or overloaded operations blindly.
- Do not use one global lock where resource-local coordination would work.
- Do not leave queue growth or contention invisible.
- Do not mix correctness coordination and throughput optimization without understanding the tradeoffs.

## References

- Concurrency and load-safety guide: `references/concurrency-playbook.md`
- Concurrency review checklist: `references/concurrency-checklist.md`

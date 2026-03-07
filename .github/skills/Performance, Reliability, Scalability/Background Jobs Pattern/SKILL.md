---
name: background-jobs-pattern
description: 'Use when requests involve deferred work, async processing, worker design, scheduled jobs, queue-backed workflows, or moving long-running or failure-prone work out of the request path. Design background job and asynchronous work patterns: enqueueing, job payload contracts, retries, scheduling, idempotency, worker isolation, visibility timeouts, and operational safety across queues and worker systems.'
---

# Background Jobs Pattern

## Overview

Background jobs exist to move deferred, slow, or failure-prone work out of synchronous request paths without losing control of correctness.
Design the queue, worker, retry, and visibility model intentionally so asynchronous work is observable, idempotent, and recoverable.

## Follow This Workflow

### 1. Confirm the work belongs off the request path

- Long-running tasks, retries against unstable dependencies, fan-out processing, notifications, imports, exports, media work, or scheduled maintenance.
- Keep user-facing requests responsible for enqueueing or status reporting, not for performing all the work directly.
- Do not move work into jobs merely to hide architectural confusion.

### 2. Define the job contract

- Use stable job names and payload shapes.
- Include only the data needed to perform or reconstruct the work safely.
- Prefer identifiers and fetch-on-consume when payloads would otherwise become huge or stale quickly.
- Keep tenant, actor, or correlation context explicit where it matters.

### 3. Design execution and retry behavior

- Make job handlers idempotent or duplicate-safe.
- Distinguish transient failures from permanent business rejections.
- Set retry count, delay, and backoff intentionally.
- Use dead-letter or failed-job handling where repeated failure needs explicit operator review.

### 4. Control worker safety

- Bound concurrency and job visibility timeouts appropriately.
- Keep one poison job from starving the whole worker fleet.
- Isolate high-cost or risky job types if they can dominate capacity.
- Ensure shutdown and redeploy behavior do not silently lose in-flight work.

### 5. Re-check observability and recovery

- Measure queue depth, job age, retry count, failure rate, and processing time.
- Support replay, manual repair, or requeue operations deliberately.
- Ensure operators can tell whether work is stuck, delayed, duplicated, or permanently failed.

## Decision Rules

| Situation | Action |
| --- | --- |
| Work is slow but user needs an immediate response | Enqueue and return a status or eventual completion path. |
| Job side effect is not safe to repeat | Add idempotency, deduplication, or stronger coordination before relying on retries. |
| Payload may become stale quickly | Pass identifiers and refetch current state at execution time. |
| One job class can exhaust worker capacity | Isolate queues, priorities, or worker pools. |
| Failures need human review after retry exhaustion | Route them to dead-letter handling or explicit operator workflow. |

## Quality Bar

- Job contracts should be stable and bounded.
- Retry behavior should reflect failure class and side-effect safety.
- Worker concurrency and visibility settings should protect both throughput and correctness.
- Queue health and backlog should be observable.
- Recovery paths should exist for stuck or failed jobs.

## Avoid These Failure Modes

- Do not enqueue work that still depends on synchronous request context staying alive.
- Do not pass giant stale payloads when identifiers would suffice.
- Do not rely on retries without idempotent handlers.
- Do not let one poisoned job block all progress.
- Do not hide queue backlog and failure states from operators.

## References

- Background job design guide: `references/background-jobs-playbook.md`
- Worker and queue review checklist: `references/background-jobs-checklist.md`

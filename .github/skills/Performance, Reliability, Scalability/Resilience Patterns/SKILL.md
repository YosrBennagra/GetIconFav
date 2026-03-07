---
name: resilience-patterns
description: 'Use when requests involve failure handling, dependency instability, partial outages, degraded modes, retry storms, or making systems continue to serve safely under stress and failure. Design resilience patterns for applications and services: timeouts, retries, backoff, fallbacks, circuit breakers, bulkheads, graceful degradation, and dependency isolation across synchronous and asynchronous flows.'
---

# Resilience Patterns

## Overview

Resilience is about containing failure and degrading safely, not pretending dependencies never fail.
Design timeouts, retries, fallbacks, and isolation boundaries intentionally so one unstable component does not turn into a full-system incident.

## Follow This Workflow

### 1. Identify failure boundaries

- External APIs, databases, queues, caches, auth providers, file stores, and internal services.
- Distinguish mandatory dependencies from optional enrichments or convenience features.
- Identify which user journeys and background tasks truly need the dependency to succeed.

### 2. Define failure behavior

- Set timeouts that match user or system expectations.
- Choose whether a given failure should fail fast, degrade gracefully, retry, or queue for later handling.
- Separate transient failures from permanent or business-level rejections.
- Keep synchronous and asynchronous failure handling distinct.

### 3. Apply containment patterns deliberately

- Use retries with backoff and jitter only for failures likely to recover.
- Use circuit breaking or dependency shedding when repeated failure would amplify load.
- Use bulkheads, queueing, or concurrency limits when one workload must not starve another.
- Use fallbacks only when the degraded result is still correct enough for the use case.

### 4. Design degraded modes

- Decide what the user or caller sees when optional dependencies fail.
- Keep partial success and retry-later paths explicit.
- Ensure compensating actions and data repair flows exist where eventual consistency is acceptable.

### 5. Re-check observability and recovery

- Measure timeout, retry, and fallback behavior distinctly.
- Avoid hidden resilience logic that masks failure without visibility.
- Confirm operators can tell when the system is degraded but still serving.
- Remove resilience mechanisms that create more load or complexity than they save.

## Decision Rules

| Situation | Action |
| --- | --- |
| Dependency is optional for the primary user goal | Degrade gracefully rather than failing the whole request. |
| Failure is likely transient | Retry with backoff and jitter, not immediate tight loops. |
| Dependency is repeatedly timing out under load | Use circuit breaking, shedding, or fail-fast behavior before retries make it worse. |
| Fallback would return misleading or unsafe data | Fail clearly instead of pretending success. |
| One workload can exhaust shared resources | Add isolation, concurrency limits, or bulkheads. |

## Quality Bar

- Timeout values should be intentional and explainable.
- Retry behavior should match failure classes and idempotency guarantees.
- Degraded behavior should remain truthful to users and callers.
- Isolation patterns should contain blast radius.
- Resilience mechanisms should be visible in metrics and logs.

## Avoid These Failure Modes

- Do not retry everything by default.
- Do not use fallbacks that silently return stale, partial, or wrong data without signaling it.
- Do not let one dependency’s slowness hold the entire request path hostage.
- Do not hide degraded mode so well that operators cannot detect it.
- Do not layer resilience primitives blindly until they conflict.

## References

- Resilience design guide: `references/resilience-playbook.md`
- Resilience review checklist: `references/resilience-checklist.md`

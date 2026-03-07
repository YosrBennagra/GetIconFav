# Resilience Playbook

## Core Patterns

- Timeouts.
- Retries with backoff and jitter.
- Circuit breaking.
- Bulkheads or workload isolation.
- Graceful degradation.
- Queue-and-retry for async work.

## Selection Rules

- Retry only transient, idempotent-safe work.
- Use fail-fast for hard failures or user paths that cannot tolerate delay.
- Use graceful degradation only when degraded output is still honest and useful.
- Use isolation when one workload can starve another.

## Visibility Rules

- Log and measure retries, fallbacks, and open-circuit states distinctly.
- Keep degraded mode visible to operators.
- Revisit resilience settings when they amplify incidents instead of containing them.

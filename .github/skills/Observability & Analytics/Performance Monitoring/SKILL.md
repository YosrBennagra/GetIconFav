---
name: performance-monitoring
description: 'Use when requests involve performance telemetry, Core Web Vitals, service latency, slow endpoints, bottleneck analysis, or building an observability strategy for performance rather than only logs and errors. Design performance monitoring for applications and services: latency objectives, throughput, saturation, user experience metrics, trace and metric coverage, regression detection, and bottleneck investigation across frontend and backend systems.'
---

# Performance Monitoring

## Overview

Performance monitoring should answer where time is spent, when performance regresses, and which users or services are affected.
Prefer a small set of meaningful service and user-experience metrics with enough breakdowns to explain changes rather than collecting everything and understanding nothing.

## Follow This Workflow

### 1. Define the performance model

- Identify critical user journeys, service endpoints, jobs, and background processes that matter to product outcomes.
- Choose latency, throughput, error, and saturation metrics appropriate to each surface.
- Define service-level objectives or practical thresholds where they are needed.

### 2. Instrument the right layers

- Frontend user experience metrics such as page responsiveness and rendering quality where relevant.
- Backend request, query, and job timing at actionable boundaries.
- Resource signals such as CPU, memory, queue depth, concurrency, and connection pressure.
- Keep trace, metric, and log identifiers aligned where cross-navigation matters.

### 3. Break down the bottlenecks

- Segment by route, operation, region, tenant, release, dependency, or feature flag where it materially improves diagnosis.
- Distinguish server latency from client rendering and network time.
- Track p95/p99 or equivalent tail behavior where median hides user pain.

### 4. Align alerts and reviews

- Alert on sustained degradation tied to user or business impact.
- Keep dashboards focused on the handful of views engineers actually use during diagnosis.
- Review changes around releases, migrations, large feature flags, and infrastructure shifts.
- Tie performance work to budgets or objectives where possible.

### 5. Re-check coverage and cost

- Remove low-value metrics that nobody uses.
- Add instrumentation where diagnosis still requires guesswork.
- Keep cardinality and telemetry cost within reason.
- Ensure the monitoring strategy survives architecture changes.

## Decision Rules

| Situation | Action |
| --- | --- |
| Median looks fine but users still report slowness | Inspect tail latency and segmented breakdowns. |
| One route or operation dominates cost | Break performance monitoring down by endpoint or flow instead of one service-wide metric. |
| Alert noise is high but nobody acts | Tighten thresholds or focus on impact-bearing indicators. |
| Frontend and backend both contribute to latency | Instrument both and correlate release context rather than blaming one layer by default. |
| Metric cardinality is exploding | Reduce labels or move high-detail context to traces or logs. |

## Quality Bar

- Metrics should reflect user or system experience meaningfully.
- Thresholds should be grounded enough to guide action.
- Dashboards should support diagnosis, not just decoration.
- Tail behavior and breakdowns should expose hidden regressions.
- Performance telemetry should stay affordable and maintainable.

## Avoid These Failure Modes

- Do not monitor only averages when user pain lives in the tail.
- Do not emit every possible label until telemetry becomes too expensive to trust.
- Do not page on transient noise with no business impact.
- Do not rely on logs alone for performance diagnosis.
- Do not let dashboards multiply faster than anyone can use them.

## References

- Performance telemetry guide: `references/performance-monitoring-playbook.md`
- Performance monitoring review checklist: `references/performance-monitoring-checklist.md`

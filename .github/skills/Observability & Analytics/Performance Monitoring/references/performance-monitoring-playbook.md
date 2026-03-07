# Performance Monitoring Playbook

## Core Metric Families

- Latency.
- Throughput.
- Error rate.
- Saturation or resource pressure.
- User-experience metrics where relevant.

## Breakdown Rules

- Segment by route, endpoint, job, feature, region, or dependency when that improves diagnosis materially.
- Track tail latency where averages are misleading.
- Keep release or deployment context available for regression analysis.

## Alerting Rules

- Alert on sustained, impactful degradation.
- Keep dashboards operational rather than decorative.
- Tie metrics to budgets or objectives where possible.

## Cost Rules

- Watch label cardinality.
- Remove unused metrics.
- Move very high-detail context to traces or logs when metrics become too expensive.

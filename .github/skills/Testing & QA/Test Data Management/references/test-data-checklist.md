# Test Data Checklist

## Data Review

- Is the data strategy appropriate for the test layer?
- Are defaults valid and minimal?
- Are edge-case variations explicit?

## Isolation Review

- Can tests run in any order?
- Is cleanup deterministic?
- Is parallel execution safe?

## Maintenance Review

- Will schema or contract changes be easy to propagate?
- Are fixtures or seeds stale or oversized?
- Is any sample data carrying privacy risk?

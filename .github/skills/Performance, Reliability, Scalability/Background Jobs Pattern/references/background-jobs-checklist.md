# Background Jobs Checklist

## Scope Review

- Does this work really belong off the request path?
- Is the job contract stable and bounded?
- Can payload freshness be preserved safely?

## Execution Review

- Are handlers idempotent?
- Are retries appropriate for the failure class?
- Is dead-letter or exhausted-failure handling defined?

## Operations Review

- Are queue depth and job age observable?
- Is worker concurrency bounded?
- Can operators recover stuck or failed work?

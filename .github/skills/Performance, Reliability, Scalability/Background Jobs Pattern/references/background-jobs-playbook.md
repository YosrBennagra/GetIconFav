# Background Jobs Playbook

## Good Job Candidates

- Notifications.
- Imports and exports.
- Media processing.
- Retry-prone external integrations.
- Scheduled maintenance and backfills.

## Contract Rules

- Use stable job names.
- Keep payloads bounded.
- Prefer identifiers over large snapshots when freshness matters.
- Carry correlation and tenant context when needed.

## Execution Rules

- Make handlers idempotent.
- Separate transient and permanent failures.
- Use bounded retries with backoff.
- Provide dead-letter or failed-job review paths.

## Worker Rules

- Bound concurrency.
- Keep visibility timeouts intentional.
- Isolate high-cost or noisy job classes when needed.
- Make shutdown and redeploy behavior safe for in-flight work.

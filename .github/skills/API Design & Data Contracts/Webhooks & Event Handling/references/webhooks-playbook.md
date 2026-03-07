# Webhooks Playbook

## Event Contract Rules

- Include a stable event identifier.
- Include event type and occurrence time.
- Keep payload meaning stable and documented.
- Prefer resource references over huge snapshots unless snapshots are required.

## Delivery Rules

- Assume at-least-once delivery.
- Document retry cadence and disablement policy.
- Be explicit about ordering guarantees or the lack of them.

## Security Rules

- Sign deliveries.
- Include timestamp or replay-verification context where useful.
- Rotate webhook secrets or keys safely.
- Verify callback destination registration before use.

## Consumer Rules

- Acknowledge quickly.
- Process asynchronously when possible.
- Deduplicate by event ID.
- Treat retries and replays as normal operating conditions.

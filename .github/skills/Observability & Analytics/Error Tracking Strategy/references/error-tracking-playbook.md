# Error Tracking Playbook

## Capture Rules

- Capture unhandled failures.
- Capture handled but user-impacting failures.
- Keep validation and expected business rejections out unless they matter operationally.
- Avoid duplicate capture across layers.

## Context Rules

- Attach release, environment, route, service, and safe user or tenant context.
- Include request or job identifiers when useful.
- Keep privacy and redaction boundaries explicit.

## Grouping Rules

- Tune fingerprinting when default grouping is poor.
- Separate noisy third-party failures from core product issues.
- Keep cancellation and expected abort patterns out of incident channels.

## Triage Rules

- Alert on impact, not raw volume alone.
- Tie spikes to release boundaries.
- Route ownership clearly and reduce chronic noise continuously.

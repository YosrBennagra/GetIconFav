# Operational Readiness Playbook

## Core Readiness Areas

- Startup behavior.
- Readiness and health signaling.
- Graceful shutdown.
- Restart policy.
- Logging and diagnostics.
- Recovery expectations.

## Health Rules

- Use healthchecks that reflect service usefulness, not just a running process.
- Distinguish startup delay from unhealthy steady state where needed.
- Keep dependency-sensitive readiness explicit.

## Recovery Rules

- Know when automatic restart helps and when it hides misconfiguration.
- Define backup and restore posture for stateful services.
- Keep external dependency assumptions visible.

## Diagnostics Rules

- Ensure common failures leave enough logs or signals to debug.
- Make readiness, startup, and fatal-config failures easy to distinguish.
- Keep operator-facing behavior predictable under restart and shutdown events.

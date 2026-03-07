# Compose Environments Playbook

## Core Structure

- Base compose file for shared services.
- Profiles or overrides for optional or environment-specific services.
- Explicit ports, volumes, and networks.
- Healthchecks where true readiness matters.

## Layering Rules

- Keep local-only behavior out of CI unless required.
- Scope environment variables per service.
- Use profiles or override files for optional tooling and variants.
- Keep secrets and convenience defaults distinct.

## State Rules

- Use named volumes when persistence matters.
- Use ephemeral storage when deterministic resets matter more.
- Keep reset and cleanup workflows explicit.

## Dependency Rules

- Startup order is not enough when services need readiness.
- Prefer health-aware dependency handling when supported by the workflow.
- Keep service contracts clear enough that stale state and port conflicts are easy to debug.

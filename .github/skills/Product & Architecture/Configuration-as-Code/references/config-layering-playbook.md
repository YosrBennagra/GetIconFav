# Config Layering Playbook

## Common Layers

Use only the layers you need, but define the precedence clearly:

1. Code defaults for safe non-secret values.
2. Local developer overrides.
3. Environment-specific deployment values.
4. Secret injection from the deployment platform or secret manager.
5. Feature flags or operator controls for dynamic behavior.

## Ownership Rules

- Code defaults belong to the application team.
- Deployment values belong to the owning service or platform team.
- Secrets belong in a secret manager or deployment environment, not in source files.
- Feature flags need explicit product or engineering ownership and expiry criteria.

## Environment Guidance

- Local should optimize for safe setup and clarity.
- CI should validate required values and prevent drift.
- Staging should resemble production where meaningful.
- Production should avoid fallback behavior that hides misconfiguration.

## Retirement Rules

- Remove unused keys from code and examples.
- Announce contract changes when operational teams are affected.
- Migrate names deliberately rather than supporting aliases forever.

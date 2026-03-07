# Rate Limiting Playbook

## Common Dimensions

- IP address.
- User or account ID.
- API key or token.
- Tenant or organization.
- Route or operation type.

## Sensitive Flow Guidance

- Apply stronger controls to login, password reset, signup, and MFA verification.
- Avoid revealing whether an account or email exists through limit behavior.
- Use progressive friction when attacks intensify.

## Response Guidance

- Give useful retry signals where safe.
- Keep authentication errors generic enough to avoid enumeration.
- Log and monitor spikes, repeated breaches, and distributed patterns.

## Tuning Rules

- Balance burst and sustained limits.
- Re-check false positives for shared or mobile IP environments.
- Keep privileged or expensive operations on separate stricter controls.

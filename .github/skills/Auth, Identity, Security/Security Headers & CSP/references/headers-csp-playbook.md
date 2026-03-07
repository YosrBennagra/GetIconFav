# Headers and CSP Playbook

## Core Header Areas

- CSP.
- HSTS or equivalent transport hardening where HTTPS is authoritative.
- Framing controls.
- Referrer policy.
- Permissions policy.

## CSP Design Rules

- Start from the actual resource graph.
- Prefer nonces or hashes to broad inline allowances.
- Keep directives narrow by resource type.
- Use report-only during discovery if needed, then move toward enforcement.

## Exception Rules

- Document every third-party origin and why it exists.
- Minimize wildcard or unsafe directives.
- Revisit exceptions whenever assets or vendors change.

## Environment Rules

- Account for staging, preview, and callback hosts.
- Ensure auth and payment flows still function under the intended policy.
- Keep policy differences between environments explicit.

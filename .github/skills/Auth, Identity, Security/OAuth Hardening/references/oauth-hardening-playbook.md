# OAuth Hardening Playbook

## Core Protections

- Explicit redirect URI control.
- State and CSRF protection.
- PKCE and nonce where the flow requires them.
- Minimal scopes.
- Safe token storage and handling.

## Provider Mapping Rules

- Map upstream profile fields into internal claims deliberately.
- Do not assume provider email or profile attributes fully determine local authorization.
- Treat account linking as a separate security decision.

## Token Handling Rules

- Keep tokens server-side unless the client truly needs them.
- Avoid logging sensitive token material.
- Rotate and revoke where the provider and product model require it.

## Redirect Rules

- Allow only trusted post-login destinations.
- Reject open-ended external redirect targets.
- Keep callback error handling explicit and reviewable.

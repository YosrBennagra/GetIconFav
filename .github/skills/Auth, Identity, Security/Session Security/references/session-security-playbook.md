# Session Security Playbook

## Core Controls

- Secure cookie settings.
- Idle timeout.
- Absolute timeout.
- Session renewal or rotation.
- Real invalidation on logout and credential change.

## Lifecycle Guidance

- Re-issue session state on sign-in and privilege elevation.
- Invalidate affected sessions after password reset or account compromise.
- Keep renewal bounded so convenience does not become permanent trust.

## High-Risk Action Guidance

- Require fresh auth or step-up checks for sensitive operations.
- Do not assume a valid session is always sufficiently recent for privileged actions.

## UX Guidance

- Handle expiry and revocation clearly.
- Support device or session management when the product risk justifies it.
- Avoid silent failures where users think they are still authenticated but the server disagrees.

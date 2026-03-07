# RBAC Playbook

## Core Model

- Actor: who is requesting access.
- Resource: what is being accessed.
- Action: what they want to do.
- Scope: where the permission applies.

## Role Design Rules

- Roles should bundle common responsibilities.
- Permissions should express the actual allowed actions.
- Tenant or organization scope should be explicit when relevant.
- Ownership and admin rights should not be conflated by default.

## Enforcement Rules

- Enforce on the server where data or mutations happen.
- Keep policy logic centralized enough to review.
- Use UI gating only to improve usability.

## Sensitive Cases

- Impersonation.
- Bulk destructive actions.
- Export and reporting access.
- Cross-tenant reads or writes.

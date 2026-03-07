---
name: rbac-permissions
description: 'Use when requests involve RBAC, authorization rules, admin features, resource access control, permission modeling, or separating identity from what authenticated users are actually allowed to do. Design and enforce role-based access control and permission models for applications: roles, permissions, scopes, tenancy boundaries, policy checks, privileged actions, and authorization review.'
---

# RBAC-Permissions

## Overview

Authentication proves identity; authorization decides what that identity may do.
Design roles and permissions from resource boundaries and business rules, not from UI menus alone.

## Follow This Workflow

### 1. Model the authorization domain

- Identify actors, resources, actions, and tenancy or organization boundaries.
- Separate global roles from resource-scoped or tenant-scoped permissions.
- Define privileged and high-risk actions explicitly.

### 2. Choose the permission model

- Use roles for common bundles of access.
- Use explicit permissions or capabilities when roles alone are too coarse.
- Keep ownership, admin, operator, support, and auditor semantics distinct when they differ materially.
- Avoid assuming one role fits every scope.

### 3. Enforce at the right boundary

- Check authorization on the server where resources are read or mutated.
- Use UI gating only as a convenience, never as the primary control.
- Centralize policy decisions enough to review them, but keep them close enough to the owning domain to stay accurate.

### 4. Handle lifecycle and audit concerns

- Define how roles are assigned, changed, revoked, and inherited.
- Ensure privilege changes take effect promptly.
- Record or expose audit-relevant authorization events when the product risk requires it.
- Review support or emergency-access paths separately from normal admin privileges.

### 5. Re-check edge cases

- Cross-tenant access.
- Resource ownership transfer.
- Soft-deleted or archived resources.
- Bulk operations, impersonation, exports, and high-impact destructive actions.

## Decision Rules

| Situation | Action |
| --- | --- |
| Role names are becoming overloaded | Split by scope or permission bundle rather than adding exceptions. |
| Access depends on resource state and ownership | Use policy checks, not role labels alone. |
| UI hides an action from a user | Still enforce the same rule on the server. |
| Support staff need exceptional access | Model and audit it explicitly rather than smuggling it into admin roles. |
| Multi-tenant boundaries exist | Treat tenant scope as a first-class authorization constraint. |

## Quality Bar

- Roles should map to meaningful operational responsibilities.
- Permission checks should be consistent across read, write, and admin paths.
- Authorization logic should be reviewable and testable.
- Scope and tenancy should be explicit in the model.
- Privileged actions should be harder to misuse than normal actions.

## Avoid These Failure Modes

- Do not confuse authentication with authorization.
- Do not hard-code scattered role string checks throughout the codebase.
- Do not let UI visibility stand in for enforcement.
- Do not overload `admin` to mean every exceptional power.
- Do not ignore resource ownership or tenant boundaries because the first release is small.

## References

- Permission model guidance: `references/rbac-playbook.md`
- Authorization review checklist: `references/rbac-checklist.md`

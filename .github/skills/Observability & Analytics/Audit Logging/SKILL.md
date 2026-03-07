---
name: audit-logging
description: 'Use when requests involve audit trails, privileged action recording, compliance evidence, admin activity logs, change history, or distinguishing audit events from ordinary application logs. Design and operate audit logging for security- and compliance-relevant events: actor attribution, action recording, target resources, before-and-after state summaries, tamper resistance, retention, and privacy boundaries.'
---

# Audit Logging

## Overview

Audit logs are accountability records for significant actions, not verbose application diagnostics.
Design them to answer who did what, to which resource, when, and with what outcome, while protecting integrity, privacy, and retention requirements.

## Follow This Workflow

### 1. Define the audit scope

- Identify actions that require durable accountability: sign-in changes, privilege changes, exports, destructive operations, financial or policy-sensitive updates, and support impersonation.
- Distinguish audit events from normal operational logs and business analytics.
- Define which actors matter: users, admins, service accounts, background jobs, or automated systems.

### 2. Design the audit record

- Capture actor, action, target resource, timestamp, source context, and outcome.
- Include enough change summary to reconstruct what happened without storing unnecessary sensitive state.
- Record reason, request origin, tenant scope, or approval context when the domain requires it.
- Keep event names and categories stable enough for investigations and compliance workflows.

### 3. Protect integrity and access

- Restrict who can read, export, or delete audit records.
- Prevent normal application users from mutating audit history.
- Keep write paths append-oriented where possible.
- Make tampering or suspicious gaps visible to operators.

### 4. Align privacy and retention

- Keep only the data needed for accountability and investigation.
- Avoid storing raw secrets, full tokens, or unnecessary personal data.
- Define retention and deletion policy intentionally, especially when audit needs and privacy rules interact.
- Handle tenant or customer export needs deliberately.

### 5. Re-check operational usefulness

- Ensure the audit trail supports incident response, support review, and compliance evidence.
- Make filters and query dimensions predictable.
- Verify important privileged actions cannot bypass the audit path silently.

## Decision Rules

| Situation | Action |
| --- | --- |
| Action changes permissions, identity, money, policy, or durable records | Audit it explicitly. |
| Ordinary noisy operational event occurs | Keep it in structured logs, not the audit trail. |
| Audit event would expose too much sensitive data | Store a bounded summary or references instead of raw values. |
| Background job acts on behalf of a user or system | Record both the acting system and the initiating context when available. |
| Retention requirements conflict with privacy goals | Define a minimal retained record and documented retention policy deliberately. |

## Quality Bar

- Audit records should support accountability and investigation.
- Actor, action, target, time, and outcome should be reconstructible reliably.
- Privileged and sensitive actions should not bypass audit capture.
- Integrity and access controls should be stronger than ordinary log access.
- Retention and privacy treatment should be explicit and reviewable.

## Avoid These Failure Modes

- Do not treat general application logs as a substitute for an audit trail.
- Do not store full secrets, tokens, or excessive PII in audit records.
- Do not allow routine mutation or deletion of audit events.
- Do not omit automated or support-driven privileged actions because no end-user clicked a button.
- Do not build an audit log so noisy that important actions disappear inside it.

## References

- Audit logging design guide: `references/audit-logging-playbook.md`
- Audit trail review checklist: `references/audit-logging-checklist.md`

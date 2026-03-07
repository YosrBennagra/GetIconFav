---
name: data-retention-deletion
description: 'Use when requests involve retention policies, purge jobs, account deletion flows, storage limitation, records cleanup, or making data lifecycle rules enforceable in code and operations. Define and operationalize data retention and deletion basics for applications and platforms: data inventories, retention schedules, deletion triggers, legal holds, backup constraints, derived data handling, and verification.'
---

# Data Retention & Deletion

## Overview

Retention should be intentional, justified, and technically enforceable.
Prefer explicit lifecycle rules for each meaningful data class so teams keep data only as long as needed, can delete it predictably, and can explain exceptions such as legal holds, billing records, backups, or security investigations.

## Follow This Workflow

### 1. Inventory the data classes

- Identify user data, account records, content, analytics, support data, security logs, billing records, backups, caches, and derived datasets.
- Define system-of-record locations and secondary copies.
- Distinguish personal data from operational metadata that may still become identifying in context.

### 2. Define retention rules and triggers

- Assign a retention reason to each data class: service delivery, security, finance, compliance, product operations, or user expectation.
- Define when the clock starts, such as account closure, ticket resolution, inactivity, event time, or document replacement.
- Keep exceptions explicit rather than hidden in implementation details.

### 3. Design deletion behavior end to end

- Map primary stores, replicas, search indexes, caches, exports, analytics sinks, and background jobs.
- Decide what is hard-deleted, anonymized, aggregated, or retained under exception.
- Handle soft delete carefully so it does not become indefinite retention by accident.
- Document backup and restore realities honestly.

### 4. Implement enforcement and guardrails

- Use scheduled purge jobs, TTLs, archive transitions, or workflow triggers where appropriate.
- Support legal holds, security investigations, and billing record exceptions with explicit controls.
- Make deletion behavior idempotent and observable.
- Ensure new features inherit or declare retention rules before launch.

### 5. Verify and review

- Test account deletion and record purge paths against real downstream dependencies.
- Confirm exceptions are limited and auditable.
- Revisit schedules when data uses, laws, or business models change.

## Decision Rules

| Situation | Action |
| --- | --- |
| Data has no clear purpose or retention basis | Do not keep it by default; define or remove it. |
| A user-facing deletion promise conflicts with billing, security, or legal retention needs | Keep the exception explicit and scoped rather than silently ignoring deletion. |
| Data exists in indexes, caches, exports, or analytics copies | Treat those as part of the lifecycle, not as out-of-scope leftovers. |
| Soft delete is used for operational rollback | Add a bounded purge deadline and ownership. |
| Backups cannot be selectively edited | Document the recovery-only constraint and prevent normal use of deleted records after primary purge. |

## Quality Bar

- Every meaningful data class should have a documented lifecycle.
- Deletion requests should result in predictable, testable system behavior.
- Exceptions should be narrow, justified, and visible.
- Backup realities should be explained without overstating deletion capabilities.
- Retention policy should be enforceable in operations, not just stated in policy text.

## Avoid These Failure Modes

- Do not keep data indefinitely because no owner defined a retention schedule.
- Do not treat soft delete as a complete deletion strategy.
- Do not forget secondary stores such as analytics exports, search indexes, or object storage copies.
- Do not promise immediate universal erasure when backups and legal holds make that false.
- Do not let one-off operational exceptions become permanent retention rules.

## References

- Retention lifecycle guide: `references/retention-playbook.md`
- Retention and deletion checklist: `references/retention-checklist.md`

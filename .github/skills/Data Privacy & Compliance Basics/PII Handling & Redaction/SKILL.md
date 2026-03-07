---
name: pii-handling-redaction
description: 'Use when requests involve PII classification, log or telemetry safety, data minimization, redaction rules, support tooling exposure, or designing systems that reduce unnecessary disclosure of personal data. Handle personally identifiable information safely across application, API, storage, support, and observability surfaces: identification, minimization, masking, redaction, pseudonymization, and controlled access.'
---

# PII Handling & Redaction

## Overview

Personal data handling should minimize exposure before it needs remediation.
Prefer data minimization, scoped access, and safe defaults so applications, logs, support tools, and analytics flows avoid unnecessary disclosure and only reveal what is needed for the task at hand.

## Follow This Workflow

### 1. Identify sensitive data surfaces

- Map where personal data enters, moves, is stored, and is displayed.
- Include forms, APIs, admin tools, logs, traces, events, exports, support tooling, and third-party integrations.
- Distinguish common identifiers from sensitive or high-impact categories that need tighter handling.

### 2. Minimize collection and exposure

- Only collect fields needed for the product or process.
- Avoid duplicating personal data into many systems for convenience.
- Limit UI exposure to the least detail needed for the actor and task.
- Prefer derived or tokenized identifiers over raw personal values where practical.

### 3. Define masking, redaction, and pseudonymization rules

- Decide which fields are fully hidden, partially masked, hashed, tokenized, or allowed in clear form.
- Apply the rules consistently across logs, analytics, customer support, and error reporting.
- Keep raw-value access behind explicit roles and justified workflows.
- Treat free-text inputs as high-risk because users may submit sensitive data unexpectedly.

### 4. Enforce safe handling in code and operations

- Add logging and telemetry guards that prevent raw PII from being emitted casually.
- Restrict export paths, debugging tools, and admin panels.
- Use secure transport and storage controls, but do not rely on encryption alone as a reason to over-collect.
- Review third-party processors and integrations for data minimization and exposure risk.

### 5. Verify and respond

- Test representative events and support workflows for leakage.
- Review incidents and near misses to refine redaction rules.
- Keep data maps current as product flows change.

## Decision Rules

| Situation | Action |
| --- | --- |
| Field is not required for the user value or operational need | Do not collect it. |
| Operational staff need some context but not the full value | Mask or pseudonymize the field rather than exposing raw data. |
| Logs or analytics would capture free-form user input | Default to omission, structured summaries, or strong redaction. |
| Third-party integration needs only one identifier or status | Send the minimum dataset rather than full record payloads. |
| A workflow requires temporary raw-value access | Gate it with role checks, purpose, and auditability. |

## Quality Bar

- Data maps should make the main personal-data flows understandable.
- Redaction and masking rules should be explicit for high-risk surfaces.
- Logs, traces, and support tools should not expose raw personal data by default.
- Access to raw values should be limited and intentional.
- Privacy controls should reduce exposure, not just detect it after the fact.

## Avoid These Failure Modes

- Do not log raw emails, tokens, addresses, IDs, or free-text form content by default.
- Do not copy PII into analytics, search, or support systems without a defined need.
- Do not assume encryption at rest solves overexposure in tooling or logs.
- Do not rely on ad hoc manual masking by engineers or support staff.
- Do not ignore quasi-identifiers that become identifying when combined.

## References

- PII handling guide: `references/pii-playbook.md`
- PII review checklist: `references/pii-checklist.md`

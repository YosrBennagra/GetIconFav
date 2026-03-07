---
name: error-handling-problem-details
description: 'Use when requests involve API error design, RFC 9457 Problem Details, client-facing failures, validation error contracts, or making error handling consistent and debuggable across an API surface. Design machine-readable API error contracts using HTTP semantics and Problem Details: stable error types, status mapping, field-level validation errors, retry signals, and operationally useful error responses.'
---

# Error Handling & Problem Details

## Overview

Errors are part of the public contract and deserve the same design discipline as successful responses.
Prefer machine-readable, stable error shapes grounded in HTTP semantics and Problem Details so clients can branch, display, retry, and log intelligently.

## Follow This Workflow

### 1. Classify failure modes

- Validation and parsing errors.
- Authentication and authorization failures.
- Missing resources and state conflicts.
- Rate limits, upstream dependency failures, and internal errors.
- Retryable versus non-retryable outcomes.

### 2. Map them to HTTP semantics

- Use status codes that reflect the transport-level outcome accurately.
- Keep business or domain-specific distinctions inside the documented error contract, not by inventing random status codes.
- Distinguish client-fixable errors from server-side failures clearly.

### 3. Use Problem Details intentionally

- Define stable `type` identifiers for meaningful error classes.
- Keep `title`, `status`, `detail`, and `instance` consistent with their intended roles.
- Add extension members for domain-specific or field-level context only when they help clients act correctly.
- Keep extension naming stable and documented.

### 4. Design validation and conflict errors well

- Represent field-level issues in a predictable extension structure.
- Distinguish malformed payloads from semantically invalid business requests.
- Include retry or remediation guidance only when it is meaningful and safe.

### 5. Review security and operability

- Avoid leaking internals, stack traces, secret values, or sensitive identifiers.
- Preserve enough stable detail for clients, logs, and support workflows.
- Keep correlation identifiers and trace links out of the core contract unless deliberately standardized.

## Decision Rules

| Situation | Action |
| --- | --- |
| Client must branch on error meaning | Use a stable Problem Details `type` and documented extensions. |
| Validation fails on specific fields | Return a consistent field-error extension structure. |
| Internal failure occurs | Keep client detail safe and general, log the full operational detail elsewhere. |
| Retry may succeed later | Use an appropriate status and include retry-relevant guidance or headers when safe. |
| Multiple endpoints share the same failure class | Reuse one error type instead of inventing per-endpoint variants. |

## Quality Bar

- Error contracts should be as stable and documented as success contracts.
- Status codes should align with the failure class.
- Problem Details fields should be used consistently.
- Extensions should help clients recover or display meaningfully.
- Sensitive internals should remain out of public error payloads.

## Avoid These Failure Modes

- Do not return ad hoc strings or inconsistent error objects across endpoints.
- Do not overload one generic error type for unrelated failures.
- Do not expose stack traces, database errors, or secret-bearing context publicly.
- Do not encode retryability ambiguously.
- Do not drift away from Problem Details semantics while claiming to use it.

## References

- Problem Details design guide: `references/problem-details-playbook.md`
- Error contract review checklist: `references/problem-details-checklist.md`

---
name: structured-logging
description: 'Use when requests involve logging strategy, log schema design, JSON logs, correlation and trace context, log noise reduction, or making logs operationally useful for debugging and analytics. Design and implement structured logging for applications and services: event naming, field conventions, correlation identifiers, severity levels, sampling, redaction, and log pipeline readiness across HTTP, workers, background jobs, and infrastructure boundaries.'
---

# Structured Logging

## Overview

Logs should be machine-readable operational signals, not formatted diary entries.
Prefer structured events with stable field names and correlation context so logs can support debugging, incident response, and downstream analytics without brittle parsing.

## Follow This Workflow

### 1. Define the logging purpose

- Identify what the logs must support: debugging, incident response, audit support, operations, analytics, or security detection.
- Distinguish application events, infrastructure signals, access logs, and audit trails.
- Keep the logging surface aligned with the operational questions teams actually need to answer.

### 2. Design the event schema

- Use stable event names and severity levels.
- Standardize common fields such as timestamp, service, environment, component, request or job identifiers, actor or subject context, and outcome.
- Keep contextual payloads predictable and bounded.
- Prefer structured JSON or equivalent machine-readable output.

### 3. Add correlation and context

- Propagate request IDs, trace IDs, job IDs, tenant identifiers, or session context where they materially improve diagnosis.
- Include enough domain context to explain the event without duplicating entire payloads.
- Keep cross-service field naming consistent enough to query and join meaningfully.

### 4. Control noise, cost, and safety

- Log at the right severity and cardinality.
- Avoid large payload dumps and repeated duplicate logs.
- Redact or omit secrets, PII, tokens, and sensitive internal state.
- Sample noisy low-value logs deliberately rather than dropping high-value ones accidentally.

### 5. Re-check operational value

- Ensure important failures are logged once with enough context.
- Ensure normal successful flows are visible enough for trend analysis without drowning the signal.
- Keep log schema changes visible when dashboards, alerts, or queries depend on them.

## Decision Rules

| Situation | Action |
| --- | --- |
| Event must be searchable or aggregated | Use structured fields rather than formatted strings. |
| Failure spans multiple services or async hops | Propagate correlation IDs and shared context. |
| Payload contains sensitive or high-cardinality data | Redact, hash, summarize, or omit it. |
| Log volume is high but value is low | Reduce level, sample, or consolidate events deliberately. |
| Same condition is logged in many layers | Keep the most actionable boundary log and remove duplicates. |

## Quality Bar

- Event names and fields should be stable enough for queries and dashboards.
- Logs should answer operational questions without requiring source-code archaeology.
- Correlation data should survive across major request and job boundaries.
- Sensitive data should not appear in logs casually.
- Logging strategy should balance signal, cost, and maintainability.

## Avoid These Failure Modes

- Do not rely on free-form strings as the primary contract.
- Do not log secrets, credentials, tokens, or raw personal data by default.
- Do not emit duplicate error logs at every layer of the same failure path.
- Do not let field names drift across services without reason.
- Do not treat debug-level verbosity as the only way to gain observability.

## References

- Structured event design guide: `references/structured-logging-playbook.md`
- Log schema review checklist: `references/structured-logging-checklist.md`

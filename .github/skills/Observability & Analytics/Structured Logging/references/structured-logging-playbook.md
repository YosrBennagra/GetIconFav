# Structured Logging Playbook

## Core Event Fields

- Timestamp.
- Severity.
- Event name.
- Service and environment.
- Request, trace, or job identifiers.
- Actor or subject context when relevant.
- Outcome or status.

## Schema Rules

- Keep field names stable.
- Use bounded contextual payloads.
- Prefer explicit domain fields over encoded text blobs.
- Distinguish application logs from audit and access logs.

## Safety Rules

- Redact or omit secrets and sensitive values.
- Avoid huge payload dumps.
- Treat high-cardinality fields carefully.

## Signal Rules

- Log once at the most actionable boundary.
- Keep enough success-path visibility for trend analysis.
- Use severity and sampling intentionally.

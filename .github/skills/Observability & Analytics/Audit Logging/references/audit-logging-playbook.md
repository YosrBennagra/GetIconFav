# Audit Logging Playbook

## Core Audit Fields

- Timestamp.
- Actor or system identity.
- Action type.
- Target resource.
- Outcome.
- Source or request context.
- Optional reason or approval context where required.

## Scope Rules

- Audit privileged actions.
- Audit identity and permission changes.
- Audit destructive or irreversible changes.
- Audit support or impersonation workflows explicitly.

## Integrity Rules

- Restrict read and delete access tightly.
- Prefer append-oriented storage behavior.
- Make gaps or tampering suspicious and observable.

## Privacy Rules

- Store summaries instead of raw secrets or excessive sensitive payloads.
- Define retention intentionally.
- Balance accountability needs with minimization obligations.

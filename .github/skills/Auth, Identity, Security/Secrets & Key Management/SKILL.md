---
name: secrets-key-management
description: 'Use when requests involve API secrets, signing keys, token secrets, environment credentials, key rotation, secret sprawl, or reducing the operational risk of sensitive configuration. Design secure handling of secrets and cryptographic key material in applications and delivery pipelines: generation, storage, rotation, scope, least privilege, environment separation, and incident response.'
---

# Secrets & Key Management

## Overview

Secrets are operational liabilities that must be minimized, not merely hidden.
Design secret ownership, storage, rotation, and blast-radius boundaries so compromise is contained and recovery is practical.

## Follow This Workflow

### 1. Inventory sensitive material

- API keys, database credentials, signing keys, OAuth client secrets, webhook secrets, encryption keys, and service account credentials.
- Distinguish secrets from non-secret configuration and from public identifiers.
- Identify which secrets are human-managed versus machine-issued.

### 2. Define storage and scope

- Keep secrets in purpose-built secret stores or secured deployment environments.
- Scope secrets by environment, service, tenant, or function where practical.
- Avoid sharing one secret across unrelated systems or environments.
- Minimize which people, services, and pipelines can read each secret.

### 3. Design lifecycle and rotation

- Generate strong secrets with appropriate entropy.
- Define rotation frequency or rotation triggers based on risk and provider capability.
- Support staged rotation for credentials used by multiple systems.
- Keep old and new credentials overlap brief and intentional when zero-downtime rotation is required.

### 4. Control usage and exposure

- Prevent secrets from entering source control, logs, client bundles, screenshots, and error messages.
- Keep sensitive key operations on the server side.
- Limit where raw secret values are visible even to operators.
- Audit which code paths and integrations actually need direct secret access.

### 5. Prepare for incidents

- Define revocation and replacement procedures.
- Know which systems depend on each secret and what breaks when it changes.
- Record ownership so compromised secrets can be rotated quickly.
- Re-check backup, export, and developer convenience flows for accidental leakage.

## Decision Rules

| Situation | Action |
| --- | --- |
| Secret is shared across environments | Split it by environment immediately. |
| Many systems depend on one credential | Plan staged rotation and reduce the shared blast radius over time. |
| Client-side code needs a value | Treat it as public configuration unless it can be moved server-side. |
| Rotation is hard or risky | Improve lifecycle design rather than accepting permanent static secrets. |
| Team wants to log or expose a secret for debugging | Reject it and create safer observability instead. |

## Quality Bar

- Every secret should have an owner and a purpose.
- Read access should follow least privilege.
- Rotation and revocation should be practical, not theoretical.
- Secret exposure paths should be aggressively constrained.
- Compromise of one secret should not silently compromise unrelated systems.

## Avoid These Failure Modes

- Do not store secrets in source control or long-lived plaintext files.
- Do not reuse one secret across dev, staging, and production.
- Do not treat public config variables as secret just because they live in `.env`.
- Do not forget to rotate credentials after incident or personnel changes.
- Do not design systems that make secret rotation effectively impossible.

## References

- Secret lifecycle guidance: `references/secrets-playbook.md`
- Secret management review checklist: `references/secrets-checklist.md`

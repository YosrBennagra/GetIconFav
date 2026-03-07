# PII Playbook

## Data Identification

- Map personal-data fields across inputs, storage, logs, exports, and third parties.
- Mark high-sensitivity or high-impact categories separately.
- Review free-text collection points carefully.

## Minimization Rules

- Collect only fields needed for the workflow.
- Prefer internal IDs, tokens, or derived values over raw personal attributes.
- Limit duplication across downstream systems.

## Redaction Rules

- Define which fields are omitted, masked, hashed, tokenized, or role-gated.
- Apply the same logic to logs, analytics, support tools, and debug outputs.
- Treat support screenshots and exports as exposure surfaces too.

## Verification

- Test representative error paths and support workflows for leakage.
- Sample logs and telemetry for raw-value exposure.
- Review integrations whenever data sharing scope changes.

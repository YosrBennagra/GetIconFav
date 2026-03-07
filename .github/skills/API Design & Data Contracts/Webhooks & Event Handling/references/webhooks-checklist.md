# Webhooks Checklist

## Contract Review

- Does each event have a stable type and ID?
- Is payload meaning documented clearly?
- Is versioning explicit?

## Delivery Review

- What are the retry and disablement semantics?
- Is ordering guaranteed, best-effort, or unsupported?
- Can consumers recover from duplicates and delay?

## Security Review

- Are deliveries signed?
- Is replay protection practical?
- Can secrets or keys be rotated safely?

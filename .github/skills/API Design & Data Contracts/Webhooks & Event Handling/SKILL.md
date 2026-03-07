---
name: webhooks-event-handling
description: 'Use when requests involve webhook design, event payload contracts, asynchronous notifications, callback integrations, signed delivery, or making machine-to-machine event handling reliable and safe. Design outbound webhooks and event delivery contracts: event schemas, versioning, signatures, retries, replay protection, ordering assumptions, idempotent consumers, and delivery observability.'
---

# Webhooks & Event Handling

## Overview

Webhooks are public asynchronous API contracts with all the risks of distributed systems and security boundaries combined.
Design them so producers can deliver reliably and consumers can verify, deduplicate, and process safely under delay, retry, reordering, and partial failure.

## Follow This Workflow

### 1. Define the event contract

- Identify the event types, resource references, timestamps, version fields, and payload granularity.
- Distinguish event notification from full resource representation.
- Keep event meaning stable even when the underlying resource evolves.

### 2. Choose delivery semantics intentionally

- Assume at-least-once delivery unless a stronger guarantee is explicitly supported.
- Design for duplicate delivery, retries, delay, and reordering.
- Be explicit about whether ordering is guaranteed, best-effort, or unsupported.
- Keep webhook retries and backoff visible to integrators.

### 3. Secure the delivery path

- Sign payloads or requests with verifiable secrets or keys.
- Include timestamp or replay-protection context where the verification model needs it.
- Validate destination ownership and callback registration carefully.
- Keep secrets rotatable and scoped appropriately.

### 4. Design the consumer model

- Expect receivers to acknowledge quickly and process asynchronously where possible.
- Make events idempotent or make duplicate handling practical.
- Include stable event identifiers for deduplication and audit.
- Keep payload size and nested data within integration-friendly bounds.

### 5. Govern evolution and operations

- Version event schemas deliberately.
- Document retry behavior, disablement conditions, and delivery status visibility.
- Support replays or redelivery workflows carefully.
- Monitor failed deliveries and abusive or broken endpoints.

## Decision Rules

| Situation | Action |
| --- | --- |
| Event payload would duplicate large resource state | Prefer a compact event plus resource reference unless consumers truly need the full snapshot. |
| Consumer cannot trust transport source | Require signature verification and replay protection. |
| Producer cannot guarantee order | State that clearly and design payloads to be independently processable. |
| Duplicate delivery is likely | Include stable event IDs and make consumers idempotent. |
| Event meaning changes incompatibly | Version the contract instead of silently reinterpreting the payload. |

## Quality Bar

- Event contracts should have stable meaning independent of retry behavior.
- Delivery guarantees and limitations should be explicit.
- Security verification should be part of the contract, not optional folklore.
- Consumers should be able to deduplicate and recover from delay or replay.
- Operational visibility should exist for failed or unhealthy subscriptions.

## Avoid These Failure Modes

- Do not imply exactly-once or strict ordering unless you truly provide it.
- Do not send unsigned high-trust callbacks by default.
- Do not make consumers infer event identity from payload shape alone.
- Do not change event meaning without versioning.
- Do not couple webhook success to long synchronous receiver work.

## References

- Webhook design and delivery guide: `references/webhooks-playbook.md`
- Webhook contract review checklist: `references/webhooks-checklist.md`

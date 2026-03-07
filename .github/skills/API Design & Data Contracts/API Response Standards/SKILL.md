---
name: api-response-standards
description: 'Use when requests involve API response design, contract consistency, pagination, HTTP semantics, response envelope decisions, or making machine-readable responses stable and predictable for clients. Design consistent HTTP API response contracts: status code use, success payload shape, pagination, metadata, partial responses, empty responses, and transport semantics across REST-like APIs.'
---

# API Response Standards

## Overview

Response design is part of the API contract, not a formatting afterthought.
Prefer consistent status semantics, stable payload shapes, and explicit handling of lists, empty results, and metadata so clients can integrate safely without endpoint-by-endpoint guesswork.

## Follow This Workflow

### 1. Define the transport contract

- Identify the resource or operation being represented.
- Choose whether the API uses direct resource representations, a lightweight envelope, or a domain-specific response wrapper.
- Keep the contract consistent across similar endpoints.

### 2. Use HTTP status semantics intentionally

- Distinguish successful retrieval, creation, accepted async work, empty success, client errors, and server failures clearly.
- Keep status codes aligned with the actual operation outcome instead of always returning `200`.
- Use headers for transport semantics that do not belong in the body.

### 3. Shape the response body deliberately

- Return the resource or operation result in a predictable structure.
- Keep metadata separate from the primary data payload.
- Define conventions for lists, pagination, filtering echoes, and partial-field responses.
- Keep empty responses intentional: return no body only when the contract truly requires it.

### 4. Design consistency across endpoints

- Use one stable approach for naming, list structure, pagination metadata, and nullability semantics.
- Distinguish absent, empty, and unknown values intentionally.
- Avoid endpoint-specific wrapper inventions unless the domain genuinely requires them.

### 5. Re-check client ergonomics

- Ensure clients can branch on status and payload shape without ad hoc parsing.
- Ensure machine consumers can distinguish success with no data from missing resources or failed operations.
- Keep backward compatibility visible when changing fields or wrappers.

## Decision Rules

| Situation | Action |
| --- | --- |
| Operation returns a created resource | Use the appropriate creation semantics and include the representation or a follow-up location deliberately. |
| Endpoint returns a collection | Keep list shape and pagination metadata consistent with every other collection endpoint. |
| No body is needed for a successful action | Use an empty successful response deliberately instead of inventing placeholder fields. |
| Extra transport metadata is needed | Put it in headers or a documented metadata section rather than scattering it unpredictably. |
| One endpoint wants a special envelope | Reject it unless it solves a real repeated contract need. |

## Quality Bar

- Status codes should convey real outcome semantics.
- Similar endpoints should feel like one API family.
- Clients should be able to predict list, item, and empty-result shapes.
- Metadata should be separated cleanly from primary domain data.
- Response changes should be evolvable without surprising consumers.

## Avoid These Failure Modes

- Do not return `200` for every outcome.
- Do not mix several envelope styles in one API surface.
- Do not encode transport status only in the JSON body while ignoring HTTP semantics.
- Do not make clients infer whether `null`, `[]`, missing fields, and empty bodies mean different things accidentally.
- Do not add noisy wrapper layers that provide no contract value.

## References

- Response design guide: `references/response-standards-playbook.md`
- Response review checklist: `references/response-standards-checklist.md`

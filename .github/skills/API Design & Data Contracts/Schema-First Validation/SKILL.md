---
name: schema-first-validation
description: 'Use when requests involve OpenAPI design, JSON Schema validation, contract-first API work, request or response validation, code generation, or preventing implementation drift from the documented contract. Design APIs from schemas first using OpenAPI and JSON Schema: define request and response contracts, validation rules, examples, compatibility boundaries, and generated artifacts from a schema source of truth.'
---

# Schema-First Validation

## Overview

Treat the schema as a contract source of truth, not documentation generated after implementation guesses settle.
Prefer designing request and response structures, validation rules, and compatibility constraints in the schema first so servers, clients, tests, and docs can stay aligned.

## Follow This Workflow

### 1. Define the contract boundary

- Identify the operations, resources, and event or payload shapes the schema must describe.
- Choose the schema surface deliberately: OpenAPI for HTTP APIs, JSON Schema for standalone payload contracts, or both when transport and payload contracts differ.
- Define compatibility expectations before publishing the first schema.

### 2. Model the schema carefully

- Specify field presence, types, formats, nullability, enums, and constraints intentionally.
- Use composition and reusable components only when they clarify the contract.
- Keep examples and descriptions aligned with the actual schema semantics.
- Make unknown-field and additional-property behavior explicit where the schema technology supports it.

### 3. Align validation and implementation

- Validate requests and responses against the schema at the boundary.
- Generate types, clients, or stubs only when the generated artifacts support rather than obscure the contract.
- Keep schema evolution visible when implementation needs diverge.
- Map internal models to the schema explicitly instead of reshaping the schema around storage convenience.

### 4. Govern change

- Prefer additive changes where backward compatibility matters.
- Treat renamed fields, semantic re-interpretations, and removed enums as contract changes requiring migration planning.
- Version or scope breaking changes deliberately.
- Keep deprecation visible in the schema and release communication.

### 5. Re-check edge cases

- Union variants and discriminators.
- Arrays, pagination shapes, and map-like objects.
- Partial updates and patch semantics.
- Error contracts and webhook/event payload reuse.

## Decision Rules

| Situation | Action |
| --- | --- |
| Implementation shape differs from public contract meaning | Preserve the schema contract and map internally. |
| Reusable component makes the schema harder to read | Duplicate locally rather than over-abstracting. |
| Contract needs runtime validation and typed clients | Generate from the schema only if the generation path stays trustworthy and reviewable. |
| Backward compatibility matters | Prefer additive changes and explicit deprecations. |
| Team keeps changing code before schema | Re-establish schema-first ownership at the API boundary. |

## Quality Bar

- The schema should describe the real contract, not an aspirational one.
- Validation constraints should be explicit and machine-enforceable where possible.
- Generated artifacts should remain subordinate to the schema source of truth.
- Breaking changes should be easy to spot and discuss.
- Consumers should be able to rely on the schema without reverse-engineering the implementation.

## Avoid These Failure Modes

- Do not let implementation drift silently from the schema.
- Do not overload reusable schema components until the contract becomes unreadable.
- Do not encode persistence quirks as public contract semantics by default.
- Do not use code generation as an excuse to stop reviewing the contract itself.
- Do not leave examples, descriptions, and constraints out of sync.

## References

- Schema-first design guide: `references/schema-first-playbook.md`
- Schema review checklist: `references/schema-first-checklist.md`

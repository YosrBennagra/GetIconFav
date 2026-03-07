---
name: domain-modeling
description: 'Use when requests involve domain design, business logic modeling, workflow semantics, schema shaping from business rules, event boundaries, or clarifying a complex problem space. Model business domains for software systems: define bounded contexts, core concepts, aggregates, entities, value objects, invariants, relationships, lifecycle rules, and domain events before implementation.'
---

# Domain Modeling

## Overview

Model the business problem before designing tables, APIs, or services.
Prefer explicit concepts, invariants, and boundaries over accidental models shaped only by UI screens or database tables.

## Workflow

See [references/modeling-workflow.md](references/modeling-workflow.md) for the full step-by-step modeling process.

## Decision Rules

| Situation | Action |
| --- | --- |
| UI suggests the model | Reframe around business concepts first, then verify the UI fits the model. |
| Database tables already exist | Infer the current model, then correct it explicitly instead of treating schema as ground truth. |
| One object is doing too much | Split by consistency boundary or business responsibility. |
| Two teams use the same term differently | Create separate bounded contexts and define the translation. |
| Rules conflict across flows | Model the lifecycle and permissions explicitly instead of encoding exceptions ad hoc. |

## Quality Bar

- Names should reflect domain meaning, not transport or storage details.
- Invariants should be testable and implementation-neutral.
- Aggregate boundaries should explain why data changes together.
- Domain events should describe business facts, not internal method calls.
- Open questions should point to real ambiguity, not unfinished thinking.

## Avoid These Failure Modes

- Do not model directly from screens, forms, or endpoints.
- Do not use generic catch-all objects such as `item`, `record`, or `data` when the domain has real names.
- Do not blur source-of-truth data with derived or reporting data.
- Do not let persistence constraints become the only modeling rationale.
- Do not hide critical lifecycle rules in code comments or ticket text.

## References

- Modeling heuristics and prompts: `references/modeling-heuristics.md`
- Context and aggregate review guide: `references/context-and-aggregate-checklist.md`

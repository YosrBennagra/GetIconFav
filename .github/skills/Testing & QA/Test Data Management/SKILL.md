---
name: test-data-management
description: 'Use when requests involve flaky test data, shared fixtures, factories, realistic test datasets, seed strategy, or keeping tests deterministic without sacrificing coverage of meaningful scenarios. Design and manage test data for automated test suites: factories, fixtures, seeds, cleanup strategy, isolation, anonymization, and lifecycle management across unit, integration, and end-to-end tests.'
---

# Test Data Management

## Overview

Test data is part of the test contract, not disposable clutter.
Design it so valid, meaningful states are easy to create, edge cases are expressible, and suites remain isolated as they scale.

## Follow This Workflow

### 1. Match data strategy to the test layer

- Inline literals for tiny unit cases.
- Builders or factories for repeated domain objects.
- Seed sets for integration or environment-backed tests.
- Scenario data for end-to-end flows where realism matters.

### 2. Design data with intent

- Make the default test data valid and minimal.
- Make edge-case variants explicit rather than hidden behind magic overrides.
- Use realistic identifiers, timestamps, statuses, and relationships where behavior depends on them.
- Keep privacy and redaction concerns explicit when using production-like samples.

### 3. Keep tests isolated

- Ensure each test can create, own, and clean up its data.
- Avoid shared mutable fixtures that create order dependence.
- Choose reset, rollback, namespacing, or ephemeral-environment strategies intentionally.
- Keep parallel execution in mind from the start.

### 4. Govern lifecycle and reuse

- Reuse data helpers only when they represent stable concepts.
- Remove stale fixtures that no longer reflect the current model.
- Version or evolve seed data alongside schema and contract changes.
- Keep one clear owner for environment-level test data.

### 5. Re-check realism versus maintainability

- Use the smallest dataset that still exercises the rule.
- Add specialized data for risky edge cases: permissions, time windows, conflicts, soft deletes, or localization.
- Avoid cargo-cult realism that makes tests harder to read without improving coverage.

## Decision Rules

| Situation | Action |
| --- | --- |
| Test needs one simple valid object | Use a small literal or builder default. |
| Many tests share a domain concept | Use a factory or builder with clear overrides. |
| Integration tests need relational state | Use seeded or transaction-managed data with deterministic cleanup. |
| Production-like samples contain sensitive data | Redact or synthesize rather than reuse raw samples. |
| Fixtures keep breaking after model changes | Move toward builders, factories, or more local scenario setup. |

## Quality Bar

- Test data should make valid states easy and invalid states intentional.
- Data setup should reveal scenario meaning, not bury it.
- Isolation should survive random order and parallel execution.
- Realism should support behavior coverage, not decorative complexity.
- Schema or contract changes should have a clear path to update dependent test data.

## Avoid These Failure Modes

- Do not share mutable global fixtures across test files casually.
- Do not use opaque giant JSON fixtures when a builder or smaller scenario setup is clearer.
- Do not let stale seed data drift from the actual schema or business rules.
- Do not use real user or production data without explicit sanitization and approval.
- Do not hide critical edge-case setup inside default fixtures unexpectedly.

## References

- Test data design guide: `references/test-data-playbook.md`
- Test data review checklist: `references/test-data-checklist.md`

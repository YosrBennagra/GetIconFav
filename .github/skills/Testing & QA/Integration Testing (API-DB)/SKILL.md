---
name: integration-testing-api-db
description: 'Use when requests involve API-to-database testing, repository/service integration, route-handler tests, validating persistence behavior, or deciding what should be verified with real dependencies rather than mocks. Design integration tests that exercise real boundaries between application code, APIs, databases, queues, or other infrastructure: environment setup, isolation, transaction strategy, fixtures, and assertions on cross-layer behavior.'
---

# Integration Testing (API-DB)

## Overview

Integration tests should verify that real boundaries work together under realistic conditions.
Prefer focused tests around meaningful cross-layer behavior instead of giant end-to-end scenarios or unit-level mocks pretending to be infrastructure.

## Follow This Workflow

### 1. Define the integration boundary

- API to database.
- Service to repository.
- Worker to queue or persistence.
- Validation, authorization, and persistence combined at the real boundary.
- Keep the test scope narrower than E2E but broader than a unit.

### 2. Use real dependencies intentionally

- Exercise the real database, real transaction semantics, and real query behavior when those are what you need confidence in.
- Stub only dependencies truly outside the chosen boundary, such as third-party APIs or non-deterministic external systems.
- Keep infrastructure representative enough to catch configuration and contract drift.

### 3. Control environment and isolation

- Use isolated databases, schemas, containers, transactions, or namespaced records deliberately.
- Reset state deterministically between tests or suites.
- Keep parallel execution, migration state, and seed lifecycle explicit.
- Avoid one shared long-lived environment becoming the hidden test dependency.

### 4. Assert behavior across the boundary

- Verify both transport-level outcomes and persisted effects.
- Check constraint behavior, authorization, conflict handling, and error mapping where applicable.
- Assert what the integration guarantees, not internal implementation trivia.

### 5. Re-check signal quality

- Keep each test focused on one meaningful integration scenario.
- Move browser or multi-service workflow concerns to E2E or system testing layers.
- Keep flaky timing, cleanup, and race issues visible rather than normalized.

## Decision Rules

| Situation | Action |
| --- | --- |
| Real query, transaction, or persistence behavior matters | Use an integration test with the real database boundary. |
| Test mostly verifies one pure branch | Use a unit test instead. |
| Scenario spans browser, network, and persistence | Prefer E2E unless the goal is one API-to-DB contract. |
| Environment setup dominates the signal | Simplify the boundary or improve isolation tooling. |
| Third-party dependency is outside the target boundary | Stub it narrowly while keeping the core boundary real. |

## Quality Bar

- The test should prove something unit tests cannot.
- State setup and cleanup should be deterministic.
- Assertions should cover both returned results and durable side effects when relevant.
- Environment management should be explicit and reproducible.
- Failures should narrow the problem to a specific boundary, not the whole stack.

## Avoid These Failure Modes

- Do not mock the database in tests meant to validate persistence behavior.
- Do not reuse one dirty shared environment until order dependence becomes normal.
- Do not let integration tests balloon into slow browser-level scenarios.
- Do not assert internal call structure instead of cross-layer outcomes.
- Do not ignore migrations, constraints, or transaction semantics in a database-focused integration suite.

## References

- Integration testing guide: `references/integration-testing-playbook.md`
- Integration test review checklist: `references/integration-testing-checklist.md`

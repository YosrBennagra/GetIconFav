---
name: unit-testing-strategy
description: 'Use when requests involve unit test design, missing coverage for core logic, test refactors, making tests less brittle, or deciding what should and should not be unit tested. Design and implement high-signal unit tests for software systems: test boundaries, assertion strategy, deterministic isolation, state and branch coverage, and maintainable test structure across business logic, utilities, and components.'
---

# Unit Testing Strategy

## Overview

Unit tests should protect behavior that changes often or fails expensively, not merely inflate coverage.
Prefer small, deterministic tests around meaningful logic boundaries so failures explain what broke and why.

## Follow This Workflow

### 1. Choose the right unit boundary

- Target pure logic, state transitions, formatting rules, branching decisions, and small behavioral modules.
- Keep infrastructure, network, filesystem, and database behavior outside the unit boundary unless explicitly abstracted.
- Test business meaning, not incidental implementation structure.

### 2. Design the test cases deliberately

- Cover the happy path, edge cases, invalid inputs, and failure branches that matter.
- Use table-driven patterns when many inputs express the same rule family.
- Prefer a few representative cases over exhaustive noise that repeats the same assertion.

### 3. Keep tests deterministic

- Control time, randomness, locale, and environment dependencies.
- Avoid relying on test ordering or shared mutable state.
- Isolate each test so it can run alone or in parallel without behavior changes.

### 4. Assert at the right level

- Assert observable outputs, state transitions, and side effects at the boundary.
- Avoid overspecifying internal helper calls unless the contract truly depends on them.
- Keep failure messages and test names readable enough to diagnose quickly.

### 5. Maintain the suite

- Remove duplicate tests that cover the same behavior.
- Refactor test helpers when setup hides intent.
- Keep flaky or slow tests out of the unit layer; move them to the appropriate integration surface.

## Decision Rules

| Situation | Action |
| --- | --- |
| Logic is pure and branch-heavy | Prioritize unit tests. |
| Behavior depends on many real integrations | Prefer integration tests unless those dependencies are abstracted meaningfully. |
| Test setup dominates the file | Re-evaluate the unit boundary or create focused helpers. |
| Assertion checks private implementation details | Shift the test toward observable behavior. |
| Coverage is high but regressions still slip through | Re-check whether tests protect meaningful behaviors or only lines. |

## Quality Bar

- Unit tests should fail for real behavioral regressions, not harmless refactors.
- Setup should be smaller than the assertion signal.
- Edge cases should reflect real risk, not synthetic completeness.
- Tests should run quickly and deterministically.
- A new maintainer should understand what each test protects without reading the implementation deeply.

## Avoid These Failure Modes

- Do not mock everything until the test no longer resembles real behavior.
- Do not assert on private helpers, call counts, or object shape trivia without a contract reason.
- Do not hide large scenarios inside one massive unit test.
- Do not use unit tests to compensate for missing integration coverage.
- Do not chase line coverage at the cost of behavioral signal.

## References

- Unit test design playbook: `references/unit-test-playbook.md`
- Unit test review checklist: `references/unit-test-checklist.md`

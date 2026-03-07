---
name: mocking-test-utilities
description: 'Use when requests involve mocking policy, test helpers, flaky tests caused by bad doubles, reusable test setup, or deciding what should be mocked versus exercised for real. Design mocking strategy and reusable test utilities for automated tests: seams, doubles, fake implementations, fixture builders, render helpers, clocks, and environment harnesses that increase signal without hiding behavior.'
---

# Mocking & Test Utilities

## Overview

Mocks and test utilities should reduce noise and control dependencies, not distort the system under test beyond recognition.
Prefer the lightest double or helper that preserves the behavior the test actually needs to exercise.

## Follow This Workflow

### 1. Decide whether to mock at all

- Mock only dependencies outside the test boundary that would make the test slow, flaky, costly, or non-deterministic.
- Prefer real collaborators when they are cheap, stable, and part of the intended behavior under test.
- Distinguish between unit-level isolation and integration-level realism.

### 2. Choose the right test double

- Stub for fixed inputs and outputs.
- Fake for lightweight in-memory behavior.
- Spy when interaction observation matters at the boundary.
- Mock only when behavioral expectations must be verified explicitly.
- Avoid overusing the most powerful tool when a simpler one would suffice.

### 3. Build reusable utilities carefully

- Create helpers for repeated setup that obscures intent.
- Keep utilities close to the layer they support: render helpers, API harnesses, clock controls, builders, or factories.
- Let test files stay readable and explicit even when helpers are used.

### 4. Keep doubles honest

- Match the real contract and failure modes closely enough for the test purpose.
- Update doubles when interfaces or semantics change materially.
- Avoid fake behavior that makes impossible states look normal.

### 5. Review maintenance cost

- Remove helpers that save little but hide a lot.
- Consolidate duplicate fixtures or builders.
- Promote stable patterns into utilities only after repeated use proves the need.

## Decision Rules

| Situation | Action |
| --- | --- |
| Dependency is external, slow, flaky, or expensive | Mock or fake it at the appropriate seam. |
| Dependency is a simple pure collaborator | Use the real implementation unless isolation is essential. |
| Test asserts mostly on mock interactions | Re-check whether the boundary is too internal. |
| Same setup repeats across many tests | Create a focused utility or builder. |
| Fake behavior diverges from real contract | Fix the fake or replace it with a more honest seam. |

## Quality Bar

- Test doubles should preserve the meaning of the contract they replace.
- Utilities should reduce duplication without hiding test intent.
- Mocking should support determinism, not compensate for poor boundaries.
- Builders and fixtures should make valid states easy and invalid states explicit.
- Tests should still describe behavior clearly after helper extraction.

## Avoid These Failure Modes

- Do not mock everything by default.
- Do not let brittle interaction assertions dominate behavior assertions.
- Do not build giant helper layers that obscure what the test is doing.
- Do not use unrealistic fakes that make regressions invisible.
- Do not share mutable fixtures across tests carelessly.

## References

- Mocking strategy guide: `references/mocking-playbook.md`
- Test utility review checklist: `references/mocking-checklist.md`

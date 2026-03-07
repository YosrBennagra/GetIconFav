---
name: e2e-testing-user-flows
description: 'Use when requests involve E2E strategy, user-flow coverage, Playwright- or Cypress-style browser automation, regression protection for cross-stack behavior, or deciding which journeys deserve full-stack test coverage. Design end-to-end tests for real user flows across browser, network, and backend boundaries: critical journeys, environment control, selectors, waits, state setup, and failure triage.'
---

# E2E Testing (User Flows)

## Overview

End-to-end tests should protect a small set of critical user journeys that only fail when the real stack is exercised together.
Prefer a lean, reliable suite that verifies high-risk flows over a sprawling browser script collection that duplicates lower-level tests and flakes constantly.

## Follow This Workflow

### 1. Choose the right user flows

- Prioritize sign-in, checkout, onboarding, core CRUD journeys, privileged actions, and other revenue- or trust-critical paths.
- Focus on cross-stack regressions that unit and integration tests cannot catch.
- Keep the suite small enough that failures remain actionable.

### 2. Design the scenario boundary

- Cover one coherent user goal per test where possible.
- Set up only the minimum required preconditions.
- Keep navigation, input, waits, and assertions tied to observable user outcomes.
- Avoid chaining many unrelated flows into one brittle mega-test.

### 3. Control the environment

- Use stable test accounts, seeded data, or deterministic setup APIs.
- Reset state predictably between runs.
- Keep external dependencies stubbed or isolated when they are not part of the intended E2E confidence boundary.
- Make browser, environment, and test-data assumptions explicit.

### 4. Write resilient interactions

- Prefer stable user-facing selectors and semantics over fragile DOM structure selectors.
- Wait on meaningful UI or network conditions, not arbitrary sleeps.
- Assert outcomes visible to the user plus any critical cross-system side effect that must be proven.
- Keep helper abstractions readable and close to actual user intent.

### 5. Triage and maintain

- Classify failures as environment, app regression, test fragility, or external dependency issues.
- Remove redundant scenarios already covered well at lower levels.
- Keep flaky tests visible and fix them; do not normalize reruns as the solution.

## Decision Rules

| Situation | Action |
| --- | --- |
| Journey spans browser, auth, network, and persistence | Use an E2E test if the path is business-critical. |
| Scenario mainly checks one API edge case | Prefer integration coverage instead. |
| Test needs many brittle selectors and waits | Rework the UI contract or selector strategy before adding more coverage. |
| External vendor integration is unstable and not the target of confidence | Stub or isolate it while preserving the rest of the user flow. |
| Suite runtime is growing quickly | Keep only high-value flows at the E2E layer and push detail down to lower layers. |

## Quality Bar

- Each test should represent a real user goal.
- Setup should be deterministic and understandable.
- Selectors and waits should be stable under reasonable UI refactors.
- Failures should point to a specific flow or boundary quickly.
- The suite should remain fast and trustworthy enough to run regularly.

## Avoid These Failure Modes

- Do not turn E2E into the first line of defense for every bug class.
- Do not rely on sleep-based waits.
- Do not couple tests to fragile DOM structure or styling hooks when stable semantics exist.
- Do not chain many business workflows into one scenario.
- Do not keep flaky tests simply because they occasionally catch something important.

## References

- E2E flow design guide: `references/e2e-playbook.md`
- E2E review checklist: `references/e2e-checklist.md`

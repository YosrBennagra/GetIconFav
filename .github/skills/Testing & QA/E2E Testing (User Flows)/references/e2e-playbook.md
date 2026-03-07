# E2E Playbook

## Good E2E Targets

- Sign-in and sign-out.
- Checkout or payment-adjacent flows.
- Core onboarding.
- Critical CRUD journeys across UI and backend.
- Admin or privileged flows where breakage is costly.

## Stability Rules

- Use stable selectors tied to semantics or explicit test IDs.
- Wait on visible state or known completion signals.
- Keep environment and test data deterministic.
- Stub non-essential external systems when they are not the subject of the test.

## Scope Rules

- One user goal per test when possible.
- Keep lower-level detail in unit or integration layers.
- Add only high-value cross-stack coverage here.

## Triage Rules

- Separate flaky test design from real product regressions.
- Fix or delete unstable low-value tests.
- Keep failure output and screenshots or traces actionable.

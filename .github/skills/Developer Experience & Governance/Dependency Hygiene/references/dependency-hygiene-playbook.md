# Dependency Hygiene Playbook

## Evaluation Rules

- Add a dependency only when the long-term maintenance tradeoff is worth it.
- Compare runtime risk, ecosystem health, and lock-in cost.
- Prefer fewer overlapping packages.

## Ownership Rules

- Separate runtime, tooling, and test dependencies clearly.
- Keep package ownership explicit in monorepos.
- Avoid duplicated dependency roles without a reason.

## Lifecycle Rules

- Update regularly.
- Remove unused packages promptly.
- Plan major upgrades rather than deferring them forever.
- Keep lockfile discipline consistent.

## Risk Rules

- Watch maintainer health and security posture.
- Review transitive impact where it matters.
- Replace abandoned or high-risk packages before they become urgent blockers.

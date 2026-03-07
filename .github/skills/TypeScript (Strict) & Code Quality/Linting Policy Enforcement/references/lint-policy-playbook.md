# Lint Policy Playbook

## Rule Categories

- Correctness and bug prevention.
- Type safety and unsafe patterns.
- Readability and maintainability.
- Architecture or dependency constraints.
- Workflow hygiene.

## Severity Guidance

- `error`: must hold now and should block merges.
- `warn`: temporary migration state or genuinely advisory rule.
- `off`: intentionally not part of policy.

## Suppression Rules

- Suppress as narrowly as possible.
- Explain why the suppression is safe.
- Prefer removing dead rules over normalizing constant exceptions.

## Rollout Rules

- Introduce high-value rules first.
- Fix existing violations in planned batches.
- Avoid turning on a wide ruleset with no migration strategy.

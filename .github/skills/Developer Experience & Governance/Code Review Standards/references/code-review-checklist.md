# Code Review Checklist

## Risk Review

- Could this change break existing behavior?
- Are security or data-safety implications covered?
- Is rollout or migration risk visible?

## Verification Review

- Are tests sufficient for the risk?
- Are assumptions about behavior explicit?
- Does CI cover the deterministic parts already?

## Comment Quality Review

- Are findings actionable?
- Are blockers separated from suggestions?
- Is the review focused on meaningful risk rather than style noise?

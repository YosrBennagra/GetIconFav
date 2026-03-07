# Git Hooks Checklist

## Scope Review

- What does each hook protect?
- Is this the right hook for the policy?
- Can the check be scoped smaller?

## Ergonomics Review

- Is the runtime acceptable?
- Is failure output actionable?
- Are tool dependencies predictable on developer machines?

## Governance Review

- Is CI aligned with the local hook policy?
- Are bypasses exceptional rather than normal?
- Is the hook logic readable and maintainable?

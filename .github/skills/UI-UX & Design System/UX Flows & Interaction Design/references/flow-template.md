# Flow Template

```markdown
# [Flow Name]

## User Goal
- What is the user trying to accomplish?

## Entry Points
- Where can the flow begin?

## Preconditions
- What must already be true?

## Happy Path
1. Step one.
2. Step two.
3. Step three.

## Decision Points
- What choices or branches exist?

## Edge and Recovery Paths
- Validation failures.
- Network or timeout issues.
- Cancellation or backtracking.
- Partial completion or retry.

## Success State
- What confirms completion?
- What should the user do next?

## Risks and Open Questions
- Friction points.
- Trust or compliance concerns.
- Instrumentation or experiment needs.
```

## Mapping Guidance

- Keep one primary job per flow.
- Name steps by user intent, not by screen title alone.
- Include system waits and confirmations where they affect confidence or completion.

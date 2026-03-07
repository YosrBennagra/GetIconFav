# Milestone Planning Playbook

## Milestone Goals

A milestone should produce one of these:

- A validated decision.
- A demoable user outcome.
- A release-ready increment.

If a milestone cannot be reviewed with a concrete outcome, it is probably too vague.

## Default Sequence

Use this as a starting pattern, then compress or expand as needed:

1. Discovery or alignment.
2. Foundation work that unlocks delivery.
3. MVP slice with one end-to-end user path.
4. Expansion for key edge cases, roles, or integrations.
5. Launch hardening and rollout.

## Milestone Template

```markdown
## Milestone [N]: [Name]
- Goal:
- Included scope:
- Excluded scope:
- Dependencies:
- Exit criteria:
- Risks:
```

## Sequencing Rules

- Put user-visible value as early as dependencies allow.
- Keep infrastructure milestones narrow and explicitly tied to later outcomes.
- Separate must-have work from optimization work.
- Call out external approvals, content, policy, or legal review if they affect timing.
- Keep later milestones smaller when uncertainty is high.

## Compression Rules

When the timeline is tight:

- Define the smallest release that proves value.
- Move reporting, automation, and polish to later milestones unless required for launch.
- Prefer one primary persona in the first release.
- Treat nice-to-have integrations as post-MVP unless they are core to the outcome.

## Risk Review

Check each milestone for:

- Hidden cross-team dependencies.
- Migration or data-shape changes.
- Access-control or compliance work.
- Content or support readiness.
- Rollback or recovery needs.

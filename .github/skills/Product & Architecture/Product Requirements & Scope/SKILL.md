---
name: product-requirements-scope
description: 'Use when requests mention product requirements, scoping, MVP definition, backlog shaping, roadmap or milestone planning, feature discovery, or converting rough ideas into execution-ready scope. Turn ambiguous product ideas into scoped planning artifacts for any software or digital product: PRDs, feature briefs, user stories, acceptance criteria, milestone plans, assumptions, dependencies, and delivery risks.'
---

# Product Requirements & Scope

## Overview

Turn rough ideas into planning artifacts that design, engineering, and stakeholders can execute.
Prefer explicit scope boundaries, measurable outcomes, and thin vertical slices over aspirational wish lists.

## Workflow

See [references/scoping-workflow.md](references/scoping-workflow.md) for the full step-by-step scoping process.

## Decision Rules

| Situation | Action |
| --- | --- |
| Idea is vague | State assumptions, define the smallest credible user problem, and avoid inventing unnecessary detail. |
| Deadline is aggressive | Define MVP first, move stretch items into later milestones, and say what was deferred. |
| Stakeholders want many features at once | Group by user outcome, cut duplicates, and keep the first release minimal. |
| Requirements are mostly technical | Clarify the user or business outcome before writing stories or milestones. |
| Multiple audiences exist | Pick one primary audience for the first release and treat the rest as secondary or later scope. |

## Quality Bar

- Make every goal measurable or falsifiable.
- Make every acceptance criterion testable.
- Make every milestone reviewable with a concrete demo or outcome.
- Distinguish confirmed facts from assumptions.
- Distinguish committed scope from future ideas.

## Avoid These Failure Modes

- Do not confuse feature lists with requirements.
- Do not write stories that are really engineering tasks.
- Do not hide major dependencies or rollout constraints in footnotes.
- Do not let non-goals become backdoor requirements.
- Do not over-specify implementation when the request is still at product-definition level.

## References

- PRD formats and prompts: `references/prd-template.md`
- User story and acceptance-criteria patterns: `references/story-acceptance-patterns.md`
- Milestone slicing and sequencing: `references/milestone-planning-playbook.md`

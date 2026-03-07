---
name: technical-decision-records
description: 'Use when requests involve architectural choices, platform selection, migration strategies, cross-team tradeoffs, documenting why a decision was made, or keeping important technical decisions auditable over time. Capture durable architecture and engineering decisions in concise Technical Decision Records: context, decision, alternatives, tradeoffs, consequences, status, and follow-up actions.'
---

# Technical Decision Records (TDR)

## Overview

Write TDRs for decisions that change architecture, operating model, long-term cost, or team constraints.
Prefer short, durable records that explain why a path was chosen and what it means for future work.

## Follow This Workflow

### 1. Confirm that a TDR is warranted

- Use a TDR when the decision is consequential, cross-cutting, hard to reverse, or likely to be revisited.
- Skip the ceremony for trivial implementation details or short-lived experiments.
- If the team is already debating options, capture the decision while the context is fresh.

### 2. Frame the decision

- State the problem, constraints, and forces acting on the choice.
- Name the affected systems, teams, or workflows.
- Make the decision question explicit before listing options.

### 3. Compare alternatives

- Include realistic alternatives, including "do nothing" when relevant.
- Compare them on cost, risk, reversibility, performance, complexity, operational burden, and team fit.
- Avoid strawman alternatives that exist only to make the chosen option look better.

### 4. Record the decision and consequences

- Use the template in `references/tdr-template.md`.
- State the chosen option plainly.
- Record expected benefits, tradeoffs, risks, and follow-up actions.
- Note what changes immediately and what remains deferred.

### 5. Maintain the record

- Mark status clearly: proposed, accepted, superseded, deprecated, or rejected.
- Link newer records when a decision changes.
- Update factual status when implementation diverges from the original plan.

## Decision Rules

| Situation | Action |
| --- | --- |
| Choice affects multiple teams or systems | Write a TDR. |
| Decision is expensive to reverse | Write a TDR with clear tradeoffs and consequences. |
| Choice is temporary or exploratory | Capture it in lighter notes unless it creates important constraints. |
| Team cannot explain why a platform or pattern exists | Backfill a TDR if the decision still matters. |
| New information invalidates the old decision | Supersede the old TDR instead of silently editing history. |

## Quality Bar

- The decision statement should be unambiguous.
- Alternatives should be plausible and fairly described.
- Tradeoffs should be explicit, not implied.
- Consequences should be actionable for future maintainers.
- A reader months later should understand both the reasoning and the cost of changing course.

## Avoid These Failure Modes

- Do not turn TDRs into long project histories.
- Do not write the document after the fact as justification theater.
- Do not omit rejected alternatives.
- Do not quietly overwrite accepted decisions without a superseding record.
- Do not use a TDR for every small coding preference.

## References

- TDR template and example structure: `references/tdr-template.md`
- Decision quality checklist: `references/decision-quality-checklist.md`

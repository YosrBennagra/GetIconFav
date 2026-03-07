---
name: code-review-standards
description: 'Use when requests involve code review policy, pull request review quality, reviewer expectations, review checklists, or improving how engineering teams detect regressions before merging. Design and apply code review standards that prioritize bugs, risk, maintainability, security, and testing quality over stylistic churn: review scope, severity, evidence, review workflow, and response expectations.'
---

# Code Review Standards

## Overview

Code review exists to reduce defect risk and improve shared ownership, not to maximize comment count.
Prefer reviews that prioritize correctness, regressions, security, test coverage, and operational risk before style or personal preference.

## Follow This Workflow

### 1. Define what review must catch

- Behavioral regressions.
- Security and data-safety issues.
- Missing or misleading tests.
- Architecture or ownership violations.
- Release, migration, or operational hazards.
- Keep review scope aligned with the actual risk of the change.

### 2. Set reviewer expectations

- Review the code that matters, not only the diff size.
- Use findings with clear severity and rationale.
- Distinguish blockers from suggestions and from optional follow-up work.
- Ask for evidence when behavior, compatibility, or rollout assumptions are unclear.

### 3. Standardize how findings are expressed

- Prefer concise findings tied to files, lines, or affected behavior.
- Explain why the issue matters and what risk it creates.
- Keep summaries secondary to the actual review findings.
- Make open questions explicit when the risk depends on assumptions.

### 4. Align review with tooling and workflow

- Let CI, lint, formatting, and automated checks handle low-level deterministic issues.
- Reserve human attention for risk, design quality, edge cases, and missing reasoning.
- Ensure large or risky changes get more deliberate review than trivial edits.

### 5. Re-check review effectiveness

- Look for recurring escaped bugs that review should have caught.
- Reduce comment noise that teaches nothing.
- Keep the standard realistic enough that reviewers can apply it consistently.

## Decision Rules

| Situation | Action |
| --- | --- |
| Change introduces a plausible bug or regression | Raise a finding with severity and rationale. |
| Issue is purely stylistic and tooling could handle it | Prefer automation or low-priority suggestion. |
| Behavior depends on an unstated assumption | Call out the assumption as an open question or risk. |
| Change is high-risk but under-tested | Prioritize test and rollout concerns early in the review. |
| Reviewer is uncertain whether something is wrong | Ask for evidence or clarify assumptions instead of inventing certainty. |

## Quality Bar

- Reviews should surface real risks in priority order.
- Findings should be specific and actionable.
- Reviewer comments should reflect evidence and code behavior, not taste.
- Tooling and review should complement rather than duplicate each other.
- The review process should improve the merged change, not merely record activity.

## Avoid These Failure Modes

- Do not bury real blockers under many low-value comments.
- Do not use review to debate formatter or linter output repeatedly.
- Do not approve code you do not understand when risk is non-trivial.
- Do not state guesses as findings without clarifying assumptions.
- Do not turn every review into a redesign unless the current change genuinely demands it.

## References

- Review practice guide: `references/code-review-playbook.md`
- Review quality checklist: `references/code-review-checklist.md`

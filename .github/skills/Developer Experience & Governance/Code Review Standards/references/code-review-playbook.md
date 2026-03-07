# Code Review Playbook

## Review Priority Order

1. Correctness and regressions.
2. Security and data safety.
3. Tests and verification gaps.
4. Operational or migration risk.
5. Maintainability and design issues.

## Comment Rules

- Make findings specific.
- Explain the risk clearly.
- Distinguish blockers from suggestions.
- Keep summaries secondary to actual issues.

## Workflow Rules

- Let automation catch deterministic low-level issues.
- Escalate large or risky changes for deeper review.
- Use open questions when certainty depends on missing context.

## Review Smells

- Too many low-value style comments.
- Approval without understanding risky changes.
- Repeated escaped bugs of the same class.
- Findings without clear behavior or risk explanation.

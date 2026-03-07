---
name: linting-policy-enforcement
description: 'Use when requests involve ESLint policy, strict code quality enforcement, rule cleanup, flat config strategy, warning-versus-error decisions, or making code standards operational across a team. Design and enforce linting policy for TypeScript codebases: rule selection, severity strategy, formatting boundaries, incremental adoption, suppression standards, and CI/local workflows.'
---

# Linting Policy Enforcement

## Overview

Linting is a policy system, not a random list of stylistic preferences.
Prefer rules that protect correctness, maintainability, and team consistency, and enforce them with a migration strategy developers can actually sustain.

## Follow This Workflow

### 1. Define the policy goals

- Identify whether the rules are mainly about correctness, safety, readability, architecture, style, or workflow hygiene.
- Separate formatter concerns from lint concerns.
- Decide what should block merges versus what should only guide cleanup.

### 2. Design the rule set deliberately

- Keep high-signal correctness and safety rules strict.
- Apply readability and style rules only when they reduce real team friction.
- Group rules by purpose so maintainers can understand why they exist.
- Prefer ecosystem-recommended baselines, then adapt to project realities carefully.

### 3. Define adoption and severity

- Use `error` for rules that must hold now.
- Use `warn` temporarily only with an explicit cleanup plan.
- Scope overrides to the smallest relevant surface.
- Avoid global disables that erase the rule’s value.

### 4. Govern suppressions

- Require local justification for suppressions.
- Prefer fixing the code or refining the rule before adding disables.
- Revisit long-lived suppressions and stale overrides periodically.
- Make policy exceptions visible enough to review.

### 5. Integrate enforcement

- Run lint locally for fast feedback.
- Run lint in CI for merge protection.
- Keep autofix limited to safe and well-understood transformations.
- Ensure config complexity does not make the ruleset harder to trust than the code it governs.

## Decision Rules

| Situation | Action |
| --- | --- |
| Rule catches real bugs repeatedly | Keep it strict, even if occasionally inconvenient. |
| Rule causes broad low-value churn | Reconsider or narrow it. |
| Team wants warnings forever | Either promote the rule or remove it; permanent limbo weakens policy. |
| One file class needs different treatment | Use a narrow override with a clear rationale. |
| Suppressions keep accumulating | Fix the root pattern or adjust the rule design. |

## Quality Bar

- Every rule should have a reason developers can explain.
- Blocking rules should protect important quality properties.
- Config and overrides should be readable and maintainable.
- Suppressions should be exceptional, local, and reviewable.
- Linting should improve delivery quality without becoming noise.

## Avoid These Failure Modes

- Do not enforce rules that the team cannot realistically maintain.
- Do not mix formatter and linter responsibilities carelessly.
- Do not add rules because they look strict rather than because they add signal.
- Do not hide large policy gaps behind blanket disables.
- Do not leave warning-only rules without a cleanup path.

## References

- Rule design and rollout guidance: `references/lint-policy-playbook.md`
- Lint policy review checklist: `references/lint-policy-checklist.md`

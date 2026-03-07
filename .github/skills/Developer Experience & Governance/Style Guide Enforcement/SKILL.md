---
name: style-guide-enforcement
description: 'Use when requests involve coding standards, style-guide drift, consistency enforcement, handbook-to-tooling alignment, or making team conventions operational without turning them into bureaucratic noise. Design and enforce engineering style guides across codebases: naming, structure, formatting boundaries, comment policy, code examples, review expectations, and lightweight governance mechanisms that keep standards usable.'
---

# Style Guide Enforcement

## Overview

A style guide should reduce ambiguity and cognitive load, not serve as a museum of arbitrary preferences.
Prefer a small set of durable conventions, backed by examples and light enforcement, so teams can move faster with fewer style arguments.

## Follow This Workflow

### 1. Define what the guide is for

- Clarify whether the style guide primarily protects readability, maintainability, architectural consistency, or user-facing quality.
- Separate enforced conventions from advisory preferences.
- Keep the guide aligned with how the team actually builds software, not how it wishes every file looked in theory.

### 2. Choose the convention surface

- Naming, file and module organization, formatting boundaries, comments, public API clarity, error messages, and test style are usually high-value areas.
- Keep language- or framework-specific rules scoped appropriately.
- Favor conventions that prevent recurring friction or review debates.

### 3. Connect the guide to tooling

- Enforce low-ambiguity rules with formatters, linters, generators, templates, or hooks where possible.
- Keep human review focused on higher-order judgment that tooling cannot express well.
- Make sure tooling output and written guidance do not contradict each other.

### 4. Keep the guide usable

- Provide concise examples and counterexamples for important rules.
- Keep exceptions explicit and justified.
- Review the guide when architecture, tooling, or team practices change.
- Remove stale rules that no longer serve a real purpose.

### 5. Re-check governance

- Ensure violations are handled consistently in review and automation.
- Avoid turning the guide into a full policy burden for low-value stylistic issues.
- Keep the guide readable enough that new contributors can adopt it quickly.

## Decision Rules

| Situation | Action |
| --- | --- |
| Rule prevents recurring confusion or churn | Put it in the style guide and enforce it where possible. |
| Rule is mostly personal taste | Leave it to formatter defaults or avoid formalizing it. |
| Tooling can enforce the rule deterministically | Prefer automation over repeated review comments. |
| Guide and linter disagree | Fix the mismatch before adding more rules. |
| Exceptions keep recurring | Revisit whether the rule is wrong, too broad, or missing nuance. |

## Quality Bar

- Every enforced rule should have a practical purpose.
- Examples should make the intended convention obvious.
- Tooling and written guidance should align.
- Exceptions should be rare, visible, and teachable.
- The guide should lower review friction rather than create new bureaucracy.

## Avoid These Failure Modes

- Do not write a style guide that mostly encodes personal preference.
- Do not let human review re-litigate formatter decisions constantly.
- Do not keep stale rules that no longer match the codebase.
- Do not hide major exceptions in tribal knowledge.
- Do not expand the guide faster than the team can actually apply it.

## References

- Style-guide governance playbook: `references/style-guide-playbook.md`
- Style-guide review checklist: `references/style-guide-checklist.md`

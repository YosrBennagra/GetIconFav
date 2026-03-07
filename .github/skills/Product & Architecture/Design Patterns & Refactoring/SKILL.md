---
name: design-patterns-refactoring
description: 'Use when requests involve refactoring, reducing complexity, improving maintainability, introducing patterns, or cleaning up code before larger changes. Apply design patterns and refactoring techniques to improve code structure without losing behavioral correctness: identify smells, choose appropriate abstractions, simplify control flow, isolate responsibilities, and evolve architecture safely.'
---

# Design Patterns & Refactoring

## Overview

Refactor to improve clarity, changeability, and correctness, not to display pattern literacy.
Prefer the smallest structural change that removes the real source of complexity.

## Follow This Workflow

### 1. Define the problem precisely

- Identify the dominant pain: duplication, branching complexity, mixed responsibilities, leaky abstractions, hidden side effects, or unstable dependencies.
- Preserve the observable behavior that must remain unchanged.
- Decide whether the problem is local cleanup, module redesign, or architectural refactoring.

### 2. Choose the lightest effective pattern

- Use composition before inheritance.
- Extract policies, strategies, or adapters only when multiple variants truly exist.
- Introduce domain services, factories, or orchestrators only when responsibilities are genuinely mixed.
- Prefer direct code over frameworks of abstractions.

### 3. Refactor in safe increments

- Isolate side effects.
- Rename concepts before or alongside structural changes.
- Move logic toward the module that owns the rule.
- Replace broad conditionals with clearer dispatch or encapsulation only when it reduces complexity.

### 4. Verify continuously

- Keep tests or behavioral checks near the change.
- Preserve public contracts unless the task explicitly includes a contract change.
- Re-run static checks and focused runtime verification after each meaningful step.

### 5. Finish by simplifying

- Remove dead code, compatibility shims, and duplicate helpers created during the transition.
- Leave the new structure easier to explain than the old one.
- Document only the non-obvious decisions; the code should carry most of the meaning.

## Pattern Selection Rules

| Situation | Action |
| --- | --- |
| Many conditional branches for interchangeable behavior | Consider strategy or policy extraction. |
| External system differences pollute core logic | Use adapters at the boundary. |
| Object creation is complex or invalid combinations exist | Introduce factory or builder-style creation rules. |
| Business rules are duplicated across transports | Move them into shared domain or application services. |
| Pattern adds more ceremony than clarity | Do not apply it. |

## Quality Bar

- The new shape should reduce cognitive load for the next change.
- Naming should improve with the refactor, not merely the call graph.
- Abstractions should pay for themselves immediately.
- Side effects and dependencies should become more explicit.
- The result should support simpler testing or reasoning.

## Avoid These Failure Modes

- Do not introduce patterns just because they are canonical.
- Do not mix behavior changes with large structural edits unless required.
- Do not keep old and new abstractions in parallel longer than necessary.
- Do not extract helpers whose only purpose is to move lines elsewhere.
- Do not hide domain decisions inside generic base classes.

## References

- Pattern selection guide: `references/pattern-selection-guide.md`
- Refactoring smells and sequencing: `references/refactoring-playbook.md`

---
name: git-hooks-governance
description: 'Use when requests involve Husky or other git hooks, commit-time validation, hook policy, balancing local enforcement with CI, or preventing bad code and bad commits from entering shared history. Design and govern git hook workflows for TypeScript and frontend repositories: pre-commit, commit-msg, pre-push, staged-file checks, local quality gates, and developer ergonomics.'
---

# Git Hooks Governance

## Overview

Git hooks are local governance tools, not a substitute for CI or careful engineering.
Use them to enforce fast, high-signal checks close to developer behavior while keeping the workflow predictable and sustainable.

## Follow This Workflow

### 1. Decide what belongs in hooks

- Fast checks for staged files or recent changes.
- Commit message validation.
- Lightweight type, lint, or formatting gates where runtime is acceptable.
- Avoid long-running or flaky checks that developers cannot trust locally.

### 2. Map checks to the right hook

- `pre-commit` for fast staged-file hygiene.
- `commit-msg` for commit format policy.
- `pre-push` for broader local verification when justified.
- Keep each hook narrowly focused on the quality gate it owns.

### 3. Design for developer reality

- Make hook output clear and actionable.
- Keep runtimes short enough that developers do not normalize bypassing them.
- Scope checks to staged or impacted files when possible.
- Ensure local tooling requirements are explicit and reproducible.

### 4. Define bypass and escalation policy

- Allow emergency bypass only when the team understands the risk.
- Treat repeated bypass usage as a policy or tooling failure.
- Keep CI as the final source of truth for merge protection.
- Document what is enforced locally versus what is enforced centrally.

### 5. Maintain the hook system

- Remove dead or redundant hooks when CI or tooling changes.
- Keep hook scripts readable and versioned with the codebase.
- Revisit performance and false-positive pain regularly.
- Avoid letting hooks become a hidden maze of wrappers and shell fragments.

## Decision Rules

| Situation | Action |
| --- | --- |
| Check is fast and prevents common local mistakes | Put it in a hook. |
| Check is slow, flaky, or environment-sensitive | Keep it in CI or an explicit local command instead. |
| Policy is about commit format | Use `commit-msg`, not `pre-commit`. |
| Developers keep bypassing one hook | Reduce cost, improve signal, or move the check. |
| Staged-file scoping is possible | Prefer it over whole-repo work in commit-time hooks. |

## Quality Bar

- Hooks should protect clear quality properties with minimal friction.
- Each hook should have one understandable job.
- Local failures should be fixable from the hook output alone.
- Hook policy should complement CI rather than duplicate it blindly.
- The system should remain maintainable as the repository evolves.

## Avoid These Failure Modes

- Do not run heavy full-project builds in `pre-commit` by default.
- Do not hide complex logic in opaque scripts nobody can debug.
- Do not enforce policies locally that CI contradicts or ignores.
- Do not treat bypasses as acceptable steady-state behavior.
- Do not let hooks depend on undeclared local setup assumptions.

## References

- Hook design and placement guide: `references/git-hooks-playbook.md`
- Hook governance checklist: `references/git-hooks-checklist.md`

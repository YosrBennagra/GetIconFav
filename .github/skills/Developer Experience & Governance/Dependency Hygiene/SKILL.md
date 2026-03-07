---
name: dependency-hygiene
description: 'Use when requests involve dependency sprawl, stale packages, update policy, third-party library risk, package cleanup, or improving the safety and maintainability of dependency management. Design and enforce healthy dependency practices across repositories and monorepos: package selection, upgrade cadence, transitive risk, unused dependency removal, ownership, and compatibility discipline.'
---

# Dependency Hygiene

## Overview

Dependencies are part of the codebase’s risk and maintenance surface, not free implementation shortcuts.
Prefer a deliberate package strategy, regular cleanup, and controlled upgrades so the dependency graph stays understandable, secure, and cheap to maintain.

## Follow This Workflow

### 1. Evaluate dependency need first

- Confirm whether the package solves a real repeated problem.
- Compare adoption cost, lock-in, ecosystem health, and long-term maintenance burden against writing or keeping a simpler in-house solution.
- Avoid adding packages for tiny conveniences that expand the operational and security surface disproportionately.

### 2. Define ownership and placement

- Keep runtime, build, test, and repo-tooling dependencies clearly separated.
- Assign a logical owning package or workspace for each dependency.
- Avoid redundant copies of the same dependency role across unrelated parts of the repo without reason.

### 3. Govern updates and removal

- Update dependencies on a regular cadence before emergency upgrades dominate.
- Remove unused or redundant packages promptly.
- Review breaking changes, transitive risk, and generated-code impacts before major upgrades.
- Keep lockfile and version policy consistent across the repo.

### 4. Manage risk intentionally

- Track security posture, maintenance activity, and compatibility health.
- Avoid overexposure to unstable or poorly maintained packages without a fallback plan.
- Keep transitive dependency surprises visible where they affect runtime or compliance.
- Prefer fewer packages with clearer purpose over many overlapping ones.

### 5. Re-check ongoing value

- Verify that dependencies continue to earn their place.
- Reduce wrapper utilities that merely mirror third-party APIs without insulation value.
- Retire abandoned packages before they become migration emergencies.

## Decision Rules

| Situation | Action |
| --- | --- |
| Package solves a small convenience only | Prefer a simpler local implementation unless repeated value clearly outweighs the cost. |
| Dependency is widely used across the repo | Treat upgrade planning and compatibility carefully before changing it. |
| Package is unused or duplicated | Remove it rather than leaving dead weight in the graph. |
| Maintainer health or security posture is poor | Replace, isolate, or reduce reliance deliberately. |
| Major upgrade offers value but risks broad breakage | Plan, test, and phase it instead of drifting indefinitely. |

## Quality Bar

- Every dependency should have a clear purpose and owner.
- Update and removal decisions should be intentional rather than reactive.
- Runtime risk and maintenance burden should be visible in package choices.
- The graph should avoid overlapping libraries that solve the same problem differently.
- Security and compatibility review should be part of normal dependency work.

## Avoid These Failure Modes

- Do not add packages because they are popular without a concrete need.
- Do not leave unused dependencies in the repo after the code path disappears.
- Do not ignore stale versions until emergency security updates become painful.
- Do not duplicate similar packages across the workspace without clear boundaries.
- Do not assume transitive dependencies are someone else’s problem.

## References

- Dependency governance guide: `references/dependency-hygiene-playbook.md`
- Dependency review checklist: `references/dependency-hygiene-checklist.md`

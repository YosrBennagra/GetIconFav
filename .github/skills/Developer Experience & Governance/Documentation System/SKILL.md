---
name: documentation-system
description: 'Use when requests involve documentation strategy, README drift, engineering handbooks, runbooks, architecture docs, contributor guidance, or making docs trustworthy and easy to navigate. Design and maintain engineering documentation systems: doc ownership, information architecture, reference versus how-to separation, change coupling, review, and discoverability across repositories or monorepos.'
---

# Documentation System

## Overview

Documentation is an operational system for shared knowledge, not a pile of markdown files.
Prefer clear information architecture, ownership, and update discipline so docs remain searchable, trustworthy, and appropriately close to the code or process they describe.

## Follow This Workflow

### 1. Define the documentation layers

- Quick-start or onboarding docs.
- Task-oriented how-to guides.
- Reference material.
- Architecture or decision records.
- Operational runbooks and incident procedures.
- Keep each document type serving one main purpose.

### 2. Place docs intentionally

- Keep local docs near the code or workflow they explain when tight coupling matters.
- Keep broader cross-cutting guidance in a shared docs surface.
- Avoid duplicating the same guidance in many locations just to improve discoverability.

### 3. Design navigation and discoverability

- Use predictable titles and directory structure.
- Keep table-of-contents, cross-links, and reference paths explicit where the doc set is non-trivial.
- Make it clear where a contributor should start for setup, changes, operations, or architecture.

### 4. Tie docs to change workflow

- Update docs in the same change when the behavior, API, runbook, or workflow changes.
- Assign ownership for high-risk docs such as setup, deploy, migration, or incident guidance.
- Retire stale docs instead of leaving contradictory history visible as current truth.

### 5. Re-check trustworthiness

- Ensure examples still match the real system.
- Ensure scripts, commands, and links still work.
- Reduce overlap where two docs keep drifting apart.
- Keep docs concise enough that people will actually use them.

## Decision Rules

| Situation | Action |
| --- | --- |
| Guidance explains one code area tightly | Keep it near that code or module. |
| Guidance spans many systems or teams | Use a shared docs surface with clear links. |
| Same rule appears in several docs | Choose one source of truth and link to it. |
| Behavior change lands without doc update | Treat that as incomplete change work. |
| A doc has become a historical artifact, not current guidance | Archive, supersede, or delete it clearly. |

## Quality Bar

- Every document should have a clear purpose and audience.
- Current docs should be distinguishable from historical context.
- Navigation should help new contributors find the right depth quickly.
- Examples and commands should remain trustworthy.
- Ownership and update expectations should be explicit for high-risk docs.

## Avoid These Failure Modes

- Do not duplicate the same guidance across many files without one clear source of truth.
- Do not keep stale setup or operational docs visible as current guidance.
- Do not mix how-to, reference, and rationale in one confusing document without structure.
- Do not rely on tribal knowledge for critical operational tasks.
- Do not expand the docs surface faster than it can be maintained.

## References

- Documentation architecture guide: `references/documentation-playbook.md`
- Documentation review checklist: `references/documentation-checklist.md`

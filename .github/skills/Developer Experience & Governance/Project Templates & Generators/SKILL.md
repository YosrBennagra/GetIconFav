---
name: project-templates-generators
description: 'Use when requests involve bootstrapping new packages or apps, internal generators, scaffolding workflows, reducing repetitive setup work, or turning repeated implementation patterns into reusable tooling. Design and maintain project templates and code generators for repeatable engineering setup: scaffolds, starter files, codemods, template parameters, safe defaults, and drift management.'
---

# Project Templates & Generators

## Overview

Templates and generators should encode proven defaults and reduce repetitive setup, not mass-produce stale boilerplate.
Prefer narrow, composable scaffolds with safe defaults, clear parameters, and update discipline so generated output remains useful after the first week.

## Follow This Workflow

### 1. Confirm the repeated pattern

- Identify what people are recreating often: package skeletons, routes, components, services, config files, docs, or workflow scripts.
- Ensure the pattern is stable enough to template without freezing immature architecture.
- Keep one-off or rapidly evolving experimentation out of generator logic until it settles.

### 2. Design the template contract

- Define required inputs, optional parameters, generated files, and defaults.
- Keep generated structure minimal but complete enough to be productive.
- Make the template reflect current team conventions, not an outdated snapshot.

### 3. Build for maintainability

- Keep templates readable and easy to change.
- Extract shared template fragments only when they reduce duplication without making generation flow opaque.
- Prefer deterministic generation over interactive sprawl where reproducibility matters.
- Keep generators aligned with workspace, linting, testing, and documentation standards.

### 4. Manage drift and evolution

- Review generated output periodically against current best practice.
- Version or migrate templates when old output would otherwise persist forever.
- Use codemods or follow-up generators when existing generated code must evolve safely.
- Remove obsolete templates instead of supporting every historical variation indefinitely.

### 5. Re-check developer experience

- Ensure generated output is understandable to maintainers who did not write the generator.
- Keep defaults safe and production-aware.
- Validate that running the generator actually saves time compared with hand-creating the pattern.

## Decision Rules

| Situation | Action |
| --- | --- |
| Pattern is repeated frequently and has stable conventions | Use a template or generator. |
| Pattern is still changing rapidly | Wait or keep the scaffold narrow until it stabilizes. |
| Template needs many optional branches | Split into smaller generators or variants rather than one mega-generator. |
| Generated output drifts from repo standards | Update the template and plan migrations where needed. |
| Generator hides too much complexity from maintainers | Simplify the output or the generator contract. |

## Quality Bar

- Generated code should be understandable, not magical.
- Defaults should match current standards and workflows.
- Templates should save meaningful time without locking teams into stale patterns.
- Drift should be manageable with explicit update strategy.
- The generator contract should remain small enough to reason about.

## Avoid These Failure Modes

- Do not template unstable architectural experiments.
- Do not create giant generators with many hidden branches and side effects.
- Do not let template output drift from current lint, test, or workspace conventions.
- Do not optimize for scaffold speed while producing confusing output.
- Do not keep outdated templates alive just to avoid cleanup work.

## References

- Template and generator guide: `references/templates-generators-playbook.md`
- Generator review checklist: `references/templates-generators-checklist.md`

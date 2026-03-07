---
name: folder-module-organization
description: 'Use when requests involve reorganizing codebases, creating new modules, feature-based structure, layering, package boundaries, or reducing cross-module coupling. Design and refactor project structure for maintainability: choose folder boundaries, module ownership, public APIs, dependency direction, and naming conventions across applications, services, packages, or monorepos.'
---

# Folder & Module Organization

## Overview

Organize code so ownership, dependency direction, and reuse are obvious from the file tree.
Prefer structures that make common changes local and architectural violations visible.

## Follow This Workflow

### 1. Read the change patterns

- Identify what changes together most often.
- Identify the highest-friction navigation paths in the current structure.
- Distinguish product domains from technical utilities and platform glue.

### 2. Choose the organizing axis

- Domain or feature first when teams ship user-facing workflows.
- Layer first only when the codebase is genuinely small or highly uniform.
- Package boundaries when deployment, ownership, or release cadence differs.
- Use one primary organizing principle; mix-ins are fine, but avoid competing top-level schemes.

### 3. Define module boundaries

- Give each module one clear responsibility and a stable public surface.
- Keep internal implementation private behind index files or explicit exports.
- Make dependency direction intentional and easy to explain.
- Put shared code in shared modules only after proving it is truly shared.

### 4. Establish folder conventions

- Use predictable names for routes, features, domain modules, UI primitives, and infrastructure code.
- Keep test, fixture, and story locations consistent with the team workflow.
- Decide where configuration, scripts, migrations, and docs live so contributors do not improvise.

### 5. Refactor gradually

- Move one boundary at a time.
- Preserve imports with adapters, barrels, or thin compatibility shims when needed.
- Remove dead abstractions and duplicate utilities during the reorganization.
- Update path aliases only when they genuinely reduce complexity.

### 6. Verify the structure

- Check whether a new engineer can find the owner module quickly.
- Check whether common feature changes stay inside a small set of directories.
- Check whether dependency violations are harder, not easier, after the change.

## Decision Rules

| Situation | Action |
| --- | --- |
| Small codebase with one main product flow | Keep the structure simple; avoid premature package splitting. |
| Fast-growing product with distinct features | Organize primarily by domain or feature area. |
| Shared utilities keep accumulating product logic | Move that logic back into the owning feature module. |
| Many folders mirror architecture layers but features cross all of them | Re-slice around feature boundaries. |
| Module imports require deep relative paths everywhere | Consider stable public entry points or path aliases. |

## Quality Bar

- A module name should imply why it exists.
- Public APIs should be smaller and more stable than internals.
- Dependency direction should be explainable without exceptions.
- Shared code should be generic in both name and ownership, not merely reused twice.
- The structure should reduce coordination cost for common changes.

## Avoid These Failure Modes

- Do not create `utils` or `common` as dumping grounds.
- Do not organize by framework artifact alone if it obscures product ownership.
- Do not over-split into micro-packages without independent lifecycle or ownership.
- Do not hide side effects behind innocent-looking shared helpers.
- Do not keep legacy structure and new structure active indefinitely without a migration path.

## References

- Structure selection patterns: `references/organization-patterns.md`
- Module review and dependency checklist: `references/module-boundary-checklist.md`

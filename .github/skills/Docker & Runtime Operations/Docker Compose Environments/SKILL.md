---
name: docker-compose-environments
description: 'Use when requests involve docker compose files, local or ephemeral stacks, service orchestration, environment-specific compose variants, or making multi-container development environments reliable and maintainable. Design and operate Docker Compose environments for local development, testing, and small multi-service runtime stacks: service boundaries, profiles, environment layering, dependency startup, healthchecks, volumes, networks, and override strategy.'
---

# Docker Compose Environments

## Overview

Docker Compose is for expressing multi-service environments coherently, not merely starting a pile of containers.
Prefer explicit service contracts, environment layering, health-aware startup, and scoped overrides so local and ephemeral stacks stay predictable.

## Follow This Workflow

### 1. Define the environment purpose

- Clarify whether the stack is for local development, CI, ephemeral review, integration testing, or operational support.
- Include only the services needed for that purpose.
- Separate always-on dependencies from optional tooling such as dashboards, seed jobs, or debugging helpers.

### 2. Model services and dependencies clearly

- Give each service one well-defined role.
- Use networks, ports, and volumes intentionally.
- Express startup dependencies carefully and prefer health-aware readiness where actual dependency availability matters.
- Avoid treating service order as the only correctness mechanism.

### 3. Layer configuration and overrides

- Use a base Compose file for common behavior and environment-specific overrides or profiles for optional variation.
- Keep environment variables and secrets scoped by service and environment.
- Prevent local convenience settings from silently leaking into CI or production-like stacks.

### 4. Manage data and state explicitly

- Choose named volumes, bind mounts, tmpfs, or ephemeral storage based on the workflow.
- Know which state should persist between runs and which should reset.
- Keep destructive reset or rebuild workflows explicit and easy to understand.

### 5. Re-check operability

- Add healthchecks when dependent services need a signal more meaningful than "container started."
- Make logs, ports, and shell access discoverable.
- Keep teardown, rebuild, and reset operations documented in the workflow.
- Watch for network conflicts, orphaned volumes, and stale containers.

## Decision Rules

| Situation | Action |
| --- | --- |
| Environment has optional supporting services | Use profiles or overrides rather than one always-on stack. |
| App depends on database readiness, not just container startup | Add healthchecks and readiness-aware dependency handling. |
| Local development needs source-code live editing | Use bind mounts carefully and keep production-like concerns separate. |
| CI stack must be clean and deterministic | Prefer ephemeral state and explicit teardown. |
| One compose file is accumulating conflicting environment assumptions | Split common and environment-specific concerns with overrides or profiles. |

## Quality Bar

- Each service should have a clear purpose and dependency model.
- Environment variation should be explicit, not hidden in ad hoc local edits.
- Data persistence and reset semantics should be easy to explain.
- Healthchecks should reflect meaningful readiness where required.
- Compose files should stay small enough to review and evolve safely.

## Avoid These Failure Modes

- Do not include every optional service in every environment by default.
- Do not rely on container start order as proof of readiness.
- Do not mix production-like secrets and local convenience values casually.
- Do not let named volumes and bind mounts accumulate without ownership or reset strategy.
- Do not force one compose file to serve every environment without clear layering.

## References

- Compose environment guide: `references/compose-environments-playbook.md`
- Compose review checklist: `references/compose-environments-checklist.md`

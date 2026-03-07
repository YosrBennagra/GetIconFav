---
name: runtime-configuration
description: 'Use when requests involve container runtime env vars, startup options, config drift, secret injection, parameterizing services, or separating image build concerns from deployment-time configuration. Design runtime configuration for containerized applications: environment variables, config files, secret injection, startup contracts, port binding, resource limits, and environment-specific behavior without rebuilding images.'
---

# Runtime Configuration

## Overview

Container images should be reusable across environments; runtime configuration tells them where and how to run.
Prefer explicit runtime contracts for environment variables, secrets, ports, limits, and startup assumptions so deployments stay predictable without rebuilding images for every environment.

## Follow This Workflow

### 1. Separate build-time from runtime concerns

- Keep compile-time or image-construction decisions out of runtime env where possible.
- Inject environment-specific values at runtime rather than baking them into the image.
- Distinguish public configuration, private secrets, and operational toggles explicitly.

### 2. Define the runtime contract

- Required and optional environment variables.
- Port bindings and exposed interfaces.
- Startup commands, entrypoints, and arguments.
- Files, directories, and writable paths the process expects.
- Resource limits, reservations, and operational knobs where the runtime supports them.

### 3. Scope configuration safely

- Use defaults only when they are safe and non-surprising.
- Keep secrets in dedicated secret management or runtime injection mechanisms.
- Scope variables by service and environment.
- Avoid overloading one variable with several unrelated meanings.

### 4. Review startup and lifecycle behavior

- Ensure the process starts cleanly from the provided configuration alone.
- Make failure on missing required configuration obvious and early.
- Handle SIGTERM, graceful shutdown, and port/listen behavior intentionally.
- Keep runtime assumptions compatible with orchestration and local development where both matter.

### 5. Re-check drift and operability

- Keep example env files or runtime docs aligned with actual application requirements.
- Remove obsolete variables and flags as the app evolves.
- Make operators able to tell which values matter without reading the full source tree.

## Decision Rules

| Situation | Action |
| --- | --- |
| Setting changes by environment but not by code build | Keep it in runtime configuration, not the image. |
| Value is sensitive | Inject it through secret-aware runtime mechanisms and keep it out of logs and images. |
| Missing value should prevent startup | Fail fast with a clear error instead of guessing a fallback. |
| One setting bundles multiple behaviors | Split it into clearer runtime controls. |
| Different environments need different runtime shape | Keep the image stable and vary deployment-time config only. |

## Quality Bar

- The image should not need rebuilding for ordinary environment changes.
- Required configuration should be explicit and validated early.
- Secrets and non-secrets should be handled differently and intentionally.
- Runtime knobs should be understandable to operators.
- Old or unused configuration should not linger indefinitely.

## Avoid These Failure Modes

- Do not bake environment-specific secrets or endpoints into the image.
- Do not rely on undocumented defaults that differ across environments.
- Do not silently ignore missing required configuration.
- Do not overload `.env`-style files as the only documentation of runtime contract.
- Do not make startup behavior depend on hidden working-directory or writable-path assumptions.

## References

- Runtime config guide: `references/runtime-configuration-playbook.md`
- Runtime config review checklist: `references/runtime-configuration-checklist.md`

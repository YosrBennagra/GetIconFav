---
name: configuration-as-code
description: 'Use when requests involve configuration strategy, env design, deployment settings, runtime toggles, config drift, or making operational behavior explicit and repeatable. Design and manage application configuration as versioned, validated code: environment variables, config files, feature flags, defaults, schema validation, environment layering, and secret boundaries.'
---

# Configuration-as-Code

## Overview

Treat configuration as a designed system, not an accumulation of ad hoc environment variables.
Prefer typed, validated, versioned configuration with clear ownership and safe environment layering.

## Follow This Workflow

### 1. Inventory the configuration surface

- Identify all runtime inputs: environment variables, config files, feature flags, secrets, and deployment platform settings.
- Separate operator-controlled configuration from developer convenience settings.
- Distinguish stable defaults from per-environment overrides.

### 2. Classify each value

- Secret versus non-secret.
- Build-time versus runtime.
- Required versus optional.
- Static versus frequently changed.
- Global versus service- or feature-specific.

### 3. Define the loading model

- Choose the source order intentionally.
- Keep local development, CI, staging, and production behavior explicit.
- Centralize parsing and validation close to startup.
- Fail fast for required values that are missing or invalid.

### 4. Design safety boundaries

- Keep secrets out of source control and logs.
- Prevent accidental production defaults in local environments.
- Document sensitive or dangerous toggles.
- Define which changes require restart, redeploy, or coordinated rollout.

### 5. Reduce drift

- Keep example env files and documentation aligned with actual runtime expectations.
- Remove obsolete configuration instead of leaving dead flags behind.
- Version configuration contract changes alongside the code that depends on them.

### 6. Verify the system

- Check startup validation behavior.
- Check environment-specific differences.
- Check that defaults are safe, minimal, and unsurprising.
- Check that operators can discover what each variable controls.

## Decision Rules

| Situation | Action |
| --- | --- |
| Value controls sensitive credentials | Keep it secret-only, never commit it, and validate presence explicitly. |
| Value changes per environment but not per request | Use environment-level config, not user-facing feature flags. |
| Value affects gradual rollout or experimentation | Treat it as a feature flag with clear ownership and expiry. |
| Many flags accumulate around one feature | Consolidate or retire them before they become shadow architecture. |
| Config is hard to reason about | Centralize loading and publish the effective contract. |

## Quality Bar

- Every config key should have one owner and one meaning.
- Validation should happen before business logic executes.
- Secrets should never need to appear in code comments, screenshots, or logs.
- Environment layering should be deterministic and documented.
- Default values should be safe enough for their intended environment.

## Avoid These Failure Modes

- Do not scatter `process.env` access across the codebase.
- Do not rely on undocumented platform settings as architecture.
- Do not use feature flags as a substitute for clear product decisions.
- Do not keep obsolete config after the behavior is gone.
- Do not make production behavior depend on silent fallbacks.

## References

- Layering and ownership guidance: `references/config-layering-playbook.md`
- Config schema and review checklist: `references/config-review-checklist.md`

---
name: dockerfile-best-practices
description: 'Use when requests involve writing or refactoring Dockerfiles, shrinking image size, improving build speed, hardening container images, or standardizing container build patterns. Design and optimize Dockerfiles for secure, efficient, repeatable container images: layer strategy, multi-stage builds, base image choice, caching, non-root runtime, dependency installation, build context control, and runtime minimization.'
---

# Dockerfile Best Practices

## Overview

A Dockerfile is a build contract for an artifact, not just a shell script with layers.
Prefer small, reproducible, least-privilege images with deliberate build stages and cache behavior so builds stay fast and runtime images stay predictable.

## Follow This Workflow

### 1. Choose the image strategy

- Pick a base image that matches runtime needs, security posture, and ecosystem compatibility.
- Decide whether a multi-stage build is warranted. It usually is for compiled assets, package installation, or build tooling separation.
- Keep the final runtime image as small and purpose-specific as practical.

### 2. Structure layers intentionally

- Put stable, cache-friendly steps earlier.
- Copy dependency manifests before application source when dependency install cost is significant.
- Minimize invalidation of expensive layers by grouping commands carefully.
- Keep build arguments, environment variables, and generated artifacts from expanding cache churn unnecessarily.

### 3. Separate build and runtime concerns

- Install compilers, package managers, and heavy toolchains in builder stages when they are not needed at runtime.
- Copy only the final application artifacts and required runtime dependencies into the final image.
- Keep secrets out of image layers and history.

### 4. Harden the runtime image

- Run as a non-root user unless a real operational constraint prevents it.
- Expose only the environment variables, ports, files, and binaries needed to run.
- Keep filesystem writes, package managers, and shell tooling out of the runtime image when not required.
- Treat health, startup, and graceful shutdown behavior as runtime concerns, not afterthoughts.

### 5. Re-check reproducibility and maintenance

- Pin versions or image families deliberately enough for predictable rebuilds.
- Control build context with `.dockerignore`.
- Keep the Dockerfile readable enough that future changes remain safe.
- Revisit base image and dependency choices when security or runtime assumptions change.

## Decision Rules

| Situation | Action |
| --- | --- |
| Build needs compilers or package tooling | Use multi-stage builds and keep the final image lean. |
| Image rebuilds are slow because dependency steps keep invalidating | Reorder `COPY` and install layers to preserve cache. |
| Runtime needs minimal attack surface | Use a slimmer runtime image and non-root execution. |
| Build requires secrets or credentials | Use secure build-time mechanisms rather than baking secrets into layers. |
| One Dockerfile supports many environments poorly | Keep one clear build contract and inject runtime differences through configuration, not diverging images. |

## Quality Bar

- Runtime images should contain only what the workload needs.
- Build layers should reflect cache and maintenance strategy deliberately.
- Base image and package choices should be explainable.
- Non-root execution and minimal privileges should be the default posture.
- The Dockerfile should be reviewable as infrastructure code, not opaque plumbing.

## Avoid These Failure Modes

- Do not use one-stage images that ship compilers and build tools unnecessarily.
- Do not copy the entire repository before dependency resolution when cache efficiency matters.
- Do not run the container as root by habit.
- Do not leak secrets through `ARG`, `ENV`, copied files, or build history carelessly.
- Do not let `.dockerignore` drift until builds become slow and images contain irrelevant files.

## References

- Dockerfile design guide: `references/dockerfile-playbook.md`
- Dockerfile review checklist: `references/dockerfile-checklist.md`

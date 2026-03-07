# Dockerfile Playbook

## Core Patterns

- Multi-stage builds for build/runtime separation.
- Cache-friendly dependency installation.
- Small runtime images.
- Non-root runtime users.
- Minimal copied artifacts.

## Layer Rules

- Copy manifest files before source when dependency install is expensive.
- Keep stable steps early.
- Group commands to reflect cache strategy, not only aesthetics.
- Use `.dockerignore` aggressively to reduce build context noise.

## Runtime Rules

- Copy only required output and runtime dependencies.
- Avoid leaving package managers and compilers in the final image.
- Keep runtime users non-root by default.
- Expose only required ports and environment assumptions.

## Security Rules

- Do not bake secrets into layers.
- Revisit base image freshness and vulnerability posture regularly.
- Treat Dockerfiles as part of the security review surface.

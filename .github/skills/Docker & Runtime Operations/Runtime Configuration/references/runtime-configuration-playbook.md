# Runtime Configuration Playbook

## Core Contract Areas

- Required environment variables.
- Optional environment variables with safe defaults.
- Secret injection paths.
- Port and interface binding.
- Startup commands and entrypoints.
- Writable paths and file expectations.

## Separation Rules

- Build the image once; configure it at runtime.
- Keep secrets out of the image and build history.
- Treat environment-specific endpoints, credentials, and flags as deploy-time inputs.

## Startup Rules

- Fail fast on missing required configuration.
- Make health and shutdown behavior compatible with the runtime platform.
- Keep startup assumptions explicit and minimal.

## Drift Rules

- Keep example envs and docs aligned with reality.
- Remove unused variables as code evolves.
- Make runtime behavior understandable without reading every source file.

# Secrets Playbook

## Core Controls

- Environment-specific secrets.
- Least-privilege read access.
- Strong generation.
- Practical rotation and revocation.
- Safe handling in logs, CI, and runtime.

## Storage Rules

- Keep secrets in a secret manager or secured deployment environment.
- Avoid broad team-wide visibility where not necessary.
- Scope secrets narrowly by system and environment.

## Rotation Rules

- Rotate on compromise, provider requirement, or planned cadence.
- Support staged rotation when dependencies are distributed.
- Keep clear owners for each secret and its dependent systems.

## Exposure Rules

- Never log raw secrets.
- Keep secrets out of client bundles.
- Remove accidental leaks from artifacts, screenshots, and docs quickly.

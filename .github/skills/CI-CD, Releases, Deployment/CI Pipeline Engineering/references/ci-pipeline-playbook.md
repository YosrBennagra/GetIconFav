# CI Pipeline Playbook

## Core Pipeline Layers

- Fast branch protection checks.
- Deeper verification jobs.
- Artifact production when needed.
- Optional scheduled or manual maintenance jobs.

## Job Graph Rules

- Keep independent checks parallel where practical.
- Keep dependencies explicit.
- Fail early on invalidating issues.
- Preserve debugging artifacts for later jobs or triage.

## Performance Rules

- Cache dependencies and expensive deterministic setup.
- Avoid repeating full installs or builds across jobs without need.
- Measure runtime and flakiness regularly.

## Maintenance Rules

- Keep workflows readable.
- Reuse logic with care.
- Remove stale or duplicative jobs.
- Scope secrets to the narrowest necessary job set.

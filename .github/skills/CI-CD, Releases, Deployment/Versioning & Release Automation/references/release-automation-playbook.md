# Release Automation Playbook

## Core Release Steps

- Determine version.
- Generate changelog or release notes.
- Tag the release.
- Build and publish artifacts.
- Record release status and readiness.

## Versioning Rules

- Define what triggers major, minor, and patch changes if using semantic versioning.
- Document pre-release handling.
- Keep hotfix release flow explicit.

## Automation Rules

- Derive release metadata from trusted inputs.
- Keep tags and artifact publication reproducible.
- Make reruns safe or clearly controlled.
- Keep manual approval points explicit where required.

## Recovery Rules

- Distinguish rollback from forward-fix patch release.
- Keep failed release attempts auditable.
- Define how partial publication is detected and repaired.

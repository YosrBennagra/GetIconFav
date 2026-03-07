---
name: versioning-release-automation
description: 'Use when requests involve release automation, version bumps, changelog policy, tagged releases, semantic versioning, or reducing manual error in the release process. Design and automate versioning and release workflows: semantic versioning, changelog generation, release branches or tags, release notes, artifact publishing, and promotion readiness gates across libraries, services, and applications.'
---

# Versioning & Release Automation

## Overview

Release automation should reduce ambiguity and manual error around what is shipping, why the version changed, and what artifacts are trusted.
Design versioning, changelog generation, tagging, and publishing as one coherent release contract rather than separate scripts and rituals.

## Follow This Workflow

### 1. Define the release model

- Decide whether releases are driven by tags, protected branches, merge events, or manual approvals.
- Clarify whether the system publishes applications, libraries, containers, or multiple artifact types.
- Choose the versioning policy deliberately: semantic versioning, date-based versions, or another explicit scheme.

### 2. Map version changes to source changes

- Define what counts as breaking, feature, fix, or internal-only change.
- Align commit or PR metadata with the release categorization model where automation depends on it.
- Keep pre-release and hotfix workflows explicit.

### 3. Automate the release steps

- Calculate or approve the version.
- Generate changelog or release notes from trusted inputs.
- Create tags and immutable release records.
- Build, sign, or publish artifacts with clear provenance where applicable.
- Keep promotion to production or package registries gated by explicit readiness checks.

### 4. Handle rollback and correction

- Define what happens when a bad release is detected after tagging or publishing.
- Distinguish artifact rollback, deployment rollback, and follow-up patch release.
- Keep release history auditable even when automation fails partway through.

### 5. Re-check maintainability

- Ensure humans can understand the automation path without reverse-engineering a long shell script.
- Keep release steps idempotent or safely restartable where possible.
- Remove manual version-editing steps that automation is meant to replace.

## Decision Rules

| Situation | Action |
| --- | --- |
| Consumers depend on compatibility guarantees | Use a clear semantic versioning policy and honor it. |
| Releases include several artifact types | Keep one authoritative release record with artifact mapping. |
| Team relies on commit or PR metadata for release notes | Enforce those inputs consistently before automating from them. |
| Publish step partially fails | Make rerun and recovery behavior explicit before normalizing automation. |
| Version bump logic is contentious | Document the policy and automate from the agreed contract rather than ad hoc debate. |

## Quality Bar

- Version changes should communicate meaningful compatibility expectations.
- Release notes should be derived from trustworthy inputs.
- Tagging and publishing should be reproducible and auditable.
- Automation should reduce manual error, not hide release state.
- Recovery from partial failure should be understandable.

## Avoid These Failure Modes

- Do not version by habit without a documented policy.
- Do not generate changelogs from inconsistent metadata inputs.
- Do not make published artifacts depend on mutable post-tag state.
- Do not hide manual edits inside an "automated" release flow.
- Do not treat rollback as an afterthought.

## References

- Release automation guide: `references/release-automation-playbook.md`
- Release workflow review checklist: `references/release-automation-checklist.md`

---
name: preview-deployments
description: 'Use when requests involve preview URLs, review environments, branch deployment safety, staging-like validation for unmerged changes, or making feature review faster without risking production resources. Design and operate preview deployments for pull requests and feature branches: ephemeral environments, branch-based previews, environment scoping, secrets boundaries, data safety, teardown, and review workflows.'
---

# Preview Deployments

## Overview

Preview deployments let teams validate changes in a live environment before promotion, but they are still deployment surfaces with security, cost, and data-safety consequences.
Design them as isolated review environments, not as accidental copies of production.

## Follow This Workflow

### 1. Define the preview purpose

- Clarify whether previews serve UI review, integration verification, QA sign-off, stakeholder demos, or all of the above.
- Decide which branches or pull requests should receive previews automatically.
- Keep preview coverage aligned with the kinds of regressions local CI cannot catch.

### 2. Design the environment boundary

- Separate preview configuration, secrets, storage, and external integrations from production.
- Define what data sources previews may access.
- Prefer sanitized, seeded, or isolated data over shared production data.
- Make domain or URL naming predictable and safe.

### 3. Control lifecycle and automation

- Trigger previews on the right branch or PR events.
- Update previews as commits change.
- Tear previews down when the branch closes or the environment ages out.
- Keep environment provisioning and cleanup deterministic enough to avoid orphaned resources.

### 4. Make review actionable

- Surface the preview URL and deployment status clearly in the review workflow.
- Keep logs, health signals, and basic diagnostics reachable.
- Define what constitutes preview-ready versus preview-broken.
- Distinguish review-environment failures from code failures and provisioning failures.

### 5. Re-check safety and cost

- Prevent preview environments from sending real emails, charging cards, or mutating production services unless explicitly intended.
- Scope secrets and permissions to preview needs only.
- Watch cost, idle resource sprawl, and noisy environment creation.

## Decision Rules

| Situation | Action |
| --- | --- |
| Change primarily affects UI or routing | Use a preview deployment for realistic review. |
| Preview would point at production-side effects | Isolate or stub those integrations before enabling. |
| Branch churn is high and previews are expensive | Limit auto-creation scope or enforce expiration aggressively. |
| Stakeholders need stable demo URLs | Provide predictable naming with controlled lifetime and clear non-production labeling. |
| Preview failures are hard to diagnose | Improve environment observability before scaling rollout. |

## Quality Bar

- Preview environments should be clearly non-production.
- Secrets, data, and integrations should be safely scoped.
- Lifecycle automation should clean up after itself.
- Reviewers should be able to tell quickly whether a preview reflects the latest commit and whether it is healthy.
- Preview value should outweigh environment complexity and cost.

## Avoid These Failure Modes

- Do not let previews share unrestricted production secrets or databases.
- Do not keep orphaned environments running indefinitely.
- Do not assume every branch needs a preview by default.
- Do not make review depend on unstable manual provisioning.
- Do not blur preview success with production readiness without promotion criteria.

## References

- Preview environment playbook: `references/preview-deployments-playbook.md`
- Preview review checklist: `references/preview-deployments-checklist.md`

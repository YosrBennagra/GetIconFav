---
name: error-tracking-strategy
description: 'Use when requests involve exception monitoring, production error triage, noisy alerting, error grouping, release regressions, or making failures observable without overwhelming the team. Design and operate application error tracking: capture strategy, severity triage, fingerprinting, alert routing, release correlation, redaction, and remediation workflow across frontend, backend, jobs, and integrations.'
---

# Error Tracking Strategy

## Overview

Error tracking is for turning failures into actionable remediation, not for collecting an endless graveyard of stack traces.
Prefer clear capture boundaries, good grouping, release context, and ownership so teams can detect regressions and fix the right failures quickly.

## Follow This Workflow

### 1. Define what should be captured

- Unhandled exceptions and promise rejections.
- Handled errors that still represent degraded user or business outcomes.
- Frontend, backend, worker, and integration boundary failures.
- Exclude ordinary validation rejections or expected business outcomes unless they matter operationally.

### 2. Attach useful context

- Environment, release version, service, route, user or tenant scope when safe, and correlation identifiers.
- Request or job context, feature flags, and deployment metadata when they materially help diagnosis.
- Keep privacy boundaries explicit and avoid leaking secrets or unnecessary personal data.

### 3. Improve grouping and signal quality

- Use stable fingerprints or grouping logic when default grouping is too noisy or too coarse.
- Separate one-off noisy integrations from high-value core application failures.
- Keep handled warnings, expected cancellations, and real incidents distinct.
- Avoid duplicate capture across many layers of the same failure path.

### 4. Align alerting and response

- Page or alert only on errors with real user or system impact.
- Route ownership by service, feature, or runtime surface.
- Tie errors to release or deployment boundaries to identify regressions quickly.
- Keep dashboards, issue creation, and triage queues proportionate to actual risk.

### 5. Re-check remediation workflow

- Confirm someone owns the top recurring or severe failures.
- Confirm low-value noise gets reduced rather than normalized.
- Confirm fixes are verified against release context and post-deploy health.

## Decision Rules

| Situation | Action |
| --- | --- |
| Failure is expected and recoverable by contract | Log or measure it appropriately, but do not treat it as an error-tracking incident by default. |
| Error affects users but is caught | Capture it if the degradation still matters operationally. |
| Same incident is reported from many layers | Capture at the most actionable boundary and deduplicate upstream. |
| Noise comes from unstable third-party systems | Group, sample, or route it separately from core product failures. |
| New release increases error rate | Correlate with release metadata and prioritize regression analysis immediately. |

## Quality Bar

- Captured errors should lead to meaningful triage decisions.
- Context should help reproduce and localize the issue without overexposing data.
- Grouping should reduce noise while preserving distinct failure classes.
- Alerts should reflect real operational impact.
- Error tracking should connect naturally to release management and remediation.

## Avoid These Failure Modes

- Do not send every exception and warning to the same high-priority channel.
- Do not capture sensitive values, full tokens, or raw personal data casually.
- Do not group unrelated errors so aggressively that real distinctions disappear.
- Do not let duplicate capture across layers inflate incident noise.
- Do not leave chronic noisy errors unowned because the dashboard is already crowded.

## References

- Error tracking design guide: `references/error-tracking-playbook.md`
- Error triage review checklist: `references/error-tracking-checklist.md`

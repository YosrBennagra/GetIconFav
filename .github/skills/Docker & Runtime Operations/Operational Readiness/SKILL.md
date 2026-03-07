---
name: operational-readiness
description: 'Use when requests involve making a service production-ready, defining readiness and liveness behavior, tightening container runtime posture, or verifying that an app can be operated safely after deployment. Prepare containerized services for safe operation in real environments: healthchecks, startup and shutdown behavior, resource policy, logging, observability hooks, backups, recovery expectations, and runbook-oriented readiness checks.'
---

# Operational Readiness

## Overview

A service is not production-ready just because it starts successfully.
Operational readiness means the runtime behavior, failure modes, diagnostics, and recovery expectations are explicit enough that operators can trust and manage the workload safely.

## Follow This Workflow

### 1. Define the operating model

- Clarify how the service starts, becomes ready, handles traffic, degrades, and shuts down.
- Identify dependencies whose availability affects readiness.
- Define expected resource profile, scaling assumptions, and failure blast radius.

### 2. Establish runtime health signals

- Add healthchecks that reflect meaningful readiness or liveness, not just process existence.
- Expose logs, metrics, and diagnostics needed to triage common failures.
- Distinguish startup readiness from long-term health and dependency degradation where the platform supports it.

### 3. Harden failure and recovery behavior

- Handle graceful termination and in-flight work intentionally.
- Define restart behavior and when automatic restart is appropriate.
- Make backup, restore, migration, and disaster-recovery assumptions visible where the workload needs them.
- Document dependencies on external services, storage, and network reachability.

### 4. Review security and operations posture

- Run with least privilege and minimal writable surface.
- Keep resource constraints, port exposure, and secret handling explicit.
- Ensure operational tooling does not create hidden privileged access paths.
- Treat operational readiness as part of release safety, not post-release cleanup.

### 5. Validate real-world operability

- Test startup with realistic configuration.
- Test readiness under dependency delay where it matters.
- Check shutdown, restart, and stale-resource behavior.
- Confirm someone could diagnose a failing container from the available signals.

## Decision Rules

| Situation | Action |
| --- | --- |
| Service depends on a database or queue to serve traffic correctly | Reflect that dependency in readiness checks or startup gating deliberately. |
| Container can fail transiently and recover cleanly | Use restart policy and health signaling intentionally. |
| Process exits cleanly but workload is unhealthy | Improve health and readiness signals beyond process existence. |
| Service handles stateful or destructive operations | Define backup, restore, and shutdown expectations explicitly. |
| Operators cannot diagnose common failures from current signals | Improve logs, metrics, or health diagnostics before calling the service ready. |

## Quality Bar

- Readiness should reflect real service usefulness.
- Shutdown and restart behavior should be predictable.
- Operators should have enough signals to triage common incidents.
- Resource and privilege posture should be deliberate.
- Recovery assumptions should be explicit and tested enough for the risk level.

## Avoid These Failure Modes

- Do not confuse "container started" with "service is ready."
- Do not rely on restart loops as the primary remediation for bad configuration.
- Do not leave graceful shutdown undefined for services with in-flight work.
- Do not call a service ready when logs and health signals are too weak to debug incidents.
- Do not ignore backup or restore posture for stateful workloads.

## References

- Runtime readiness guide: `references/operational-readiness-playbook.md`
- Operational review checklist: `references/operational-readiness-checklist.md`

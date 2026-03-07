---
name: ci-pipeline-engineering
description: 'Use when requests involve CI workflows, GitHub Actions or similar automation, flaky pipelines, pipeline performance, build-and-test orchestration, or making repository validation reliable and maintainable. Design and evolve continuous integration pipelines for software repositories: job graph design, caching, parallelism, quality gates, secrets handling, artifact flow, and failure diagnostics across pull requests and protected branches.'
---

# CI Pipeline Engineering

## Overview

A CI pipeline is the repository’s automated quality contract, not just a place to run commands.
Design the job graph so validation is fast, trustworthy, and clear enough that failures guide remediation instead of creating ritual reruns.

## Follow This Workflow

### 1. Define the pipeline purpose

- Identify which events should trigger validation: pushes, pull requests, merge queues, release branches, tags, scheduled jobs, or manual runs.
- Separate fast merge-blocking checks from slower or optional deeper analysis.
- Decide which outcomes are mandatory to protect branch health.

### 2. Design the job graph intentionally

- Split jobs by independent concern: install, lint, typecheck, test, build, security, packaging, deployment readiness, or artifact publication.
- Parallelize where it reduces wall-clock time without making diagnostics harder.
- Use explicit dependencies so artifact and status flow remains understandable.
- Fail fast when early blocking checks invalidate the rest of the pipeline.

### 3. Control environment and reuse

- Keep runner assumptions explicit: OS, language runtime, package manager, services, and containers.
- Use caching deliberately for dependencies and repeatable build outputs.
- Reuse workflow logic with shared templates, composite actions, or scripts only when it reduces maintenance without obscuring behavior.
- Keep secrets scoped to the jobs that need them.

### 4. Harden quality and observability

- Surface failure output clearly in logs and job summaries.
- Preserve key artifacts needed for debugging or downstream steps.
- Distinguish flaky infrastructure failures from deterministic product failures.
- Keep retry policy explicit and narrow; do not normalize blind reruns as the fix.

### 5. Review cost and maintainability

- Watch runtime, cache hit rate, queue pressure, and duplication across jobs.
- Remove dead jobs or steps when the repository architecture changes.
- Keep the workflow readable enough that maintainers can reason about changes safely.

## Decision Rules

| Situation | Action |
| --- | --- |
| Check is cheap and blocks bad merges | Run it early in CI. |
| Step is expensive but required for trusted release readiness | Run it later with clear dependencies and artifact reuse. |
| Same setup repeats across many jobs | Extract shared workflow logic only if it stays transparent. |
| Pipeline is slow due to serialized independent work | Parallelize jobs or shard work deliberately. |
| Failures are often ambiguous | Improve logs, summaries, and artifact capture before adding more automation. |

## Quality Bar

- The pipeline should protect the branch with high-signal checks.
- Job boundaries should make failures easy to localize.
- Caching and parallelism should improve speed without hiding correctness risk.
- Secret and artifact handling should follow least privilege and clear retention rules.
- Workflow changes should be reviewable and testable like application code.

## Avoid These Failure Modes

- Do not build one monolithic CI job that hides which step failed.
- Do not add jobs whose output nobody acts on.
- Do not rely on flaky reruns as normal operating procedure.
- Do not duplicate setup logic across many jobs without reason.
- Do not expose secrets or privileged tokens to jobs that do not need them.

## References

- Pipeline design guidance: `references/ci-pipeline-playbook.md`
- CI workflow review checklist: `references/ci-pipeline-checklist.md`

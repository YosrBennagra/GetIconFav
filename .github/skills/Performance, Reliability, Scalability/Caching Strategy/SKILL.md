---
name: caching-strategy
description: 'Use when requests involve cache design, stale data bugs, slow repeated reads, edge or API caching, invalidation strategy, or deciding whether caching should exist at all. Design application caching across server, database, network, and edge boundaries: cache scope, freshness models, invalidation, read and write paths, stampede prevention, and cost-performance tradeoffs.'
---

# Caching Strategy

## Overview

Caching is a consistency tradeoff, not a default optimization checkbox.
Design it around ownership, freshness, invalidation, and operational cost so it reduces real latency or load without creating mysterious stale behavior.

## Follow This Workflow

### 1. Identify the read path and pain

- Determine what is slow, expensive, or too frequently repeated.
- Distinguish CPU-bound computation, I/O-bound queries, remote service calls, and static content delivery.
- Confirm caching is actually the right lever before adding state and invalidation complexity.

### 2. Choose cache scope deliberately

- In-process cache for local, ephemeral optimization.
- Shared cache for multi-instance consistency of hot reads.
- Edge or CDN cache for public content close to users.
- Database- or query-level caching only when it aligns with the data ownership model.
- Keep one clear reason for each cache layer that exists.

### 3. Define freshness and invalidation

- Explicitly choose strong freshness, bounded staleness, write-through, write-behind, or event-driven invalidation.
- Tie invalidation to the write path, not to manual hope.
- Define TTLs only when they actually match the freshness model.
- Keep versioning or tag semantics stable enough to debug and operate.

### 4. Protect the system under load

- Prevent cache stampedes and thundering herds around expensive misses.
- Consider request coalescing, stale-while-revalidate, soft TTLs, or precomputation where appropriate.
- Handle partial cache failures without taking down the primary path unnecessarily.

### 5. Re-check observability and safety

- Measure hit rate, miss cost, freshness complaints, and invalidation effectiveness.
- Ensure caches do not leak tenant, identity, or permission-scoped data across boundaries.
- Remove caches that are not buying enough latency or cost reduction to justify their failure modes.

## Decision Rules

| Situation | Action |
| --- | --- |
| Data is public and changes rarely | Prefer edge or shared cache with clear invalidation. |
| Data is user- or permission-scoped | Cache only with strict scope isolation and explicit safety review. |
| Source of truth changes frequently and users need freshness | Favor direct reads or very tight invalidation over long TTLs. |
| Expensive misses create load spikes | Add coalescing, stale-serving, or pre-warm strategies deliberately. |
| No one can explain how cache invalidation works | Simplify or remove the cache before adding more layers. |

## Quality Bar

- Every cache should have a clearly owned freshness model.
- Invalidation should be tied to actual state change paths.
- Scope should prevent cross-user or cross-tenant leakage.
- Metrics should show whether the cache is helping materially.
- The cache design should stay explainable during incident response.

## Avoid These Failure Modes

- Do not add caching without identifying the real bottleneck.
- Do not rely on long TTLs as a substitute for invalidation design.
- Do not stack many cache layers without understanding which one owns freshness.
- Do not cache permission-sensitive data in shared layers casually.
- Do not leave cache misses or stale data invisible to monitoring.

## References

- Cache design guide: `references/caching-playbook.md`
- Cache review checklist: `references/caching-checklist.md`

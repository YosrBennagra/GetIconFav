# Caching Playbook

## Core Questions

- What expensive read is being optimized?
- Who owns freshness?
- How is invalidation triggered?
- What happens on a miss or cache outage?

## Common Cache Layers

- In-process cache.
- Shared distributed cache.
- Edge or CDN cache.
- Precomputed materialized views or derived stores.

## Safety Rules

- Keep tenant and permission scope explicit.
- Tie invalidation to writes or durable events.
- Use TTL only when it matches a real freshness contract.
- Monitor hit rate and stale-data complaints.

## Load Rules

- Prevent stampedes on hot misses.
- Consider stale-while-revalidate for tolerant read paths.
- Avoid over-layering caches without a clear ownership model.

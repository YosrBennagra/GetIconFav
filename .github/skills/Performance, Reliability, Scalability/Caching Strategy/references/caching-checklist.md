# Caching Checklist

## Need Review

- Is caching solving a measured problem?
- Which read path benefits?
- Could another optimization be simpler?

## Freshness Review

- Who owns invalidation?
- What stale window is acceptable?
- Are TTLs and tags intentional?

## Safety Review

- Is scope safe for user or tenant data?
- Can cache failures degrade gracefully?
- Are hit, miss, and stale behaviors observable?

# Preview Deployments Checklist

## Scope Review

- Which branches or PRs get previews?
- What review purpose does the preview serve?
- Is the environment clearly non-production?

## Safety Review

- Are secrets scoped to preview needs?
- Are external side effects isolated?
- Is test or sanitized data used appropriately?

## Lifecycle Review

- Are previews created, updated, and destroyed automatically?
- Can reviewers see health and freshness quickly?
- Are cost and orphaned-resource risks controlled?

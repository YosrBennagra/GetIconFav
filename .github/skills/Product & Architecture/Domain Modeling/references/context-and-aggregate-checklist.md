# Context and Aggregate Checklist

## Bounded Context Review

- Does each context have a clear owner or responsibility?
- Does each key term have one meaning inside the context?
- Are integrations between contexts explicit?
- Can the context evolve without forcing unrelated areas to change?

## Aggregate Review

- What invariant does this aggregate protect?
- What is the root that controls writes?
- Which updates must happen atomically?
- Which relationships can be eventual instead?
- What operation would break if the aggregate were split?

## Smells

- One aggregate contains unrelated workflows.
- Cross-context calls are needed for basic validation.
- Read models are treated as authoritative write models.
- The same rule is duplicated in multiple services because the model has no clear home for it.

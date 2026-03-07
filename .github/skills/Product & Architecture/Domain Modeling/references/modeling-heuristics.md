# Modeling Heuristics

## Start With These Questions

- What real-world thing or commitment changes over time?
- What must never happen, even under concurrency or partial failure?
- Which concepts need identity, and which are just descriptive values?
- Which rules belong together strongly enough to change as one unit?
- What language do non-engineers already use for the problem?

## Naming Heuristics

- Prefer nouns users or operators already understand.
- Prefer lifecycle-based names over storage-based names.
- Avoid names that describe the implementation layer, such as `Row`, `DTO`, or `Payload`, when modeling domain concepts.
- Rename overloaded terms early; ambiguity compounds fast.

## Entity vs Value Object

Use an entity when:

- Identity matters across time.
- History, ownership, or permissions attach to it.
- Two instances can have the same attributes but still be meaningfully different.

Use a value object when:

- Equality depends only on the attributes.
- It should be replaced as a whole.
- Identity and independent lifecycle do not matter.

## Aggregate Heuristics

Use one aggregate when:

- Rules must hold synchronously across the related data.
- Concurrent changes need one consistency boundary.
- The system must reject invalid partial updates.

Split aggregates when:

- The data changes independently most of the time.
- Separate ownership or scaling concerns exist.
- Synchronization can be eventual without violating business correctness.

## Event Heuristics

Good event names describe facts:

- `OrderSubmitted`
- `SubscriptionCanceled`
- `InvoicePaid`

Weak event names describe implementation:

- `RunWorkflow`
- `UpdateRow`
- `ProcessHandler`

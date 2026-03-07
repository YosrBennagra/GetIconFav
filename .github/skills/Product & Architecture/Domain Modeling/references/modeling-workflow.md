# Domain Modeling Workflow

## Step-by-Step Modeling Process

### 1. Frame the domain

- Identify the product area, primary actors, critical outcomes, and failure modes.
- Separate business concepts from technical implementation details.
- Write the smallest shared vocabulary that stakeholders and engineers can both use.

### 2. Establish bounded contexts

- Split the problem into areas that have distinct language, ownership, or rules.
- Keep one concept definition per context even if the same word appears elsewhere.
- Treat cross-context synchronization as an explicit integration concern, not an implicit shortcut.

### 3. Identify the core model elements

- Entities: concepts with identity across time.
- Value objects: concepts defined entirely by their attributes.
- Aggregates: consistency boundaries for related changes.
- Domain services: logic that does not belong naturally on one entity or value object.
- Domain events: meaningful business facts that other parts of the system may react to.

### 4. Define invariants and lifecycle rules

- State what must always be true.
- State which transitions are valid, invalid, reversible, or auditable.
- Record who or what can trigger state changes.
- Prefer business rules phrased in plain language before turning them into code or schema constraints.

### 5. Map interactions and dependencies

- Show how concepts relate, which object owns a rule, and where derived data comes from.
- Define read concerns separately from write concerns when they have different shapes.
- Distinguish source-of-truth entities from projections, reports, caches, or search indexes.

### 6. Stress-test the model

- Check edge cases: duplicates, cancellation, retries, partial completion, backfills, role changes, and legacy imports.
- Check whether names still make sense when the workflow becomes more complex.
- Check whether one aggregate is hiding multiple responsibilities.
- Revise before implementation if the model requires frequent exceptions or bypass paths.

## Deliverables

Produce only the artifacts the task needs, but default to:

- Domain summary with bounded contexts and shared vocabulary.
- Core entity, value object, and aggregate definitions.
- Invariants and lifecycle rules.
- Event and integration boundary notes.
- Open questions and modeling risks.

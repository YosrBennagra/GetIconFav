# Schema-First Checklist

## Contract Review

- Is the schema the actual source of truth?
- Are required, optional, and nullable fields explicit?
- Are examples and descriptions still accurate?

## Validation Review

- Are requests and responses validated against the schema?
- Are generated artifacts trustworthy and current?
- Is internal mapping explicit when shapes differ?

## Evolution Review

- Is the change additive, deprecated, or breaking?
- Are reusable components still readable?
- Will consumers notice the change clearly?

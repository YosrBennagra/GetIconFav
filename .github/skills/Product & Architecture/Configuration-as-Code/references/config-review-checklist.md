# Config Review Checklist

## Contract Review

- What does the key control?
- Who owns it?
- Is it required?
- Is it secret?
- When does a change take effect?

## Safety Review

- Is the default safe?
- Can the value accidentally point local or staging traffic at production?
- Will the value leak into logs or client bundles?
- Is invalid input rejected early?

## Smells

- The same key name means different things in different environments.
- A feature flag has no sunset plan.
- Example env files no longer match runtime code.
- Multiple modules parse the same variable differently.

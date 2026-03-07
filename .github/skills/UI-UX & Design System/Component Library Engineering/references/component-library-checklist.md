# Component Library Checklist

## Contract Review

- What problem does the component solve?
- Is it a primitive or a product-specific pattern?
- Are required states and accessibility behaviors explicit?

## API Review

- Is the prop surface small and understandable?
- Are variants bounded and meaningful?
- Can consumers extend behavior without fragile overrides?

## Governance Review

- Does this component duplicate an existing one?
- Does it depend on stable tokens and semantics?
- Will this be easier to maintain than repeated local copies?

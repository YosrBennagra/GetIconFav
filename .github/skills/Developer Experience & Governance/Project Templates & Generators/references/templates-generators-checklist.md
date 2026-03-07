# Templates and Generators Checklist

## Pattern Review

- Is the pattern repeated enough to justify generation?
- Is it stable enough to template?
- Would a smaller generator be clearer than one large one?

## Output Review

- Does the generated output match current standards?
- Is the output understandable to maintainers?
- Are defaults safe and useful?

## Lifecycle Review

- How will drift be managed?
- Is a codemod or migration path needed for older output?
- Can obsolete templates be retired cleanly?

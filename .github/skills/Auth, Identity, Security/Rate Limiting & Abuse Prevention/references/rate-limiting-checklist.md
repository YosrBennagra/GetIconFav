# Rate Limiting Checklist

## Surface Review

- Which endpoints are abuse-sensitive?
- What is the main abuse cost?
- Which caller dimensions are available?

## Policy Review

- Are limits layered across the right dimensions?
- Are burst and sustained windows intentional?
- Is friction escalation safer than permanent lockout?

## Operations Review

- Can false positives be observed and tuned?
- Are responses non-enumerating where needed?
- Are internal and privileged paths handled separately?

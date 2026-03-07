# Problem Details Playbook

## Core Fields

- `type`: stable identifier for the error class.
- `title`: short summary of the error type.
- `status`: HTTP status code.
- `detail`: human-readable occurrence detail when appropriate.
- `instance`: URI or identifier for the specific occurrence when you support it.

## Extension Guidance

Use extensions for:

- field-level validation issues,
- domain conflict context,
- retry or quota context,
- stable application-specific classification.

Keep extension fields documented and consistent.

## Contract Rules

- Reuse error types across endpoints when the semantics match.
- Keep validation structure stable.
- Use HTTP status to convey the broad class and `type` to convey the specific failure.
- Keep sensitive internals out of public details.

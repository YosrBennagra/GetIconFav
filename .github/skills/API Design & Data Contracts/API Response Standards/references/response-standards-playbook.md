# Response Standards Playbook

## Core Response Areas

- Status code semantics.
- Single-resource representation.
- Collection representation.
- Pagination metadata.
- Empty success responses.
- Headers that carry transport semantics.

## Consistency Rules

- Pick one collection shape and repeat it.
- Keep metadata distinct from primary data.
- Use status codes to reflect transport outcome, not application preference.
- Keep nullability and emptiness semantics documented and stable.

## Collection Guidance

- Define whether collections return `items`, `data`, or another standard field.
- Keep pagination fields predictable.
- Echo filters or cursor info only when it helps consumers materially.

## Empty Result Guidance

- Distinguish:
  - successful empty collection,
  - successful no-content action,
  - missing resource,
  - failed operation.

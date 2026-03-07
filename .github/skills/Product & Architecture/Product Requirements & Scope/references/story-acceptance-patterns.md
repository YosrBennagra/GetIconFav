# Story and Acceptance Patterns

## Story Shape

Use a story only when a slice delivers user value or a decision-ready outcome.

Preferred format:

```markdown
As a [user or actor],
I want [capability],
so that [outcome].
```

Alternative format for internal or platform work:

```markdown
In order to [outcome],
[team or system] needs [capability].
```

## Splitting Rules

Split stories by one of these boundaries:

- User journey step.
- Permission or user role.
- Business rule variation.
- Platform or channel difference.
- Happy path versus error handling.
- Single integration boundary.

Avoid splitting by technical layer alone such as frontend, backend, and database.

## Acceptance Criteria

Use concise, testable conditions.

Example bullet format:

```markdown
## Acceptance Criteria
- User can save a draft without publishing.
- Draft is visible only to its creator.
- Validation errors explain the missing field.
```

Example Given/When/Then format:

```markdown
## Acceptance Criteria
- Given a user has incomplete required fields, when they submit, then the system blocks submission and shows field-level errors.
- Given a valid submission, when the user saves, then the system persists the draft and confirms success.
```

## Quality Rules

- Make criteria observable from the outside.
- Keep implementation details out unless they are contractually required.
- Include negative paths when they affect acceptance.
- Keep one criterion focused on one observable behavior.
- Make story completion obvious to QA, design, and engineering.

## Anti-Patterns

Avoid these:

- "Build API endpoint for..."
- "Create database table for..."
- "Improve UX."
- "System works fast."
- One story that contains multiple user outcomes.

Convert technical tasks into supporting implementation work beneath a user-facing story unless the request is explicitly infrastructure-only.

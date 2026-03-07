# Git Hooks Playbook

## Hook Placement Guidance

### pre-commit

Good fit:

- Staged-file linting or formatting.
- Lightweight syntax or type checks on changed files.
- Fast generated-file or whitespace hygiene.

Avoid:

- Long full-repo builds.
- Integration or end-to-end tests.

### commit-msg

Good fit:

- Conventional commit enforcement.
- Message structure validation.

### pre-push

Good fit:

- Broader but still trusted local checks.
- Commands that are heavier than commit-time gates but still worth catching before remote CI.

## Governance Rules

- Keep hook logic versioned and inspectable.
- Prefer one clear toolchain path over nested wrapper scripts.
- Align local hook policy with CI policy so developers trust both.

## Performance Rules

- Optimize for common-case runtime.
- Scope to staged or affected files where possible.
- Measure pain when developers start bypassing routinely.

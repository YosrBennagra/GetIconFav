---
name: conventional-commits
description: 'Use when writing commit messages, reviewing commit history, preparing changelogs, or configuring commitlint. Covers Conventional Commits v1.0.0 formatting rules, commit types, scopes, and breaking change notation.'
---

# Conventional Commits

Reference: [conventionalcommits.org/en/v1.0.0](https://www.conventionalcommits.org/en/v1.0.0/)

## When to Activate

- Writing any git commit message
- Reviewing commit history
- Preparing changelogs or release notes

## Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

## Rules

1. **type** is required and must be one of the defined types
2. **scope** is optional, enclosed in parentheses: `feat(ui): ...`
3. **description** is required, imperative mood, lowercase, no period
4. **body** is optional, separated by blank line, explains WHY not WHAT
5. **footer** is optional, for `BREAKING CHANGE:` or issue refs (`Refs #123`)
6. `!` after type/scope indicates breaking change: `feat(api)!: ...`

## Types

| Type       | Description                              | Bumps    |
|------------|------------------------------------------|----------|
| `feat`     | A new feature                            | MINOR    |
| `fix`      | A bug fix                                | PATCH    |
| `doc`      | Documentation only changes               | —        |
| `style`    | Formatting, whitespace (no code change)  | —        |
| `refactor` | Code change (no feature addition or fix) | —        |
| `perf`     | Performance improvement                  | PATCH    |
| `test`     | Adding or correcting tests               | —        |
| `build`    | Build system or external dependencies    | —        |
| `ci`       | CI configuration and scripts             | —        |
| `chore`    | Other changes (deps, tooling)            | —        |

## Scope Examples

Scopes describe the area of the codebase affected:

```
feat(data): add 5 new backend skill entries
fix(ui): correct stack filter reset behavior
refactor(components): extract stat card component
doc(readme): update setup instructions
style(css): format globals.css
chore(deps): upgrade react-icons to v5.6
ci(workflow): add deploy verification step
test(data): add resource lookup unit tests
perf(browse): lazy-load resource cards below fold
build(next): update output configuration
```

## Breaking Changes

A breaking change MUST be indicated by:
- `!` after type/scope: `feat(api)!: rename slug format`
- OR `BREAKING CHANGE:` in footer

```
feat(api)!: change resource slug format

BREAKING CHANGE: Resource slugs now use kebab-case instead of snake_case.
Existing bookmarks to /browse/old_slug will break.

Refs #42
```

## Multiple Paragraphs in Body

```
fix(data): handle duplicate slug collision

The resource lookup was returning the first match when duplicate slugs
existed across sections. This caused the wrong resource to display on
the detail page.

Changed the lookup to include section-aware matching and added a
build-time validation to prevent duplicate slugs.

Refs #87
```

## Anti-Patterns

- `update stuff` — no type, vague description
- `feat: Fixed the bug` — wrong type for a fix
- `FEAT: Add search` — types must be lowercase
- `feat: add search.` — no period at end
- `feat: Added search` — use imperative mood ("add" not "added")

## Checklist

- [ ] Commit message starts with valid type
- [ ] Description is imperative, lowercase, no period
- [ ] Scope accurately reflects affected area
- [ ] Breaking changes marked with `!` or `BREAKING CHANGE:` footer
- [ ] Body explains WHY, not WHAT (code explains what)

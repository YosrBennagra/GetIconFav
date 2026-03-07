# Conventional Commits Format

Following [Conventional Commits v1.0.0](https://www.conventionalcommits.org/en/v1.0.0/):

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

## Rules

- **type**: Required. One of the types below.
- **scope**: Optional. Noun describing a section (e.g., `auth`, `api`, `ui`, `data`).
- **description**: Required. Imperative present tense ("add" not "added"). No period. Lowercase first letter.
- **body**: Optional. Explain motivation. Wrap at 72 chars.
- **footer**: Optional. `BREAKING CHANGE: <desc>` or `Refs #123`.

## Types

| Type       | When                                    | Example |
|------------|----------------------------------------|---------|
| `feat`     | New feature                             | `feat(data): add skill search` |
| `fix`      | Bug fix                                 | `fix(ui): correct filter reset` |
| `refactor` | Code change (no feature/fix)            | `refactor(data): extract lookup helper` |
| `doc`      | Documentation only                      | `doc: update CONTRIBUTING.md` |
| `style`    | Formatting, whitespace                  | `style: format globals.css` |
| `chore`    | Dependencies, tooling, config           | `chore(deps): upgrade react-icons` |
| `ci`       | CI/CD workflow changes                  | `ci: add e2e test job` |
| `test`     | Adding or updating tests                | `test(api): add search unit tests` |
| `perf`     | Performance improvement                 | `perf(ui): lazy-load images` |
| `build`    | Build system changes                    | `build: update next.config output` |

## Breaking Changes

```
feat(api)!: change slug format

BREAKING CHANGE: Slugs now use kebab-case instead of snake_case.
```

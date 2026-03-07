# Dependency Hygiene Checklist

## Need Review

- Why is this dependency here?
- Is there a simpler alternative?
- Does another package already solve the same problem?

## Ownership Review

- Which package or team owns it?
- Is it runtime, tooling, or test-only?
- Is placement in the repo appropriate?

## Lifecycle Review

- Is it up to date enough for safety and maintainability?
- Can any unused packages be removed?
- Is there a plan for major or risky upgrades?

# Compose Environments Checklist

## Structure Review

- What is the purpose of this environment?
- Which services are truly required?
- Are optional services isolated with profiles or overrides?

## Dependency Review

- Are service dependencies real and explicit?
- Do healthchecks reflect readiness where needed?
- Are ports and networks scoped intentionally?

## State Review

- Which data persists?
- Which data resets on rebuild?
- Are teardown and cleanup behaviors predictable?

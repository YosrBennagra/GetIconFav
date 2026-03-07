# Structured Logging Checklist

## Schema Review

- Are event names stable and meaningful?
- Are common fields consistent across services?
- Are structured fields used instead of free-form parsing?

## Correlation Review

- Can related requests or jobs be connected?
- Are request or trace identifiers propagated where needed?
- Is enough domain context present to diagnose failures?

## Safety Review

- Are sensitive values redacted or omitted?
- Is log volume controlled?
- Are duplicate logs minimized?

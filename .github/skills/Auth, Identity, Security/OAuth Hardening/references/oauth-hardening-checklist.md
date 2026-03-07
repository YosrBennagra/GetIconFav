# OAuth Hardening Checklist

## Flow Review

- Are redirect URIs explicit and constrained?
- Are modern flow protections enabled?
- Are failure and replay cases understood?

## Scope and Token Review

- Are requested scopes minimal?
- Are tokens stored and exposed only where needed?
- Are sensitive values kept out of logs and client-visible state?

## Account Integrity Review

- How are provider identities linked to local users?
- What happens on email collision or provider mismatch?
- Can unlinking or recovery weaken account security?

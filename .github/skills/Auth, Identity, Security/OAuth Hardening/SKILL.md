---
name: oauth-hardening
description: 'Use when requests involve OAuth login, social sign-in, OIDC providers, callback flows, token misuse risk, or securing third-party identity integrations. Harden OAuth and OpenID Connect sign-in flows: provider trust boundaries, redirect validation, state and nonce use, PKCE, token handling, scope minimization, account linking, and callback safety.'
---

# OAuth Hardening

## Overview

OAuth sign-in is a security-critical integration boundary, not just a faster login button.
Harden the flow around provider trust, redirect handling, token scope, callback validation, and account-linking decisions so identity integration does not become the weakest part of the system.

## Follow This Workflow

### 1. Define the trust model

- Identify which providers are trusted and what identity guarantees they actually provide.
- Distinguish authentication, delegated access, and account-linking use cases.
- Define which provider claims are trusted, mapped, or ignored internally.

### 2. Constrain the authorization flow

- Use provider and library defaults that support modern protections such as PKCE, state, and nonce where appropriate.
- Keep redirect URIs explicit and tightly controlled.
- Minimize requested scopes and permissions to what the application truly needs.
- Prevent open redirect behavior in post-login navigation.

### 3. Handle tokens and callbacks safely

- Store and expose only the tokens and claims the application actually needs.
- Avoid logging raw access or refresh tokens.
- Validate callback behavior and failure handling under partial or malicious input.
- Keep provider profile mapping explicit rather than trusting arbitrary upstream fields blindly.

### 4. Govern account linking and recovery

- Decide when accounts can auto-link and when stronger proof is needed.
- Handle email collision and provider mismatch cases deliberately.
- Re-check unlinking, provider removal, and recovery paths so they do not weaken account integrity.

### 5. Review edge cases

- Stale or replayed callbacks.
- Provider downtime or misconfiguration.
- Scope expansion over time.
- Multi-tenant or enterprise provider variations.

## Decision Rules

| Situation | Action |
| --- | --- |
| Provider scope request is broad | Reduce it to the minimum needed. |
| Redirect destination is user-controlled | Validate it against an allowlist or safe internal mapping. |
| Auto-linking accounts could merge unrelated identities | Require stronger proof before linking. |
| Tokens are only needed server-side | Keep them server-side and out of client-visible surfaces. |
| OAuth flow assumptions are unclear | Make state, redirect, callback, and token-handling decisions explicit before implementation. |

## Quality Bar

- Provider trust assumptions should be documented and minimal.
- Redirect and callback handling should be tightly controlled.
- Token exposure should be minimized.
- Scope requests should be justified.
- Account-linking behavior should be safe under collision and recovery scenarios.

## Avoid These Failure Modes

- Do not request broad provider scopes for convenience.
- Do not trust user-controlled redirect targets.
- Do not log or expose raw tokens casually.
- Do not auto-link accounts without proving identity ownership sufficiently.
- Do not assume provider profile data maps cleanly to internal trust without review.

## References

- OAuth hardening guidance: `references/oauth-hardening-playbook.md`
- OAuth review checklist: `references/oauth-hardening-checklist.md`

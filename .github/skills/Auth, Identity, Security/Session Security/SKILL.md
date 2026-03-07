---
name: session-security
description: 'Use when requests involve secure sessions, cookie settings, JWT versus database sessions, logout behavior, session hijacking risk, or making authenticated state safer and more auditable. Design and harden session security for web applications: cookie strategy, token lifetime, rotation, fixation defenses, invalidation, idle and absolute timeouts, logout semantics, and cross-device session governance.'
---

# Session Security

## Overview

A session is a live security boundary, not a convenience cache.
Design how sessions are issued, scoped, refreshed, invalidated, and observed so authenticated state remains trustworthy over time.

## Follow This Workflow

### 1. Define the session model

- Cookie-backed session identifiers, self-contained tokens, or hybrid models.
- Browser session versus API or mobile token semantics.
- Idle timeout, absolute lifetime, refresh behavior, and logout expectations.

### 2. Harden issuance and transport

- Use secure cookie settings appropriate to the deployment context.
- Scope cookies narrowly by domain and path where possible.
- Regenerate session context on authentication or privilege change to reduce fixation risk.
- Keep session identifiers unpredictable and non-guessable.

### 3. Control lifecycle

- Define when sessions expire from inactivity.
- Define when sessions expire regardless of activity.
- Rotate or renew sessions on an intentional cadence.
- Support explicit invalidation after password reset, sign-out, privilege revocation, or suspicious activity.

### 4. Protect against misuse

- Reduce theft impact with secure transport and bounded lifetime.
- Detect and handle concurrent or unusual session patterns where risk warrants it.
- Separate authentication freshness requirements for high-risk actions from normal browsing.
- Ensure logout clears server-side and client-visible authenticated state consistently.

### 5. Review edge cases

- Multi-device sign-in and remote sign-out.
- Session survival across deployments and secret rotation.
- Remember-me behavior versus high-security environments.
- Partial logout, stale tabs, and expired-session user experience.

## Decision Rules

| Situation | Action |
| --- | --- |
| Application handles sensitive actions | Shorten lifetimes and require stronger freshness checks for privileged operations. |
| User needs long-lived convenience | Use bounded renewal and explicit device/session management rather than effectively permanent sessions. |
| Privilege or identity state changes | Re-issue or invalidate session context promptly. |
| Logout must be trustworthy | Clear both client state and authoritative server-side session state. |
| Token revocation is difficult | Prefer session models that support practical invalidation for the risk level involved. |

## Quality Bar

- Session lifetime should match the product’s threat model.
- Secure cookie and transport settings should be explicit.
- Session invalidation should be real, not cosmetic.
- High-risk actions should not rely only on a stale long-lived session.
- Users should receive clear behavior when sessions expire or are revoked.

## Avoid These Failure Modes

- Do not leave sessions effectively unbounded by idle or absolute lifetime.
- Do not rely on client-side token deletion alone as logout.
- Do not ignore session fixation or privilege-change re-issuance.
- Do not keep sensitive claims in long-lived browser-visible state without need.
- Do not make session expiry behavior unpredictable to users and operators.

## References

- Session hardening guide: `references/session-security-playbook.md`
- Session review checklist: `references/session-security-checklist.md`

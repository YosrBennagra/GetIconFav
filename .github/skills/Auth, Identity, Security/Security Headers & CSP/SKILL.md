---
name: security-headers-csp
description: 'Use when requests involve browser security headers, CSP rollout, XSS risk reduction, clickjacking defenses, asset restrictions, or hardening the client-facing response surface. Design and enforce browser-facing security headers and Content Security Policy for web applications: CSP, HSTS, frame and embed controls, referrer policy, permissions policy, and related response-hardening decisions.'
---

# Security Headers & CSP

## Overview

Security headers are part of the application’s browser trust boundary.
Design them as an explicit policy system that constrains script execution, framing, transport, and browser capabilities instead of treating them as boilerplate.

## Follow This Workflow

### 1. Inventory the browser-facing surface

- Scripts, styles, fonts, images, frames, workers, third-party origins, and inline behavior.
- Embedded flows such as payments, auth callbacks, analytics, or support widgets.
- Private versus public routes that may need different posture.

### 2. Define the header baseline

- Content Security Policy for allowed execution and resource origins.
- Strict transport and downgrade protections where HTTPS is authoritative.
- Framing, referrer, and permissions policies based on product needs.
- Legacy fallback headers only when they still serve a real browser population or platform need.

### 3. Roll out CSP deliberately

- Start from the actual asset and third-party model.
- Prefer nonces or hashes over broad `'unsafe-inline'` exceptions when inline execution exists.
- Keep directives tight by resource class.
- Use report-only rollout when discovery is needed before enforcement.

### 4. Harden around exceptions

- Minimize third-party script and frame origins.
- Review any `unsafe-*`, wildcard, or broad source allowances as exceptions with owners.
- Keep dynamic script injection, inline event handlers, and eval-like behavior out unless absolutely necessary.
- Ensure CSP and framework asset loading can coexist intentionally.

### 5. Verify edge cases

- Auth and OAuth redirects.
- Embedded admin or support tools.
- Preview and staging domains.
- File downloads, uploads, and blob/data URI handling where the product genuinely requires them.

## Decision Rules

| Situation | Action |
| --- | --- |
| App serves only over HTTPS | Enforce strong transport policy and avoid mixed-content ambiguity. |
| CSP needs many broad exceptions | Reduce third-party or inline behavior before weakening policy globally. |
| Third-party widget requires extra origins | Scope the allowance tightly and document why it exists. |
| Product does not need embedding | Deny framing by default. |
| CSP rollout is uncertain | Start with report-only, analyze, then enforce deliberately. |

## Quality Bar

- Header policy should match the real resource and embedding model.
- CSP should be restrictive enough to reduce XSS blast radius meaningfully.
- Exceptions should be rare, explicit, and reviewable.
- Third-party origins should be tightly constrained.
- Policy should remain understandable and maintainable as the app evolves.

## Avoid These Failure Modes

- Do not copy-paste a generic CSP that does not match the application.
- Do not leave `unsafe-inline`, `unsafe-eval`, or broad wildcards unexplained.
- Do not forget staging, preview, and callback domain behavior when designing policy.
- Do not rely on one header while ignoring the broader browser-facing trust model.
- Do not ship report-only forever without deciding whether to enforce.

## References

- Header and CSP design guide: `references/headers-csp-playbook.md`
- Browser hardening review checklist: `references/headers-csp-checklist.md`

---
name: rate-limiting-abuse-prevention
description: 'Use when requests involve brute-force protection, API abuse, signup or login throttling, scraping defenses, quota strategy, or reducing automated misuse without breaking legitimate traffic. Design rate limiting and abuse prevention controls for authentication and API surfaces: identity- and IP-based limits, quotas, lockouts, progressive friction, bot resistance, and observability.'
---

# Rate Limiting & Abuse Prevention

## Overview

Rate limits are behavioral controls, not just infrastructure defaults.
Design them around attacker behavior, user friction, and the criticality of each endpoint so defenses reduce abuse without collapsing legitimate usage.

## Follow This Workflow

### 1. Identify the abuse surface

- Login, password reset, signup, MFA verification, public APIs, search, content generation, exports, and admin actions.
- Distinguish anonymous, authenticated, and privileged callers.
- Identify the cost of abuse: credential stuffing, enumeration, denial, spam, scraping, or cost amplification.

### 2. Choose limit dimensions

- IP, account, session, token, API key, tenant, route, or device fingerprints where appropriate.
- Blend dimensions when one alone is too weak or too harsh.
- Set windows, burst limits, and cooldown behavior intentionally.

### 3. Add layered friction

- Use throttling, backoff, temporary lockouts, CAPTCHA or challenge escalation, email verification, or queueing as appropriate.
- Keep login and recovery surfaces especially resistant to brute force and enumeration.
- Avoid turning every failure into a permanent lockout that attackers can weaponize.

### 4. Define response behavior

- Return clear but non-enumerating responses on sensitive identity surfaces.
- Provide retry timing or quota information where it helps legitimate clients.
- Log limit breaches and suspicious patterns for operational follow-up.

### 5. Re-check false positives and bypass paths

- Shared IP environments, mobile networks, and enterprise proxies.
- Distributed abuse across many identities or many IPs.
- Privileged endpoints that deserve tighter controls than public reads.
- Background jobs, health checks, and internal integrations that need separate treatment.

## Decision Rules

| Situation | Action |
| --- | --- |
| Abuse target is authentication-related | Use layered limits across IP and account dimensions and avoid revealing which identifier is valid. |
| Endpoint is expensive or quota-sensitive | Add tighter limits and observability early. |
| Legitimate traffic is often bursty | Use burst plus sustained windows rather than one flat limit. |
| Attackers can distribute across IPs | Add account, token, or route-specific controls as well. |
| Lockouts can be abused against users | Prefer temporary throttling or progressive friction over hard permanent locks. |

## Quality Bar

- Limits should reflect the abuse model of the endpoint.
- Sensitive identity flows should resist brute force and enumeration.
- Operational teams should be able to observe and tune false positives.
- Legitimate clients should receive predictable behavior.
- Abuse controls should be layered rather than depending on one signal.

## Avoid These Failure Modes

- Do not rate-limit only by IP for all scenarios.
- Do not expose account validity through throttling or error messaging.
- Do not choose lockouts that attackers can weaponize trivially.
- Do not forget internal, privileged, or expensive endpoints because they have lower traffic.
- Do not deploy limits without observability or tuning hooks.

## References

- Abuse-control design guide: `references/rate-limiting-playbook.md`
- Rate limit review checklist: `references/rate-limiting-checklist.md`

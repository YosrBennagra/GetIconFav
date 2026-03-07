# GitHub Copilot Instructions

## How to Pick Skills

1. Scan the **keyword table** below — match 1–3 keywords from your task.
2. Read **only** the matched `SKILL.md` file(s) using the file-read tool.
3. Follow skill instructions — they override all generic conventions.
4. **Never** read all skills upfront. Match first, read only what applies.

---

## ALWAYS READ — Every Session

```
branching, git, push, deploy, branch, merge, CI, CD
→ .github/skills/branching-and-deployment/SKILL.md
```

---

## Skill Index by Domain

### Product & Architecture
| Match these keywords | Skill path |
|---|---|
| PRD, user story, acceptance criteria, scope, milestone | `Product & Architecture/Product Requirements & Scope/SKILL.md` |
| domain, bounded context, entity, value object, invariant | `Product & Architecture/Domain Modeling/SKILL.md` |
| folder structure, module, import, dependency direction | `Product & Architecture/Folder & Module Organization/SKILL.md` |
| SOLID, refactor, factory, adapter, tech debt, composition | `Product & Architecture/Design Patterns & Refactoring/SKILL.md` |
| config, hardcoded, env variable, feature flag | `Product & Architecture/Configuration-as-Code/SKILL.md` |
| ADR, TDR, decision record, choose between approaches | `Product & Architecture/Technical Decision Records (TDR)/SKILL.md` |

### API Design & Data Contracts
| Match these keywords | Skill path |
|---|---|
| response envelope, error code, pagination, versioning | `API Design & Data Contracts/API Response Standards/SKILL.md` |
| schema-first, request schema, contract-first | `API Design & Data Contracts/Schema-First Validation/SKILL.md` |
| error object, problem details, safe error message | `API Design & Data Contracts/Error Handling & Problem Details/SKILL.md` |
| idempotent, retry, deduplication key | `API Design & Data Contracts/Idempotency & Retries/SKILL.md` |
| webhook, signed payload, replay protection, event | `API Design & Data Contracts/Webhooks & Event Handling/SKILL.md` |

### Auth, Identity, Security
| Match these keywords | Skill path |
|---|---|
| OAuth, PKCE, redirect URI, state, nonce | `Auth, Identity, Security/OAuth Hardening/SKILL.md` |
| role, permission, RBAC, authorization guard | `Auth, Identity, Security/RBAC-Permissions/SKILL.md` |
| secret, env secret, rotation, least-privilege | `Auth, Identity, Security/Secrets & Key Management/SKILL.md` |
| CSP, HSTS, X-Frame, XSS, security header | `Auth, Identity, Security/Security Headers & CSP/SKILL.md` |
| cookie, CSRF, token rotation, session invalidation | `Auth, Identity, Security/Session Security/SKILL.md` |
| rate limit, throttle, 429, bot, abuse | `Auth, Identity, Security/Rate Limiting & Abuse Prevention/SKILL.md` |
| npm audit, CVE, vulnerability, patch dependency | `Auth, Identity, Security/Vulnerability Management/SKILL.md` |

### Testing & QA
| Match these keywords | Skill path |
|---|---|
| unit test, helper test, pure function, vitest, jest | `Testing & QA/Unit Testing Strategy/SKILL.md` |
| integration test, route handler test, DB test | `Testing & QA/Integration Testing (API-DB)/SKILL.md` |
| E2E, browser test, Playwright, user journey | `Testing & QA/E2E Testing (User Flows)/SKILL.md` |
| mock, stub, fake, time mock | `Testing & QA/Mocking & Test Utilities/SKILL.md` |
| fixture, factory, test data, cleanup, seed test | `Testing & QA/Test Data Management/SKILL.md` |

### CI-CD, Releases, Deployment
| Match these keywords | Skill path |
|---|---|
| GitHub Actions, workflow, lint pipeline, build pipeline | `CI-CD, Releases, Deployment/CI Pipeline Engineering/SKILL.md` |
| preview deploy, per-PR preview, preview DB | `CI-CD, Releases, Deployment/Preview Deployments/SKILL.md` |
| semantic release, changelog, tag, release PR | `CI-CD, Releases, Deployment/Versioning & Release Automation/SKILL.md` |

### Docker & Runtime Operations
| Match these keywords | Skill path |
|---|---|
| Dockerfile, multi-stage build, minimal image | `Docker & Runtime Operations/Dockerfile Best Practices/SKILL.md` |
| docker-compose, local stack, service orchestration | `Docker & Runtime Operations/Docker Compose Environments/SKILL.md` |
| container env, health check, start command, port | `Docker & Runtime Operations/Runtime Configuration/SKILL.md` |
| runbook, rollback step, incident, operational | `Docker & Runtime Operations/Operational Readiness/SKILL.md` |

### Observability & Analytics
| Match these keywords | Skill path |
|---|---|
| log, request ID, correlation, redaction, log level | `Observability & Analytics/Structured Logging/SKILL.md` |
| exception, error tracking, breadcrumb, alert, Sentry | `Observability & Analytics/Error Tracking Strategy/SKILL.md` |
| web vitals, server timing, slow endpoint, performance | `Observability & Analytics/Performance Monitoring/SKILL.md` |
| audit log, security action, retention, tamper | `Observability & Analytics/Audit Logging/SKILL.md` |

### Performance, Reliability, Scalability
| Match these keywords | Skill path |
|---|---|
| cache, CDN, invalidation, revalidation, stale | `Performance, Reliability, Scalability/Caching Strategy/SKILL.md` |
| background job, queue, retry, dead-letter, async task | `Performance, Reliability, Scalability/Background Jobs Pattern/SKILL.md` |
| thundering herd, traffic spike, graceful degradation | `Performance, Reliability, Scalability/Concurrency & Load Safety/SKILL.md` |
| timeout, circuit breaker, fallback UI, failure mode | `Performance, Reliability, Scalability/Resilience Patterns/SKILL.md` |

### Developer Experience & Governance
| Match these keywords | Skill path |
|---|---|
| PR template, review checklist, maintainability | `Developer Experience & Governance/Code Review Standards/SKILL.md` |
| pin version, lockfile, update, dedupe | `Developer Experience & Governance/Dependency Hygiene/SKILL.md` |
| README, architecture doc, setup guide, onboarding | `Developer Experience & Governance/Documentation System/SKILL.md` |
| scaffold, generator, template, feature structure | `Developer Experience & Governance/Project Templates & Generators/SKILL.md` |
| naming convention, import pattern, style guide | `Developer Experience & Governance/Style Guide Enforcement/SKILL.md` |

### Data Privacy & Compliance
| Match these keywords | Skill path |
|---|---|
| PII, sensitive field, log redaction, analytics leak | `Data Privacy & Compliance Basics/PII Handling & Redaction/SKILL.md` |
| cookie banner, consent, tracking, auth cookie | `Data Privacy & Compliance Basics/Consent & Cookie Policy Basics/SKILL.md` |
| data retention, soft delete, hard delete, export | `Data Privacy & Compliance Basics/Data Retention & Deletion/SKILL.md` |

### UI-UX & Design System
| Match these keywords | Skill path |
|---|---|
| ARIA, keyboard nav, focus, contrast, screen reader, a11y | `UI-UX & Design System/Accessibility (a11y) Compliance/SKILL.md` |
| component, variant, slot, composition, reusable | `UI-UX & Design System/Component Library Engineering/SKILL.md` |
| icon, visual consistency, icon size | `UI-UX & Design System/Iconography & Visual Consistency/SKILL.md` |
| breakpoint, responsive, mobile-first, container query | `UI-UX & Design System/Responsive Layout Engineering/SKILL.md` |
| user flow, loading state, error state, empty state, UX | `UI-UX & Design System/UX Flows & Interaction Design/SKILL.md` |

### Code Quality & Process
| Match these keywords | Skill path |
|---|---|
| conventional commit, commitlint, changelog, release note | `TypeScript (Strict) & Code Quality/Conventional Commits & Changelogs/SKILL.md` |
| Husky, lint-staged, pre-commit hook | `TypeScript (Strict) & Code Quality/Git Hooks Governance/SKILL.md` |
| ESLint, lint rule, footgun, best practice | `TypeScript (Strict) & Code Quality/Linting Policy Enforcement/SKILL.md` |

### Stack-Specific
| Match these keywords | Skill path |
|---|---|
| tailwind, utility class, design token, color, spacing, dark mode, theme | `Stack-Specific/Tailwind CSS & Design Tokens/SKILL.md` |
| vercel, deploy, region, headers, caching, production | `Stack-Specific/Vercel Deployment/SKILL.md` |
| analytics, vercel analytics, page view, web vitals | `Stack-Specific/Vercel Analytics/SKILL.md` |
| github actions, workflow, CI, pipeline, deploy workflow, release workflow | `Stack-Specific/GitHub Actions CI-CD/SKILL.md` |

### Meta
| Match these keywords | Skill path |
|---|---|
| skill, SKILL.md, create skill, build skill, scaffold skill | `Skill Engineering/SKILL.md` |
| scaffold skills, bootstrap, init skills, technology detection | `Skill Engineering/Scaffold Project Skills/SKILL.md` |

---

## Project Stack — Quick Reference

> **Full project rules and conventions live in `CLAUDE.md`.**
> Read it at the start of every session.

- **App**: GetIconFav — client-side favicon/icon generator
- **Framework**: React 19 (single-page, no router)
- **Language**: TypeScript 5.7 (strict mode)
- **Build**: Vite 6 + vite-plugin-pwa
- **Styling**: Tailwind CSS 3.4 (dark mode via `class`)
- **Deployment**: Vercel (auto-deploy from `main`, Paris region)
- **Package manager**: pnpm (required — never npm/yarn)
- **CI**: GitHub Actions (ci.yml, deploy.yml, release.yml)
- **Key libs**: JSZip (ZIP generation), react-icons, @vercel/analytics
- **Architecture**: 100% client-side — Canvas API for image processing, no backend

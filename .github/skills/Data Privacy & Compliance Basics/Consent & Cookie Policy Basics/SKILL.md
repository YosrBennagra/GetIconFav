---
name: consent-cookie-policy-basics
description: 'Use when requests involve cookie banners, consent flows, analytics or marketing tracker gating, consent records, or basic privacy-by-design decisions around user tracking and preferences. Design privacy-conscious consent and cookie handling basics for websites and applications: tracker classification, consent-required versus essential processing, consent UX, preference storage, withdrawal, and policy alignment.'
---

# Consent & Cookie Policy Basics

## Overview

Consent handling should be deliberate, minimal, and easy to understand.
Prefer clear classification of trackers and processing purposes so teams only ask for consent when needed, respect user choices consistently, and keep policy text aligned with actual behavior.

## Follow This Workflow

### 1. Inventory the tracking and processing surface

- Identify cookies, local storage usage, SDKs, pixels, tags, embedded media, and third-party scripts.
- Record the purpose of each item: essential functionality, analytics, personalization, advertising, fraud prevention, or support.
- Distinguish first-party behavior from third-party data collection and sharing.

### 2. Classify what is essential versus consent-gated

- Treat strictly necessary functionality separately from optional tracking or profiling.
- Keep purpose groupings understandable to normal users rather than exposing internal vendor language.
- Use conservative defaults when the necessity of a tracker is unclear.
- Flag jurisdiction-specific edge cases for legal review instead of making aggressive assumptions.

### 3. Design the consent experience

- Present choices in plain language.
- Make acceptance, rejection, and later preference changes comparably accessible.
- Prevent optional scripts from loading before the required user choice is available.
- Keep consent state durable enough to be enforced consistently across page loads and sessions.

### 4. Record and enforce preferences

- Store what the user chose, when they chose it, and what configuration version applied.
- Ensure downstream tags, scripts, and embeds read the effective preference before firing.
- Update behavior when preferences are withdrawn or changed.
- Avoid treating banner dismissal or continued browsing as consent unless the applicable policy clearly allows it.

### 5. Re-check policy and operational alignment

- Ensure the cookie or privacy policy matches the actual tracker inventory and purposes.
- Keep retention, vendors, and user controls in sync with implementation.
- Re-review when new marketing tools, A/B testing tools, or embedded services are introduced.

## Decision Rules

| Situation | Action |
| --- | --- |
| Storage or tracking is strictly necessary for a requested core function | Handle it separately from optional consent categories and explain it clearly. |
| Script supports analytics, advertising, personalization, or third-party profiling | Default to consent-gated treatment unless strong policy guidance says otherwise. |
| One vendor serves multiple purposes | Split enforcement by purpose where possible rather than bundling everything together. |
| Consent experience makes refusal materially harder than acceptance | Rework the UX to avoid manipulative choice architecture. |
| A new tag or embed is added without documented purpose and controls | Treat rollout as incomplete until classification and enforcement are defined. |

## Quality Bar

- Tracker inventory should be current enough to support policy, engineering, and review work.
- Optional tracking should not run before the user choice required for that purpose.
- Preference changes should take effect predictably.
- Policy text should describe reality, not intent.
- Consent UX should be understandable without legal or marketing interpretation.

## Avoid These Failure Modes

- Do not classify analytics or advertising tooling as essential just because the business wants it.
- Do not load optional scripts before consent and attempt to fix it later.
- Do not make rejection or preference changes materially harder than acceptance.
- Do not rely on vague categories that hide real processing purposes.
- Do not let policy text drift away from the implemented tracker set.

## References

- Consent implementation guide: `references/consent-playbook.md`
- Consent review checklist: `references/consent-checklist.md`

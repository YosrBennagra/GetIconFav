---
name: accessibility-compliance
description: 'Use when requests involve accessibility audits, WCAG-oriented remediation, inclusive component design, keyboard or screen-reader issues, or making UI flows usable for diverse users. Design and implement accessible digital experiences across web interfaces: semantic structure, keyboard support, focus management, contrast, motion sensitivity, form clarity, announcements, and assistive technology compatibility.'
---

# Accessibility (a11y) Compliance

## Overview

Treat accessibility as a product-quality requirement, not a cleanup phase.
Prefer semantic structure, usable interaction patterns, and inclusive defaults over post hoc fixes.

## Follow This Workflow

### 1. Identify the user-critical paths

- Prioritize navigation, forms, dialogs, menus, tables, authentication, checkout, and other completion-critical flows.
- Check both component-level behavior and page-level reading order.
- Include keyboard-only and screen-reader interaction in the baseline review.

### 2. Establish semantic structure

- Use proper landmarks, headings, labels, and control semantics.
- Preserve logical reading order and meaningful names for controls.
- Ensure status, error, and success information is available beyond color alone.

### 3. Validate interaction quality

- Check keyboard reachability, focus visibility, focus order, and escape behavior.
- Verify dialogs, popovers, menus, accordions, tabs, and other interactive widgets behave predictably.
- Handle reduced motion, zoom, contrast, and pointer-size constraints where relevant.

### 4. Fix content and feedback issues

- Make forms explicit and forgiving.
- Ensure validation errors are understandable and associated with the right inputs.
- Announce async changes or status updates when users would otherwise miss them.
- Keep link text, button labels, and alt text purposeful and specific.

### 5. Verify with realistic stress cases

- Long content, localization, user-generated text, and empty states.
- Error flows, retries, disabled states, and loading states.
- Responsive and zoomed layouts where focus and reading order can break.

## Decision Rules

| Situation | Action |
| --- | --- |
| Native HTML element already provides the right semantics | Use it before creating a custom widget. |
| Custom interaction pattern is required | Reproduce the expected keyboard and announcement behavior fully. |
| Color communicates status or priority | Add text, icon, or structural cues that do not rely on color alone. |
| Motion adds delight but not meaning | Respect reduced-motion preferences and keep the experience usable without animation. |
| One accessibility fix conflicts with visual design | Preserve usability first, then adjust the visual system accordingly. |

## Quality Bar

- Core flows should be usable with keyboard only.
- Semantics should be correct without relying on implementation trivia.
- Feedback should reach users through more than one sensory channel when appropriate.
- Focus management should be predictable and visible.
- Accessible behavior should survive theming, responsive shifts, and error states.

## Avoid These Failure Modes

- Do not assume ARIA can compensate for incorrect structure.
- Do not remove focus outlines without replacing them with a visible alternative.
- Do not build custom widgets when standard elements solve the problem.
- Do not treat automated checks as complete accessibility validation.
- Do not ship inaccessible loading, disabled, or error states after fixing the happy path.

## References

- Accessibility remediation guide: `references/accessibility-playbook.md`
- Inclusive review checklist: `references/accessibility-review-checklist.md`

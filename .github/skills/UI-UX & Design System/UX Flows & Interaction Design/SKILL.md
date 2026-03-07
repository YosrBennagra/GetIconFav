---
name: ux-flows-interaction-design
description: 'Use when requests involve user journeys, flow redesign, interaction design, reducing friction, onboarding, conversion, navigation, or clarifying how users move through a product. Design user flows and interaction patterns that help people complete tasks clearly and efficiently: step sequences, decision points, feedback loops, state transitions, error recovery, and UI behavior.'
---

# UX Flows & Interaction Design

## Overview

Design interactions around user goals, decisions, and recovery paths, not just screen arrangements.
Prefer flows that reduce ambiguity, surface feedback early, and make next steps obvious.

## Follow This Workflow

### 1. Define the user job

- Identify the primary intent, trigger, and success condition.
- Separate the main happy path from secondary or exceptional paths.
- Note constraints such as trust, privacy, irreversibility, or time pressure.

### 2. Map the flow

- Use the template in `references/flow-template.md`.
- List entry points, major steps, decisions, dependencies, and exits.
- Mark moments of uncertainty, waiting, or commitment explicitly.
- Identify where users may need guidance, confirmation, or escape routes.

### 3. Design interaction behavior

- Define how navigation, forms, selection, feedback, and confirmations should behave.
- Reduce unnecessary steps, branching, and repeated input.
- Choose the smallest interaction pattern that still makes the state change understandable.
- Make the next action obvious after success, partial success, or failure.

### 4. Handle edge and recovery states

- Design empty, loading, validation, retry, timeout, and cancellation states.
- Ensure users can recover from errors without starting over unnecessarily.
- Clarify irreversible actions and side effects before commitment.

### 5. Verify and refine

- Check whether the flow supports first-time and returning users.
- Check whether important information arrives at the moment it matters.
- Check whether the interaction model still works on mobile, keyboard navigation, and assistive technology paths.
- Remove friction that does not improve confidence, safety, or comprehension.

## Decision Rules

| Situation | Action |
| --- | --- |
| User must make a high-risk decision | Slow down the flow and clarify consequences. |
| A flow has many optional branches | Preserve a strong default path and progressively disclose the rest. |
| Error recovery is common | Optimize recovery, not only the happy path. |
| One screen tries to do several unrelated jobs | Split the task or refocus the screen on the primary outcome. |
| Users need confirmation after a state change | Give immediate, specific feedback and a clear next action. |

## Quality Bar

- Users should know where they are, what happened, and what to do next.
- Flow steps should each justify their existence.
- Recovery paths should be intentional, not accidental leftovers.
- Interaction feedback should be timely and specific.
- The flow should align with both user intent and business constraints.

## Avoid These Failure Modes

- Do not optimize only for the happy path.
- Do not hide key consequences until after commitment.
- Do not force repeated input that the system already knows.
- Do not use modals, drawers, or multi-step flows when a simpler pattern would work.
- Do not confuse visual polish with interaction clarity.

## References

- Flow mapping template and prompts: `references/flow-template.md`
- Interaction review checklist: `references/interaction-review-checklist.md`

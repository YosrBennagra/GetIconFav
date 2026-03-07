---
name: iconography-visual-consistency
description: 'Use when requests involve icon systems, inconsistent visuals, UI polish, visual language cleanup, replacing ad hoc icons, or aligning interface cues across a design system. Design and maintain consistent iconography and visual language across digital products: icon selection, semantic mapping, sizing, stroke style, labeling, illustration boundaries, and visual hierarchy.'
---

# Iconography & Visual Consistency

## Overview

Treat icons and recurring visual cues as part of the product language, not decorative filler.
Prefer semantic consistency, restrained variation, and readable hierarchy over arbitrary visual novelty.

## Follow This Workflow

### 1. Audit the visual language

- Inventory icon sets, illustrations, badge styles, status cues, and recurring motifs.
- Identify semantic collisions where the same icon means different things or different icons mean the same thing.
- Note inconsistencies in stroke weight, corner style, fill behavior, and sizing.

### 2. Define semantic mapping

- Assign stable meanings to common actions, statuses, and entity types.
- Decide when icons are supportive, when they are required, and when text alone is better.
- Keep icon use consistent across navigation, tables, buttons, alerts, and empty states.

### 3. Set visual rules

- Choose a coherent family style: stroke, fill, corner treatment, detail level, and optical balance.
- Define standard sizes and spacing relationships.
- Align icon treatment with typography, color semantics, and interaction states.
- Set boundaries for illustrations, logos, emoji, and branded graphics so they do not dilute the system.

### 4. Apply with restraint

- Pair icons with labels when meaning is not universally obvious.
- Use visual emphasis intentionally; not every action needs an icon.
- Ensure visual cues remain clear in disabled, error, loading, selected, and high-density contexts.

### 5. Govern and review

- Add new icons only after checking whether an existing semantic mapping already fits.
- Remove legacy or duplicate icon styles during cleanup.
- Document ambiguous cases where icon-only presentation is not acceptable.

## Decision Rules

| Situation | Action |
| --- | --- |
| Icon meaning is ambiguous without text | Add a label or choose a clearer interaction pattern. |
| Multiple icon packs are in use | Consolidate unless a second pack is justified by a distinct product surface. |
| The same icon is proposed for different meanings | Pick one semantic owner and remap the other use. |
| Visual inconsistency comes from many small exceptions | Standardize the base rules first, then clean up outliers. |
| A brand or marketing graphic enters product UI | Ensure it does not replace functional semantics or system cues. |

## Quality Bar

- Icons should reinforce meaning, not require interpretation work.
- Visual language should feel intentionally related across screens.
- Sizes and alignment should hold up in dense and sparse layouts.
- Status cues should remain understandable across themes and states.
- The system should reduce future visual drift.

## Avoid These Failure Modes

- Do not use icons as decoration when they add no semantic value.
- Do not rely on icon-only controls for non-obvious actions.
- Do not mix filled, outlined, and decorative styles without a system reason.
- Do not overload one icon for multiple meanings.
- Do not let branding assets substitute for accessible functional cues.

## References

- Icon system guidance: `references/icon-system-playbook.md`
- Visual consistency review checklist: `references/visual-consistency-checklist.md`

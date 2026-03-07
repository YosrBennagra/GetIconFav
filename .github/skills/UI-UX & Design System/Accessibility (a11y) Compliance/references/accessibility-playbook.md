# Accessibility Playbook

## Baseline Areas

Review these first:

- Landmarks and heading structure.
- Form labels, hints, and error associations.
- Keyboard navigation and focus visibility.
- Dialog and overlay behavior.
- Contrast, text resizing, and zoom.
- Status messaging and async feedback.

## Practical Rules

- Native controls usually beat custom re-creations.
- ARIA should clarify semantics, not invent them for broken markup.
- Focus should move intentionally when context changes.
- Error messages should say what happened and what to do next.
- Decorative images should stay hidden from assistive tech; informative ones need meaningful alternatives.

## Validation Modes

- Keyboard-only walkthrough.
- Screen-reader smoke test.
- Reduced-motion review.
- Zoom and reflow review.
- Error-state and loading-state review.

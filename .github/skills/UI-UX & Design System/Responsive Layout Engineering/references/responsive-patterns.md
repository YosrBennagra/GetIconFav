# Responsive Patterns

## Layout Principles

- Let content define the breakpoint, not device marketing categories.
- Prefer fluid spacing, `minmax`, wrapping, and intrinsic sizing before adding hard switches.
- Treat component behavior as part of responsive design, not only page grids.

## Common Pattern Choices

### Navigation

- Desktop: persistent sidebar or richer top navigation.
- Mobile: simplified top bar plus drawer, sheet, or focused task navigation.

### Dense Data

- Reformat tables into cards or stacked records when comparison needs change.
- Keep comparison tables only when the comparison task remains primary.

### Forms

- Collapse multi-column forms into one clear flow on narrow screens.
- Keep labels, validation, and actions visible without awkward jumps.

### Dashboards

- Prioritize a few key metrics first.
- Reduce secondary widgets before compressing all modules equally.

## Edge Cases

- Long translated strings.
- User-generated content with unpredictable length.
- Sticky headers plus mobile browser UI.
- Empty, loading, and error states at small widths.

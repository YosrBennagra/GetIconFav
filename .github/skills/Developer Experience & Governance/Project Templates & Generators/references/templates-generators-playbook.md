# Templates and Generators Playbook

## Good Candidates

- Package or app skeletons.
- Repeated route or module structure.
- Component scaffolds.
- Config and docs starter sets.
- Codemods for repeated migrations.

## Design Rules

- Keep the input contract small.
- Generate the minimum viable useful structure.
- Align output with current repo standards.
- Prefer deterministic generation for repeatability.

## Drift Rules

- Review templates regularly.
- Version or migrate old generated output when necessary.
- Remove obsolete patterns instead of keeping endless backwards compatibility.

## Usability Rules

- Generated code should still be readable.
- Defaults should be safe and current.
- The generator should save real time, not just centralize boilerplate.

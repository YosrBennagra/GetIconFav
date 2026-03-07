# Product Requirements Workflow

## Step-by-Step Scoping Process

### 1. Normalize the request

- Identify the product type, target user, problem, desired outcome, timeline, and hard constraints.
- If the prompt is incomplete, state assumptions explicitly and continue with the smallest sensible scope.
- Choose output depth: brief for fast framing, standard for most feature work, full for launches or multi-team efforts.

### 2. Define the scope frame

- Write the problem statement in user and business terms, not solution language.
- Separate goals from non-goals.
- Name the primary audience and any critical secondary audience.
- Record dependencies, risks, assumptions, and unresolved questions before expanding the plan.
- Treat discovery work and committed delivery scope as different things.

### 3. Draft the PRD or feature brief

- Use the template in `prd-template.md`.
- Keep sections concise and decision-oriented.
- Prefer measurable success metrics over subjective goals.
- Call out what is explicitly out of scope so the document constrains work instead of expanding it.
- Add rollout, analytics, or operational requirements only when they materially affect delivery or acceptance.

### 4. Translate scope into backlog-ready stories

- Convert requirements into thin vertical slices that deliver user value end to end.
- Use story patterns from `story-acceptance-patterns.md`.
- Keep stories independent where possible and split oversized work before assigning milestones.
- Write acceptance criteria that are observable, testable, and implementation-agnostic unless implementation constraints are part of the requirement.

### 5. Build the milestone plan

- Sequence work from foundation to user-visible value, then launch hardening.
- Use `milestone-planning-playbook.md` for milestone structure and slicing rules.
- Give each milestone a clear goal, included scope, excluded scope, dependencies, exit criteria, and major risks.
- Prefer demoable increments over large invisible infrastructure batches.

### 6. Trim and stress-test the scope

- Remove nice-to-have scope that does not support the stated goals or milestone exit criteria.
- Check for hidden work: migrations, permissions, analytics, compliance, support tooling, content, and rollout dependencies.
- Flag contradictions between goals, timeline, team size, and risk tolerance.
- End with a short list of open questions only when they materially change scope or sequencing.

## Output Package

Produce only the sections the request needs, but default to:

- Scope summary: problem, users, goals, non-goals, assumptions, risks.
- PRD or feature brief.
- User stories with acceptance criteria.
- Milestone plan with sequencing rationale.
- Open questions and decisions needed from stakeholders.

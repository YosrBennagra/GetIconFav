# Release Automation Checklist

## Policy Review

- What versioning policy is in force?
- What input determines the next version?
- How are breaking changes identified?

## Automation Review

- Are release notes generated from consistent metadata?
- Are tags and artifacts created reproducibly?
- Is there a clear approval or gating path before publishing?

## Recovery Review

- What happens if publish fails halfway through?
- Is rollback distinct from patch release?
- Is release history still auditable after failure?

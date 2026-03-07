# Preview Deployments Playbook

## Core Controls

- Predictable trigger rules.
- Safe environment-specific configuration.
- Isolated or sanitized data.
- Clear deployment health visibility.
- Automatic teardown or expiration.

## Safety Rules

- Keep production secrets out of previews unless explicitly necessary.
- Prevent real-world side effects by default.
- Label previews clearly as non-production.
- Separate preview data and integrations where possible.

## Lifecycle Rules

- Create on relevant PR or branch events.
- Refresh on new commits.
- Destroy on branch close or expiry.
- Monitor orphaned resources and failures.

## Review Rules

- Surface the URL in the review flow.
- Keep status and logs reachable.
- Distinguish app regressions from environment provisioning problems.

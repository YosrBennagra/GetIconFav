# Resilience Checklist

## Dependency Review

- Which dependencies are critical?
- Which can degrade gracefully?
- Which failures are transient versus permanent?

## Pattern Review

- Are timeouts intentional?
- Are retries bounded and jittered?
- Are circuit breaking or isolation mechanisms justified?

## Recovery Review

- Is degraded behavior honest to users?
- Are resilience actions observable?
- Could the resilience design worsen load during failure?

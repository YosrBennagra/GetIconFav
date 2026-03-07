# Session Security Checklist

## Transport Review

- Are cookie settings secure and intentional?
- Are session identifiers unpredictable?
- Is transport protected by HTTPS in real deployments?

## Lifecycle Review

- What are the idle and absolute lifetimes?
- When are sessions rotated or renewed?
- What events force invalidation?

## Recovery Review

- Does logout fully invalidate trust?
- Are high-risk actions freshness-gated?
- Are multi-device and stale-tab behaviors understood?

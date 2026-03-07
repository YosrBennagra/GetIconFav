# Idempotency Checklist

## Operation Review

- Which mutations are at risk of duplicate side effects?
- Is natural idempotency enough, or is a key required?
- What does the client do after timeout uncertainty?

## Server Review

- How is a replay identified?
- What happens when the same key carries different intent?
- How long is idempotency state retained?

## Client Review

- Which failures are retried?
- Are retries bounded and jittered?
- Are keys reused only for the same semantic operation?

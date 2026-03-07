# Audit Logging Checklist

## Scope Review

- Which actions are truly audit-worthy?
- Are privileged and sensitive changes included?
- Are ordinary operational logs kept separate?

## Record Review

- Can you tell who acted, on what, when, and with what outcome?
- Is change context sufficient without overexposing sensitive data?
- Are automated actions attributable enough?

## Integrity Review

- Who can read or export the audit log?
- Can normal application paths mutate or delete audit history?
- Is retention and privacy treatment explicit?

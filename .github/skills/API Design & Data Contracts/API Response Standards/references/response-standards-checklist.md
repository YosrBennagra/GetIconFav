# Response Standards Checklist

## Status Review

- Does the status code match the real operation outcome?
- Could a client act correctly from the status alone?
- Are creation, async acceptance, and empty success distinguished properly?

## Payload Review

- Is the body shape predictable for this endpoint family?
- Is metadata separated from primary data?
- Are null, empty, and missing states intentional?

## Consistency Review

- Does this endpoint follow the API's established list and item patterns?
- Are headers and body responsibilities clear?
- Would a new client find fewer surprises than expected?

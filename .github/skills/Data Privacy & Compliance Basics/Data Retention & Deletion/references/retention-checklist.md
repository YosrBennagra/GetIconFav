# Retention Checklist

## Policy Review

- Does each important data class have a retention rule?
- Is the trigger for retention start or deletion clearly defined?
- Are exceptions documented rather than implied?

## Engineering Review

- Are purge jobs, TTLs, or workflows implemented?
- Are secondary copies included in deletion plans?
- Is soft delete followed by bounded hard deletion where needed?

## Verification Review

- Can deletion outcomes be observed and audited?
- Are backup limitations explained accurately?
- Are legal holds or investigation blocks controlled explicitly?

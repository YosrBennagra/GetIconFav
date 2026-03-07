# Retention Playbook

## Data Mapping

- List data classes, owners, systems of record, and secondary copies.
- Note whether the data includes personal, financial, security, or support information.
- Identify lifecycle triggers such as creation, inactivity, closure, or resolution.

## Retention Rules

- Define why the data is kept.
- Define when the retention clock starts.
- Define standard deletion, archive, anonymization, or aggregation behavior.

## Deletion Coverage

- Include databases, file stores, caches, search indexes, queues, analytics sinks, and exports.
- Account for backups and disaster recovery separately.
- Add legal hold and investigation controls where needed.

## Verification

- Test purge paths on realistic environments.
- Log deletion jobs and exceptions.
- Re-review schedules when product behavior or obligations change.

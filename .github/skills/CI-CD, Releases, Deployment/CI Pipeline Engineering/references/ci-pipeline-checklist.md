# CI Pipeline Checklist

## Trigger Review

- Which events trigger this workflow?
- Which checks are merge-blocking?
- Are protected branches covered appropriately?

## Job Review

- Are jobs split by meaningful concern?
- Are independent checks parallelized?
- Is failure output easy to localize?

## Operations Review

- Are caches effective and safe?
- Are secrets scoped narrowly?
- Are artifacts retained only as long as needed?

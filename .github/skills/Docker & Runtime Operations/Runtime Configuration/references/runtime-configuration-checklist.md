# Runtime Configuration Checklist

## Contract Review

- Which values are required?
- Which values are secrets?
- Which values are safe defaults?

## Startup Review

- Does the app fail clearly when required config is missing?
- Are ports and entrypoints intentional?
- Are writable paths and file assumptions explicit?

## Operations Review

- Can environments vary without rebuilding the image?
- Are secrets kept out of logs and images?
- Is old configuration being retired cleanly?

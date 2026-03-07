# Headers and CSP Checklist

## Resource Review

- Which origins are actually needed for scripts, styles, frames, and media?
- Are inline scripts or eval-like behavior still present?
- Are third-party dependencies tightly scoped?

## Policy Review

- Is HTTPS policy explicit?
- Is framing denied unless needed?
- Is CSP enforceable or still report-only?

## Exception Review

- Why does each broad directive or third-party origin exist?
- Are preview and callback domains handled intentionally?
- Would the policy meaningfully reduce XSS or clickjacking impact?

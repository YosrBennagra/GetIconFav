# Mocking Checklist

## Boundary Review

- What dependency is being replaced and why?
- Is a real collaborator cheap enough to keep?
- Is the chosen double the simplest tool that works?

## Utility Review

- Does the helper remove meaningful repetition?
- Does the helper still leave the test readable?
- Is the helper scoped to one testing layer?

## Honesty Review

- Does the fake or mock reflect the real contract well enough?
- Are important failures or edge cases still visible?
- Are interaction assertions justified by the contract?

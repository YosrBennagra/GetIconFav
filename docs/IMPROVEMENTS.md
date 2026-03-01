# GetIconFav — Possible Improvements & Roadmap

## High Priority

### 1. Export Format Options
- **Android Adaptive Icon** — Generate foreground/background layers for Android.

### 2. Image Editing
- **Crop tool** — Let users crop the source image before generating icons (useful for non-square images).
- **Border radius** — Preview with rounded corners (iOS, Android, macOS).

## Medium Priority

### 3. Batch Processing
- Accept **multiple source images** to generate separate `.ico` files at once.
- History of previously generated icons within the session.

### 4. Drag & Drop Reordering
- Allow reordering size slots in the grid for priority/preference.

## Low Priority / Nice to Have

### 5. Analytics & Feedback
- **Feedback form** or issue link for users to report bugs.

### 6. i18n / Localization
- Add multi-language support (start with English, French, Arabic).
- Use `react-intl` or `i18next`.

### 7. Performance Optimizations
- Use **Web Workers** for image resizing to keep the UI thread free on large/many images.
- Use **OffscreenCanvas** where supported for better performance.
- Lazy-load the education/guide section.

### 8. Testing
- Add **unit tests** for `ico-encoder.ts` and `image-resizer.ts` (Vitest).
- Add **component tests** for drag-and-drop, size toggling, download flow (Testing Library).
- Add **E2E tests** with Playwright or Cypress.

### 9. CI/CD
- Set up **GitHub Actions** for:
  - Lint + type check on PR
  - Build check
  - Automated deployment (GitHub Pages, Vercel, or Netlify)

---

## Completed

- ~~**Blueprint / Technical Drawing Design**~~ — Professional blueprint-inspired redesign: navy backgrounds, blue accent palette, subtle grid overlay, blue-tinted checkerboard, all components restyled *(v2.3.0)*
- ~~**PWA & Offline Support**~~ — Service worker (via `vite-plugin-pwa`) + web app manifest for installability and full offline support *(v2.2.0)*
- ~~**PNG export**~~ — Individual PNG download per icon from the grid *(v2.2.0)*
- ~~**Dark/Light Theme Toggle**~~ — Toggle in header, respects `prefers-color-scheme` system setting, persists to `localStorage` *(v2.2.0)*
- ~~**Accessibility (a11y)**~~ — Reduced motion support, focus-visible ring, skip-to-content link, ARIA labels on all icon-only buttons, `aria-live` status region, `aria-busy` processing state, step indicator `nav` with `aria-current` *(v2.2.0)*
- ~~**SEO & Meta Tags**~~ — Open Graph, Twitter card, JSON-LD structured data (WebApplication + FAQPage) *(v2.1.0)*
- ~~**Preview Customization**~~ — Custom page title and URL inputs for browser tab/context previews *(v2.2.0)*

---

## Technical Debt

- Consider extracting icon processing logic from `App.tsx` into a custom hook (`useIconGenerator`).
- Consider using `zustand` or `jotai` for state management if complexity grows.
- Add strict ESLint rules (e.g., `eslint-plugin-jsx-a11y`).

---

*Last updated: June 2025*

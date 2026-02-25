# GetIconFav — Possible Improvements & Roadmap

## High Priority

### 1. PWA & Offline Support
- Add a **service worker** so the tool works fully offline after first load.
- Add a **web app manifest** (`manifest.json`) for installability on mobile/desktop.
- Since everything is client-side, offline support is a natural fit.

### 2. Export Format Options
- **PNG export** — Allow downloading individual sizes as PNG files (in addition to .ico).
- **Apple Touch Icon** — Generate a 180×180 PNG for `apple-touch-icon`.
- **Web Manifest Icons** — Auto-generate `icon-192.png` and `icon-512.png` for PWA manifests.
- **Android Adaptive Icon** — Generate foreground/background layers for Android.
- **ZIP bundle** — Download all formats as a single `.zip` file.

### 3. Image Editing
- **Crop tool** — Let users crop the source image before generating icons (useful for non-square images).
- **Background color** — Add option to set a background color for transparent areas.
- **Padding control** — Add padding/margin slider to prevent icons from being edge-to-edge.
- **Border radius** — Preview with rounded corners (iOS, Android, macOS).

## Medium Priority

### 4. Batch Processing
- Accept **multiple source images** to generate separate `.ico` files at once.
- History of previously generated icons within the session.

### 5. Dark/Light Theme Toggle
- Currently dark only. Add a toggle for light theme preference.
- Respect `prefers-color-scheme` system setting.

### 6. Drag & Drop Reordering
- Allow reordering size slots in the grid for priority/preference.

### 7. Accessibility (a11y)
- Full **keyboard navigation** through all interactive elements.
- **Screen reader announcements** for processing states.
- **Reduced motion** support for users who prefer minimal animations.
- ARIA labels on all icon-only buttons.

### 8. SEO & Meta Tags
- Add **Open Graph** and **Twitter card** meta tags for better social sharing.
- Add structured data (JSON-LD) for the tool.

## Low Priority / Nice to Have

### 9. Preview Customization
- Let users type a **custom page title** for the browser tab preview.
- Let users type a **custom URL** for the address bar preview.
- Toggle between **light/dark browser chrome** in previews.

### 10. Analytics & Feedback
- Privacy-respecting analytics (e.g., Plausible, Umami) to see usage patterns.
- **Feedback form** or issue link for users to report bugs.

### 11. i18n / Localization
- Add multi-language support (start with English, French, Arabic).
- Use `react-intl` or `i18next`.

### 12. Code Snippet Generator
- After generating the icon, show a **copy-paste ready HTML snippet** customized with the user's chosen sizes.
- Include `<link>` tags, web manifest JSON, etc.

### 13. Performance Optimizations
- Use **Web Workers** for image resizing to keep the UI thread free on large/many images.
- Use **OffscreenCanvas** where supported for better performance.
- Lazy-load the education/guide section.

### 14. Testing
- Add **unit tests** for `ico-encoder.ts` and `image-resizer.ts` (Vitest).
- Add **component tests** for drag-and-drop, size toggling, download flow (Testing Library).
- Add **E2E tests** with Playwright or Cypress.

### 15. CI/CD
- Set up **GitHub Actions** for:
  - Lint + type check on PR
  - Build check
  - Automated deployment (GitHub Pages, Vercel, or Netlify)

---

## Technical Debt

- `browser-preview.tsx` is now unused (replaced by `favicon-previews.tsx`) — can be deleted.
- Consider extracting icon processing logic from `App.tsx` into a custom hook (`useIconGenerator`).
- Consider using `zustand` or `jotai` for state management if complexity grows.
- Add strict ESLint rules (e.g., `eslint-plugin-jsx-a11y`).

---

*Last updated: February 2025*

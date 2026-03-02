# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- **Blueprint / Technical Drawing Design** — Complete visual redesign with a professional blueprint-inspired aesthetic:
  - New color palette: blueprint blue (#5b9bd5), steel (#7c8eb5), soft green (#4caf7c), warm red (#d65f5f), amber (#e5a84b)
  - Deep navy dark mode background (#0b1929) with subtle blueprint grid pattern overlay
  - Blue-tinted checkerboard pattern for transparency previews
  - Blueprint-themed borders and structural lines (#1a3a5c, #1e4a6e)
  - Updated scrollbar, selection, focus-visible, and skip-to-content colors
  - Gradient button (blue → steel) with white text
  - All components restyled: drop zone, step indicator, icon grid categories, advanced controls, previews, guide, support links
  - Maintains clean UX/UI — professional and not overwhelming

### Added

- Open source repository setup (LICENSE, CONTRIBUTING, SECURITY, CODE_OF_CONDUCT)

## [2.2.0] - 2025-06-01

### Added

- **PWA & Offline Support** — Service worker via `vite-plugin-pwa` with Workbox for full offline capability after first load; auto-generated `manifest.webmanifest` with app name, theme color, and icons; Google Fonts runtime caching
- **PNG Export** — Individual PNG download button on each icon in the grid; click the download icon on any slot to save that single file
- **Dark/Light Theme Toggle** — Sun/moon toggle in the header; respects `prefers-color-scheme` system setting on first visit; persists preference to `localStorage`; inline script in HTML prevents flash of wrong theme
- **Accessibility (a11y)** — `@media (prefers-reduced-motion: reduce)` disables all animations and transitions; `:focus-visible` outline ring on all focusable elements; skip-to-content link for keyboard users; `aria-live="polite"` region for real-time status updates; `aria-busy` and `role="status"` on processing spinner; `aria-label` on all icon-only buttons (Previews, HTML, Reset, Quick, Advanced, theme toggle, individual download); step indicator uses `<nav>` with `aria-current="step"` and descriptive labels; drop zone has descriptive `aria-label`
- **Preview Customization** — Custom page title and URL input fields below the tab preview; values propagate to all context previews (browser tab, bookmarks, Google search, social cards) in both the inline preview and the slide-over panel
- PWA icon assets (`pwa-icon.svg`, `pwa-192x192.png`, `pwa-512x512.png`) in `public/`
- `useTheme` hook (`src/lib/use-theme.ts`) for theme state management

### Changed

- Header, footer, sidebar, slide-over panels, and download bar now have light-mode–aware border and background colors (`border-zinc-200 dark:border-zinc-800/40`, `bg-white dark:bg-zinc-950`)
- Checkerboard transparency pattern adapts to light/dark theme
- Scrollbar thumb colors adapt to light/dark theme
- `index.html` `<body>` uses Tailwind dark-mode classes; `<meta name="color-scheme">` updated to `dark light`
- Tailwind config: added `darkMode: 'class'`

## [2.1.0] - 2026-03-01

### Added

- Full brand icon package generator: 26+ icon variants across Favicon, Apple Touch, Android/PWA, Microsoft Tiles, Open Graph, and App Store categories
- ZIP package download with all selected icons, `favicon.ico`, `site.webmanifest`, `browserconfig.xml`, and HTML snippet
- Apple Touch Icons for all standard sizes (60, 76, 120, 152, 180px); canonical `apple-touch-icon.png` name for 180×180
- Android/PWA icons (48–512px) including maskable variants (`android-chrome-maskable-192x192.png`, `android-chrome-maskable-512x512.png`) with proper safe-zone padding
- 1024×1024 App Store / Google Play icon (`app-icon-1024x1024.png`)
- Open Graph images: 1200×630 (Facebook/LinkedIn), 1200×600 (Twitter/X), 400×400 square
- SVG passthrough: when the source is SVG, `favicon.svg` and `safari-pinned-tab.svg` are included in the ZIP
- Quick / Advanced mode toggle in the header
- Background color picker in Advanced mode (preset swatches + custom color input)
- Padding slider (0–25%) in Advanced mode; icons regenerate live on change
- Tiny preview row showing 16px, 32px, 48px icons inline, plus a 3× zoomed 16px view
- Source resolution warnings (very low res < 128px, low res < 512px) and a 16px readability tip
- Category-organized icon selection grid with collapse/expand, per-category select/deselect, All and Essential presets
- Context previews slide-over (browser tab, bookmarks, Google search, Windows taskbar, macOS Dock, iOS home screen, OG card, Twitter card, Windows tile)
- HTML snippet slide-over panel with copy button, auto-generated from selected icons
- Inline HTML copy button in the Package Contents sidebar panel
- `site.webmanifest` with correct `purpose: "maskable"` / `purpose: "any"` per icon
- Vercel Analytics integration
- `safari-pinned-tab.svg` and `<link rel="mask-icon">` tag added to snippet when source is SVG

### Removed

- Unused `browser-preview.tsx` component (replaced by `favicon-previews.tsx`)
- GitHub issue templates (bug report, feature request)
- Pull request template
- GitHub Sponsors and Buy Me a Coffee funding configuration
- CI/CD pipeline (lint, typecheck, build, security scan)
- Deploy pipeline to Vercel (gifav.veinpal.com)
- Release pipeline with auto-generated changelogs
- Full SEO meta tags (Open Graph, Twitter Cards, structured data)
- EditorConfig for consistent coding styles
- robots.txt and sitemap.xml for search engine indexing

## [2.0.0] - 2025-06-01

### Added

- Complete rewrite with React 19 + TypeScript + Vite
- Drag & drop image upload
- Multi-size `.ico` file generation (16–256px)
- Custom per-size image overrides
- Browser tab favicon preview
- Quick presets (all sizes, essentials)
- File size estimation before download
- Upscale warnings for small source images
- Transparency preservation with checkerboard preview
- Center-crop for non-square images
- Dark UI with neon accent theme

## [1.0.0] - 2025-01-01

### Added

- Initial release
- Basic favicon generation from single image
- Standard icon sizes support

[Unreleased]: https://github.com/YosrBennagra/GetIconFav/compare/v2.2.0...HEAD
[2.2.0]: https://github.com/YosrBennagra/GetIconFav/compare/v2.1.0...v2.2.0
[2.1.0]: https://github.com/YosrBennagra/GetIconFav/compare/v2.0.0...v2.1.0
[2.0.0]: https://github.com/YosrBennagra/GetIconFav/compare/v1.0.0...v2.0.0
[1.0.0]: https://github.com/YosrBennagra/GetIconFav/releases/tag/v1.0.0

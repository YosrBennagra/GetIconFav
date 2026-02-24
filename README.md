# IconForge

> Convert any image to a multi-size `.ico` file — drag, preview, download.

## What It Does

1. **Drop** a PNG, JPG, SVG, WebP, BMP, or GIF image
2. **Preview** auto-generated icons at 7 standard sizes (16–256px)
3. **Select** which sizes to include
4. **Download** a properly formatted `.ico` file

No server, no uploads — everything runs in your browser.

## Features

- **Drag & drop** or click to browse
- **Center-crop** non-square images automatically
- **Transparency** preserved (checkerboard pattern in preview)
- **Upscale warnings** when source is smaller than a target size
- **Browser tab preview** — see how your favicon actually looks
- **Quick presets** — all sizes or just the essentials (16, 32, 48, 256)
- **File size estimate** before download
- **100% client-side** — images never leave your browser

## Getting Started

```bash
pnpm install
pnpm dev
```

Opens at `http://localhost:5173`.

## Build

```bash
pnpm build
pnpm preview  # serve the production build locally
```

## Tech Stack

- [Vite](https://vite.dev) — fast dev server and bundler
- [React 19](https://react.dev) — UI framework
- [TypeScript](https://www.typescriptlang.org) — type safety
- [Tailwind CSS 3](https://tailwindcss.com) — utility-first styling

## ICO Format

The encoder produces standard ICO files with **PNG payloads** (supported since Windows Vista / IE7). Each selected size is stored as a standalone PNG entry inside the `.ico` container. This is the recommended modern approach — smaller files, better quality.

## Standard Icon Sizes

| Size | Common Usage |
| --- | --- |
| 16×16 | Browser favicon, small toolbar |
| 24×24 | Small toolbar icons |
| 32×32 | Windows taskbar, standard icon |
| 48×48 | Desktop icon, Windows Explorer |
| 64×64 | Large toolbar |
| 128×128 | macOS / high-DPI displays |
| 256×256 | Maximum size, Windows thumbnail |

## License

MIT — Veinpal

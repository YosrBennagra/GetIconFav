<div align="center">

# GetIconFav

**Free online favicon.ico generator — drag, preview in every context, and download.**

[![CI](https://github.com/YosrBennagra/GetIconFav/actions/workflows/ci.yml/badge.svg)](https://github.com/YosrBennagra/GetIconFav/actions/workflows/ci.yml)
[![Deploy](https://github.com/YosrBennagra/GetIconFav/actions/workflows/deploy.yml/badge.svg)](https://github.com/YosrBennagra/GetIconFav/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61dafb.svg)](https://react.dev/)

[**Live Demo**](https://gifav.veinpal.com) | [Report Bug](https://github.com/YosrBennagra/GetIconFav/issues/new?template=bug_report.yml) | [Request Feature](https://github.com/YosrBennagra/GetIconFav/issues/new?template=feature_request.yml)

</div>

---

## Overview

GetIconFav converts any image to a multi-size `.ico` file - drag, preview, download. **100% client-side** - your images never leave your browser.

### How It Works

1. **Drop** a PNG, JPG, SVG, WebP, BMP, or GIF image
2. **Preview** auto-generated icons at 7 standard sizes (16-256px)
3. **Select** which sizes to include
4. **Download** a properly formatted `.ico` file

## Features

- **Drag and drop** or click to browse
- **Center-crop** non-square images automatically
- **Transparency** preserved (checkerboard pattern in preview)
- **Upscale warnings** when source is smaller than a target size
- **Browser tab preview** - see how your favicon actually looks
- **Quick presets** - all sizes or just the essentials (16, 32, 48, 256)
- **File size estimate** before download
- **100% client-side** - images never leave your browser

## Quick Start

### Prerequisites

- **Node.js** >= 18
- **pnpm** >= 9

### Installation

```bash
git clone https://github.com/YosrBennagra/GetIconFav.git
cd GetIconFav
pnpm install
pnpm dev
```

Opens at `http://localhost:5173`.

### Production Build

```bash
pnpm build
pnpm preview
```

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start development server |
| `pnpm build` | Production build |
| `pnpm preview` | Serve production build locally |
| `pnpm lint` | Run ESLint |
| `pnpm typecheck` | TypeScript type checking |
| `pnpm format` | Format code with Prettier |

## Tech Stack

| Technology | Purpose |
| --- | --- |
| [Vite](https://vite.dev) | Fast dev server and bundler |
| [React 19](https://react.dev) | UI framework |
| [TypeScript](https://www.typescriptlang.org) | Type safety |
| [Tailwind CSS](https://tailwindcss.com) | Utility-first styling |

## ICO Format

The encoder produces standard ICO files with **PNG payloads** (supported since Windows Vista / IE7). Each selected size is stored as a standalone PNG entry inside the `.ico` container.

## Standard Icon Sizes

| Size | Common Usage |
| --- | --- |
| 16x16 | Browser favicon, small toolbar |
| 24x24 | Small toolbar icons |
| 32x32 | Windows taskbar, standard icon |
| 48x48 | Desktop icon, Windows Explorer |
| 64x64 | Large toolbar |
| 128x128 | macOS / high-DPI displays |
| 256x256 | Maximum size, Windows thumbnail |

## Contributing

Contributions are welcome! Please read our [Contributing Guide](./CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Make your changes
4. Run checks: `pnpm lint && pnpm typecheck && pnpm build`
5. Commit using [Conventional Commits](https://www.conventionalcommits.org/)
6. Push and open a Pull Request

## Support

- [GitHub Discussions](https://github.com/YosrBennagra/GetIconFav/discussions) - Questions
- [Bug Reports](https://github.com/YosrBennagra/GetIconFav/issues/new?template=bug_report.yml)
- [Feature Requests](https://github.com/YosrBennagra/GetIconFav/issues/new?template=feature_request.yml)

## Sponsors

- [GitHub Sponsors](https://github.com/sponsors/YosrBennagra)
- [Buy Me a Coffee](https://buymeacoffee.com/veinpal)

## License

MIT License - see [LICENSE](./LICENSE) for details.

---

<div align="center">
Made with love by <a href="https://github.com/YosrBennagra">Veinpal</a>
</div>

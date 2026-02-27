# GetIconFav — Usage Guide

A complete guide to generating `.ico` favicon files with GetIconFav.

---

## What is a Favicon?

A **favicon** (short for "favorite icon") is the small icon displayed in browser tabs, bookmarks, search results, and operating system taskbars. The standard format is `.ico`, which bundles multiple sizes into a single file so browsers and systems can pick the best resolution.

### Why `.ico`?

| Format | Browser Support | Multi-Size | OS Integration |
| ------ | --------------- | ---------- | -------------- |
| `.ico` | Universal       | Yes        | Full           |
| `.png` | Modern only     | No         | Partial        |
| `.svg` | Limited         | N/A        | None           |

The `.ico` format remains the most compatible choice. It works in every browser (including legacy IE) and integrates with Windows taskbar, macOS Dock, and PWA manifests.

---

## Quick Start

### Step 1 — Upload Your Source Image

1. Open GetIconFav in your browser.
2. **Drag and drop** an image onto the upload zone, or **click** to browse files.
3. Supported formats: **SVG**, **PNG**, **JPG**, **WebP**, **BMP**, **GIF**.

**Best practices for source images:**

- Use **512x512 px or larger** for crisp results at all sizes.
- **SVG** is ideal — it scales perfectly to any resolution.
- **Square images** work best. Non-square images get center-cropped automatically.
- Use a simple, recognizable design — favicons are viewed at very small sizes (16x16).

### Step 2 — Configure Sizes

After uploading, GetIconFav automatically generates previews for **7 standard sizes**:

| Size      | Purpose                              | Priority  |
| --------- | ------------------------------------ | --------- |
| **16x16** | Browser tab icon                     | Essential |
| **24x24** | Toolbar / navigation bar             | Optional  |
| **32x32** | Taskbar / standard shortcut          | Essential |
| **48x48** | Desktop shortcut / Windows icon      | Essential |
| **64x64** | Large toolbar / high-DPI tab         | Optional  |
| **128x128** | Chrome Web Store / large preview   | Optional  |
| **256x256** | Windows Vista+ large icon view     | Essential |

**Select which sizes to include:**

- Click the **checkbox** on any size card to toggle it.
- Use the **"All"** preset to include every size.
- Use the **"Essential"** preset for the 4 most important sizes (16, 32, 48, 256).

### Step 3 — Download

Once at least one size is selected and generated:

1. The **download bar** appears at the bottom of the right panel.
2. Review the size count and estimated file size.
3. Click **Download .ico** to save the file.

The downloaded file is named after your source image (e.g., `logo.ico`).

---

## Advanced Features

### Custom Per-Size Overrides

Sometimes the auto-scaled version does not look right at a specific size (especially 16x16). You can **override any individual size** with a different image:

1. Prepare a custom version of your icon at the target size.
2. **Drag and drop** that image directly onto the size card in the grid.
3. The card updates to show your custom image with a green indicator.
4. Click the **X** button on the card to remove the override and revert to auto-scaled.

This is useful for:
- Hand-tuned 16x16 pixel art for tiny tab icons.
- Using a simplified version of your logo at small sizes.
- Using a detailed version at large sizes (256x256).

### Live Browser Tab Preview

The left panel shows a **real-time browser tab simulation** using your 16x16 favicon. This lets you see exactly how your icon appears in a browser tab before downloading.

### Context Previews

Click the **Previews** button in the header to open a slide-out panel showing your favicon in 6 real-world contexts:

1. **Browser Tab** — How it looks in an active tab.
2. **Bookmarks Bar** — Appearance in the bookmarks list.
3. **Google Search** — How search results display your site icon.
4. **Windows Taskbar** — Pinned app appearance on Windows.
5. **PWA Install** — Progressive Web App icon.
6. **macOS Dock** — App icon in the macOS Dock.

### Installation Guide

Click the **Guide** button in the header for detailed installation instructions covering HTML setup and framework integration.

---

## Installing Your Favicon

### Basic HTML

Place `favicon.ico` in your project root and add to `<head>`:

```html
<link rel="icon" href="/favicon.ico" sizes="any" />
```

For additional PNG sizes (optional):

```html
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
```

### Next.js (App Router)

Place `favicon.ico` in the `app/` directory. Next.js detects it automatically — no `<link>` tag needed.

```
app/
  favicon.ico    ← just place it here
  layout.tsx
  page.tsx
```

### Vite / React / Vue

Place `favicon.ico` in the `public/` directory:

```
public/
  favicon.ico    ← place here
src/
  ...
```

Add to `index.html`:

```html
<link rel="icon" href="/favicon.ico" />
```

### WordPress

1. Go to **Appearance > Customize > Site Identity**.
2. Upload your icon under **Site Icon**.
3. WordPress handles the rest.

### Manual / Static Sites

1. Place `favicon.ico` at the root of your web server.
2. Most browsers check `/favicon.ico` automatically, even without a `<link>` tag.
3. Adding the `<link>` tag in `<head>` is still recommended for reliability.

---

## Keyboard Shortcuts

| Action              | Shortcut          |
| ------------------- | ----------------- |
| Upload file         | Click drop zone   |
| Toggle size         | Click checkbox    |
| Override size       | Drag onto card    |
| Open guide          | Click Guide button |
| Open previews       | Click Previews button |
| Reset all           | Click Reset button |

---

## Privacy & Security

- **100% client-side**: All image processing happens in your browser using the Canvas API.
- **No uploads**: Your files never leave your device. No server, no cloud, no analytics.
- **No tracking**: GetIconFav does not use cookies, analytics, or any form of data collection.
- **Open source**: Full source code available on [GitHub](https://github.com/YosrBennagra/GetIconFav).

---

## Troubleshooting

### Icon looks blurry at small sizes

- Your source image may be too detailed for 16x16. Try creating a simplified version and using the **custom override** feature (drag a custom image onto the 16x16 card).
- SVG sources generally produce sharper results than rasterized PNG/JPG.

### Icon not showing in browser

- **Clear your browser cache** (Ctrl+Shift+R / Cmd+Shift+R).
- Verify the `<link>` tag `href` path is correct.
- Check that `favicon.ico` is served with the correct MIME type (`image/x-icon`).

### Non-square image warning

- GetIconFav automatically center-crops non-square images. For best results, crop your image to a square before uploading.

### Large file size

- Reduce the number of included sizes using the checkboxes.
- Use **Essential** preset (16, 32, 48, 256) for optimal size-to-coverage ratio.
- PNG-compressed sources tend to produce smaller `.ico` files than uncompressed BMP.

---

## Technical Details

- **Output format**: ICO (Windows Icon format)
- **Encoding**: Each size is stored as a PNG-compressed entry inside the ICO container.
- **Max sizes**: 7 standard sizes from 16x16 to 256x256.
- **Source processing**: Images are resized using the browser's Canvas API with high-quality interpolation.
- **Custom overrides**: Each size can use a different source image, independently resized.

---

## FAQ

**Q: Can I use a transparent background?**
A: Yes. PNG and SVG sources with transparency are fully supported. The transparency is preserved in the output `.ico` file.

**Q: What if my source is smaller than 256x256?**
A: GetIconFav will upscale the image, but the result may appear blurry at larger sizes. A warning indicator appears on sizes that require upscaling. Use a higher-resolution source for best results.

**Q: Is there a file size limit?**
A: No hard limit, but very large images (10MB+) may take longer to process. The processing is entirely in your browser, so performance depends on your device.

**Q: Can I generate PNG favicons instead of ICO?**
A: GetIconFav generates `.ico` files specifically. For individual PNG exports, you can take your source image and resize it manually, or use the browser's built-in tools.

**Q: Does this work offline?**
A: Yes, once the page is loaded, GetIconFav works entirely offline. No internet connection is needed for processing or downloading.

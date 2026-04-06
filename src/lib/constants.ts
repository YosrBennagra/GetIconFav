/** Standard icon sizes included in a typical .ico file. */
export const ICON_SIZES = [16, 24, 32, 48, 64, 128, 256] as const;

export type IconSize = (typeof ICON_SIZES)[number];

/** Accepted input image MIME types. */
export const ACCEPTED_TYPES = [
  'image/png',
  'image/jpeg',
  'image/svg+xml',
  'image/webp',
  'image/bmp',
  'image/gif',
] as const;

/** File extensions shown in the UI. */
export const ACCEPTED_EXTENSIONS = '.png, .jpg, .jpeg, .svg, .webp, .bmp, .gif';

/** Size labels for display. */
export const SIZE_LABELS: Record<IconSize, string> = {
  16: '16 × 16 — Favicon (tab icon)',
  24: '24 × 24 — Small toolbar',
  32: '32 × 32 — Taskbar / standard',
  48: '48 × 48 — Desktop icon',
  64: '64 × 64 — Large toolbar',
  128: '128 × 128 — High-DPI displays',
  256: '256 × 256 — Maximum / thumbnail',
};

/** Rich metadata per icon size. */
export const SIZE_META: Record<IconSize, { usage: string; category: 'essential' | 'standard' | 'hd' }> = {
  16: { usage: 'Favicon · Tab icon', category: 'essential' },
  24: { usage: 'Small toolbar', category: 'standard' },
  32: { usage: 'Taskbar · Standard', category: 'essential' },
  48: { usage: 'Desktop icon', category: 'essential' },
  64: { usage: 'Large toolbar', category: 'standard' },
  128: { usage: 'High-DPI display', category: 'hd' },
  256: { usage: 'Vista+ · Thumbnail', category: 'essential' },
};

// ── Comprehensive Icon Package Types ─────────────────────────────

export type IconCategory = 'favicon' | 'apple' | 'android' | 'microsoft' | 'msixstore' | 'opengraph' | 'appstore';

export interface PackageIcon {
  readonly id: string;
  readonly filename: string;
  readonly width: number;
  readonly height: number;
  readonly category: IconCategory;
  readonly label: string;
  readonly description: string;
  /** If true, included in the default selection */
  readonly essential: boolean;
  /** If true, this icon uses maskable rendering (inner 80% safe zone) */
  readonly maskable?: boolean;
}

/** All icons in the full brand package. */
export const PACKAGE_ICONS: readonly PackageIcon[] = [
  // ── Favicons (PNG) ──────────────────────────
  { id: 'fav-16', filename: 'favicon-16x16.png', width: 16, height: 16, category: 'favicon', label: '16×16', description: 'Browser tab icon', essential: true },
  { id: 'fav-32', filename: 'favicon-32x32.png', width: 32, height: 32, category: 'favicon', label: '32×32', description: 'Taskbar / standard', essential: true },
  { id: 'fav-48', filename: 'favicon-48x48.png', width: 48, height: 48, category: 'favicon', label: '48×48', description: 'Desktop shortcut', essential: true },

  // ── Apple Touch Icons ───────────────────────
  { id: 'apple-60', filename: 'apple-touch-icon-60x60.png', width: 60, height: 60, category: 'apple', label: '60×60', description: 'iPhone (iOS 7+)', essential: false },
  { id: 'apple-76', filename: 'apple-touch-icon-76x76.png', width: 76, height: 76, category: 'apple', label: '76×76', description: 'iPad (iOS 7+)', essential: false },
  { id: 'apple-120', filename: 'apple-touch-icon-120x120.png', width: 120, height: 120, category: 'apple', label: '120×120', description: 'iPhone (retina)', essential: true },
  { id: 'apple-152', filename: 'apple-touch-icon-152x152.png', width: 152, height: 152, category: 'apple', label: '152×152', description: 'iPad (retina)', essential: true },
  { id: 'apple-180', filename: 'apple-touch-icon.png', width: 180, height: 180, category: 'apple', label: '180×180', description: 'Default apple touch icon', essential: true },

  // ── Android / PWA ───────────────────────────
  { id: 'android-48', filename: 'android-chrome-48x48.png', width: 48, height: 48, category: 'android', label: '48×48', description: 'mdpi', essential: false },
  { id: 'android-72', filename: 'android-chrome-72x72.png', width: 72, height: 72, category: 'android', label: '72×72', description: 'hdpi', essential: false },
  { id: 'android-96', filename: 'android-chrome-96x96.png', width: 96, height: 96, category: 'android', label: '96×96', description: 'xhdpi', essential: false },
  { id: 'android-144', filename: 'android-chrome-144x144.png', width: 144, height: 144, category: 'android', label: '144×144', description: 'xxhdpi', essential: false },
  { id: 'android-192', filename: 'android-chrome-192x192.png', width: 192, height: 192, category: 'android', label: '192×192', description: 'PWA manifest icon', essential: true },
  { id: 'android-512', filename: 'android-chrome-512x512.png', width: 512, height: 512, category: 'android', label: '512×512', description: 'PWA splash screen', essential: true },
  { id: 'android-maskable-192', filename: 'android-chrome-maskable-192x192.png', width: 192, height: 192, category: 'android', label: '192 mask', description: 'Maskable (safe zone)', essential: true, maskable: true },
  { id: 'android-maskable-512', filename: 'android-chrome-maskable-512x512.png', width: 512, height: 512, category: 'android', label: '512 mask', description: 'Maskable (safe zone)', essential: true, maskable: true },

  // ── Microsoft Tiles ─────────────────────────
  { id: 'ms-70', filename: 'mstile-70x70.png', width: 70, height: 70, category: 'microsoft', label: '70×70', description: 'Small tile', essential: false },
  { id: 'ms-144', filename: 'mstile-144x144.png', width: 144, height: 144, category: 'microsoft', label: '144×144', description: 'Medium tile (pinned)', essential: true },
  { id: 'ms-150', filename: 'mstile-150x150.png', width: 150, height: 150, category: 'microsoft', label: '150×150', description: 'Medium tile', essential: true },
  { id: 'ms-310w', filename: 'mstile-310x150.png', width: 310, height: 150, category: 'microsoft', label: '310×150', description: 'Wide tile', essential: false },
  { id: 'ms-310', filename: 'mstile-310x310.png', width: 310, height: 310, category: 'microsoft', label: '310×310', description: 'Large tile', essential: true },

  // ── MSIX Store Visual Assets ─────────────────────────
  { id: 'msix-store-logo', filename: 'StoreLogo.png', width: 50, height: 50, category: 'msixstore', label: '50×50', description: 'Package manifest logo', essential: true },
  { id: 'msix-44', filename: 'Square44x44Logo.png', width: 44, height: 44, category: 'msixstore', label: '44×44', description: 'Taskbar / Start all-apps', essential: true },
  { id: 'msix-71', filename: 'SmallTile.png', width: 71, height: 71, category: 'msixstore', label: '71×71', description: 'Start small tile', essential: true },
  { id: 'msix-150', filename: 'Square150x150Logo.png', width: 150, height: 150, category: 'msixstore', label: '150×150', description: 'Start medium tile', essential: true },
  { id: 'msix-310w', filename: 'Wide310x150Logo.png', width: 310, height: 150, category: 'msixstore', label: '310×150', description: 'Start wide tile', essential: false },
  { id: 'msix-310', filename: 'LargeTile.png', width: 310, height: 310, category: 'msixstore', label: '310×310', description: 'Start large tile', essential: true },
  { id: 'msix-splash', filename: 'SplashScreen.png', width: 620, height: 300, category: 'msixstore', label: '620×300', description: 'App splash screen', essential: false },

  // ── Open Graph / Social ─────────────────────
  { id: 'og-image', filename: 'og-image.png', width: 1200, height: 630, category: 'opengraph', label: '1200×630', description: 'Open Graph (Facebook, LinkedIn)', essential: true },
  { id: 'og-twitter', filename: 'twitter-card.png', width: 1200, height: 600, category: 'opengraph', label: '1200×600', description: 'Twitter/X summary card', essential: true },
  { id: 'og-square', filename: 'og-square.png', width: 400, height: 400, category: 'opengraph', label: '400×400', description: 'Square social preview', essential: false },

  // ── App Store / Large ───────────────────────
  { id: 'appstore-1024', filename: 'app-icon-1024x1024.png', width: 1024, height: 1024, category: 'appstore', label: '1024×1024', description: 'App Store / Play Store', essential: true },
] as const;

/** Category metadata for UI display. */
export const CATEGORY_META: Record<IconCategory, { label: string; color: string; description: string }> = {
  favicon: { label: 'Favicon', color: 'bp-blue', description: 'Browser tabs, bookmarks, taskbar' },
  apple: { label: 'Apple Touch', color: 'bp-red', description: 'iOS home screen, Safari' },
  android: { label: 'Android / PWA', color: 'bp-green', description: 'PWA manifest, Android launcher' },
  microsoft: { label: 'Microsoft', color: 'bp-steel', description: 'Windows tiles, pinned sites' },
  msixstore: { label: 'MSIX Store', color: 'bp-indigo', description: 'Windows Store / MSIX package assets' },
  opengraph: { label: 'Open Graph', color: 'bp-amber', description: 'Social media sharing cards' },
  appstore: { label: 'App Store', color: 'bp-blue', description: 'iOS App Store, Google Play, social avatar' },
};

/** ICO sizes to bundle in favicon.ico (subset of ICON_SIZES). */
export const ICO_BUNDLE_SIZES = [16, 32, 48] as const;

/** Default padding percentage for maskable icons */
export const DEFAULT_MASKABLE_PADDING = 10;

/** Quick Pack preset: essential icons only */
export const QUICK_PACK_IDS = new Set(PACKAGE_ICONS.filter((i) => i.essential).map((i) => i.id));

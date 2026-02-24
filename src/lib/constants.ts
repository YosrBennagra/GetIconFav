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
  16:  { usage: 'Favicon · Tab icon',    category: 'essential' },
  24:  { usage: 'Small toolbar',          category: 'standard' },
  32:  { usage: 'Taskbar · Standard',     category: 'essential' },
  48:  { usage: 'Desktop icon',           category: 'essential' },
  64:  { usage: 'Large toolbar',          category: 'standard' },
  128: { usage: 'High-DPI display',       category: 'hd' },
  256: { usage: 'Vista+ · Thumbnail',     category: 'essential' },
};

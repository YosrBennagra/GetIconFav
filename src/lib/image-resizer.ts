/**
 * Image loading and resizing utilities.
 *
 * Uses the Canvas API for all transformations (client-side only).
 * Non-square images are center-cropped to a 1:1 aspect ratio.
 */

export interface ResizeOptions {
  /** Background color fill (CSS color string, e.g. '#ffffff'). If undefined, transparent. */
  bgColor?: string;
  /** Padding percentage (0–50). Adds equal padding on all sides. Default 0. */
  padding?: number;
  /** If true, render as maskable icon: fill bg, apply padding to ensure safe zone. */
  maskable?: boolean;
}

/**
 * Load an image file into an HTMLImageElement.
 * Resolves once the image is fully decoded.
 */
export function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error(`Failed to load image: ${file.name}`));
    };

    img.src = url;
  });
}

/**
 * Resize (and center-crop if non-square) an image to the given target size.
 * Returns a PNG blob.
 */
export function resizeImage(
  img: HTMLImageElement,
  targetSize: number,
  options?: ResizeOptions
): Promise<Blob> {
  return resizeImageRect(img, targetSize, targetSize, options);
}

/**
 * Resize an image to a target width × height.
 * For square targets, center-crops to square then scales (unless padding/maskable).
 * For non-square (e.g. OG images), centers the image on a background.
 * Returns a PNG blob.
 */
export function resizeImageRect(
  img: HTMLImageElement,
  targetWidth: number,
  targetHeight: number,
  options?: ResizeOptions
): Promise<Blob> {
  const bgColor = options?.bgColor;
  const padding = Math.max(0, Math.min(50, options?.padding ?? 0));
  const maskable = options?.maskable ?? false;

  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    canvas.width = targetWidth;
    canvas.height = targetHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      reject(new Error('Canvas 2D context not available'));
      return;
    }

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    const { naturalWidth: w, naturalHeight: h } = img;
    const srcAspect = w / h;

    // Fill background if specified
    if (bgColor) {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, targetWidth, targetHeight);
    }

    // Effective padding: maskable icons need at least 10% for safe zone
    const effectivePadding = maskable ? Math.max(padding, 10) : padding;

    if (targetWidth === targetHeight) {
      if (effectivePadding > 0 || maskable) {
        // Padded / maskable: fit the image inside the padded area
        const padPx = (targetWidth * effectivePadding) / 100;
        const innerSize = targetWidth - padPx * 2;

        // Center-crop source to square
        const cropSize = Math.min(w, h);
        const sx = (w - cropSize) / 2;
        const sy = (h - cropSize) / 2;

        ctx.drawImage(img, sx, sy, cropSize, cropSize, padPx, padPx, innerSize, innerSize);
      } else {
        // No padding: center-crop to square
        const cropSize = Math.min(w, h);
        const sx = (w - cropSize) / 2;
        const sy = (h - cropSize) / 2;
        ctx.drawImage(img, sx, sy, cropSize, cropSize, 0, 0, targetWidth, targetHeight);
      }
    } else {
      // Non-square target (OG images, etc.): fit image inside
      const padPxW = (targetWidth * effectivePadding) / 100;
      const padPxH = (targetHeight * effectivePadding) / 100;
      const innerW = targetWidth - padPxW * 2;
      const innerH = targetHeight - padPxH * 2;
      const innerAspect = innerW / innerH;

      let drawW: number, drawH: number;
      if (srcAspect > innerAspect) {
        drawW = innerW * 0.6;
        drawH = drawW / srcAspect;
      } else {
        drawH = innerH * 0.6;
        drawW = drawH * srcAspect;
      }

      const dx = (targetWidth - drawW) / 2;
      const dy = (targetHeight - drawH) / 2;
      ctx.drawImage(img, 0, 0, w, h, dx, dy, drawW, drawH);
    }

    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error(`Failed to encode ${targetWidth}×${targetHeight} PNG`));
      },
      'image/png'
    );
  });
}

/**
 * Generate a data URL from a Blob (for preview rendering).
 */
export function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Failed to read blob'));
    reader.readAsDataURL(blob);
  });
}

/**
 * Get human-readable file size string.
 */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

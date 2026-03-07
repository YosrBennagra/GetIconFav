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
  /** Original SVG markup. When provided, the SVG is re-rendered at the exact target size for pixel-perfect quality. */
  svgText?: string;
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
 * Render an SVG at an exact pixel size by rewriting its width/height
 * attributes while preserving the viewBox, then rasterizing.
 * This gives pixel-perfect quality at every target size — no scaling artifacts.
 */
function renderSvgAtSize(svgText: string, width: number, height: number): Promise<HTMLImageElement> {
  const parser = new DOMParser();
  const doc = parser.parseFromString(svgText, 'image/svg+xml');
  const svgEl = doc.documentElement;

  // Ensure a viewBox exists so we can safely override width/height
  const viewBox = svgEl.getAttribute('viewBox');
  if (!viewBox) {
    const vbW = Number.parseFloat(svgEl.getAttribute('width') || '100');
    const vbH = Number.parseFloat(svgEl.getAttribute('height') || '100');
    svgEl.setAttribute('viewBox', `0 0 ${vbW} ${vbH}`);
  }

  svgEl.setAttribute('width', String(width));
  svgEl.setAttribute('height', String(height));

  const serializer = new XMLSerializer();
  const modified = serializer.serializeToString(doc);
  const blob = new Blob([modified], { type: 'image/svg+xml' });

  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(blob);
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to rasterize SVG at target size'));
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
/**
 * High-quality image draw that uses step-down resizing when the source
 * is more than 2× larger than the destination in either dimension.
 * Repeatedly halves the image so the browser's bilinear/bicubic filter
 * works on a manageable ratio at each step, producing much sharper output.
 */
interface Rect { x: number; y: number; w: number; h: number }

function drawImageHighQuality(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement | HTMLCanvasElement,
  src: Rect, dst: Rect
): void {
  const { x: sx, y: sy, w: sw, h: sh } = src;
  const { x: dx, y: dy, w: dw, h: dh } = dst;

  // If reduction is ≤2× in both dimensions, a single draw is fine
  if (sw <= dw * 2 && sh <= dh * 2) {
    ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
    return;
  }

  // Step-down: halve repeatedly until within 2× of target
  let current: HTMLImageElement | HTMLCanvasElement = img;
  let curX = sx, curY = sy, curW = sw, curH = sh;

  while (curW > dw * 2 || curH > dh * 2) {
    const nextW = Math.max(Math.round(curW / 2), dw);
    const nextH = Math.max(Math.round(curH / 2), dh);

    const step = document.createElement('canvas');
    step.width = nextW;
    step.height = nextH;
    const sCtx = step.getContext('2d')!;
    sCtx.imageSmoothingEnabled = true;
    sCtx.imageSmoothingQuality = 'high';
    sCtx.drawImage(current, curX, curY, curW, curH, 0, 0, nextW, nextH);

    current = step;
    curX = 0;
    curY = 0;
    curW = nextW;
    curH = nextH;
  }

  ctx.drawImage(current, curX, curY, curW, curH, dx, dy, dw, dh);
}

export async function resizeImageRect(
  img: HTMLImageElement,
  targetWidth: number,
  targetHeight: number,
  options?: ResizeOptions
): Promise<Blob> {
  const bgColor = options?.bgColor;
  const padding = Math.max(0, Math.min(50, options?.padding ?? 0));
  const maskable = options?.maskable ?? false;
  const svgText = options?.svgText;

  // For SVG sources: re-render the vector at the exact target size
  // so the browser rasterizes paths at native resolution — zero scaling.
  const effectivePadding = maskable ? Math.max(padding, 10) : padding;
  let source: HTMLImageElement = img;
  if (svgText) {
    // Determine how large to render the SVG before drawing to the final canvas.
    // For square targets we render at targetWidth; for non-square we render at
    // the larger dimension so we have enough pixels for the centered draw.
    const renderDim = Math.max(targetWidth, targetHeight);
    source = await renderSvgAtSize(svgText, renderDim, renderDim);
  }

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

    const { naturalWidth: w, naturalHeight: h } = source;
    const srcAspect = w / h;

    // Fill background if specified
    if (bgColor) {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, targetWidth, targetHeight);
    }

    if (targetWidth === targetHeight) {
      if (effectivePadding > 0 || maskable) {
        // Padded / maskable: fit the image inside the padded area
        const padPx = (targetWidth * effectivePadding) / 100;
        const innerSize = targetWidth - padPx * 2;

        // Center-crop source to square
        const cropSize = Math.min(w, h);
        const sx = (w - cropSize) / 2;
        const sy = (h - cropSize) / 2;

        drawImageHighQuality(ctx, source, { x: sx, y: sy, w: cropSize, h: cropSize }, { x: padPx, y: padPx, w: innerSize, h: innerSize });
      } else {
        // No padding: center-crop to square
        const cropSize = Math.min(w, h);
        const sx = (w - cropSize) / 2;
        const sy = (h - cropSize) / 2;
        drawImageHighQuality(ctx, source, { x: sx, y: sy, w: cropSize, h: cropSize }, { x: 0, y: 0, w: targetWidth, h: targetHeight });
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
      drawImageHighQuality(ctx, source, { x: 0, y: 0, w, h }, { x: dx, y: dy, w: drawW, h: drawH });
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

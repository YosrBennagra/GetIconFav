/**
 * ICO file format encoder.
 *
 * Builds a valid .ico file from an array of PNG blobs at different sizes.
 * Uses PNG payloads directly (supported since Windows Vista).
 *
 * ICO binary layout:
 *   - Header (6 bytes): reserved(2) + type(2) + count(2)
 *   - N directory entries (16 bytes each)
 *   - N image payloads (PNG data)
 */

export interface IcoEntry {
  readonly size: number;
  readonly blob: Blob;
}

/**
 * Encode an array of sized PNG blobs into a single `.ico` file.
 * Images should be sorted smallest → largest (convention, not required).
 */
export async function encodeIco(entries: readonly IcoEntry[]): Promise<Blob> {
  // Read all PNG blobs into byte arrays
  const imageBuffers = await Promise.all(
    entries.map(async (entry) => new Uint8Array(await entry.blob.arrayBuffer()))
  );

  const HEADER_SIZE = 6;
  const DIR_ENTRY_SIZE = 16;
  const directorySize = DIR_ENTRY_SIZE * entries.length;
  const dataStartOffset = HEADER_SIZE + directorySize;

  // Calculate each image's offset within the file
  let runningOffset = dataStartOffset;
  const offsets: number[] = [];
  for (const buf of imageBuffers) {
    offsets.push(runningOffset);
    runningOffset += buf.length;
  }

  const totalFileSize = runningOffset;
  const buffer = new ArrayBuffer(totalFileSize);
  const view = new DataView(buffer);

  // ── ICO Header ─────────────────────────────────────────────────
  view.setUint16(0, 0, true);              // Reserved — must be 0
  view.setUint16(2, 1, true);              // Type — 1 = ICO
  view.setUint16(4, entries.length, true);  // Image count

  // ── Directory Entries ──────────────────────────────────────────
  for (let i = 0; i < entries.length; i++) {
    const offset = HEADER_SIZE + i * DIR_ENTRY_SIZE;
    const size = entries[i]!.size;
    const imgData = imageBuffers[i]!;

    // Width & height: 0 means 256
    view.setUint8(offset + 0, size >= 256 ? 0 : size);
    view.setUint8(offset + 1, size >= 256 ? 0 : size);
    view.setUint8(offset + 2, 0);           // Color count (0 for >256 colors)
    view.setUint8(offset + 3, 0);           // Reserved
    view.setUint16(offset + 4, 1, true);    // Color planes
    view.setUint16(offset + 6, 32, true);   // Bits per pixel (32 = RGBA)
    view.setUint32(offset + 8, imgData.length, true);   // Image data size
    view.setUint32(offset + 12, offsets[i]!, true);       // Image data offset
  }

  // ── Image Payloads ─────────────────────────────────────────────
  const fileBytes = new Uint8Array(buffer);
  for (let i = 0; i < imageBuffers.length; i++) {
    fileBytes.set(imageBuffers[i]!, offsets[i]!);
  }

  return new Blob([buffer], { type: 'image/x-icon' });
}

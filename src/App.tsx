import { useCallback, useEffect, useMemo, useState } from 'react';
import { FiImage, FiRefreshCw, FiDownload, FiBookOpen, FiEye, FiX, FiLock } from 'react-icons/fi';
import { Analytics } from '@vercel/analytics/react';
import { ICON_SIZES, type IconSize } from './lib/constants';
import { encodeIco, type IcoEntry } from './lib/ico-encoder';
import { blobToDataUrl, formatFileSize, loadImage, resizeImage } from './lib/image-resizer';
import { DropZone } from './components/drop-zone';
import { SourceInfo } from './components/source-info';
import { SizeSlotGrid } from './components/size-slot-grid';
import { StepIndicator } from './components/step-indicator';
import { FaviconPreviews } from './components/favicon-previews';
import { FaviconGuide } from './components/favicon-guide';
import { SupportLinks } from './components/support-links';

interface ImageState {
  readonly file: File;
  readonly element: HTMLImageElement;
  readonly previewUrl: string;
}

export default function App() {
  // ── State ────────────────────────────────────────────────────
  const [masterImage, setMasterImage] = useState<ImageState | null>(null);

  // Auto-generated from master image
  const [autoPreviews, setAutoPreviews] = useState<Map<number, string>>(new Map());
  const [autoBlobs, setAutoBlobs] = useState<Map<number, Blob>>(new Map());

  // Custom per-size overrides (user dropped specific file on a size slot)
  const [customPreviews, setCustomPreviews] = useState<Map<number, string>>(new Map());
  const [customBlobs, setCustomBlobs] = useState<Map<number, Blob>>(new Map());

  const [selectedSizes, setSelectedSizes] = useState<Set<number>>(() => new Set(ICON_SIZES));
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingSlots, setProcessingSlots] = useState<Set<number>>(new Set());
  const [isDownloading, setIsDownloading] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [showPreviews, setShowPreviews] = useState(false);

  // ── Merged previews & blobs (custom overrides auto) ──────────

  const finalPreviews = useMemo(() => {
    const map = new Map<number, string>();
    for (const size of ICON_SIZES) {
      const p = customPreviews.get(size) ?? autoPreviews.get(size);
      if (p) map.set(size, p);
    }
    return map;
  }, [autoPreviews, customPreviews]);

  const finalBlobs = useMemo(() => {
    const map = new Map<number, Blob>();
    for (const size of ICON_SIZES) {
      const b = customBlobs.get(size) ?? autoBlobs.get(size);
      if (b) map.set(size, b);
    }
    return map;
  }, [autoBlobs, customBlobs]);

  const customSizeSet = useMemo(
    () => new Set(customPreviews.keys()),
    [customPreviews]
  );

  // ── Step calculation ─────────────────────────────────────────

  const hasSource = masterImage !== null || customPreviews.size > 0;
  const hasAnyPreview = finalPreviews.size > 0;
  const canDownload = hasAnyPreview && selectedSizes.size > 0 && !isProcessing;

  const computeStep = (): number => {
    if (!hasSource && !hasAnyPreview) return 1;
    if (canDownload) return 3;
    return 2;
  };
  const currentStep = computeStep();

  // ── ICO size estimate ────────────────────────────────────────

  const icoSize = useMemo(() => {
    if (finalBlobs.size === 0) return null;
    let total = 6 + selectedSizes.size * 16;
    for (const size of selectedSizes) {
      const blob = finalBlobs.get(size);
      if (blob) total += blob.size;
    }
    return total;
  }, [finalBlobs, selectedSizes]);

  // ── Handle master image drop ─────────────────────────────────

  const handleMasterDrop = useCallback(async (file: File) => {
    setIsProcessing(true);
    setAutoPreviews(new Map());
    setAutoBlobs(new Map());

    try {
      const element = await loadImage(file);
      const previewUrl = URL.createObjectURL(file);
      setMasterImage({ file, element, previewUrl });

      const newPreviews = new Map<number, string>();
      const newBlobs = new Map<number, Blob>();

      await Promise.all(
        ICON_SIZES.map(async (size) => {
          const blob = await resizeImage(element, size);
          const dataUrl = await blobToDataUrl(blob);
          newBlobs.set(size, blob);
          newPreviews.set(size, dataUrl);
        })
      );

      setAutoPreviews(newPreviews);
      setAutoBlobs(newBlobs);
    } catch {
      setMasterImage(null);
    } finally {
      setIsProcessing(false);
    }
  }, []);

  // ── Handle per-size drop ─────────────────────────────────────

  const handleSizeDrop = useCallback(async (size: number, file: File) => {
    setProcessingSlots((prev) => new Set(prev).add(size));

    try {
      const element = await loadImage(file);
      const blob = await resizeImage(element, size);
      const dataUrl = await blobToDataUrl(blob);

      setCustomPreviews((prev) => new Map(prev).set(size, dataUrl));
      setCustomBlobs((prev) => new Map(prev).set(size, blob));
    } catch {
      // silently fail
    } finally {
      setProcessingSlots((prev) => {
        const next = new Set(prev);
        next.delete(size);
        return next;
      });
    }
  }, []);

  // ── Clear custom override ────────────────────────────────────

  const handleClearCustom = useCallback((size: number) => {
    setCustomPreviews((prev) => {
      const next = new Map(prev);
      next.delete(size);
      return next;
    });
    setCustomBlobs((prev) => {
      const next = new Map(prev);
      next.delete(size);
      return next;
    });
  }, []);

  // ── Toggle size selection ────────────────────────────────────

  const handleToggleSize = useCallback((size: IconSize) => {
    setSelectedSizes((prev) => {
      const next = new Set(prev);
      if (next.has(size)) {
        if (next.size > 1) next.delete(size);
      } else {
        next.add(size);
      }
      return next;
    });
  }, []);

  // ── Quick selects ────────────────────────────────────────────

  const handleSelectAll = useCallback(() => setSelectedSizes(new Set(ICON_SIZES)), []);
  const handleSelectEssential = useCallback(() => setSelectedSizes(new Set([16, 32, 48, 256])), []);

  // ── Download .ico ────────────────────────────────────────────

  const handleDownload = useCallback(async () => {
    if (finalBlobs.size === 0 || selectedSizes.size === 0) return;

    setIsDownloading(true);
    try {
      const entries: IcoEntry[] = ICON_SIZES
        .filter((size) => selectedSizes.has(size) && finalBlobs.has(size))
        .map((size) => ({ size, blob: finalBlobs.get(size)! }));

      const icoBlob = await encodeIco(entries);
      const url = URL.createObjectURL(icoBlob);

      const baseName = masterImage?.file.name.replace(/\.[^.]+$/, '') ?? 'icon';
      const a = document.createElement('a');
      a.href = url;
      a.download = `${baseName}.ico`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } finally {
      setIsDownloading(false);
    }
  }, [finalBlobs, selectedSizes, masterImage]);

  // ── Reset everything ─────────────────────────────────────────

  const handleReset = useCallback(() => {
    if (masterImage?.previewUrl) URL.revokeObjectURL(masterImage.previewUrl);
    setMasterImage(null);
    setAutoPreviews(new Map());
    setAutoBlobs(new Map());
    setCustomPreviews(new Map());
    setCustomBlobs(new Map());
    setSelectedSizes(new Set(ICON_SIZES));
  }, [masterImage]);

  // ── Cleanup on unmount ───────────────────────────────────────

  useEffect(() => {
    return () => {
      if (masterImage?.previewUrl) URL.revokeObjectURL(masterImage.previewUrl);
    };
  }, [masterImage]);

  // ── Render ───────────────────────────────────────────────────

  const selectedCount = [...selectedSizes].filter((s) => finalBlobs.has(s)).length;
  const fav16 = finalPreviews.get(16);
  const pageTitle = masterImage?.file.name.replace(/\.[^.]+$/, '') ?? 'My Page';

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-zinc-950">
      {/* ── Header ──────────────────────────────────────────── */}
      <header className="h-12 border-b border-zinc-800/40 shrink-0 flex items-center px-4 gap-4">
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center justify-center w-7 h-7 rounded-md bg-zinc-900 border border-zinc-800">
            <FiImage className="w-3.5 h-3.5 text-neon-cyan" />
          </div>
          <h1 className="text-sm font-bold font-mono tracking-tight">
            <span className="text-neon-cyan">Get</span>
            <span className="text-neon-purple">Icon</span>
            <span className="text-zinc-300">Fav</span>
          </h1>
        </div>

        <div className="flex-1 flex justify-center">
          <StepIndicator currentStep={currentStep} />
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {hasAnyPreview && !isProcessing && (
            <button
              type="button"
              onClick={() => setShowPreviews(true)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[11px] font-mono font-medium
                text-zinc-500 hover:text-neon-cyan border border-zinc-800 hover:border-neon-cyan/30"
            >
              <FiEye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Previews</span>
            </button>
          )}
          <button
            type="button"
            onClick={() => setShowGuide(true)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[11px] font-mono font-medium
              text-zinc-500 hover:text-neon-purple border border-zinc-800 hover:border-neon-purple/30"
          >
            <FiBookOpen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Guide</span>
          </button>
          {hasSource && (
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[11px] font-mono font-medium
                text-zinc-500 hover:text-neon-pink border border-zinc-800 hover:border-neon-pink/30"
            >
              <FiRefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}
        </div>
      </header>

      {/* ── Main content ────────────────────────────────────── */}
      <main className="flex-1 overflow-hidden">
        {/* Step 1: Upload */}
        {!hasSource && !hasAnyPreview && !isProcessing && (
          <div className="h-full p-4">
            <DropZone onFileSelected={handleMasterDrop} disabled={isProcessing} />
          </div>
        )}

        {/* Processing */}
        {isProcessing && (
          <div className="h-full flex flex-col items-center justify-center gap-4">
            <div className="relative w-14 h-14">
              <div className="absolute inset-0 border-2 border-neon-cyan/20 rounded-full" />
              <div className="absolute inset-0 border-2 border-neon-cyan border-t-transparent rounded-full animate-spin" />
            </div>
            <div className="text-center">
              <p className="text-sm font-mono font-medium text-neon-cyan">Processing</p>
              <p className="text-xs text-zinc-600 font-mono mt-1">Generating {ICON_SIZES.length} icon sizes</p>
            </div>
          </div>
        )}

        {/* Step 2-3: Configure & Export — horizontal layout */}
        {(hasSource || hasAnyPreview) && !isProcessing && (
          <div className="h-full flex">
            {/* Left panel: Source + inline preview */}
            <div className="w-72 lg:w-80 border-r border-zinc-800/40 flex flex-col gap-4 p-4 overflow-y-auto shrink-0">
              {masterImage && (
                <SourceInfo
                  fileName={masterImage.file.name}
                  fileSize={masterImage.file.size}
                  width={masterImage.element.naturalWidth}
                  height={masterImage.element.naturalHeight}
                  previewUrl={masterImage.previewUrl}
                  isSvg={masterImage.file.type === 'image/svg+xml'}
                  onChangeImage={handleReset}
                />
              )}

              {/* Inline browser tab preview */}
              {fav16 && (
                <div className="rounded-lg border border-zinc-800/40 bg-zinc-900/40 overflow-hidden">
                  <div className="px-3 py-1.5 border-b border-zinc-800/30">
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wide text-zinc-600">Tab Preview</span>
                  </div>
                  <div className="p-3">
                    <div className="bg-zinc-800/50 rounded-lg border border-zinc-700/40 overflow-hidden">
                      <div className="flex items-center gap-1.5 px-2.5 pt-2 pb-0">
                        <div className="w-2 h-2 rounded-full bg-red-500/40" />
                        <div className="w-2 h-2 rounded-full bg-yellow-500/40" />
                        <div className="w-2 h-2 rounded-full bg-green-500/40" />
                      </div>
                      <div className="flex items-end px-1.5 pt-1.5">
                        <div className="flex items-center gap-1.5 bg-zinc-900/80 rounded-t px-2.5 py-1 max-w-[160px] border-t border-x border-zinc-700/40">
                          <img src={fav16} alt="" width={14} height={14} className="shrink-0" style={{ imageRendering: 'pixelated' }} />
                          <span className="text-[10px] text-zinc-400 truncate">{pageTitle}</span>
                        </div>
                      </div>
                      <div className="bg-zinc-900/60 px-2.5 py-1 border-t border-zinc-700/30">
                        <div className="flex items-center gap-1.5 bg-zinc-800/50 rounded px-2 py-0.5">
                          <FiLock className="w-2 h-2 text-emerald-500/50 shrink-0" />
                          <span className="text-[9px] text-zinc-600">yourwebsite.com</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Custom overrides info */}
              {customSizeSet.size > 0 && (
                <div className="px-3 py-2 rounded-lg bg-neon-green/5 border border-neon-green/15">
                  <p className="text-[10px] font-mono text-neon-green/70">
                    {customSizeSet.size} custom {customSizeSet.size === 1 ? 'override' : 'overrides'} applied
                  </p>
                </div>
              )}

              {/* Tip */}
              <div className="mt-auto px-3 py-2 rounded-lg bg-zinc-900/40 border border-zinc-800/30">
                <p className="text-[10px] font-mono text-zinc-600 leading-relaxed">
                  Drag a different image onto any size slot on the right to override that specific size.
                </p>
              </div>
            </div>

            {/* Right panel: Sizes + Download */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Toolbar: quick selects */}
              <div className="px-4 py-2.5 border-b border-zinc-800/30 flex items-center gap-2 shrink-0">
                <span className="text-[10px] text-zinc-600 font-mono mr-1">Presets:</span>
                <button
                  type="button"
                  onClick={handleSelectAll}
                  className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-zinc-900 text-zinc-400 hover:text-neon-cyan border border-zinc-800 hover:border-neon-cyan/30"
                >
                  All
                </button>
                <button
                  type="button"
                  onClick={handleSelectEssential}
                  className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-zinc-900 text-zinc-400 hover:text-neon-green border border-zinc-800 hover:border-neon-green/30"
                >
                  Essential (16, 32, 48, 256)
                </button>
              </div>

              {/* Size grid */}
              <div className="flex-1 overflow-y-auto p-4">
                <SizeSlotGrid
                  previews={finalPreviews}
                  customSizes={customSizeSet}
                  selectedSizes={selectedSizes}
                  processingSlots={processingSlots}
                  sourceDimensions={
                    masterImage
                      ? { width: masterImage.element.naturalWidth, height: masterImage.element.naturalHeight }
                      : null
                  }
                  onToggleSize={handleToggleSize}
                  onDropOnSize={handleSizeDrop}
                  onClearCustom={handleClearCustom}
                />
              </div>

              {/* Download bar */}
              {canDownload && (
                <div className="border-t border-zinc-800/40 px-4 py-3 flex items-center justify-between shrink-0 bg-zinc-950">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-neon-green" />
                      <span className="text-sm font-mono font-medium text-zinc-200">Ready</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs font-mono text-zinc-500">
                      <span className="flex items-center gap-1">
                        <FiImage className="w-3 h-3" />
                        {selectedCount} {selectedCount === 1 ? 'size' : 'sizes'}
                      </span>
                      {icoSize !== null && (
                        <span className="flex items-center gap-1">
                          <FiDownload className="w-3 h-3" />
                          ~{formatFileSize(icoSize)}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="
                      flex items-center gap-2 px-5 py-2 rounded-lg
                      bg-gradient-to-r from-neon-cyan to-neon-purple
                      text-zinc-950 font-mono font-bold text-xs uppercase tracking-wider
                      hover:opacity-90 active:opacity-80
                      disabled:opacity-50 disabled:cursor-not-allowed
                    "
                  >
                    {isDownloading ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                        Encoding...
                      </>
                    ) : (
                      <>
                        <FiDownload className="w-4 h-4" />
                        Download .ico
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* ── Footer ──────────────────────────────────────────── */}
      <footer className="h-9 border-t border-zinc-800/40 shrink-0 bg-zinc-950">
        <SupportLinks />
      </footer>

      {/* ── Guide panel (slide-over) ────────────────────────── */}
      {showGuide && (
        <div className="fixed inset-0 z-50 flex">
          <button
            type="button"
            className="absolute inset-0 bg-zinc-950/80"
            onClick={() => setShowGuide(false)}
            aria-label="Close guide"
          />
          <div className="relative ml-auto w-full max-w-xl h-full overflow-y-auto bg-zinc-950 border-l border-zinc-800/50">
            <div className="sticky top-0 z-10 bg-zinc-950 border-b border-zinc-800/40 px-5 py-3 flex items-center justify-between">
              <h2 className="text-sm font-mono font-bold text-zinc-200">Installation Guide &amp; FAQ</h2>
              <button
                type="button"
                onClick={() => setShowGuide(false)}
                className="p-1.5 rounded-md text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/50"
              >
                <FiX className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5">
              <FaviconGuide />
            </div>
          </div>
        </div>
      )}

      {/* ── Previews panel (slide-over) ─────────────────────── */}
      {showPreviews && (
        <div className="fixed inset-0 z-50 flex">
          <button
            type="button"
            className="absolute inset-0 bg-zinc-950/80"
            onClick={() => setShowPreviews(false)}
            aria-label="Close previews"
          />
          <div className="relative ml-auto w-full max-w-2xl h-full overflow-y-auto bg-zinc-950 border-l border-zinc-800/50">
            <div className="sticky top-0 z-10 bg-zinc-950 border-b border-zinc-800/40 px-5 py-3 flex items-center justify-between">
              <h2 className="text-sm font-mono font-bold text-zinc-200">Context Previews</h2>
              <button
                type="button"
                onClick={() => setShowPreviews(false)}
                className="p-1.5 rounded-md text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/50"
              >
                <FiX className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5">
              <FaviconPreviews previews={finalPreviews} title={pageTitle} />
            </div>
          </div>
        </div>
      )}
      <Analytics />
    </div>
  );
}

import { useCallback, useEffect, useMemo, useState } from 'react';
import { FiImage, FiRefreshCw, FiDownload, FiShield } from 'react-icons/fi';
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

  return (
    <div className="min-h-screen flex flex-col">
      {/* ── Header ──────────────────────────────────────────── */}
      <header className="border-b border-zinc-800/50 bg-zinc-950/90 backdrop-blur-xl sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/15 to-violet-500/15 border border-blue-500/20 shadow-lg shadow-blue-500/5">
              <FiImage className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent leading-tight">
                GetIconFav
              </h1>
              <p className="text-[11px] text-zinc-500 font-medium tracking-wide">Free Favicon Generator & ICO Converter</p>
            </div>
          </div>

          {hasSource && (
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold
                bg-zinc-800/80 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-700
                border border-zinc-700/60 hover:border-zinc-600 transition-all duration-200"
            >
              <FiRefreshCw className="w-3.5 h-3.5" />
              Start Over
            </button>
          )}
        </div>
      </header>

      {/* ── Step indicator ──────────────────────────────────── */}
      <div className="border-b border-zinc-800/30 bg-zinc-900/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
          <StepIndicator currentStep={currentStep} />
        </div>
      </div>

      {/* ── Main content ────────────────────────────────────── */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-8 space-y-8">
        {/* Step 1: Hero upload zone */}
        {!masterImage && (
          <section className="space-y-6">
            {customPreviews.size === 0 && (
              <div className="text-center space-y-2 max-w-lg mx-auto">
                <h2 className="text-2xl sm:text-3xl font-bold text-zinc-100">
                  Create your perfect icon
                </h2>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Drop a high-resolution image or SVG to auto-generate all standard icon sizes,
                  or drag individual images onto each size slot below.
                </p>
              </div>
            )}
            <DropZone onFileSelected={handleMasterDrop} disabled={isProcessing} />
          </section>
        )}

        {/* Processing indicator */}
        {isProcessing && (
          <div className="flex flex-col items-center justify-center gap-4 py-12">
            <div className="relative w-14 h-14">
              <div className="absolute inset-0 border-[3px] border-blue-500/20 rounded-full" />
              <div className="absolute inset-0 border-[3px] border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-zinc-300">Generating previews</p>
              <p className="text-xs text-zinc-500 mt-1">Processing {ICON_SIZES.length} icon sizes…</p>
            </div>
          </div>
        )}

        {/* Source info */}
        {masterImage && !isProcessing && (
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

        {/* Quick-select buttons */}
        {hasAnyPreview && !isProcessing && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-zinc-500 font-medium mr-1">Quick select:</span>
            <button
              type="button"
              onClick={handleSelectAll}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-zinc-800/60 text-zinc-400
                hover:text-zinc-200 hover:bg-zinc-700 border border-zinc-700/50 hover:border-zinc-600 transition-all"
            >
              All sizes
            </button>
            <button
              type="button"
              onClick={handleSelectEssential}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-zinc-800/60 text-zinc-400
                hover:text-zinc-200 hover:bg-zinc-700 border border-zinc-700/50 hover:border-zinc-600 transition-all"
            >
              Essential (16, 32, 48, 256)
            </button>
          </div>
        )}

        {/* Size slot grid — always visible when we have source or any customizations */}
        {(hasSource || hasAnyPreview) && !isProcessing && (
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
        )}

        {/* ── Generate / Download section ────────────────────── */}
        {canDownload && (
          <section className="space-y-6 pt-2">
            {/* Divider */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent" />
              <span className="text-xs font-semibold text-zinc-500 uppercase tracking-widest">Generate</span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-zinc-700/50 to-transparent" />
            </div>

            {/* Download card */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 p-5 rounded-xl bg-zinc-900/50 border border-zinc-800/60">
              {/* Info column */}
              <div className="flex-1 space-y-2">
                <h3 className="text-sm font-semibold text-zinc-200">Ready to generate</h3>
                <div className="flex items-center gap-4 text-xs text-zinc-500">
                  <span className="flex items-center gap-1.5">
                    <FiImage className="w-3.5 h-3.5 text-blue-400" />
                    {selectedCount} {selectedCount === 1 ? 'size' : 'sizes'} selected
                  </span>
                  {icoSize !== null && (
                    <span className="flex items-center gap-1.5">
                      <FiDownload className="w-3.5 h-3.5 text-violet-400" />
                      ~{formatFileSize(icoSize)}
                    </span>
                  )}
                  {customSizeSet.size > 0 && (
                    <span className="flex items-center gap-1.5 text-emerald-400/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      {customSizeSet.size} custom
                    </span>
                  )}
                </div>
              </div>

              {/* Download button */}
              <button
                type="button"
                onClick={handleDownload}
                disabled={isDownloading}
                className="
                  flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl
                  bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400
                  active:from-blue-700 active:to-blue-600
                  text-white font-bold text-sm
                  disabled:opacity-50 disabled:cursor-not-allowed
                  shadow-lg shadow-blue-600/25 hover:shadow-blue-500/35
                  transition-all duration-200
                "
              >
                {isDownloading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Encoding…
                  </>
                ) : (
                  <>
                    <FiDownload className="w-5 h-5" />
                    Download .ico
                  </>
                )}
              </button>
            </div>
          </section>
        )}

        {/* ── Favicon previews ───────────────────────────────── */}
        {finalPreviews.size > 0 && !isProcessing && (
          <FaviconPreviews
            previews={finalPreviews}
            title={masterImage?.file.name.replace(/\.[^.]+$/, '') ?? 'My Page'}
          />
        )}

        {/* ── Education / Guide ──────────────────────────────── */}
        <FaviconGuide />

        {/* ── Support links ──────────────────────────────────── */}
        <SupportLinks />
      </main>

      {/* ── Footer ──────────────────────────────────────────── */}
      <footer className="border-t border-zinc-800/30 py-5 mt-auto pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-zinc-600 flex items-center gap-1.5">
            <FiShield className="w-3.5 h-3.5 text-emerald-500/50" />
            100% client-side — your images never leave your browser
          </p>
          <p className="text-xs text-zinc-600">
            GetIconFav by <a href="https://github.com/YosrBennagra" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-zinc-300 transition-colors">Veinpal</a>
          </p>
        </div>
      </footer>
    </div>
  );
}

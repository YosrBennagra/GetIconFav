import { useCallback, useEffect, useMemo, useState } from 'react';
import { FiRefreshCw, FiDownload, FiEye, FiX, FiLock, FiPackage, FiCode, FiCheck, FiCopy, FiZap, FiSettings, FiSun, FiMoon } from 'react-icons/fi';
import { Analytics } from '@vercel/analytics/react';
import { ICON_SIZES, PACKAGE_ICONS, ICO_BUNDLE_SIZES, type IconCategory } from './lib/constants';
import { encodeIco, type IcoEntry } from './lib/ico-encoder';
import { blobToDataUrl, formatFileSize, loadImage, resizeImage, resizeImageRect, type ResizeOptions } from './lib/image-resizer';
import { generatePackageZip } from './lib/package-generator';
import { useTheme } from './lib/use-theme';
import { DropZone } from './components/drop-zone';
import { SourceInfo } from './components/source-info';
import { IconPackageGrid } from './components/icon-package-grid';
import { StepIndicator } from './components/step-indicator';
import { FaviconPreviews } from './components/favicon-previews';
import { FaviconGuide } from './components/favicon-guide';
import { SupportLinks } from './components/support-links';
import { AdvancedControls } from './components/advanced-controls';
import { TinyPreviewRow } from './components/tiny-preview-row';

interface ImageState {
  readonly file: File;
  readonly element: HTMLImageElement;
  readonly previewUrl: string;
}

export default function App() {
  // ── State ────────────────────────────────────────────────────
  const [masterImage, setMasterImage] = useState<ImageState | null>(null);

  // Auto-generated from master image (legacy ICO sizes)
  const [autoPreviews, setAutoPreviews] = useState<Map<number, string>>(new Map());
  const [autoBlobs, setAutoBlobs] = useState<Map<number, Blob>>(new Map());

  // Package icons: id → preview/blob
  const [packagePreviews, setPackagePreviews] = useState<Map<string, string>>(new Map());
  const [packageBlobs, setPackageBlobs] = useState<Map<string, Blob>>(new Map());

  // Selected package icon ids
  const [selectedIconIds, setSelectedIconIds] = useState<Set<string>>(
    () => new Set(PACKAGE_ICONS.filter((i) => i.essential).map((i) => i.id))
  );

  const [isProcessing, setIsProcessing] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showPreviews, setShowPreviews] = useState(false);
  const [showHtmlSnippet, setShowHtmlSnippet] = useState(false);
  const [snippetCopied, setSnippetCopied] = useState(false);

  // ── New: Advanced mode, bg color, padding ────────────────────
  const [mode, setMode] = useState<'quick' | 'advanced'>('quick');
  const [bgColor, setBgColor] = useState('');
  const [padding, setPadding] = useState(0);
  const [inlineCopied, setInlineCopied] = useState(false);

  // ── Preview customization ────────────────────────────────────
  const [customTitle, setCustomTitle] = useState('');
  const [customUrl, setCustomUrl] = useState('');

  // ── Theme ────────────────────────────────────────────────────
  const { theme, setTheme, resolvedTheme } = useTheme();

  // ── Step & readiness ─────────────────────────────────────────

  const hasSource = masterImage !== null;
  const hasAnyPreview = packagePreviews.size > 0 || autoPreviews.size > 0;
  const canDownload = hasAnyPreview && selectedIconIds.size > 0 && !isProcessing;

  const computeStep = (): number => {
    if (!hasSource && !hasAnyPreview) return 1;
    if (canDownload) return 3;
    return 2;
  };
  const currentStep = computeStep();

  // ── Package size estimate ────────────────────────────────────

  const estimatedSize = useMemo(() => {
    let total = 0;
    for (const id of selectedIconIds) {
      const blob = packageBlobs.get(id);
      if (blob) total += blob.size;
    }
    // Add ~ICO overhead
    total += 6 + ICO_BUNDLE_SIZES.length * 16;
    for (const size of ICO_BUNDLE_SIZES) {
      const blob = autoBlobs.get(size);
      if (blob) total += blob.size;
    }
    return total > 100 ? total : null;
  }, [packageBlobs, selectedIconIds, autoBlobs]);

  // ── Handle master image drop ─────────────────────────────────

  const handleMasterDrop = useCallback(async (file: File) => {
    setIsProcessing(true);
    setAutoPreviews(new Map());
    setAutoBlobs(new Map());
    setPackagePreviews(new Map());
    setPackageBlobs(new Map());

    try {
      const element = await loadImage(file);
      const previewUrl = URL.createObjectURL(file);
      setMasterImage({ file, element, previewUrl });

      const opts: ResizeOptions = {
        bgColor: bgColor || undefined,
        padding,
      };

      // Generate legacy ICO sizes
      const newPreviews = new Map<number, string>();
      const newBlobs = new Map<number, Blob>();

      await Promise.all(
        ICON_SIZES.map(async (size) => {
          const blob = await resizeImage(element, size, opts);
          const dataUrl = await blobToDataUrl(blob);
          newBlobs.set(size, blob);
          newPreviews.set(size, dataUrl);
        })
      );

      setAutoPreviews(newPreviews);
      setAutoBlobs(newBlobs);

      // Generate all package icons
      const pkgPreviews = new Map<string, string>();
      const pkgBlobs = new Map<string, Blob>();

      await Promise.all(
        PACKAGE_ICONS.map(async (icon) => {
          const iconOpts: ResizeOptions = {
            bgColor: bgColor || undefined,
            padding: icon.maskable ? Math.max(padding, 10) : padding,
            maskable: icon.maskable,
          };
          const blob = await resizeImageRect(element, icon.width, icon.height, iconOpts);
          const dataUrl = await blobToDataUrl(blob);
          pkgBlobs.set(icon.id, blob);
          pkgPreviews.set(icon.id, dataUrl);
        })
      );

      setPackagePreviews(pkgPreviews);
      setPackageBlobs(pkgBlobs);
    } catch {
      setMasterImage(null);
    } finally {
      setIsProcessing(false);
    }
  }, [bgColor, padding]);

  // ── Toggle individual icon selection ─────────────────────────

  const handleToggleIcon = useCallback((id: string) => {
    setSelectedIconIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  // ── Select/deselect entire category ──────────────────────────

  const handleSelectCategory = useCallback((category: IconCategory, selected: boolean) => {
    setSelectedIconIds((prev) => {
      const next = new Set(prev);
      const catIcons = PACKAGE_ICONS.filter((i) => i.category === category);
      for (const icon of catIcons) {
        if (selected) next.add(icon.id);
        else next.delete(icon.id);
      }
      return next;
    });
  }, []);

  // ── Quick selects ────────────────────────────────────────────

  const handleSelectAll = useCallback(
    () => setSelectedIconIds(new Set(PACKAGE_ICONS.map((i) => i.id))),
    []
  );

  const handleSelectEssential = useCallback(
    () => setSelectedIconIds(new Set(PACKAGE_ICONS.filter((i) => i.essential).map((i) => i.id))),
    []
  );

  // ── Regenerate when settings change ──────────────────────────

  useEffect(() => {
    if (!masterImage) return;
    // Re-generate icons when bgColor or padding changes
    const regenerate = async () => {
      setIsProcessing(true);
      try {
        const element = masterImage.element;
        const opts: ResizeOptions = {
          bgColor: bgColor || undefined,
          padding,
        };

        const newPreviews = new Map<number, string>();
        const newBlobs = new Map<number, Blob>();

        await Promise.all(
          ICON_SIZES.map(async (size) => {
            const blob = await resizeImage(element, size, opts);
            const dataUrl = await blobToDataUrl(blob);
            newBlobs.set(size, blob);
            newPreviews.set(size, dataUrl);
          })
        );

        setAutoPreviews(newPreviews);
        setAutoBlobs(newBlobs);

        const pkgPreviews = new Map<string, string>();
        const pkgBlobs = new Map<string, Blob>();

        await Promise.all(
          PACKAGE_ICONS.map(async (icon) => {
            const iconOpts: ResizeOptions = {
              bgColor: bgColor || undefined,
              padding: icon.maskable ? Math.max(padding, 10) : padding,
              maskable: icon.maskable,
            };
            const blob = await resizeImageRect(element, icon.width, icon.height, iconOpts);
            const dataUrl = await blobToDataUrl(blob);
            pkgBlobs.set(icon.id, blob);
            pkgPreviews.set(icon.id, dataUrl);
          })
        );

        setPackagePreviews(pkgPreviews);
        setPackageBlobs(pkgBlobs);
      } finally {
        setIsProcessing(false);
      }
    };

    regenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bgColor, padding]);

  // ── Download ICO only ────────────────────────────────────────

  const handleDownloadPng = useCallback((id: string) => {
    const blob = packageBlobs.get(id);
    const icon = PACKAGE_ICONS.find((i) => i.id === id);
    if (!blob || !icon) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = icon.filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }, [packageBlobs]);

  const handleDownloadIco = useCallback(async () => {
    if (autoBlobs.size === 0) return;
    setIsDownloading(true);
    try {
      const entries: IcoEntry[] = ICO_BUNDLE_SIZES
        .filter((size) => autoBlobs.has(size))
        .map((size) => ({ size, blob: autoBlobs.get(size)! }));

      const icoBlob = await encodeIco(entries);
      const url = URL.createObjectURL(icoBlob);
      const baseName = masterImage?.file.name.replace(/\.[^.]+$/, '') ?? 'favicon';
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
  }, [autoBlobs, masterImage]);

  // ── Download full ZIP package ────────────────────────────────

  const handleDownloadZip = useCallback(async () => {
    if (packageBlobs.size === 0 || selectedIconIds.size === 0) return;
    setIsDownloading(true);
    try {
      const selectedIcons = PACKAGE_ICONS.filter((i) => selectedIconIds.has(i.id));
      const isSvg = masterImage?.file.type === 'image/svg+xml';
      const zipBlob = await generatePackageZip({
        blobs: packageBlobs,
        selectedIcons,
        icoBlobs: autoBlobs,
        appName: masterImage?.file.name.replace(/\.[^.]+$/, '') ?? 'MyApp',
        themeColor: '#ffffff',
        bgColor: bgColor || '#ffffff',
        svgFile: isSvg ? masterImage?.file : undefined,
        isSvg,
      });

      const url = URL.createObjectURL(zipBlob);
      const baseName = masterImage?.file.name.replace(/\.[^.]+$/, '') ?? 'icons';
      const a = document.createElement('a');
      a.href = url;
      a.download = `${baseName}-icon-package.zip`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } finally {
      setIsDownloading(false);
    }
  }, [packageBlobs, selectedIconIds, autoBlobs, masterImage, bgColor]);

  // ── Generate HTML snippet ────────────────────────────────────

  const htmlSnippet = useMemo(() => {
    const isSvg = masterImage?.file.type === 'image/svg+xml';
    const lines: string[] = ['<!-- Favicon -->'];
    lines.push('<link rel="icon" type="image/x-icon" href="/favicon.ico">');

    if (isSvg) {
      lines.push('<link rel="icon" type="image/svg+xml" href="/favicon.svg">');
    }

    const selected = PACKAGE_ICONS.filter((i) => selectedIconIds.has(i.id));

    const favicons = selected.filter((i) => i.category === 'favicon');
    for (const icon of favicons) {
      lines.push(`<link rel="icon" type="image/png" sizes="${icon.width}x${icon.height}" href="/${icon.filename}">`);
    }

    const appleIcons = selected.filter((i) => i.category === 'apple');
    if (appleIcons.length) {
      lines.push('');
      lines.push('<!-- Apple Touch Icons -->');
      for (const icon of appleIcons) {
        if (icon.filename === 'apple-touch-icon.png') {
          lines.push(`<link rel="apple-touch-icon" href="/${icon.filename}">`);
        } else {
          lines.push(`<link rel="apple-touch-icon" sizes="${icon.width}x${icon.height}" href="/${icon.filename}">`);
        }
      }
    }

    if (isSvg) {
      lines.push('');
      lines.push('<!-- Safari Pinned Tab -->');
      lines.push('<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000">');
    }

    if (selected.some((i) => i.category === 'android')) {
      lines.push('');
      lines.push('<!-- PWA Manifest -->');
      lines.push('<link rel="manifest" href="/site.webmanifest">');
    }

    const msIcons = selected.filter((i) => i.category === 'microsoft');
    if (msIcons.length) {
      lines.push('');
      lines.push('<!-- Microsoft Tiles -->');
      lines.push('<meta name="msapplication-config" content="/browserconfig.xml">');
    }

    const ogIcons = selected.filter((i) => i.category === 'opengraph');
    if (ogIcons.length) {
      lines.push('');
      lines.push('<!-- Open Graph -->');
      const og = ogIcons.find((i) => i.id === 'og-image');
      if (og) {
        lines.push(`<meta property="og:image" content="https://yourwebsite.com/${og.filename}">`);
        lines.push(`<meta property="og:image:width" content="${og.width}">`);
        lines.push(`<meta property="og:image:height" content="${og.height}">`);
      }
      const tw = ogIcons.find((i) => i.id === 'og-twitter');
      if (tw) {
        lines.push('<meta name="twitter:card" content="summary_large_image">');
        lines.push(`<meta name="twitter:image" content="https://yourwebsite.com/${tw.filename}">`);
      }
    }

    return lines.join('\n');
  }, [selectedIconIds, masterImage]);

  const handleCopySnippet = useCallback(async () => {
    await navigator.clipboard.writeText(htmlSnippet);
    setSnippetCopied(true);
    setTimeout(() => setSnippetCopied(false), 2000);
  }, [htmlSnippet]);

  const handleInlineCopy = useCallback(async () => {
    await navigator.clipboard.writeText(htmlSnippet);
    setInlineCopied(true);
    setTimeout(() => setInlineCopied(false), 2000);
  }, [htmlSnippet]);

  // ── Reset everything ─────────────────────────────────────────

  const handleReset = useCallback(() => {
    if (masterImage?.previewUrl) URL.revokeObjectURL(masterImage.previewUrl);
    setMasterImage(null);
    setAutoPreviews(new Map());
    setAutoBlobs(new Map());
    setPackagePreviews(new Map());
    setPackageBlobs(new Map());
    setSelectedIconIds(new Set(PACKAGE_ICONS.filter((i) => i.essential).map((i) => i.id)));
    setShowHtmlSnippet(false);
    setBgColor('');
    setPadding(0);
    setMode('quick');
    setCustomTitle('');
    setCustomUrl('');
  }, [masterImage]);

  // ── Cleanup on unmount ───────────────────────────────────────

  useEffect(() => {
    return () => {
      if (masterImage?.previewUrl) URL.revokeObjectURL(masterImage.previewUrl);
    };
  }, [masterImage]);

  // ── Derived values ───────────────────────────────────────────

  const selectedCount = selectedIconIds.size;
  const fav16 = autoPreviews.get(16);
  const defaultTitle = masterImage?.file.name.replace(/\.[^.]+$/, '') ?? 'My Page';
  const pageTitle = customTitle || defaultTitle;
  const pageUrl = customUrl || 'yourwebsite.com';
  const isSvgSource = masterImage?.file.type === 'image/svg+xml';

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-white dark:bg-bp-navy blueprint-grid">
      {/* Skip to content (a11y) */}
      <a href="#main-content" className="sr-only-focusable">
        Skip to content
      </a>

      {/* Screen reader live region for status updates */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {isProcessing
          ? `Processing: generating ${PACKAGE_ICONS.length + ICON_SIZES.length} icon variants`
          : hasAnyPreview
            ? `Ready: ${selectedCount} icons selected`
            : 'Upload an image to get started'}
      </div>

      {/* ── Header ──────────────────────────────────────────── */}
      <header className="h-12 border-b border-zinc-200 dark:border-bp-line/40 shrink-0 flex items-center px-4 gap-4" role="banner">
        <div className="flex items-center gap-2 shrink-0">
          <img src="/favicon-32x32.png" alt="GetIconFav logo" width={28} height={28} className="w-7 h-7 rounded-md" />
          <h1 className="text-sm font-bold font-mono tracking-tight">
            <span className="text-bp-blue">Get</span>
            <span className="text-bp-steel">Icon</span>
            <span className="text-zinc-300">Fav</span>
          </h1>
        </div>

        <div className="flex-1 flex justify-center">
          <StepIndicator currentStep={currentStep} />
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {/* Quick / Advanced toggle */}
          {hasSource && !isProcessing && (
            <div className="flex items-center rounded-md border border-bp-line overflow-hidden mr-2">
              <button
                type="button"
                onClick={() => setMode('quick')}
                className={`flex items-center gap-1 px-2.5 py-1.5 text-[10px] font-mono font-semibold transition-colors ${mode === 'quick'
                  ? 'bg-bp-blue/10 text-bp-blue border-r border-bp-line'
                  : 'text-zinc-600 hover:text-zinc-400 border-r border-bp-line'
                  }`}
                aria-label="Quick mode"
              >
                <FiZap className="w-3 h-3" aria-hidden="true" />
                Quick
              </button>
              <button
                type="button"
                onClick={() => setMode('advanced')}
                className={`flex items-center gap-1 px-2.5 py-1.5 text-[10px] font-mono font-semibold transition-colors ${mode === 'advanced'
                  ? 'bg-bp-steel/10 text-bp-steel'
                  : 'text-zinc-600 hover:text-zinc-400'
                  }`}
                aria-label="Advanced mode"
              >
                <FiSettings className="w-3 h-3" aria-hidden="true" />
                Advanced
              </button>
            </div>
          )}

          {/* Theme toggle */}
          <button
            type="button"
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            className="flex items-center justify-center w-8 h-8 rounded-md text-zinc-500 hover:text-bp-amber border border-bp-line hover:border-bp-amber/30"
            aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} theme`}
            title={`Current: ${theme === 'system' ? 'system' : theme} theme`}
          >
            {resolvedTheme === 'dark'
              ? <FiSun className="w-3.5 h-3.5" aria-hidden="true" />
              : <FiMoon className="w-3.5 h-3.5" aria-hidden="true" />}
          </button>
          {hasAnyPreview && !isProcessing && (
            <>
              <button
                type="button"
                onClick={() => setShowPreviews(true)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[11px] font-mono font-medium
                  text-zinc-500 hover:text-bp-blue border border-bp-line hover:border-bp-blue/30"
                aria-label="Open context previews"
              >
                <FiEye className="w-3.5 h-3.5" aria-hidden="true" />
                <span className="hidden sm:inline">Previews</span>
              </button>
              <button
                type="button"
                onClick={() => setShowHtmlSnippet(true)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[11px] font-mono font-medium
                  text-zinc-500 hover:text-bp-amber border border-bp-line hover:border-bp-amber/30"
                aria-label="View HTML snippet"
              >
                <FiCode className="w-3.5 h-3.5" aria-hidden="true" />
                <span className="hidden sm:inline">HTML</span>
              </button>
            </>
          )}
          {hasSource && (
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[11px] font-mono font-medium
                text-zinc-500 hover:text-bp-red border border-bp-line hover:border-bp-red/30"
              aria-label="Reset and start over"
            >
              <FiRefreshCw className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}
        </div>
      </header>

      {/* ── Main content ────────────────────────────────────── */}
      <main id="main-content" className="flex-1 overflow-hidden" role="main">
        {/* Step 1: Upload */}
        {!hasSource && !hasAnyPreview && !isProcessing && (
          <div className="h-full flex gap-0">
            {/* Left: Drop zone */}
            <div className="flex-1 p-4">
              <DropZone onFileSelected={handleMasterDrop} disabled={isProcessing} />
            </div>
            {/* Right: Installation guide */}
            <div className="w-[380px] lg:w-[420px] xl:w-[460px] shrink-0 border-l border-zinc-200 dark:border-bp-line/40 p-4 overflow-y-auto">
              <FaviconGuide />
            </div>
          </div>
        )}

        {/* Processing */}
        {isProcessing && (
          <div className="h-full flex flex-col items-center justify-center gap-4" role="status" aria-busy="true" aria-label="Processing icons">
            <div className="relative w-14 h-14">
              <div className="absolute inset-0 border-2 border-bp-blue/20 rounded-full" />
              <div className="absolute inset-0 border-2 border-bp-blue border-t-transparent rounded-full animate-spin" />
            </div>
            <div className="text-center">
              <p className="text-sm font-mono font-medium text-bp-blue">Processing</p>
              <p className="text-xs text-zinc-600 font-mono mt-1">Generating {PACKAGE_ICONS.length + ICON_SIZES.length} icon variants</p>
            </div>
          </div>
        )}

        {/* Step 2-3: Configure & Export — horizontal layout */}
        {(hasSource || hasAnyPreview) && !isProcessing && (
          <div className="h-full flex">
            {/* Left panel: Source + inline preview */}
            <div className="w-72 lg:w-80 border-r border-zinc-200 dark:border-bp-line/40 flex flex-col gap-4 p-4 overflow-y-auto shrink-0">
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

              {/* Tiny preview row with warnings */}
              {masterImage && autoPreviews.size > 0 && (
                <TinyPreviewRow
                  previews={autoPreviews}
                  sourceWidth={masterImage.element.naturalWidth}
                  sourceHeight={masterImage.element.naturalHeight}
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
                          <span className="text-[9px] text-zinc-600">{pageUrl}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Customization inputs */}
                  <div className="px-3 pb-3 space-y-1.5">
                    <div className="flex items-center gap-1.5">
                      <label htmlFor="custom-title" className="text-[8px] font-mono font-bold text-zinc-600 uppercase tracking-wider w-10 shrink-0">Title</label>
                      <input
                        id="custom-title"
                        type="text"
                        value={customTitle}
                        onChange={(e) => setCustomTitle(e.target.value)}
                        placeholder={defaultTitle}
                        className="flex-1 text-[10px] font-mono bg-zinc-900/80 border border-zinc-800 rounded px-2 py-1 text-zinc-300 placeholder-zinc-700 focus:border-bp-blue/40 focus:outline-none"
                      />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <label htmlFor="custom-url" className="text-[8px] font-mono font-bold text-zinc-600 uppercase tracking-wider w-10 shrink-0">URL</label>
                      <input
                        id="custom-url"
                        type="text"
                        value={customUrl}
                        onChange={(e) => setCustomUrl(e.target.value)}
                        placeholder="yourwebsite.com"
                        className="flex-1 text-[10px] font-mono bg-zinc-900/80 border border-zinc-800 rounded px-2 py-1 text-zinc-300 placeholder-zinc-700 focus:border-bp-blue/40 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Advanced controls (only in advanced mode) */}
              {mode === 'advanced' && hasSource && (
                <AdvancedControls
                  bgColor={bgColor}
                  onBgColorChange={setBgColor}
                  padding={padding}
                  onPaddingChange={setPadding}
                />
              )}

              {/* Package summary with inline copy button */}
              {hasAnyPreview && (
                <div className="rounded-lg border border-zinc-800/40 bg-zinc-900/40 p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wide text-zinc-600">Package Contents</span>
                    <button
                      type="button"
                      onClick={handleInlineCopy}
                      className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[8px] font-mono font-semibold
                        text-zinc-600 hover:text-bp-blue border border-zinc-800 hover:border-bp-blue/30 transition-colors"
                      title="Copy HTML snippet"
                    >
                      {inlineCopied ? (
                        <><FiCheck className="w-2.5 h-2.5 text-bp-green" /> Copied</>
                      ) : (
                        <><FiCopy className="w-2.5 h-2.5" /> HTML</>
                      )}
                    </button>
                  </div>
                  <div className="space-y-1 text-[10px] font-mono text-zinc-500">
                    <div className="flex justify-between">
                      <span>favicon.ico</span>
                      <span className="text-bp-blue">✓</span>
                    </div>
                    {isSvgSource && (
                      <>
                        <div className="flex justify-between">
                          <span>favicon.svg</span>
                          <span className="text-bp-green">✓</span>
                        </div>
                        <div className="flex justify-between">
                          <span>safari-pinned-tab.svg</span>
                          <span className="text-bp-green">✓</span>
                        </div>
                      </>
                    )}
                    <div className="flex justify-between">
                      <span>PNG icons</span>
                      <span className="text-bp-blue">{selectedCount}</span>
                    </div>
                    {selectedIconIds.has('android-maskable-192') && (
                      <div className="flex justify-between">
                        <span>Maskable icons</span>
                        <span className="text-bp-green">✓</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>site.webmanifest</span>
                      <span className="text-bp-blue">✓</span>
                    </div>
                    <div className="flex justify-between">
                      <span>browserconfig.xml</span>
                      <span className="text-bp-blue">✓</span>
                    </div>
                    <div className="flex justify-between">
                      <span>HTML snippet</span>
                      <span className="text-bp-blue">✓</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Tip */}
              <div className="mt-auto px-3 py-2 rounded-lg bg-zinc-900/40 border border-zinc-800/30">
                <p className="text-[10px] font-mono text-zinc-600 leading-relaxed">
                  {mode === 'quick'
                    ? 'Quick mode selects the essential icons. Switch to Advanced for padding, background color, and fine-tuning.'
                    : 'Select the icon types you need on the right. Adjust background and padding above. The ZIP includes all selected PNGs, .ico, config files, and HTML tags.'}
                </p>
              </div>
            </div>

            {/* Right panel: Icon package grid + Download */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Icon grid */}
              <div className="flex-1 overflow-y-auto p-4">
                <IconPackageGrid
                  previews={packagePreviews}
                  selectedIds={selectedIconIds}
                  onToggleIcon={handleToggleIcon}
                  onSelectCategory={handleSelectCategory}
                  onSelectAll={handleSelectAll}
                  onSelectEssential={handleSelectEssential}
                  onDownloadPng={handleDownloadPng}
                />
              </div>

              {/* Download bar */}
              {canDownload && (
                <div className="border-t border-zinc-200 dark:border-bp-line/40 px-4 py-3 flex items-center justify-between shrink-0 bg-white dark:bg-bp-navy">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-bp-green" />
                      <span className="text-sm font-mono font-medium text-zinc-200">Ready</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs font-mono text-zinc-500">
                      <span className="flex items-center gap-1">
                        <FiPackage className="w-3 h-3" />
                        {selectedCount} icons + configs
                      </span>
                      {estimatedSize !== null && (
                        <span className="flex items-center gap-1">
                          <FiDownload className="w-3 h-3" />
                          ~{formatFileSize(estimatedSize)}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleDownloadIco}
                      disabled={isDownloading}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg
                        bg-zinc-800 text-zinc-300 font-mono font-bold text-xs uppercase tracking-wider
                        hover:bg-zinc-700 active:bg-zinc-600
                        disabled:opacity-50 disabled:cursor-not-allowed
                        border border-zinc-700"
                    >
                      <FiDownload className="w-3.5 h-3.5" />
                      .ico only
                    </button>
                    <button
                      type="button"
                      onClick={handleDownloadZip}
                      disabled={isDownloading}
                      className="
                        flex items-center gap-2 px-5 py-2 rounded-lg
                        bg-gradient-to-r from-bp-blue to-bp-steel
                        text-white font-mono font-bold text-xs uppercase tracking-wider
                        hover:opacity-90 active:opacity-80
                        disabled:opacity-50 disabled:cursor-not-allowed
                      "
                    >
                      {isDownloading ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                          Packaging...
                        </>
                      ) : (
                        <>
                          <FiPackage className="w-4 h-4" />
                          Download ZIP Package
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* ── Footer ──────────────────────────────────────────── */}
      <footer className="h-9 border-t border-zinc-200 dark:border-bp-line/40 shrink-0 bg-white dark:bg-bp-navy">
        <SupportLinks />
      </footer>

      {/* ── Previews panel (slide-over) ─────────────────────── */}
      {showPreviews && (
        <div className="fixed inset-0 z-50 flex">
          <button
            type="button"
            className="absolute inset-0 bg-zinc-950/80"
            onClick={() => setShowPreviews(false)}
            aria-label="Close previews"
          />
          <div className="relative ml-auto w-full max-w-3xl h-full overflow-y-auto bg-white dark:bg-bp-navy border-l border-zinc-200 dark:border-bp-line/50">
            <div className="sticky top-0 z-10 bg-white dark:bg-bp-navy border-b border-zinc-200 dark:border-bp-line/40 px-5 py-3 flex items-center justify-between">
              <h2 className="text-sm font-mono font-bold text-zinc-800 dark:text-zinc-200">Context Previews</h2>
              <button
                type="button"
                onClick={() => setShowPreviews(false)}
                className="p-1.5 rounded-md text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/50"
              >
                <FiX className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5">
              <FaviconPreviews previews={autoPreviews} packagePreviews={packagePreviews} title={pageTitle} url={pageUrl} />
            </div>
          </div>
        </div>
      )}

      {/* ── HTML Snippet panel (slide-over) ─────────────────── */}
      {showHtmlSnippet && (
        <div className="fixed inset-0 z-50 flex">
          <button
            type="button"
            className="absolute inset-0 bg-zinc-950/80"
            onClick={() => setShowHtmlSnippet(false)}
            aria-label="Close HTML snippet"
          />
          <div className="relative ml-auto w-full max-w-2xl h-full overflow-y-auto bg-white dark:bg-bp-navy border-l border-zinc-200 dark:border-bp-line/50">
            <div className="sticky top-0 z-10 bg-white dark:bg-bp-navy border-b border-zinc-200 dark:border-bp-line/40 px-5 py-3 flex items-center justify-between">
              <h2 className="text-sm font-mono font-bold text-zinc-800 dark:text-zinc-200">HTML Snippet</h2>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopySnippet}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[11px] font-mono font-medium
                    text-zinc-400 hover:text-bp-blue border border-zinc-700 hover:border-bp-blue/30"
                >
                  {snippetCopied ? (
                    <><FiCheck className="w-3.5 h-3.5 text-bp-green" /> Copied</>
                  ) : (
                    <><FiCopy className="w-3.5 h-3.5" /> Copy</>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setShowHtmlSnippet(false)}
                  className="p-1.5 rounded-md text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/50"
                >
                  <FiX className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="p-5">
              <p className="text-xs text-zinc-500 font-mono mb-3">
                Copy and paste this into your HTML {'<head>'} tag. The snippet is auto-generated based on your selected icons.
              </p>
              <pre className="rounded-lg border border-zinc-800/50 bg-zinc-900/40 px-4 py-3 overflow-x-auto text-[11px] leading-relaxed">
                <code className="text-zinc-400 font-mono">{htmlSnippet}</code>
              </pre>
            </div>
          </div>
        </div>
      )}
      <Analytics />
    </div>
  );
}

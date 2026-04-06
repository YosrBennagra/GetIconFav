import { useCallback, useEffect, useMemo, useState } from 'react';
import { FiRefreshCw, FiDownload, FiEye, FiX, FiLock, FiPackage, FiCode, FiCheck, FiCopy, FiZap, FiSettings, FiSun, FiMoon, FiBookOpen } from 'react-icons/fi';
import { Analytics } from '@vercel/analytics/react';
import { ICON_SIZES, PACKAGE_ICONS, ICO_BUNDLE_SIZES, type IconCategory } from './lib/constants';
import { encodeIco, type IcoEntry } from './lib/ico-encoder';
import { blobToDataUrl, formatFileSize, loadImage, resizeImage, resizeImageRect, type ResizeOptions } from './lib/image-resizer';
import { generatePackageZip, generateCategoryZip } from './lib/package-generator';
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
  const [loadError, setLoadError] = useState<string | null>(null);
  const [showPreviews, setShowPreviews] = useState(false);
  const [showHtmlSnippet, setShowHtmlSnippet] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
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
    setLoadError(null);
    setAutoPreviews(new Map());
    setAutoBlobs(new Map());
    setPackagePreviews(new Map());
    setPackageBlobs(new Map());

    try {
      const element = await loadImage(file);
      const previewUrl = URL.createObjectURL(file);
      setMasterImage({ file, element, previewUrl });

      // Read SVG text once so each resize re-renders vectors at native resolution
      const svgText = file.type === 'image/svg+xml' ? await file.text() : undefined;

      const opts: ResizeOptions = {
        bgColor: bgColor || undefined,
        padding,
        svgText,
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
            svgText,
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
      setLoadError('Failed to load image. Please try a different file.');
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

        // Re-read SVG text for native-resolution re-rendering
        const svgText = masterImage.file.type === 'image/svg+xml'
          ? await masterImage.file.text()
          : undefined;

        const opts: ResizeOptions = {
          bgColor: bgColor || undefined,
          padding,
          svgText,
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
              svgText,
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

  // ── Download single category ZIP ─────────────────────────────

  const handleDownloadCategory = useCallback(async (category: IconCategory) => {
    if (packageBlobs.size === 0) return;
    setIsDownloading(true);
    try {
      const categoryIcons = PACKAGE_ICONS.filter(
        (i) => i.category === category && selectedIconIds.has(i.id)
      );
      if (categoryIcons.length === 0) return;

      const zipBlob = await generateCategoryZip({
        blobs: packageBlobs,
        categoryIcons,
        category,
        appName: masterImage?.file.name.replace(/\.[^.]+$/, '') ?? 'MyApp',
        themeColor: '#ffffff',
        bgColor: bgColor || '#ffffff',
      });

      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${category}-icons.zip`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } finally {
      setIsDownloading(false);
    }
  }, [packageBlobs, selectedIconIds, masterImage, bgColor]);

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

    const msixIcons = selected.filter((i) => i.category === 'msixstore');
    if (msixIcons.length) {
      lines.push('');
      lines.push('<!-- MSIX Store Visual Assets (packaged in MSIX, not in HTML head) -->');
      lines.push(`<!-- ${msixIcons.length} store asset(s) included in your download -->`);
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
    setLoadError(null);
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

  // ── Escape key closes slide-overs ────────────────────────────

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showPreviews) setShowPreviews(false);
        else if (showHtmlSnippet) setShowHtmlSnippet(false);
        else if (showGuide) setShowGuide(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showPreviews, showHtmlSnippet, showGuide]);

  // ── Derived values ───────────────────────────────────────────

  const selectedCount = selectedIconIds.size;
  const fav16 = autoPreviews.get(16);
  const defaultTitle = masterImage?.file.name.replace(/\.[^.]+$/, '') ?? 'My Page';
  const pageTitle = customTitle || defaultTitle;
  const pageUrl = customUrl || 'yourwebsite.com';
  const isSvgSource = masterImage?.file.type === 'image/svg+xml';

  return (
    <div className="min-h-screen flex flex-col glass-mesh">
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
      <header className="sticky top-0 z-50 border-b border-white/10 sticky-glass" role="banner">
        <div className="max-w-7xl mx-auto h-14 flex items-center px-4 sm:px-6 gap-4">
          <div className="flex items-center gap-2.5 shrink-0">
            <img src="/favicon.ico" alt="GetIconFav" className="w-8 h-8" />
            <h1 className="text-sm font-bold tracking-tight">
              <span className="text-violet-400">Get</span>
              <span className="text-cyan-400">Icon</span>
              <span className="text-zinc-300">Fav</span>
            </h1>
          </div>

          <div className="flex-1 flex justify-center">
            <StepIndicator currentStep={currentStep} />
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* Quick / Advanced toggle */}
            {hasSource && !isProcessing && (
              <div className="flex items-center rounded-full border border-white/10 overflow-hidden mr-1">
                <button
                  type="button"
                  onClick={() => setMode('quick')}
                  className={`flex items-center gap-1 px-3 py-1.5 text-[11px] font-medium transition-colors ${mode === 'quick'
                    ? 'bg-violet-500/20 text-violet-300'
                    : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                  aria-label="Quick mode"
                >
                  <FiZap className="w-3 h-3" aria-hidden="true" />
                  Quick
                </button>
                <button
                  type="button"
                  onClick={() => setMode('advanced')}
                  className={`flex items-center gap-1 px-3 py-1.5 text-[11px] font-medium transition-colors ${mode === 'advanced'
                    ? 'bg-cyan-500/20 text-cyan-300'
                    : 'text-zinc-500 hover:text-zinc-300'
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
              className="flex items-center justify-center w-8 h-8 rounded-xl text-zinc-400 hover:text-amber-400 border border-white/10 hover:border-amber-400/30 bg-white/5"
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
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[11px] font-medium
                    text-zinc-400 hover:text-violet-300 border border-white/10 hover:border-violet-500/30 bg-white/5"
                  aria-label="Open context previews"
                >
                  <FiEye className="w-3.5 h-3.5" aria-hidden="true" />
                  <span className="hidden sm:inline">Previews</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowHtmlSnippet(true)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[11px] font-medium
                    text-zinc-400 hover:text-cyan-300 border border-white/10 hover:border-cyan-500/30 bg-white/5"
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
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[11px] font-medium
                  text-zinc-400 hover:text-red-400 border border-white/10 hover:border-red-500/30 bg-white/5"
                aria-label="Reset and start over"
              >
                <FiRefreshCw className="w-3.5 h-3.5" aria-hidden="true" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* ── Main content ────────────────────────────────────── */}
      <main id="main-content" className="flex-1 relative z-10" role="main">
        {/* Step 1: Upload Hero */}
        {!hasSource && !hasAnyPreview && !isProcessing && (
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] px-4">
            <div className="w-full max-w-2xl space-y-8">
              {/* Hero text */}
              <div className="text-center space-y-3">
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                  <span className="text-zinc-100">Free Favicon Generator &amp; </span>
                  <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">ICO Converter</span>
                </h2>
                <p className="text-zinc-500 text-base max-w-lg mx-auto leading-relaxed">
                  Convert PNG, SVG, JPG or WebP to multi-size <strong className="text-zinc-400">.ico</strong> files.
                  Generate favicons, Apple Touch Icons, PWA icons, Microsoft tiles,
                  MSIX Store assets, and Open Graph images — all in one click.
                </p>
                <p className="text-zinc-600 text-sm max-w-md mx-auto">
                  100% client-side — your images are processed locally and never uploaded.
                </p>
              </div>

              {/* Drop zone */}
              <DropZone onFileSelected={handleMasterDrop} disabled={isProcessing} />

              {/* Error message */}
              {loadError && (
                <div className="flex items-center justify-center gap-2 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2.5">
                  <FiX className="w-4 h-4 shrink-0" />
                  <span>{loadError}</span>
                  <button type="button" onClick={() => setLoadError(null)} className="ml-2 text-red-400/60 hover:text-red-300">
                    Dismiss
                  </button>
                </div>
              )}

              {/* Trust signals */}
              <div className="flex items-center justify-center gap-6 flex-wrap text-[11px] text-zinc-600">
                <span className="flex items-center gap-1.5">
                  <FiLock className="w-3 h-3 text-emerald-500/60" /> Private — files stay in your browser
                </span>
                <span className="flex items-center gap-1.5">
                  <FiZap className="w-3 h-3 text-violet-400/60" /> Instant — no uploads, no waiting
                </span>
                <button type="button" onClick={() => setShowGuide(true)} className="flex items-center gap-1.5 hover:text-violet-400 transition-colors">
                  <FiBookOpen className="w-3 h-3 text-cyan-400/60" /> Installation guide
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Processing */}
        {isProcessing && (
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] gap-6" role="status" aria-busy="true" aria-label="Processing icons">
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 border-2 border-violet-500/20 rounded-full" />
              <div className="absolute inset-0 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
              <div className="absolute inset-2 border-2 border-cyan-500/30 border-b-transparent rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <FiPackage className="w-5 h-5 text-violet-400" />
              </div>
            </div>
            <div className="text-center">
              <p className="text-base font-semibold text-zinc-200">Generating icons</p>
              <p className="text-sm text-zinc-500 mt-1">{PACKAGE_ICONS.length + ICON_SIZES.length} variants across all platforms</p>
            </div>
          </div>
        )}

        {/* Step 2-3: Configure & Export — centered vertical flow */}
        {(hasSource || hasAnyPreview) && !isProcessing && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-5 pb-24">
            {/* Top row: Source + Tab Preview + Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Source info */}
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

              {/* Tab preview card */}
              {fav16 ? (
                <div className="glass-card overflow-hidden">
                  <div className="px-3 py-1.5 border-b border-white/5">
                    <span className="text-[9px] font-semibold uppercase tracking-wide text-zinc-500">Tab Preview</span>
                  </div>
                  <div className="p-3">
                    <div className="bg-zinc-800/50 rounded-xl border border-white/5 overflow-hidden">
                      <div className="flex items-center gap-1.5 px-2.5 pt-2 pb-0">
                        <div className="w-2 h-2 rounded-full bg-red-500/40" />
                        <div className="w-2 h-2 rounded-full bg-yellow-500/40" />
                        <div className="w-2 h-2 rounded-full bg-green-500/40" />
                      </div>
                      <div className="flex items-end px-1.5 pt-1.5">
                        <div className="flex items-center gap-1.5 bg-white/5 rounded-t px-2.5 py-1 max-w-[160px] border-t border-x border-white/10">
                          <img src={fav16} alt="" width={14} height={14} className="shrink-0" style={{ imageRendering: 'pixelated' }} />
                          <span className="text-[10px] text-zinc-400 truncate">{pageTitle}</span>
                        </div>
                      </div>
                      <div className="bg-white/[0.02] px-2.5 py-1 border-t border-white/5">
                        <div className="flex items-center gap-1.5 bg-white/5 rounded-lg px-2 py-0.5">
                          <FiLock className="w-2 h-2 text-emerald-500/50 shrink-0" />
                          <span className="text-[9px] text-zinc-600">{pageUrl}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Customization inputs */}
                  <div className="px-3 pb-3 space-y-1.5">
                    <div className="flex items-center gap-1.5">
                      <label htmlFor="custom-title" className="text-[8px] font-semibold text-zinc-500 uppercase tracking-wider w-10 shrink-0">Title</label>
                      <input
                        id="custom-title"
                        type="text"
                        value={customTitle}
                        onChange={(e) => setCustomTitle(e.target.value)}
                        placeholder={defaultTitle}
                        className="flex-1 text-[10px] bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-zinc-300 placeholder-zinc-700 focus:border-violet-500/40 focus:outline-none"
                      />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <label htmlFor="custom-url" className="text-[8px] font-semibold text-zinc-500 uppercase tracking-wider w-10 shrink-0">URL</label>
                      <input
                        id="custom-url"
                        type="text"
                        value={customUrl}
                        onChange={(e) => setCustomUrl(e.target.value)}
                        placeholder="yourwebsite.com"
                        className="flex-1 text-[10px] bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-zinc-300 placeholder-zinc-700 focus:border-violet-500/40 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="glass-card p-6 flex items-center justify-center">
                  <p className="text-xs text-zinc-600">Preview loading…</p>
                </div>
              )}

              {/* Package summary */}
              {hasAnyPreview ? (
                <div className="glass-card p-3 space-y-2 flex flex-col">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-semibold uppercase tracking-wide text-zinc-500">Package Contents</span>
                    <button
                      type="button"
                      onClick={handleInlineCopy}
                      className="flex items-center gap-1 px-1.5 py-0.5 rounded-lg text-[8px] font-semibold
                        text-zinc-500 hover:text-violet-300 border border-white/10 hover:border-violet-500/30 transition-colors"
                      title="Copy HTML snippet"
                    >
                      {inlineCopied ? (
                        <><FiCheck className="w-2.5 h-2.5 text-emerald-400" /> Copied</>
                      ) : (
                        <><FiCopy className="w-2.5 h-2.5" /> HTML</>
                      )}
                    </button>
                  </div>
                  <div className="space-y-1 text-[10px] text-zinc-500 flex-1">
                    <div className="flex justify-between">
                      <span>favicon.ico</span>
                      <span className="text-violet-400">✓</span>
                    </div>
                    {isSvgSource && (
                      <>
                        <div className="flex justify-between">
                          <span>favicon.svg</span>
                          <span className="text-cyan-400">✓</span>
                        </div>
                        <div className="flex justify-between">
                          <span>safari-pinned-tab.svg</span>
                          <span className="text-cyan-400">✓</span>
                        </div>
                      </>
                    )}
                    <div className="flex justify-between">
                      <span>PNG icons</span>
                      <span className="text-violet-400">{selectedCount}</span>
                    </div>
                    {selectedIconIds.has('android-maskable-192') && (
                      <div className="flex justify-between">
                        <span>Maskable icons</span>
                        <span className="text-emerald-400">✓</span>
                      </div>
                    )}
                    {[...selectedIconIds].some((id) => PACKAGE_ICONS.find((i) => i.id === id)?.category === 'android') && (
                      <div className="flex justify-between">
                        <span>site.webmanifest</span>
                        <span className="text-violet-400">✓</span>
                      </div>
                    )}
                    {[...selectedIconIds].some((id) => PACKAGE_ICONS.find((i) => i.id === id)?.category === 'microsoft') && (
                      <div className="flex justify-between">
                        <span>browserconfig.xml</span>
                        <span className="text-violet-400">✓</span>
                      </div>
                    )}
                    {[...selectedIconIds].some((id) => PACKAGE_ICONS.find((i) => i.id === id)?.category === 'msixstore') && (
                      <div className="flex justify-between">
                        <span>MSIX Store Assets</span>
                        <span className="text-indigo-400">✓</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>HTML snippet</span>
                      <span className="text-violet-400">✓</span>
                    </div>
                  </div>
                  {estimatedSize !== null && (
                    <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                      <span className="text-[9px] text-zinc-600">Estimated size</span>
                      <span className="text-[10px] font-semibold text-violet-400">~{formatFileSize(estimatedSize)}</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="glass-card p-6 flex items-center justify-center">
                  <p className="text-xs text-zinc-600">Summary loading…</p>
                </div>
              )}
            </div>

            {/* Tiny previews + warnings */}
            {masterImage && autoPreviews.size > 0 && (
              <TinyPreviewRow
                previews={autoPreviews}
                sourceWidth={masterImage.element.naturalWidth}
                sourceHeight={masterImage.element.naturalHeight}
              />
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

            {/* Icon Package Grid */}
            <IconPackageGrid
              previews={packagePreviews}
              selectedIds={selectedIconIds}
              onToggleIcon={handleToggleIcon}
              onSelectCategory={handleSelectCategory}
              onSelectAll={handleSelectAll}
              onSelectEssential={handleSelectEssential}
              onDownloadPng={handleDownloadPng}
              onDownloadCategory={handleDownloadCategory}
            />
          </div>
        )}
      </main>

      {/* ── Sticky Download Bar ─────────────────────────────── */}
      {canDownload && (
        <div className="sticky bottom-0 z-40 border-t border-white/10 sticky-glass">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm font-semibold text-zinc-200">Ready to export</span>
              </div>
              <div className="hidden sm:flex items-center gap-3 text-xs text-zinc-500">
                <span className="flex items-center gap-1"><FiPackage className="w-3 h-3" /> {selectedCount} icons + configs</span>
                {estimatedSize !== null && (
                  <span className="flex items-center gap-1"><FiDownload className="w-3 h-3" /> ~{formatFileSize(estimatedSize)}</span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleDownloadIco}
                disabled={isDownloading}
                className="flex items-center gap-2 px-3 py-2 rounded-xl
                  bg-white/5 text-zinc-300 font-semibold text-xs uppercase tracking-wider
                  hover:bg-white/10 disabled:opacity-50 border border-white/10"
              >
                <FiDownload className="w-3.5 h-3.5" /> .ico only
              </button>
              <button
                type="button"
                onClick={handleDownloadZip}
                disabled={isDownloading}
                className="shimmer-btn flex items-center gap-2 px-5 py-2.5 rounded-xl
                  bg-gradient-to-r from-violet-600 to-cyan-500
                  text-white font-semibold text-xs uppercase tracking-wider
                  hover:opacity-90 disabled:opacity-50 shadow-glow"
              >
                {isDownloading ? (
                  <><div className="w-3.5 h-3.5 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" /> Packaging...</>
                ) : (
                  <><FiPackage className="w-4 h-4" /> Download ZIP Package</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Footer ──────────────────────────────────────────── */}
      <footer className="relative z-10 gradient-border-top mt-auto">
        <SupportLinks />
      </footer>

      {/* ── Previews panel (slide-over) ─────────────────────── */}
      {showPreviews && (
        <div className="fixed inset-0 z-50 flex">
          <button
            type="button"
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowPreviews(false)}
            aria-label="Close previews"
          />
          <div className="relative ml-auto w-full max-w-3xl h-full overflow-y-auto glass-mesh border-l border-white/10">
            <div className="sticky top-0 z-10 bg-white/5 backdrop-blur-xl border-b border-white/10 px-5 py-3 flex items-center justify-between">
              <h2 className="text-sm font-bold text-zinc-200">Context Previews</h2>
              <button
                type="button"
                onClick={() => setShowPreviews(false)}
                className="p-1.5 rounded-xl text-zinc-400 hover:text-zinc-200 hover:bg-white/10"
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
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowHtmlSnippet(false)}
            aria-label="Close HTML snippet"
          />
          <div className="relative ml-auto w-full max-w-2xl h-full overflow-y-auto glass-mesh border-l border-white/10">
            <div className="sticky top-0 z-10 bg-white/5 backdrop-blur-xl border-b border-white/10 px-5 py-3 flex items-center justify-between">
              <h2 className="text-sm font-bold text-zinc-200">HTML Snippet</h2>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopySnippet}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-medium
                    text-zinc-400 hover:text-violet-300 border border-white/10 hover:border-violet-500/30"
                >
                  {snippetCopied ? (
                    <><FiCheck className="w-3.5 h-3.5 text-emerald-400" /> Copied</>
                  ) : (
                    <><FiCopy className="w-3.5 h-3.5" /> Copy</>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setShowHtmlSnippet(false)}
                  className="p-1.5 rounded-xl text-zinc-400 hover:text-zinc-200 hover:bg-white/10"
                >
                  <FiX className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="p-5">
              <p className="text-xs text-zinc-500 mb-3">
                Copy and paste this into your HTML {'<head>'} tag. The snippet is auto-generated based on your selected icons.
              </p>
              <pre className="glass-card px-4 py-3 overflow-x-auto text-[11px] leading-relaxed">
                <code className="text-zinc-400 font-mono">{htmlSnippet}</code>
              </pre>
            </div>
          </div>
        </div>
      )}
      {/* ── Guide panel (slide-over) ──────────────────────── */}
      {showGuide && (
        <div className="fixed inset-0 z-50 flex">
          <button
            type="button"
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowGuide(false)}
            aria-label="Close guide"
          />
          <div className="relative ml-auto w-full max-w-2xl h-full overflow-y-auto glass-mesh border-l border-white/10">
            <div className="sticky top-0 z-10 bg-white/5 backdrop-blur-xl border-b border-white/10 px-5 py-3 flex items-center justify-between">
              <h2 className="text-sm font-bold text-zinc-200">Installation Guide</h2>
              <button
                type="button"
                onClick={() => setShowGuide(false)}
                className="p-1.5 rounded-xl text-zinc-400 hover:text-zinc-200 hover:bg-white/10"
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
      <Analytics />
    </div>
  );
}

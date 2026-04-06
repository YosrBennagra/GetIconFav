/**
 * Generates a complete icon package ZIP containing all selected icons,
 * web manifest, browserconfig.xml, and an HTML snippet.
 */
import JSZip from 'jszip';
import type { PackageIcon } from './constants';
import { ICO_BUNDLE_SIZES } from './constants';
import { encodeIco, type IcoEntry } from './ico-encoder';

export interface PackageOptions {
    /** Map of icon id → PNG blob */
    readonly blobs: ReadonlyMap<string, Blob>;
    /** The selected icon configs */
    readonly selectedIcons: readonly PackageIcon[];
    /** Optional master image blobs for ICO generation (size→blob) */
    readonly icoBlobs: ReadonlyMap<number, Blob>;
    /** App name for manifest */
    readonly appName: string;
    /** Theme color */
    readonly themeColor: string;
    /** Background color */
    readonly bgColor: string;
    /** Original SVG file for favicon.svg passthrough (if input was SVG) */
    readonly svgFile?: File;
    /** Whether the source is an SVG */
    readonly isSvg?: boolean;
}

/** Generate the site.webmanifest content. */
function generateManifest(icons: readonly PackageIcon[], appName: string, themeColor: string, bgColor: string): string {
    const manifestIcons: Array<{ src: string; sizes: string; type: string; purpose?: string }> = [];

    const androidIcons = icons.filter((i) => i.category === 'android');
    for (const icon of androidIcons) {
        manifestIcons.push({
            src: `/${icon.filename}`,
            sizes: `${icon.width}x${icon.height}`,
            type: 'image/png',
            purpose: icon.maskable ? 'maskable' : 'any',
        });
    }

    return JSON.stringify(
        {
            name: appName,
            short_name: appName,
            icons: manifestIcons,
            theme_color: themeColor,
            background_color: bgColor,
            display: 'standalone',
        },
        null,
        2
    );
}

/** Generate browserconfig.xml content. */
function generateBrowserConfig(icons: readonly PackageIcon[], themeColor: string): string {
    const tile144 = icons.find((i) => i.id === 'ms-144');
    const tile150 = icons.find((i) => i.id === 'ms-150');
    const tile310 = icons.find((i) => i.id === 'ms-310');
    const tile70 = icons.find((i) => i.id === 'ms-70');
    const tile310w = icons.find((i) => i.id === 'ms-310w');

    let tiles = '';
    if (tile70) tiles += `        <square70x70logo src="/${tile70.filename}"/>\n`;
    if (tile150) tiles += `        <square150x150logo src="/${tile150.filename}"/>\n`;
    if (tile310w) tiles += `        <wide310x150logo src="/${tile310w.filename}"/>\n`;
    if (tile310) tiles += `        <square310x310logo src="/${tile310.filename}"/>\n`;
    if (tile144) tiles += `        <square144x144logo src="/${tile144.filename}"/>\n`;

    return `<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
  <msapplication>
    <tile>
${tiles}      <TileColor>${themeColor}</TileColor>
    </tile>
  </msapplication>
</browserconfig>`;
}

/** Generate HTML snippet for all icon link tags. */
function generateHtmlSnippet(icons: readonly PackageIcon[], hasIco: boolean, hasSvg: boolean): string {
    const lines: string[] = ['<!-- Favicon -->'];

    if (hasIco) {
        lines.push('<link rel="icon" type="image/x-icon" href="/favicon.ico">');
    }

    // SVG favicon (if source was SVG)
    if (hasSvg) {
        lines.push('<link rel="icon" type="image/svg+xml" href="/favicon.svg">');
    }

    // PNG favicons
    const favicons = icons.filter((i) => i.category === 'favicon');
    for (const icon of favicons) {
        lines.push(`<link rel="icon" type="image/png" sizes="${icon.width}x${icon.height}" href="/${icon.filename}">`);
    }

    // Apple Touch Icons
    const appleIcons = icons.filter((i) => i.category === 'apple');
    if (appleIcons.length > 0) {
        lines.push('');
        lines.push('<!-- Apple Touch Icons -->');
        for (const icon of appleIcons) {
            // Canonical apple-touch-icon (180×180 without size suffix)
            if (icon.filename === 'apple-touch-icon.png') {
                lines.push(`<link rel="apple-touch-icon" href="/${icon.filename}">`);
            } else {
                lines.push(`<link rel="apple-touch-icon" sizes="${icon.width}x${icon.height}" href="/${icon.filename}">`);
            }
        }
    }

    // Safari pinned tab (if SVG source)
    if (hasSvg) {
        lines.push('<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000">');
    }

    // Android / PWA Manifest
    const androidIcons = icons.filter((i) => i.category === 'android');
    if (androidIcons.length > 0) {
        lines.push('');
        lines.push('<!-- PWA Manifest -->');
        lines.push('<link rel="manifest" href="/site.webmanifest">');
    }

    // Microsoft tiles
    const msIcons = icons.filter((i) => i.category === 'microsoft');
    if (msIcons.length > 0) {
        lines.push('');
        lines.push('<!-- Microsoft Tiles -->');
        lines.push('<meta name="msapplication-config" content="/browserconfig.xml">');
        const tile144 = msIcons.find((i) => i.id === 'ms-144');
        if (tile144) {
            lines.push(`<meta name="msapplication-TileImage" content="/${tile144.filename}">`);
        }
    }

    // Open Graph
    const ogIcons = icons.filter((i) => i.category === 'opengraph');
    if (ogIcons.length > 0) {
        lines.push('');
        lines.push('<!-- Open Graph / Social -->');
        const ogImage = ogIcons.find((i) => i.id === 'og-image');
        if (ogImage) {
            lines.push(`<meta property="og:image" content="https://yourwebsite.com/${ogImage.filename}">`);
            lines.push(`<meta property="og:image:width" content="${ogImage.width}">`);
            lines.push(`<meta property="og:image:height" content="${ogImage.height}">`);
        }
        const twImage = ogIcons.find((i) => i.id === 'og-twitter');
        if (twImage) {
            lines.push('<meta name="twitter:card" content="summary_large_image">');
            lines.push(`<meta name="twitter:image" content="https://yourwebsite.com/${twImage.filename}">`);
        }
    }

    return lines.join('\n');
}

/**
 * Generate a complete ZIP package with all icons and config files.
 */
export async function generatePackageZip(options: PackageOptions): Promise<Blob> {
    const { blobs, selectedIcons, icoBlobs, appName, themeColor, bgColor, svgFile, isSvg } = options;
    const zip = new JSZip();

    // Add all selected PNG icons
    for (const icon of selectedIcons) {
        const blob = blobs.get(icon.id);
        if (blob) {
            zip.file(icon.filename, blob);
        }
    }

    // Generate and add favicon.ico
    const icoEntries: IcoEntry[] = [];
    for (const size of ICO_BUNDLE_SIZES) {
        const blob = icoBlobs.get(size);
        if (blob) {
            icoEntries.push({ size, blob });
        }
    }
    if (icoEntries.length > 0) {
        const icoBlob = await encodeIco(icoEntries);
        zip.file('favicon.ico', icoBlob);
    }

    // SVG passthrough: include favicon.svg and safari-pinned-tab.svg
    if (isSvg && svgFile) {
        zip.file('favicon.svg', svgFile);
        zip.file('safari-pinned-tab.svg', svgFile);
    }

    // Generate manifest if android icons are selected
    const hasAndroid = selectedIcons.some((i) => i.category === 'android');
    if (hasAndroid) {
        zip.file('site.webmanifest', generateManifest(selectedIcons, appName, themeColor, bgColor));
    }

    // Generate browserconfig if MS icons are selected
    const hasMs = selectedIcons.some((i) => i.category === 'microsoft');
    if (hasMs) {
        zip.file('browserconfig.xml', generateBrowserConfig(selectedIcons, themeColor));
    }

    // Always include HTML snippet
    const htmlSnippet = generateHtmlSnippet(selectedIcons, icoEntries.length > 0, isSvg === true);
    zip.file('html-snippet.txt', htmlSnippet);

    return zip.generateAsync({ type: 'blob' });
}

export interface CategoryZipOptions {
    /** Map of icon id → PNG blob */
    readonly blobs: ReadonlyMap<string, Blob>;
    /** Icons selected in this category */
    readonly categoryIcons: readonly PackageIcon[];
    /** Category name (used for context-specific config files) */
    readonly category: string;
    /** App name for manifest */
    readonly appName: string;
    /** Theme color */
    readonly themeColor: string;
    /** Background color */
    readonly bgColor: string;
}

/**
 * Generate a ZIP containing only a single category's icons + relevant configs.
 */
export async function generateCategoryZip(options: CategoryZipOptions): Promise<Blob> {
    const { blobs, categoryIcons, category, appName, themeColor, bgColor } = options;
    const zip = new JSZip();

    for (const icon of categoryIcons) {
        const blob = blobs.get(icon.id);
        if (blob) {
            zip.file(icon.filename, blob);
        }
    }

    if (category === 'android') {
        zip.file('site.webmanifest', generateManifest(categoryIcons, appName, themeColor, bgColor));
    }

    if (category === 'microsoft') {
        zip.file('browserconfig.xml', generateBrowserConfig(categoryIcons, themeColor));
    }

    return zip.generateAsync({ type: 'blob' });
}

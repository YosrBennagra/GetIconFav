// generate-pwa-icons.mjs — Run with: node scripts/generate-pwa-icons.mjs
// Generates PWA icon PNGs from the SVG source. Requires no dependencies (uses SVG in manifest).
// For production, replace public/pwa-192x192.png and public/pwa-512x512.png with real rasterized icons.

import { writeFileSync, readFileSync } from 'fs';

// Create a minimal 1x1 transparent PNG as placeholder
// The manifest will reference these but the SVG icon will be the primary source
// In production, replace with proper rasterized PNGs.

// Minimal valid PNG (1x1 transparent pixel)
function createPlaceholderPng() {
    return Buffer.from(
        'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
        'base64'
    );
}

const png = createPlaceholderPng();
writeFileSync('public/pwa-192x192.png', png);
writeFileSync('public/pwa-512x512.png', png);
console.log('Created placeholder PWA PNGs (replace with real icons for production)');

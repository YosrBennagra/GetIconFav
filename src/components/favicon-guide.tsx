import { useState } from 'react';
import { FiCheck, FiChevronDown, FiCopy, FiInfo, FiImage, FiGrid, FiPackage, FiTool, FiHelpCircle } from 'react-icons/fi';
import { FaHtml5, FaReact, FaAngular, FaWordpress } from 'react-icons/fa';
import { SiNextdotjs } from 'react-icons/si';
import { FiServer } from 'react-icons/fi';
import type { IconType } from 'react-icons';

const INSTALL_METHODS: readonly {
  readonly id: string;
  readonly label: string;
  readonly Icon: IconType;
  readonly desc: string;
  readonly code: string;
}[] = [
  {
    id: 'html',
    label: 'HTML',
    Icon: FaHtml5,
    desc: 'Standard HTML link tag (works everywhere)',
    code: `<!-- Place favicon.ico in your root directory, then add: -->
<link rel="icon" type="image/x-icon" href="/favicon.ico">

<!-- For multiple sizes (recommended): -->
<link rel="icon" type="image/x-icon" sizes="16x16" href="/favicon-16x16.ico">
<link rel="icon" type="image/x-icon" sizes="32x32" href="/favicon-32x32.ico">
<link rel="icon" type="image/x-icon" sizes="48x48" href="/favicon-48x48.ico">`,
  },
  {
    id: 'react',
    label: 'React / Vite',
    Icon: FaReact,
    desc: 'Place in public/ folder and reference in index.html',
    code: `<!-- public/index.html or index.html (Vite) -->
<head>
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
</head>

<!-- Or dynamically in React: -->
<!-- Place favicon.ico in the public/ folder -->
<!-- It will be served from the root automatically -->`,
  },
  {
    id: 'nextjs',
    label: 'Next.js',
    Icon: SiNextdotjs,
    desc: 'App Router: place in app/ folder; Pages Router: place in public/',
    code: `// Next.js App Router (v13+):
// Simply place favicon.ico in the app/ directory
// app/favicon.ico → automatically served

// Next.js Pages Router:
// Place favicon.ico in the public/ directory
// public/favicon.ico → served at /favicon.ico

// Or use metadata API (App Router):
// app/layout.tsx
export const metadata = {
  icons: {
    icon: '/favicon.ico',
  },
}`,
  },
  {
    id: 'wordpress',
    label: 'WordPress',
    Icon: FaWordpress,
    desc: 'Use the built-in Site Icon feature in Customizer',
    code: `/* Method 1: WordPress Customizer (Recommended) */
/* Dashboard → Appearance → Customize → Site Identity → Site Icon */
/* Upload your icon image (WordPress handles the rest) */

/* Method 2: Manual (functions.php) */
function custom_favicon() {
  echo '<link rel="icon" type="image/x-icon"
    href="' . get_template_directory_uri() . '/favicon.ico">';
}
add_action('wp_head', 'custom_favicon');

/* Method 3: Simply upload favicon.ico to your root directory */`,
  },
  {
    id: 'angular',
    label: 'Angular',
    Icon: FaAngular,
    desc: 'Place in src/ folder and update angular.json assets',
    code: `<!-- src/index.html -->
<link rel="icon" type="image/x-icon" href="favicon.ico">

<!-- angular.json — ensure favicon.ico is in assets: -->
{
  "assets": [
    "src/favicon.ico",
    "src/assets"
  ]
}`,
  },
  {
    id: 'static',
    label: 'Static / CDN',
    Icon: FiServer,
    desc: 'Upload favicon.ico to your server root',
    code: `<!-- Option 1: Place favicon.ico in your website root -->
<!-- Browsers automatically look for /favicon.ico -->

<!-- Option 2: Explicit path (if not in root) -->
<link rel="icon" type="image/x-icon" href="/assets/favicon.ico">

<!-- Option 3: CDN-hosted -->
<link rel="icon" type="image/x-icon"
  href="https://cdn.example.com/favicon.ico">`,
  },
];

export function FaviconGuide() {
  const [activeTab, setActiveTab] = useState('html');
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const activeMethod = INSTALL_METHODS.find((m) => m.id === activeTab) ?? INSTALL_METHODS[0]!;

  const toggleFaq = (id: string) => {
    setExpandedFaq((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-10">
      {/* ── Section Divider ──────────────────────────────────── */}
      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-neon-purple/20 to-transparent" />
        <span className="text-[10px] font-mono font-semibold text-neon-purple/60 uppercase tracking-[0.2em]">Knowledge Base</span>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-neon-purple/20 to-transparent" />
      </div>

      {/* ── What is a Favicon? ────────────────────────────────── */}
      <section className="space-y-4">
        <h2 className="text-xl font-mono font-bold text-zinc-100 flex items-center gap-2">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-neon-cyan/10 border border-neon-cyan/20"><FiInfo className="w-4 h-4 text-neon-cyan" /></span>
          What is a Favicon?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-zinc-900/60 border border-neon-cyan/10 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-neon-cyan/10 border border-neon-cyan/20 flex items-center justify-center"><FiImage className="w-4 h-4 text-neon-cyan" /></div>
            <h3 className="text-sm font-mono font-semibold text-zinc-200">Small but Important</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-mono">
              A favicon (short for &quot;favorite icon&quot;) is a small icon associated with your website. It appears in browser tabs, bookmarks, history, and search results.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-zinc-900/60 border border-neon-purple/10 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-neon-purple/10 border border-neon-purple/20 flex items-center justify-center"><FiGrid className="w-4 h-4 text-neon-purple" /></div>
            <h3 className="text-sm font-mono font-semibold text-zinc-200">Multiple Sizes Needed</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-mono">
              Different contexts require different sizes. Browser tabs use 16&times;16, taskbars use 32&times;32, and desktop shortcuts use up to 256&times;256 pixels.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-zinc-900/60 border border-neon-green/10 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-neon-green/10 border border-neon-green/20 flex items-center justify-center"><FiPackage className="w-4 h-4 text-neon-green" /></div>
            <h3 className="text-sm font-mono font-semibold text-zinc-200">ICO Format</h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-mono">
              The <code className="text-neon-green bg-neon-green/10 px-1 rounded text-[11px] font-mono">.ico</code> format bundles multiple icon sizes into a single file. This ensures your icon looks sharp on every device and display.
            </p>
          </div>
        </div>
      </section>

      {/* ── How to Install ────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 className="text-xl font-mono font-bold text-zinc-100 flex items-center gap-2">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-neon-purple/10 border border-neon-purple/20"><FiTool className="w-4 h-4 text-neon-purple" /></span>
          How to Install Your Favicon
        </h2>

        {/* Platform tabs */}
        <div className="flex flex-wrap gap-1.5">
          {INSTALL_METHODS.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setActiveTab(m.id)}
              className={`px-3 py-1.5 rounded-md text-xs font-mono font-semibold transition-all ${
                activeTab === m.id
                  ? 'bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/25'
                  : 'bg-zinc-900 text-zinc-500 border border-zinc-800/50 hover:text-zinc-300 hover:border-zinc-700'
              }`}
            >
              <m.Icon className="w-3.5 h-3.5 mr-1 inline-block" /> {m.label}
            </button>
          ))}
        </div>

        {/* Code panel */}
        <div className="rounded-xl border border-zinc-800/40 bg-zinc-900/60 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-zinc-800/30 bg-zinc-950/50">
            <div>
              <span className="text-sm font-mono font-semibold text-zinc-200 flex items-center gap-1.5">
                <activeMethod.Icon className="w-4 h-4" />
                {activeMethod.label}
              </span>
              <p className="text-[11px] text-zinc-500 mt-0.5">{activeMethod.desc}</p>
            </div>
            <CopyButton text={activeMethod.code} />
          </div>
          <pre className="p-4 overflow-x-auto text-xs leading-relaxed">
            <code className="text-zinc-300 font-mono">{activeMethod.code}</code>
          </pre>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────── */}
      <section className="space-y-4">
        <h2 className="text-xl font-mono font-bold text-zinc-100 flex items-center gap-2">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-neon-yellow/10 border border-neon-yellow/20"><FiHelpCircle className="w-4 h-4 text-neon-yellow" /></span>
          FAQ
        </h2>
        <div className="space-y-2">
          {FAQ_ITEMS.map((faq) => (
            <div key={faq.id} className="rounded-xl border border-zinc-800/40 bg-zinc-900/40 overflow-hidden">
              <button
                type="button"
                onClick={() => toggleFaq(faq.id)}
                className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-zinc-800/20 transition-colors"
              >
                <span className="text-sm font-mono font-medium text-zinc-200">{faq.q}</span>
                <FiChevronDown
                  className={`w-4 h-4 text-zinc-500 shrink-0 ml-3 transition-transform duration-200 ${expandedFaq === faq.id ? 'rotate-180' : ''}`}
                />
              </button>
              {expandedFaq === faq.id && (
                <div className="px-4 pb-3 text-xs text-zinc-400 leading-relaxed font-mono border-t border-zinc-800/20 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ── Copy Button ────────────────────────────────────────────────

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-mono font-semibold
        bg-zinc-900 text-zinc-500 hover:text-neon-cyan hover:border-neon-cyan/30
        border border-zinc-700/50 transition-all"
    >
      {copied ? (
        <>
          <FiCheck className="w-3 h-3 text-neon-green" />
          Copied!
        </>
      ) : (
        <>
          <FiCopy className="w-3 h-3" />
          Copy
        </>
      )}
    </button>
  );
}

// ── FAQ Data ──────────────────────────────────────────────────

const FAQ_ITEMS = [
  {
    id: 'what-sizes',
    q: 'What sizes should my favicon be?',
    a: 'The most important sizes are 16×16 (browser tabs), 32×32 (taskbar/standard), 48×48 (desktop shortcuts), and 256×256 (high-DPI / Windows thumbnails). For maximum compatibility, include all of these in your .ico file. This tool generates all standard sizes automatically.',
  },
  {
    id: 'svg-vs-png',
    q: 'Should I use SVG or PNG as my source?',
    a: 'SVG is ideal because it\'s vector-based and scales perfectly to any size without quality loss. If you use PNG, start with at least 512×512 pixels to ensure the downscaled versions look crisp. Avoid using JPG as source since it doesn\'t support transparency.',
  },
  {
    id: 'ico-vs-png',
    q: 'Can I use PNG instead of ICO?',
    a: 'Modern browsers support PNG favicons via <link rel="icon" type="image/png" href="...">, but .ico has the widest compatibility. ICO also bundles multiple sizes in one file, so the browser picks the best resolution. For maximum compatibility, use .ico alongside PNG fallbacks.',
  },
  {
    id: 'transparency',
    q: 'Does the ICO format support transparency?',
    a: 'Yes! ICO files support full alpha transparency when using 32-bit color depth (which is the default in this tool). Use PNG or SVG source images with transparent backgrounds to preserve transparency in your favicon.',
  },
  {
    id: 'cache',
    q: 'My favicon isn\'t updating — what should I do?',
    a: 'Browsers aggressively cache favicons. Try: (1) Hard refresh with Ctrl+Shift+R, (2) Clear your browser cache, (3) Add a version query string like favicon.ico?v=2, (4) Open in an incognito/private window, (5) Wait — some browsers cache favicons for days.',
  },
  {
    id: 'apple-touch',
    q: 'What about Apple Touch Icon?',
    a: 'Apple devices use a separate "apple-touch-icon" for home screen bookmarks. It\'s typically 180×180 PNG. While this tool generates .ico files, you can use the 256×256 or 128×128 generated preview as a base for your apple-touch-icon. Add it with: <link rel="apple-touch-icon" href="/apple-touch-icon.png">',
  },
  {
    id: 'where',
    q: 'Where do I put the favicon.ico file?',
    a: 'Place favicon.ico in the root directory of your website (same level as index.html). Browsers automatically look for /favicon.ico even without an explicit <link> tag. For non-root placement, you must add a <link rel="icon"> tag pointing to the correct path.',
  },
  {
    id: 'privacy',
    q: 'Is my image uploaded anywhere?',
    a: 'No. GetIconFav runs 100% in your browser. Your images are processed locally using the Canvas API and never sent to any server. You can verify this by using the tool offline after the page loads.',
  },
] as const;

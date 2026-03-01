import { useState } from 'react';
import { FiCheck, FiChevronDown, FiCopy, FiTool } from 'react-icons/fi';
import { FaHtml5, FaReact, FaAngular, FaWordpress } from 'react-icons/fa';
import { SiNextdotjs } from 'react-icons/si';
import { FiServer } from 'react-icons/fi';
import type { IconType } from 'react-icons';

// ── Install Methods ─────────────────────────────────────────────

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
      desc: 'Standard HTML link tag',
      code: `<!-- Place favicon.ico in your root directory -->
<link rel="icon" type="image/x-icon" href="/favicon.ico">

<!-- Multiple sizes (recommended): -->
<link rel="icon" sizes="16x16" href="/favicon-16.ico">
<link rel="icon" sizes="32x32" href="/favicon-32.ico">
<link rel="icon" sizes="48x48" href="/favicon-48.ico">`,
    },
    {
      id: 'react',
      label: 'React / Vite',
      Icon: FaReact,
      desc: 'Place in public/ and reference in index.html',
      code: `<!-- public/index.html or index.html (Vite) -->
<head>
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
</head>

<!-- Place favicon.ico in the public/ folder -->
<!-- It will be served from the root automatically -->`,
    },
    {
      id: 'nextjs',
      label: 'Next.js',
      Icon: SiNextdotjs,
      desc: 'App Router: app/ · Pages Router: public/',
      code: `// App Router (v13+): place favicon.ico in app/
// app/favicon.ico → automatically served

// Pages Router: place in public/
// public/favicon.ico → served at /favicon.ico

// Or use metadata API:
export const metadata = {
  icons: { icon: '/favicon.ico' },
}`,
    },
    {
      id: 'wordpress',
      label: 'WordPress',
      Icon: FaWordpress,
      desc: 'Customizer or functions.php',
      code: `/* Method 1: WordPress Customizer (Recommended) */
/* Dashboard → Appearance → Customize →
   Site Identity → Site Icon */

/* Method 2: functions.php */
function custom_favicon() {
  echo '<link rel="icon" type="image/x-icon"
    href="' . get_template_directory_uri()
    . '/favicon.ico">';
}
add_action('wp_head', 'custom_favicon');`,
    },
    {
      id: 'angular',
      label: 'Angular',
      Icon: FaAngular,
      desc: 'Place in src/ and update angular.json',
      code: `<!-- src/index.html -->
<link rel="icon" type="image/x-icon"
  href="favicon.ico">

<!-- angular.json — ensure in assets: -->
{ "assets": ["src/favicon.ico", "src/assets"] }`,
    },
    {
      id: 'static',
      label: 'Static / CDN',
      Icon: FiServer,
      desc: 'Upload to server root or use explicit path',
      code: `<!-- Browsers auto-check /favicon.ico -->

<!-- Explicit path: -->
<link rel="icon" type="image/x-icon"
  href="/assets/favicon.ico">

<!-- CDN-hosted: -->
<link rel="icon" type="image/x-icon"
  href="https://cdn.example.com/favicon.ico">`,
    },
  ];

// ── FAQ ─────────────────────────────────────────────────────────

const FAQ_ITEMS = [
  {
    id: 'what-sizes',
    q: 'What sizes should my favicon be?',
    a: 'Essential sizes: 16×16 (tabs), 32×32 (taskbar), 48×48 (shortcuts), 256×256 (high-DPI). This tool generates all standard sizes automatically.',
  },
  {
    id: 'svg-vs-png',
    q: 'SVG or PNG as source?',
    a: "SVG is ideal — it's vector and scales perfectly. If using PNG, start with 512×512+ for crisp results. Avoid JPG (no transparency).",
  },
  {
    id: 'ico-vs-png',
    q: 'Can I use PNG instead of ICO?',
    a: 'Modern browsers support PNG favicons, but .ico has the widest compatibility and bundles multiple sizes in one file.',
  },
  {
    id: 'transparency',
    q: 'Does ICO support transparency?',
    a: 'Yes! ICO supports full alpha transparency at 32-bit color depth (default in this tool). Use PNG/SVG source with transparent backgrounds.',
  },
  {
    id: 'cache',
    q: "Favicon isn't updating?",
    a: 'Browsers cache favicons aggressively. Try: Ctrl+Shift+R, clear cache, add ?v=2 query string, or test in incognito.',
  },
  {
    id: 'privacy',
    q: 'Is my image uploaded anywhere?',
    a: 'No. GetIconFav runs 100% in your browser using Canvas API. Your images never leave your device.',
  },
] as const;

// ── FaviconGuide (inline) ───────────────────────────────────────

export function FaviconGuide() {
  const [activeTab, setActiveTab] = useState('html');
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const activeMethod = INSTALL_METHODS.find((m) => m.id === activeTab) ?? INSTALL_METHODS[0]!;

  return (
    <div className="flex flex-col gap-5 h-full">
      {/* ── Install Section ───────────────────────────────── */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-zinc-200 flex items-center gap-2">
          <FiTool className="w-4 h-4 text-neon-purple" />
          How to Install Your Favicon
        </h2>

        {/* Platform tabs */}
        <div className="flex flex-wrap gap-1">
          {INSTALL_METHODS.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setActiveTab(m.id)}
              className={`flex items-center gap-1 px-2 py-1 rounded text-[11px] font-mono font-medium transition-all ${activeTab === m.id
                  ? 'bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20'
                  : 'text-zinc-600 border border-zinc-800/50 hover:text-zinc-400 hover:border-zinc-700'
                }`}
            >
              <m.Icon className="w-3 h-3" />
              {m.label}
            </button>
          ))}
        </div>

        {/* Code panel */}
        <div className="rounded-lg border border-zinc-800/50 bg-zinc-900/40 overflow-hidden">
          <div className="flex items-center justify-between px-3 py-2 border-b border-zinc-800/30">
            <div>
              <span className="text-xs font-mono font-semibold text-zinc-300 flex items-center gap-1.5">
                <activeMethod.Icon className="w-3.5 h-3.5" />
                {activeMethod.label}
              </span>
              <p className="text-[10px] text-zinc-600 mt-0.5">{activeMethod.desc}</p>
            </div>
            <CopyButton text={activeMethod.code} />
          </div>
          <pre className="px-3 py-3 overflow-x-auto text-[11px] leading-relaxed max-h-[200px] overflow-y-auto">
            <code className="text-zinc-400 font-mono">{activeMethod.code}</code>
          </pre>
        </div>
      </div>

      {/* ── FAQ Section ───────────────────────────────────── */}
      <div className="space-y-2 flex-1 min-h-0 overflow-y-auto">
        <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">FAQ</h3>
        <div className="space-y-1">
          {FAQ_ITEMS.map((faq) => (
            <div
              key={faq.id}
              className="rounded-lg border border-zinc-800/30 bg-zinc-900/30 overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setExpandedFaq((prev) => (prev === faq.id ? null : faq.id))}
                className="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-zinc-800/20"
              >
                <span className="text-xs font-medium text-zinc-300">{faq.q}</span>
                <FiChevronDown
                  className={`w-3.5 h-3.5 text-zinc-600 shrink-0 ml-2 transition-transform duration-200 ${expandedFaq === faq.id ? 'rotate-180' : ''
                    }`}
                />
              </button>
              {expandedFaq === faq.id && (
                <div className="px-3 pb-2 text-[11px] text-zinc-500 leading-relaxed border-t border-zinc-800/20 pt-2">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Copy Button ─────────────────────────────────────────────────

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
      className="flex items-center gap-1 px-2 py-1 rounded text-[10px] font-mono font-semibold
        text-zinc-600 hover:text-neon-cyan border border-zinc-800/50 hover:border-neon-cyan/20 transition-all"
    >
      {copied ? (
        <>
          <FiCheck className="w-3 h-3 text-neon-green" />
          Copied
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

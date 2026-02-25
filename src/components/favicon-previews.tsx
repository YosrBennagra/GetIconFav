import { FiLock, FiGlobe, FiSearch } from 'react-icons/fi';

interface FaviconPreviewsProps {
  readonly previews: ReadonlyMap<number, string>;
  readonly title: string;
}

export function FaviconPreviews({ previews, title }: FaviconPreviewsProps) {
  const fav16 = previews.get(16);
  const fav32 = previews.get(32);
  const fav48 = previews.get(48);
  const fav64 = previews.get(64);
  const fav128 = previews.get(128);
  const fav256 = previews.get(256);
  const bestSmall = fav32 ?? fav16;
  const bestLarge = fav256 ?? fav128 ?? fav64 ?? fav48;

  if (!bestSmall) return null;

  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-base font-semibold text-zinc-200">Live Previews</h3>
        <p className="text-xs text-zinc-500 mt-0.5">See how your favicon looks across different contexts</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* ── Browser Tab (Chrome-style) ──────────────────────── */}
        <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 overflow-hidden">
          <div className="px-3 py-2 border-b border-zinc-800/40">
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Browser Tab</span>
          </div>
          <div className="p-4">
            <div className="bg-zinc-800/50 rounded-lg border border-zinc-700/40 overflow-hidden">
              {/* Window chrome */}
              <div className="flex items-center gap-1.5 px-3 pt-2.5 pb-0">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
              </div>
              {/* Tab row */}
              <div className="flex items-end px-2 pt-2">
                <div className="flex items-center gap-2 bg-zinc-900/80 rounded-t-lg px-3 py-1.5 max-w-[180px] border-t border-x border-zinc-700/40">
                  {fav16 && (
                    <img src={fav16} alt="" width={16} height={16} className="shrink-0" style={{ imageRendering: 'pixelated' }} />
                  )}
                  <span className="text-[10px] text-zinc-300 truncate">{title}</span>
                  <svg className="w-2.5 h-2.5 text-zinc-600 shrink-0 ml-auto" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </div>
              </div>
              {/* URL bar */}
              <div className="bg-zinc-900/60 px-3 py-1.5 border-t border-zinc-700/30">
                <div className="flex items-center gap-1.5 bg-zinc-800/50 rounded px-2 py-1">
                  <FiLock className="w-2.5 h-2.5 text-emerald-500/50 shrink-0" />
                  <span className="text-[10px] text-zinc-500">yourwebsite.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bookmark Bar ────────────────────────────────────── */}
        <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 overflow-hidden">
          <div className="px-3 py-2 border-b border-zinc-800/40">
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Bookmarks Bar</span>
          </div>
          <div className="p-4">
            <div className="bg-zinc-800/50 rounded-lg border border-zinc-700/40 px-3 py-2">
              <div className="flex items-center gap-4">
                {/* Other bookmarks */}
                <div className="flex items-center gap-1.5 text-zinc-500">
                  <div className="w-4 h-4 rounded bg-zinc-700/60 flex items-center justify-center">
                    <FiGlobe className="w-2.5 h-2.5" />
                  </div>
                  <span className="text-[10px]">Google</span>
                </div>
                {/* User's favicon bookmark */}
                <div className="flex items-center gap-1.5 bg-blue-500/5 border border-blue-500/20 rounded px-2 py-1">
                  {fav16 && (
                    <img src={fav16} alt="" width={16} height={16} className="shrink-0" style={{ imageRendering: 'pixelated' }} />
                  )}
                  <span className="text-[10px] text-blue-300 font-medium">{title}</span>
                </div>
                <div className="flex items-center gap-1.5 text-zinc-500">
                  <div className="w-4 h-4 rounded bg-zinc-700/60 flex items-center justify-center">
                    <FiSearch className="w-2.5 h-2.5" />
                  </div>
                  <span className="text-[10px]">GitHub</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Google Search Result ─────────────────────────────── */}
        <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 overflow-hidden">
          <div className="px-3 py-2 border-b border-zinc-800/40">
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Google Search Result</span>
          </div>
          <div className="p-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                {fav16 && (
                  <img src={fav16} alt="" width={16} height={16} className="shrink-0 rounded-sm" style={{ imageRendering: 'pixelated' }} />
                )}
                <span className="text-[11px] text-zinc-400">yourwebsite.com</span>
              </div>
              <p className="text-sm text-blue-400 font-medium hover:underline cursor-default">{title} - Your Website</p>
              <p className="text-xs text-zinc-500 leading-relaxed">This is how your website appears in Google search results with your custom favicon displayed next to the URL.</p>
            </div>
          </div>
        </div>

        {/* ── Windows Taskbar ──────────────────────────────────── */}
        <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 overflow-hidden">
          <div className="px-3 py-2 border-b border-zinc-800/40">
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Windows Taskbar / Desktop</span>
          </div>
          <div className="p-4">
            <div className="bg-zinc-800/70 rounded-lg border border-zinc-700/40 px-4 py-3">
              <div className="flex items-center gap-5">
                {/* Taskbar icons */}
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded bg-zinc-700/60" />
                  <div className="w-6 h-6 rounded bg-zinc-700/60" />
                  {fav32 && (
                    <div className="relative">
                      <img src={fav32} alt="" width={28} height={28} className="rounded" />
                      <div className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-blue-400 rounded-full" />
                    </div>
                  )}
                  <div className="w-6 h-6 rounded bg-zinc-700/60" />
                </div>
                {/* Desktop icon side */}
                <div className="border-l border-zinc-700/40 pl-5">
                  <div className="flex flex-col items-center gap-1">
                    {bestLarge && (
                      <div className="checkerboard rounded-md overflow-hidden" style={{ width: 40, height: 40 }}>
                        <img src={bestLarge} alt="" width={40} height={40} />
                      </div>
                    )}
                    <span className="text-[9px] text-zinc-400 font-medium">{title}.exe</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Mobile Home Screen (PWA) ────────────────────────── */}
        <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 overflow-hidden">
          <div className="px-3 py-2 border-b border-zinc-800/40">
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Mobile Home Screen (PWA)</span>
          </div>
          <div className="p-4 flex justify-center">
            <div className="bg-gradient-to-b from-zinc-800/60 to-zinc-800/30 rounded-2xl border border-zinc-700/30 px-6 py-5 w-44">
              <div className="grid grid-cols-3 gap-3 justify-items-center">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-11 h-11 rounded-xl bg-zinc-700/50" />
                  <span className="text-[8px] text-zinc-600">Phone</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  {bestLarge ? (
                    <div className="w-11 h-11 rounded-xl overflow-hidden shadow-md ring-1 ring-white/10">
                      <img src={bestLarge} alt="" width={44} height={44} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-11 h-11 rounded-xl bg-zinc-700/50" />
                  )}
                  <span className="text-[8px] text-zinc-300 font-medium truncate w-11 text-center">{title}</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-11 h-11 rounded-xl bg-zinc-700/50" />
                  <span className="text-[8px] text-zinc-600">Camera</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── macOS Dock ──────────────────────────────────────── */}
        <div className="rounded-xl border border-zinc-800/60 bg-zinc-900/40 overflow-hidden">
          <div className="px-3 py-2 border-b border-zinc-800/40">
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">macOS Dock</span>
          </div>
          <div className="p-4 flex justify-center">
            <div className="flex items-end gap-2 bg-zinc-800/40 backdrop-blur rounded-2xl border border-zinc-700/30 px-4 py-2">
              <div className="w-10 h-10 rounded-xl bg-zinc-700/40" />
              <div className="w-10 h-10 rounded-xl bg-zinc-700/40" />
              {bestLarge ? (
                <div className="w-12 h-12 rounded-xl overflow-hidden shadow-lg ring-1 ring-white/10 -translate-y-1">
                  <img src={bestLarge} alt="" width={48} height={48} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-xl bg-zinc-700/40" />
              )}
              <div className="w-10 h-10 rounded-xl bg-zinc-700/40" />
              <div className="w-10 h-10 rounded-xl bg-zinc-700/40" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

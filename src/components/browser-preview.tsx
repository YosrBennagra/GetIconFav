interface BrowserPreviewProps {
  readonly faviconUrl: string;
  readonly title: string;
}

export function BrowserPreview({ faviconUrl, title }: BrowserPreviewProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">
        Browser Tab Preview
      </h3>
      <div className="bg-zinc-800/40 rounded-xl border border-zinc-700/40 overflow-hidden max-w-md">
        {/* Window controls */}
        <div className="flex items-center gap-2 px-3 pt-3 pb-0">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/60" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
            <div className="w-3 h-3 rounded-full bg-green-500/60" />
          </div>
        </div>

        {/* Tab bar */}
        <div className="flex items-end px-2 pt-2">
          <div className="flex items-center gap-2 bg-zinc-900/80 rounded-t-lg px-3 py-2 max-w-[220px] border-t border-x border-zinc-700/40">
            <img
              src={faviconUrl}
              alt="Favicon"
              width={16}
              height={16}
              className="shrink-0"
              style={{ imageRendering: 'pixelated' }}
            />
            <span className="text-[11px] text-zinc-300 truncate">{title}</span>
            <svg className="w-3 h-3 text-zinc-600 shrink-0 ml-auto" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </div>
          <div className="flex items-center px-2 pb-2 text-zinc-700">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </div>
        </div>

        {/* Address bar */}
        <div className="bg-zinc-900/60 px-3 py-2 border-t border-zinc-700/30">
          <div className="flex items-center gap-2 bg-zinc-800/60 rounded-lg px-3 py-1.5">
            <svg className="w-3 h-3 text-emerald-500/60 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
            <span className="text-[11px] text-zinc-500">yourwebsite.com</span>
          </div>
        </div>

        {/* Page content skeleton */}
        <div className="bg-zinc-900/40 px-4 py-4 space-y-2 border-t border-zinc-800/30">
          <div className="h-2.5 bg-zinc-800/60 rounded w-3/4" />
          <div className="h-2 bg-zinc-800/40 rounded w-full" />
          <div className="h-2 bg-zinc-800/40 rounded w-5/6" />
        </div>
      </div>
    </div>
  );
}

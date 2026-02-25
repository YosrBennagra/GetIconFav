import { FiX, FiPlus, FiLock } from 'react-icons/fi';

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
            <FiX className="w-3 h-3 text-zinc-600 shrink-0 ml-auto" />
          </div>
          <div className="flex items-center px-2 pb-2 text-zinc-700">
            <FiPlus className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Address bar */}
        <div className="bg-zinc-900/60 px-3 py-2 border-t border-zinc-700/30">
          <div className="flex items-center gap-2 bg-zinc-800/60 rounded-lg px-3 py-1.5">
            <FiLock className="w-3 h-3 text-emerald-500/60 shrink-0" />
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

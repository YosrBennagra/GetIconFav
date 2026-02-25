import { FaGithub, FaHeart } from 'react-icons/fa';
import { SiBuymeacoffee } from 'react-icons/si';

export function SupportLinks() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-zinc-800/60 bg-zinc-950/95 backdrop-blur-xl">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-xs text-zinc-500 hidden sm:block">
          Free &amp; open source — consider supporting!
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {/* GitHub */}
          <a
            href="https://github.com/YosrBennagra"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-3.5 py-2 rounded-xl border transition-all
              bg-zinc-900/60 border-zinc-800/60 text-zinc-300
              hover:bg-zinc-800/80 hover:border-zinc-700 hover:text-zinc-100"
          >
            <FaGithub className="w-4 h-4" />
            <span className="text-xs font-semibold">GitHub</span>
          </a>

          {/* Sponsor */}
          <a
            href="https://github.com/sponsors/YosrBennagra"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-3.5 py-2 rounded-xl border transition-all
              bg-pink-500/5 border-pink-500/20 text-pink-400
              hover:bg-pink-500/15 hover:border-pink-500/40 hover:text-pink-300"
          >
            <FaHeart className="w-4 h-4" />
            <span className="text-xs font-semibold">Sponsor</span>
          </a>

          {/* Buy Me a Coffee */}
          <a
            href="https://buymeacoffee.com/veinpal"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 px-3.5 py-2 rounded-xl border transition-all
              bg-amber-500/5 border-amber-500/20 text-amber-400
              hover:bg-amber-500/15 hover:border-amber-500/40 hover:text-amber-300"
          >
            <SiBuymeacoffee className="w-4 h-4" />
            <span className="text-xs font-semibold">Buy Me a Coffee</span>
          </a>
        </div>
      </div>
    </div>
  );
}

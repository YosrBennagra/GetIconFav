import { FaGithub, FaHeart } from 'react-icons/fa';
import { SiBuymeacoffee } from 'react-icons/si';
import { FiShield } from 'react-icons/fi';

export function SupportLinks() {
  return (
    <div className="flex items-center justify-between px-5 h-full">
      <div className="flex items-center gap-1.5 text-[10px] text-zinc-500">
        <FiShield className="w-3 h-3 text-emerald-400/50" />
        <span>100% client-side processing</span>
      </div>

      <div className="flex items-center gap-0.5">
        <a
          href="https://github.com/YosrBennagra"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] text-zinc-500 hover:text-zinc-300 hover:bg-white/5 transition-colors"
          title="GitHub"
        >
          <FaGithub className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">GitHub</span>
        </a>
        <a
          href="https://github.com/sponsors/YosrBennagra"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] text-rose-400/60 hover:text-rose-400 hover:bg-rose-400/5 transition-colors"
          title="Sponsor"
        >
          <FaHeart className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Sponsor</span>
        </a>
        <a
          href="https://buymeacoffee.com/veinpal"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] text-amber-400/60 hover:text-amber-400 hover:bg-amber-400/5 transition-colors"
          title="Buy me a coffee"
        >
          <SiBuymeacoffee className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Coffee</span>
        </a>
      </div>
    </div>
  );
}

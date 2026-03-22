import { FaGithub, FaHeart } from 'react-icons/fa';
import { SiBuymeacoffee } from 'react-icons/si';
import { FiShield, FiGlobe, FiLock } from 'react-icons/fi';

export function SupportLinks() {
  return (
    <>
      {/* Sticky floating support buttons */}
      <div className="fixed bottom-4 right-4 z-30 flex flex-col items-center gap-1.5">
        <a
          href="https://github.com/YosrBennagra"
          target="_blank"
          rel="noopener noreferrer"
          title="GitHub"
          className="w-8 h-8 flex items-center justify-center rounded-xl bg-white/5 border border-white/10
            text-zinc-500 hover:text-zinc-200 hover:bg-white/10 hover:border-white/20
            backdrop-blur-xl transition-all shadow-lg"
        >
          <FaGithub className="w-3.5 h-3.5" />
        </a>
        <a
          href="https://github.com/sponsors/YosrBennagra"
          target="_blank"
          rel="noopener noreferrer"
          title="Sponsor"
          className="w-8 h-8 flex items-center justify-center rounded-xl bg-white/5 border border-white/10
            text-zinc-500 hover:text-rose-400 hover:bg-rose-400/5 hover:border-rose-400/20
            backdrop-blur-xl transition-all shadow-lg"
        >
          <FaHeart className="w-3.5 h-3.5" />
        </a>
        <a
          href="https://buymeacoffee.com/yosrbennagra"
          target="_blank"
          rel="noopener noreferrer"
          title="Buy me a coffee"
          className="w-8 h-8 flex items-center justify-center rounded-xl bg-white/5 border border-white/10
            text-zinc-500 hover:text-amber-400 hover:bg-amber-400/5 hover:border-amber-400/20
            backdrop-blur-xl transition-all shadow-lg"
        >
          <SiBuymeacoffee className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Footer */}
      <div className="bg-white/[0.02] backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Brand column */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <img src="/favicon.ico" alt="GetIconFav" className="w-6 h-6" />
                <span className="text-sm font-bold tracking-tight">
                  <span className="text-violet-400">Get</span>
                  <span className="text-cyan-400">Icon</span>
                  <span className="text-zinc-400">Fav</span>
                </span>
              </div>
              <p className="text-[11px] text-zinc-600 leading-relaxed max-w-xs">
                Free, open-source favicon generator. Drag an image, preview in every context,
                and download a complete icon package — all in your browser.
              </p>
            </div>

            {/* Trust & Privacy column */}
            <div className="space-y-3">
              <h3 className="text-[9px] font-semibold uppercase tracking-widest text-zinc-500">Privacy & Security</h3>
              <ul className="space-y-2 text-[11px] text-zinc-600">
                <li className="flex items-start gap-2">
                  <FiLock className="w-3 h-3 text-emerald-400/60 mt-0.5 shrink-0" />
                  <span>Images never leave your browser — zero server uploads</span>
                </li>
                <li className="flex items-start gap-2">
                  <FiShield className="w-3 h-3 text-violet-400/60 mt-0.5 shrink-0" />
                  <span>No cookies, no tracking, no analytics on your files</span>
                </li>
                <li className="flex items-start gap-2">
                  <FiGlobe className="w-3 h-3 text-cyan-400/60 mt-0.5 shrink-0" />
                  <span>Works offline as a PWA once installed</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[10px] text-zinc-700">
            <span>© {new Date().getFullYear()} GetIconFav · MIT License</span>
            <span>Made with <FaHeart className="w-2.5 h-2.5 text-rose-500/40 inline" /> by Yosr Bennagra</span>
          </div>
        </div>
      </div>
    </>
  );
}


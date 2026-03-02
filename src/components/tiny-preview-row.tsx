import { FiAlertTriangle, FiInfo } from 'react-icons/fi';

interface TinyPreviewRowProps {
    readonly previews: ReadonlyMap<number, string>;
    readonly sourceWidth: number;
    readonly sourceHeight: number;
}

export function TinyPreviewRow({ previews, sourceWidth, sourceHeight }: TinyPreviewRowProps) {
    const fav16 = previews.get(16);
    const fav32 = previews.get(32);
    const fav48 = previews.get(48);

    if (!fav16 && !fav32 && !fav48) return null;

    const sourceSmallest = Math.min(sourceWidth, sourceHeight);
    const isLowRes = sourceSmallest < 512;
    const isVeryLowRes = sourceSmallest < 128;

    return (
        <div className="rounded-lg border border-zinc-800/40 bg-zinc-900/40 overflow-hidden">
            <div className="px-3 py-1.5 border-b border-zinc-800/30">
                <span className="text-[9px] font-mono font-bold uppercase tracking-wide text-zinc-600">
                    Tiny Preview
                </span>
            </div>

            <div className="p-3 space-y-3">
                {/* Preview sizes inline */}
                <div className="flex items-end gap-4">
                    {fav16 && (
                        <div className="flex flex-col items-center gap-1.5">
                            <div className="checkerboard rounded overflow-hidden" style={{ width: 16, height: 16 }}>
                                <img
                                    src={fav16}
                                    alt="16px"
                                    width={16}
                                    height={16}
                                    style={{ imageRendering: 'pixelated' }}
                                />
                            </div>
                            <span className="text-[8px] font-mono text-zinc-600">16px</span>
                        </div>
                    )}
                    {fav32 && (
                        <div className="flex flex-col items-center gap-1.5">
                            <div className="checkerboard rounded overflow-hidden" style={{ width: 32, height: 32 }}>
                                <img
                                    src={fav32}
                                    alt="32px"
                                    width={32}
                                    height={32}
                                    style={{ imageRendering: 'auto' }}
                                />
                            </div>
                            <span className="text-[8px] font-mono text-zinc-600">32px</span>
                        </div>
                    )}
                    {fav48 && (
                        <div className="flex flex-col items-center gap-1.5">
                            <div className="checkerboard rounded overflow-hidden" style={{ width: 48, height: 48 }}>
                                <img
                                    src={fav48}
                                    alt="48px"
                                    width={48}
                                    height={48}
                                    style={{ imageRendering: 'auto' }}
                                />
                            </div>
                            <span className="text-[8px] font-mono text-zinc-600">48px</span>
                        </div>
                    )}

                    {/* Upscaled view (2x the 16px) */}
                    {fav16 && (
                        <div className="flex flex-col items-center gap-1.5 ml-auto">
                            <div className="checkerboard rounded overflow-hidden border border-zinc-700/30" style={{ width: 48, height: 48 }}>
                                <img
                                    src={fav16}
                                    alt="16px at 3x"
                                    width={48}
                                    height={48}
                                    style={{ imageRendering: 'pixelated' }}
                                />
                            </div>
                            <span className="text-[8px] font-mono text-zinc-600">16px @3×</span>
                        </div>
                    )}
                </div>

                {/* Warnings */}
                <div className="space-y-1.5">
                    {isVeryLowRes && (
                        <div className="flex items-start gap-1.5 px-2 py-1.5 rounded-md bg-red-500/5 border border-red-500/20">
                            <FiAlertTriangle className="w-3 h-3 text-red-400 shrink-0 mt-0.5" />
                            <span className="text-[9px] font-mono text-red-400 leading-relaxed">
                                Source image is very small ({sourceSmallest}px). Icons will appear blurry at larger sizes.
                            </span>
                        </div>
                    )}

                    {isLowRes && !isVeryLowRes && (
                        <div className="flex items-start gap-1.5 px-2 py-1.5 rounded-md bg-yellow-500/5 border border-yellow-500/20">
                            <FiAlertTriangle className="w-3 h-3 text-yellow-400 shrink-0 mt-0.5" />
                            <span className="text-[9px] font-mono text-yellow-400 leading-relaxed">
                                Low resolution source ({sourceSmallest}px). Recommend 512×512 or larger for best results.
                            </span>
                        </div>
                    )}

                    <div className="flex items-start gap-1.5 px-2 py-1.5 rounded-md bg-zinc-800/30">
                        <FiInfo className="w-3 h-3 text-zinc-600 shrink-0 mt-0.5" />
                        <span className="text-[9px] font-mono text-zinc-600 leading-relaxed">
                            Text and fine details may not be readable at 16×16. Use a simple, bold mark for best results.
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

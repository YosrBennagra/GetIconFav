import { useCallback, useState, type DragEvent } from 'react';
import { ICON_SIZES, SIZE_META, ACCEPTED_TYPES, type IconSize } from '../lib/constants';

interface SizeSlotGridProps {
  readonly previews: ReadonlyMap<number, string>;
  readonly customSizes: ReadonlySet<number>;
  readonly selectedSizes: ReadonlySet<number>;
  readonly processingSlots: ReadonlySet<number>;
  readonly sourceDimensions: { readonly width: number; readonly height: number } | null;
  readonly onToggleSize: (size: IconSize) => void;
  readonly onDropOnSize: (size: number, file: File) => void;
  readonly onClearCustom: (size: number) => void;
}

function getSlotClass(isDragOver: boolean, isSelected: boolean): string {
  if (isDragOver) return 'border-blue-500 bg-blue-500/5 scale-[1.02] shadow-lg shadow-blue-500/10 ring-2 ring-blue-500/20';
  if (isSelected) return 'border-zinc-700/80 bg-zinc-900/50 hover:border-zinc-600 hover:bg-zinc-900/70';
  return 'border-zinc-800/40 bg-zinc-900/20 opacity-50 hover:opacity-70';
}

function getCategoryColor(category: string): string {
  if (category === 'essential') return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
  if (category === 'hd') return 'text-violet-400 bg-violet-400/10 border-violet-400/20';
  return 'text-zinc-400 bg-zinc-400/10 border-zinc-400/20';
}

export function SizeSlotGrid({
  previews,
  customSizes,
  selectedSizes,
  processingSlots,
  sourceDimensions,
  onToggleSize,
  onDropOnSize,
  onClearCustom,
}: SizeSlotGridProps) {
  const [dragOverSize, setDragOverSize] = useState<number | null>(null);

  const isValidFile = useCallback(
    (file: File) => (ACCEPTED_TYPES as readonly string[]).includes(file.type),
    []
  );

  const handleDragOver = useCallback((e: DragEvent, size: number) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverSize(size);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverSize(null);
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent, size: number) => {
      e.preventDefault();
      e.stopPropagation();
      setDragOverSize(null);
      const file = e.dataTransfer.files[0];
      if (file && isValidFile(file)) {
        onDropOnSize(size, file);
      }
    },
    [isValidFile, onDropOnSize]
  );

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h2 className="text-base font-semibold text-zinc-200">Icon Sizes</h2>
          <p className="text-xs text-zinc-500 mt-0.5">
            Auto-generated from master, or drop individual images to customize
          </p>
        </div>
        <span className="text-xs tabular-nums text-zinc-400 bg-zinc-800/60 px-2.5 py-1 rounded-full border border-zinc-700/50">
          {selectedSizes.size} / {ICON_SIZES.length} selected
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {ICON_SIZES.map((size) => {
          const dataUrl = previews.get(size);
          const isSelected = selectedSizes.has(size);
          const isCustom = customSizes.has(size);
          const isSlotProcessing = processingSlots.has(size);
          const isDragOver = dragOverSize === size;
          const isUpscaled =
            sourceDimensions !== null &&
            size > Math.min(sourceDimensions.width, sourceDimensions.height) &&
            !isCustom;
          const meta = SIZE_META[size];
          const slotClass = getSlotClass(isDragOver, isSelected);
          const categoryColor = getCategoryColor(meta.category);

          return (
            <div
              key={size}
              role="button"
              tabIndex={0}
              onDragOver={(e) => handleDragOver(e, size)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, size)}
              className={`size-slot group relative flex flex-col rounded-xl border overflow-hidden transition-all duration-200 ${slotClass}`}
            >
              {/* Top bar */}
              <div className="flex items-center justify-between px-3 pt-3 pb-1">
                <button
                  type="button"
                  onClick={() => onToggleSize(size)}
                  className="flex items-center gap-2 group/check"
                >
                  <div
                    className={`w-[18px] h-[18px] rounded-[5px] border-2 flex items-center justify-center shrink-0 transition-all duration-150 ${isSelected ? 'border-blue-500 bg-blue-500' : 'border-zinc-600 bg-transparent group-hover/check:border-zinc-500'}`}
                  >
                    {isSelected && (
                      <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm font-mono font-semibold text-zinc-300">{size}&times;{size}</span>
                </button>

                <div className="flex items-center gap-1.5">
                  {isUpscaled && (
                    <span className="text-amber-400 text-xs" title="Source is smaller than this size — may appear blurry">&#9888;</span>
                  )}
                  {isCustom && (
                    <button
                      type="button"
                      onClick={() => onClearCustom(size)}
                      title="Remove custom image"
                      className="p-1 rounded-md hover:bg-zinc-700 text-zinc-500 hover:text-red-400 transition-colors"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>

              {/* Preview area */}
              <div className="flex-1 flex items-center justify-center px-3 py-4 min-h-[100px]">
                {isSlotProcessing && (
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                    <span className="text-[10px] text-zinc-500">Processing&hellip;</span>
                  </div>
                )}
                {!isSlotProcessing && dataUrl && (
                  <div
                    className="checkerboard rounded-lg flex items-center justify-center overflow-hidden shadow-inner"
                    style={{
                      width: Math.min(Math.max(size, 32), 96),
                      height: Math.min(Math.max(size, 32), 96),
                    }}
                  >
                    <img
                      src={dataUrl}
                      alt={`${size}x${size}`}
                      width={Math.min(size, 96)}
                      height={Math.min(size, 96)}
                      className="block"
                      style={{ imageRendering: size <= 32 ? 'pixelated' : 'auto' }}
                    />
                  </div>
                )}
                {!isSlotProcessing && !dataUrl && (
                  <div className="flex flex-col items-center gap-2 text-zinc-600 py-2">
                    <div className="w-10 h-10 rounded-lg border-2 border-dashed border-zinc-700 flex items-center justify-center">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </div>
                    <span className="text-[10px] font-medium">Drop image here</span>
                  </div>
                )}
              </div>

              {/* Bottom info */}
              <div className="px-3 pb-3 space-y-1.5">
                <p className="text-[11px] text-zinc-500 leading-tight">{meta.usage}</p>
                <div className="flex items-center gap-1.5">
                  <span className={`inline-block text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border ${categoryColor}`}>
                    {meta.category}
                  </span>
                  {isCustom && (
                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-medium">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Custom
                    </span>
                  )}
                </div>
              </div>

              {/* Drag overlay */}
              {isDragOver && (
                <div className="absolute inset-0 bg-blue-500/10 backdrop-blur-[2px] flex items-center justify-center z-10">
                  <div className="flex flex-col items-center gap-1.5 text-blue-400">
                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                    </svg>
                    <span className="text-xs font-semibold">Drop to set {size}&times;{size}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Upscale warning */}
      {sourceDimensions !== null &&
        ICON_SIZES.some((s) => s > Math.min(sourceDimensions.width, sourceDimensions.height)) && (
          <p className="text-xs text-amber-400/70 flex items-center gap-1.5 bg-amber-400/5 px-3 py-2 rounded-lg border border-amber-400/10">
            <span>&#9888;</span>
            Sizes larger than your source image ({Math.min(sourceDimensions.width, sourceDimensions.height)}px) may appear blurry.
          </p>
        )}
    </div>
  );
}

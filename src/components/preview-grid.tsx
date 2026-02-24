import { ICON_SIZES, SIZE_LABELS, type IconSize } from '../lib/constants';

interface PreviewGridProps {
  /** Map of size → data URL for each generated preview. */
  readonly previews: ReadonlyMap<number, string>;
  /** Which sizes are selected for inclusion in the final .ico. */
  readonly selectedSizes: ReadonlySet<number>;
  /** Toggle a size on or off. */
  readonly onToggleSize: (size: IconSize) => void;
  /** Source image natural dimensions. */
  readonly sourceDimensions: { readonly width: number; readonly height: number } | null;
}

export function PreviewGrid({
  previews,
  selectedSizes,
  onToggleSize,
  sourceDimensions,
}: PreviewGridProps) {
  if (previews.size === 0) return null;

  return (
    <div className="space-y-5">
      {/* Section header */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-400">
          Preview & Select Sizes
        </h2>
        <p className="text-xs text-zinc-500">
          {selectedSizes.size} of {ICON_SIZES.length} sizes selected
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {ICON_SIZES.map((size) => {
          const dataUrl = previews.get(size);
          if (!dataUrl) return null;

          const isSelected = selectedSizes.has(size);
          const isUpscaled =
            sourceDimensions !== null &&
            size > Math.min(sourceDimensions.width, sourceDimensions.height);

          return (
            <button
              key={size}
              type="button"
              onClick={() => onToggleSize(size)}
              title={SIZE_LABELS[size]}
              className={`
                group relative flex flex-col items-center gap-2 p-3 rounded-xl
                border-2 transition-all duration-200 cursor-pointer
                ${
                  isSelected
                    ? 'border-blue-500/60 bg-blue-500/5 hover:bg-blue-500/10'
                    : 'border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900/60 opacity-50'
                }
              `}
            >
              {/* Checkbox indicator */}
              <div
                className={`
                  absolute top-2 right-2 w-4 h-4 rounded-md border-2 flex items-center justify-center
                  ${isSelected ? 'border-blue-500 bg-blue-500' : 'border-zinc-600 bg-transparent'}
                `}
              >
                {isSelected && (
                  <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                )}
              </div>

              {/* Image preview with checkerboard */}
              <div
                className="checkerboard rounded-lg flex items-center justify-center overflow-hidden"
                style={{
                  width: Math.max(size, 32),
                  height: Math.max(size, 32),
                  minWidth: 32,
                  minHeight: 32,
                }}
              >
                <img
                  src={dataUrl}
                  alt={`${size}×${size} preview`}
                  width={size}
                  height={size}
                  className="image-rendering-auto"
                  style={{
                    imageRendering: size <= 32 ? 'pixelated' : 'auto',
                  }}
                />
              </div>

              {/* Size label */}
              <span className="text-xs font-mono text-zinc-400 group-hover:text-zinc-300">
                {size}×{size}
              </span>

              {/* Upscale warning */}
              {isUpscaled && (
                <span className="absolute top-2 left-2 text-[10px] font-medium text-amber-400" title="Source image is smaller than this size — may appear blurry">
                  ⚠
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Upscale warning footer */}
      {sourceDimensions !== null &&
        ICON_SIZES.some((s) => s > Math.min(sourceDimensions.width, sourceDimensions.height)) && (
          <p className="text-xs text-amber-400/70 flex items-center gap-1.5">
            <span>⚠</span>
            Sizes marked with ⚠ are larger than your source image and may appear blurry.
          </p>
        )}
    </div>
  );
}

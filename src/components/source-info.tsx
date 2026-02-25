import { FiMaximize, FiFile, FiRefreshCw } from 'react-icons/fi';
import { formatFileSize } from '../lib/image-resizer';

interface SourceInfoProps {
  readonly fileName: string;
  readonly fileSize: number;
  readonly width: number;
  readonly height: number;
  readonly previewUrl: string;
  readonly isSvg: boolean;
  readonly onChangeImage: () => void;
}

export function SourceInfo({
  fileName,
  fileSize,
  width,
  height,
  previewUrl,
  isSvg,
  onChangeImage,
}: SourceInfoProps) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-700/80 transition-colors">
      {/* Thumbnail */}
      <div className="relative">
        <div className="checkerboard rounded-lg overflow-hidden flex-shrink-0 shadow-md" style={{ width: 60, height: 60 }}>
          <img
            src={previewUrl}
            alt="Source"
            className="w-[60px] h-[60px] object-cover"
          />
        </div>
        {isSvg && (
          <span className="absolute -top-1.5 -right-1.5 text-[9px] font-bold uppercase bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/30">
            SVG
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 space-y-1">
        <p className="text-sm font-semibold text-zinc-200 truncate">{fileName}</p>
        <div className="flex items-center gap-3 text-xs text-zinc-500">
          <span className="flex items-center gap-1">
            <FiMaximize className="w-3 h-3" />
            {width} × {height}px
          </span>
          <span className="flex items-center gap-1">
            <FiFile className="w-3 h-3" />
            {formatFileSize(fileSize)}
          </span>
        </div>
        {width !== height && (
          <p className="text-[11px] text-amber-400/70 flex items-center gap-1">
            <span>⚠</span> Non-square — will be center-cropped to 1:1
          </p>
        )}
      </div>

      {/* Change button */}
      <button
        type="button"
        onClick={onChangeImage}
        className="
          flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold
          bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-zinc-100
          border border-zinc-700 hover:border-zinc-600
          transition-all duration-200
        "
      >
        <FiRefreshCw className="w-3.5 h-3.5" />
        Change
      </button>
    </div>
  );
}

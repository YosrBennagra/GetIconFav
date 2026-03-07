import { FiMaximize, FiFile, FiRefreshCw, FiAlertTriangle } from 'react-icons/fi';
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
    <div className="flex items-center gap-3 p-3 glass-card">
      {/* Thumbnail */}
      <div className="relative">
        <div className="checkerboard rounded-xl overflow-hidden flex-shrink-0 ring-1 ring-white/10" style={{ width: 52, height: 52 }}>
          <img
            src={previewUrl}
            alt="Source"
            className="w-[52px] h-[52px] object-cover"
          />
        </div>
        {isSvg && (
          <span className="absolute -top-1 -right-1 text-[8px] font-semibold uppercase bg-emerald-500/15 text-emerald-400 px-1 py-px rounded-full border border-emerald-500/30">
            SVG
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 space-y-0.5">
        <p className="text-sm font-medium text-zinc-200 truncate">{fileName}</p>
        <div className="flex items-center gap-3 text-xs text-zinc-500">
          <span className="flex items-center gap-1">
            <FiMaximize className="w-3 h-3 text-zinc-600" />
            {width} × {height}px
          </span>
          <span className="flex items-center gap-1">
            <FiFile className="w-3 h-3 text-zinc-600" />
            {formatFileSize(fileSize)}
          </span>
        </div>
        {width !== height && (
          <p className="text-[10px] text-amber-400/80 flex items-center gap-1">
            <FiAlertTriangle className="w-3 h-3" />
            Non-square — will be center-cropped
          </p>
        )}
      </div>

      {/* Change button */}
      <button
        type="button"
        onClick={onChangeImage}
        className="
          flex-shrink-0 flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-medium
          bg-white/5 text-zinc-400 hover:text-red-400
          border border-white/10 hover:border-red-500/30
        "
      >
        <FiRefreshCw className="w-3 h-3" />
        Swap
      </button>
    </div>
  );
}

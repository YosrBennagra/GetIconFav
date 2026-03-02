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
    <div className="flex items-center gap-3 p-3 rounded-lg bg-zinc-900/60 border border-zinc-800/50">
      {/* Thumbnail */}
      <div className="relative">
        <div className="checkerboard rounded-lg overflow-hidden flex-shrink-0 ring-1 ring-zinc-800" style={{ width: 52, height: 52 }}>
          <img
            src={previewUrl}
            alt="Source"
            className="w-[52px] h-[52px] object-cover"
          />
        </div>
        {isSvg && (
          <span className="absolute -top-1 -right-1 text-[8px] font-mono font-bold uppercase bg-bp-green/15 text-bp-green px-1 py-px rounded border border-bp-green/30">
            SVG
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 space-y-0.5">
        <p className="text-sm font-mono font-medium text-zinc-200 truncate">{fileName}</p>
        <div className="flex items-center gap-3 text-xs font-mono text-zinc-500">
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
          <p className="text-[10px] text-amber-400/80 font-mono flex items-center gap-1">
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
          flex-shrink-0 flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-mono font-medium
          bg-zinc-900 text-zinc-400 hover:text-bp-red
          border border-zinc-700/50 hover:border-bp-red/30
        "
      >
        <FiRefreshCw className="w-3 h-3" />
        Swap
      </button>
    </div>
  );
}

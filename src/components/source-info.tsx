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
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
            </svg>
            {width} × {height}px
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
            </svg>
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
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182" />
        </svg>
        Change
      </button>
    </div>
  );
}

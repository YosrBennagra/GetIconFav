import { useCallback, useRef, useState, type DragEvent, type ChangeEvent } from 'react';
import { FiUploadCloud } from 'react-icons/fi';
import { ACCEPTED_EXTENSIONS, ACCEPTED_TYPES } from '../lib/constants';

interface DropZoneProps {
  readonly onFileSelected: (file: File) => void;
  readonly disabled?: boolean;
}

export function DropZone({ onFileSelected, disabled = false }: DropZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const isValidFile = useCallback((file: File): boolean => {
    return (ACCEPTED_TYPES as readonly string[]).includes(file.type);
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);
      if (disabled) return;

      const file = e.dataTransfer.files[0];
      if (file && isValidFile(file)) {
        onFileSelected(file);
      }
    },
    [disabled, isValidFile, onFileSelected]
  );

  const handleDragOver = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled) setIsDragOver(true);
    },
    [disabled]
  );

  const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleClick = useCallback(() => {
    if (!disabled) inputRef.current?.click();
  }, [disabled]);

  const handleFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file && isValidFile(file)) {
        onFileSelected(file);
      }
      e.target.value = '';
    },
    [isValidFile, onFileSelected]
  );

  return (
    <div
      role="button"
      tabIndex={0}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') handleClick();
      }}
      className={`
        relative flex flex-col items-center justify-center gap-5
        w-full min-h-[280px] p-10
        border-2 border-dashed rounded-2xl cursor-pointer
        transition-all duration-300
        ${isDragOver ? 'dropzone-active' : 'border-zinc-700/60 hover:border-zinc-500 bg-zinc-900/30 hover:bg-zinc-900/50'}
        ${disabled ? 'opacity-50 pointer-events-none' : ''}
      `}
    >
      {/* Gradient glow behind icon */}
      <div className="relative">
        <div className="absolute inset-0 w-20 h-20 -top-2 -left-2 bg-blue-500/10 rounded-full blur-xl" />
        <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/15 to-violet-500/15 border border-blue-500/20 shadow-lg shadow-blue-500/5">
          <FiUploadCloud className="w-8 h-8 text-blue-400" />
        </div>
      </div>

      {/* Text */}
      <div className="text-center space-y-2">
        <p className="text-lg font-semibold text-zinc-200">
          Drop your master image here
        </p>
        <p className="text-sm text-zinc-400 leading-relaxed max-w-sm">
          Use a high-resolution <span className="text-blue-400 font-medium">SVG</span> or <span className="text-blue-400 font-medium">PNG</span> for
          best results. All icon sizes will be auto-generated.
        </p>
        <p className="text-sm text-zinc-500">
          or{' '}
          <span className="text-blue-400 underline underline-offset-2 decoration-blue-400/40 hover:decoration-blue-400">
            click to browse
          </span>
        </p>
      </div>

      {/* Supported formats */}
      <div className="flex items-center gap-2 flex-wrap justify-center">
        {['SVG', 'PNG', 'JPG', 'WebP', 'BMP', 'GIF'].map((fmt) => (
          <span
            key={fmt}
            className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 bg-zinc-800/60 px-2 py-0.5 rounded border border-zinc-700/40"
          >
            {fmt}
          </span>
        ))}
      </div>

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_EXTENSIONS}
        onChange={handleFileChange}
        className="hidden"
        aria-label="Select image file"
      />
    </div>
  );
}

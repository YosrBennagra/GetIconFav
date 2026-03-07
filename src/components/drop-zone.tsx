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
      aria-label="Drop an image file here or click to browse. Accepts SVG, PNG, JPG, WebP, BMP, GIF."
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') handleClick();
      }}
      className={`
        relative flex flex-col items-center justify-center gap-5
        w-full h-full p-10
        border-2 border-dashed rounded-2xl cursor-pointer
        ${isDragOver ? 'dropzone-active' : 'border-white/10 hover:border-violet-500/30 bg-white/[0.02]'}
        ${disabled ? 'opacity-50 pointer-events-none' : ''}
      `}
    >
      {/* Icon */}
      <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 shadow-glow-sm">
        <FiUploadCloud className="w-8 h-8 text-violet-400" />
      </div>

      {/* Text */}
      <div className="text-center space-y-2">
        <p className="text-lg font-semibold text-zinc-200">
          Drop your <span className="text-violet-400">source image</span> here
        </p>
        <p className="text-sm text-zinc-500 leading-relaxed max-w-md">
          Use a high-res <span className="text-violet-400 font-semibold">SVG</span> or{' '}
          <span className="text-violet-400 font-semibold">PNG</span> (512px+ recommended) for best results
        </p>
        <p className="text-sm text-zinc-600">
          or{' '}
          <span className="text-cyan-400 underline underline-offset-2 decoration-cyan-400/40 hover:decoration-cyan-400 cursor-pointer">
            browse files
          </span>
        </p>
      </div>

      {/* Supported formats */}
      <div className="flex items-center gap-2 flex-wrap justify-center">
        {['SVG', 'PNG', 'JPG', 'WebP', 'BMP', 'GIF'].map((fmt) => (
          <span
            key={fmt}
            className="text-[9px] font-medium uppercase tracking-wider text-zinc-400 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10"
          >
            {fmt}
          </span>
        ))}
      </div>

      <p className="text-[10px] text-zinc-600">
        100% client-side — your files never leave your browser
      </p>

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

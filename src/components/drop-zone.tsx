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
        border-2 border-dashed rounded-xl cursor-pointer
        ${isDragOver ? 'dropzone-active' : 'border-bp-line/40 hover:border-bp-blue/30 bg-bp-navy/50'}
        ${disabled ? 'opacity-50 pointer-events-none' : ''}
      `}
    >
      {/* Icon */}
      <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-bp-dark border border-bp-blue/20">
        <FiUploadCloud className="w-8 h-8 text-bp-blue" />
      </div>

      {/* Text */}
      <div className="text-center space-y-2">
        <p className="text-lg font-mono font-semibold text-zinc-200">
          Drop your <span className="text-bp-blue">source image</span> here
        </p>
        <p className="text-sm text-zinc-500 leading-relaxed font-mono max-w-md">
          Use a high-res <span className="text-bp-blue font-semibold">SVG</span> or{' '}
          <span className="text-bp-blue font-semibold">PNG</span> (512px+ recommended) for best results
        </p>
        <p className="text-sm text-zinc-600 font-mono">
          or{' '}
          <span className="text-bp-steel underline underline-offset-2 decoration-bp-steel/40 hover:decoration-bp-steel cursor-pointer">
            browse files
          </span>
        </p>
      </div>

      {/* Supported formats */}
      <div className="flex items-center gap-2 flex-wrap justify-center">
        {['SVG', 'PNG', 'JPG', 'WebP', 'BMP', 'GIF'].map((fmt) => (
          <span
            key={fmt}
            className="text-[9px] font-mono font-bold uppercase tracking-wider text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800"
          >
            {fmt}
          </span>
        ))}
      </div>

      <p className="text-[10px] text-zinc-600 font-mono">
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

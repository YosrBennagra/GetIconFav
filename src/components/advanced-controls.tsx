import { FiSliders, FiDroplet } from 'react-icons/fi';

interface AdvancedControlsProps {
    readonly bgColor: string;
    readonly onBgColorChange: (color: string) => void;
    readonly padding: number;
    readonly onPaddingChange: (padding: number) => void;
}

const PRESET_COLORS = [
    { value: '', label: 'None', preview: 'bg-transparent' },
    { value: '#ffffff', label: 'White', preview: 'bg-white' },
    { value: '#000000', label: 'Black', preview: 'bg-black' },
    { value: '#f8f9fa', label: 'Light', preview: 'bg-gray-100' },
    { value: '#1a1a2e', label: 'Dark', preview: 'bg-gray-900' },
];

export function AdvancedControls({
    bgColor,
    onBgColorChange,
    padding,
    onPaddingChange,
}: AdvancedControlsProps) {
    return (
        <div className="rounded-lg border border-zinc-800/40 bg-zinc-900/40 overflow-hidden">
            <div className="px-3 py-2 border-b border-zinc-800/30 flex items-center gap-1.5">
                <FiSliders className="w-3 h-3 text-bp-steel" />
                <span className="text-[9px] font-mono font-bold uppercase tracking-wide text-zinc-500">
                    Advanced Options
                </span>
            </div>

            <div className="p-3 space-y-4">
                {/* Background Color */}
                <div className="space-y-2">
                    <div className="flex items-center gap-1.5">
                        <FiDroplet className="w-3 h-3 text-zinc-500" />
                        <span className="text-[10px] font-mono font-semibold text-zinc-400 uppercase tracking-wider">
                            Background Fill
                        </span>
                    </div>
                    <p className="text-[9px] font-mono text-zinc-600 leading-relaxed">
                        Fill transparent areas (recommended for Apple icons)
                    </p>

                    <div className="flex items-center gap-1.5 flex-wrap">
                        {PRESET_COLORS.map((preset) => (
                            <button
                                key={preset.value}
                                type="button"
                                onClick={() => onBgColorChange(preset.value)}
                                title={preset.label}
                                className={`w-6 h-6 rounded-md border-2 transition-all duration-150 flex items-center justify-center ${bgColor === preset.value
                                        ? 'border-bp-blue scale-110 shadow-[0_0_6px_rgba(91,155,213,0.3)]'
                                        : 'border-zinc-700 hover:border-zinc-500'
                                    }`}
                            >
                                {preset.value === '' ? (
                                    <div className="w-full h-full rounded checkerboard" />
                                ) : (
                                    <div
                                        className="w-full h-full rounded"
                                        style={{ backgroundColor: preset.value }}
                                    />
                                )}
                            </button>
                        ))}

                        {/* Custom color picker */}
                        <label
                            className={`relative w-6 h-6 rounded-md border-2 cursor-pointer transition-all duration-150 overflow-hidden ${bgColor && !PRESET_COLORS.some((p) => p.value === bgColor)
                                    ? 'border-bp-blue scale-110'
                                    : 'border-zinc-700 hover:border-zinc-500'
                                }`}
                            title="Custom color"
                        >
                            <input
                                type="color"
                                value={bgColor || '#ffffff'}
                                onChange={(e) => onBgColorChange(e.target.value)}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <div
                                className="w-full h-full rounded flex items-center justify-center text-[8px] font-bold text-zinc-400"
                                style={
                                    bgColor && !PRESET_COLORS.some((p) => p.value === bgColor)
                                        ? { backgroundColor: bgColor }
                                        : undefined
                                }
                            >
                                {bgColor && !PRESET_COLORS.some((p) => p.value === bgColor) ? '' : '⋯'}
                            </div>
                        </label>
                    </div>
                </div>

                {/* Padding Slider */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-semibold text-zinc-400 uppercase tracking-wider">
                            Padding
                        </span>
                        <span className="text-[10px] font-mono font-bold text-bp-blue tabular-nums">
                            {padding}%
                        </span>
                    </div>
                    <input
                        type="range"
                        min={0}
                        max={25}
                        step={1}
                        value={padding}
                        onChange={(e) => onPaddingChange(Number(e.target.value))}
                        className="w-full h-1 bg-zinc-800 rounded-full appearance-none cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3
              [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-bp-blue
              [&::-webkit-slider-thumb]:shadow-[0_0_6px_rgba(91,155,213,0.4)]
              [&::-webkit-slider-thumb]:cursor-pointer"
                    />
                    <div className="flex justify-between text-[8px] font-mono text-zinc-700">
                        <span>0%</span>
                        <span>edge-to-edge</span>
                        <span>25%</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

import { useState, useCallback } from 'react';
import { FiCheck, FiPlus, FiChevronDown, FiChevronRight, FiDownload } from 'react-icons/fi';
import {
    PACKAGE_ICONS,
    CATEGORY_META,
    type PackageIcon,
    type IconCategory,
} from '../lib/constants';

interface IconPackageGridProps {
    readonly previews: ReadonlyMap<string, string>;
    readonly selectedIds: ReadonlySet<string>;
    readonly onToggleIcon: (id: string) => void;
    readonly onSelectCategory: (category: IconCategory, selected: boolean) => void;
    readonly onSelectAll: () => void;
    readonly onSelectEssential: () => void;
    readonly onDownloadPng?: (id: string) => void;
}

const CATEGORY_ORDER: IconCategory[] = ['favicon', 'apple', 'android', 'microsoft', 'opengraph', 'appstore'];

const CATEGORY_COLORS: Record<string, { border: string; bg: string; text: string; badge: string }> = {
    'bp-blue': { border: 'border-sky-400/25', bg: 'bg-sky-400/5', text: 'text-sky-400', badge: 'bg-sky-400/10 text-sky-400 border-sky-400/20' },
    'bp-red': { border: 'border-rose-400/25', bg: 'bg-rose-400/5', text: 'text-rose-400', badge: 'bg-rose-400/10 text-rose-400 border-rose-400/20' },
    'bp-green': { border: 'border-emerald-400/25', bg: 'bg-emerald-400/5', text: 'text-emerald-400', badge: 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20' },
    'bp-steel': { border: 'border-indigo-400/25', bg: 'bg-indigo-400/5', text: 'text-indigo-400', badge: 'bg-indigo-400/10 text-indigo-400 border-indigo-400/20' },
    'bp-amber': { border: 'border-amber-400/25', bg: 'bg-amber-400/5', text: 'text-amber-400', badge: 'bg-amber-400/10 text-amber-400 border-amber-400/20' },
};

export function IconPackageGrid({
    previews,
    selectedIds,
    onToggleIcon,
    onSelectCategory,
    onSelectAll,
    onSelectEssential,
    onDownloadPng,
}: IconPackageGridProps) {
    const [collapsedCategories, setCollapsedCategories] = useState<Set<IconCategory>>(new Set());

    const toggleCollapse = useCallback((cat: IconCategory) => {
        setCollapsedCategories((prev) => {
            const next = new Set(prev);
            if (next.has(cat)) next.delete(cat);
            else next.add(cat);
            return next;
        });
    }, []);

    const groupedIcons = CATEGORY_ORDER.map((cat) => ({
        category: cat,
        meta: CATEGORY_META[cat],
        icons: PACKAGE_ICONS.filter((i) => i.category === cat),
    }));

    const totalSelected = selectedIds.size;
    const totalAvailable = PACKAGE_ICONS.length;

    return (
        <div className="space-y-4">
            {/* Header with presets */}
            <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                    <h2 className="text-base font-mono font-semibold text-zinc-200 flex items-center gap-2">
                        <span className="text-bp-blue">#</span> Icon Package
                    </h2>
                    <p className="text-[10px] text-zinc-600 font-mono mt-0.5 uppercase tracking-wider">
                        All icons your app needs — select what to include
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs tabular-nums font-mono text-bp-blue/60 bg-bp-blue/5 px-2.5 py-1 rounded border border-bp-blue/10">
                        {totalSelected}/{totalAvailable} selected
                    </span>
                    <button
                        type="button"
                        onClick={onSelectAll}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-zinc-900 text-zinc-400 hover:text-bp-blue border border-zinc-800 hover:border-bp-blue/30"
                    >
                        All
                    </button>
                    <button
                        type="button"
                        onClick={onSelectEssential}
                        className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-zinc-900 text-zinc-400 hover:text-bp-green border border-zinc-800 hover:border-bp-green/30"
                    >
                        Essential
                    </button>
                </div>
            </div>

            {/* Categories */}
            {groupedIcons.map(({ category, meta, icons }) => {
                const isCollapsed = collapsedCategories.has(category);
                const colors = CATEGORY_COLORS[meta.color] ?? CATEGORY_COLORS['bp-blue']!;
                const selectedInCat = icons.filter((i) => selectedIds.has(i.id)).length;
                const allSelected = selectedInCat === icons.length;

                return (
                    <div key={category} className={`rounded-xl border ${colors.border} overflow-hidden`}>
                        {/* Category header */}
                        <div
                            role="button"
                            tabIndex={0}
                            onClick={() => toggleCollapse(category)}
                            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggleCollapse(category); }}
                            className={`flex items-center justify-between px-4 py-2.5 cursor-pointer ${colors.bg} hover:opacity-80`}
                        >
                            <div className="flex items-center gap-3">
                                {isCollapsed
                                    ? <FiChevronRight className={`w-4 h-4 ${colors.text}`} />
                                    : <FiChevronDown className={`w-4 h-4 ${colors.text}`} />}
                                <div>
                                    <span className={`text-sm font-mono font-bold ${colors.text}`}>{meta.label}</span>
                                    <span className="text-[10px] text-zinc-500 font-mono ml-2">{meta.description}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${colors.badge}`}>
                                    {selectedInCat}/{icons.length}
                                </span>
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onSelectCategory(category, !allSelected);
                                    }}
                                    className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded border transition-all ${allSelected
                                            ? 'border-zinc-600 text-zinc-500 hover:text-zinc-300'
                                            : `${colors.badge} hover:opacity-80`
                                        }`}
                                >
                                    {allSelected ? 'Deselect' : 'Select All'}
                                </button>
                            </div>
                        </div>

                        {/* Icon grid */}
                        {!isCollapsed && (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 p-3">
                                {icons.map((icon) => (
                                    <IconSlot
                                        key={icon.id}
                                        icon={icon}
                                        preview={previews.get(icon.id)}
                                        isSelected={selectedIds.has(icon.id)}
                                        categoryColor={colors}
                                        onToggle={() => onToggleIcon(icon.id)}
                                        onDownload={onDownloadPng ? () => onDownloadPng(icon.id) : undefined}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

// ── Individual icon slot ─────────────────────────────────────────

interface IconSlotProps {
    readonly icon: PackageIcon;
    readonly preview: string | undefined;
    readonly isSelected: boolean;
    readonly categoryColor: { border: string; bg: string; text: string; badge: string };
    readonly onToggle: () => void;
    readonly onDownload?: () => void;
}

function IconSlot({ icon, preview, isSelected, categoryColor, onToggle, onDownload }: IconSlotProps) {
    const displaySize = Math.min(Math.max(icon.width, 24), 64);
    const isWide = icon.width !== icon.height;

    return (
        <div
            role="button"
            tabIndex={0}
            onClick={onToggle}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onToggle(); }}
            className={`relative flex flex-col rounded-lg border overflow-hidden cursor-pointer transition-all duration-150 ${isSelected
                    ? 'border-zinc-600/60 bg-zinc-900/60 hover:border-zinc-500'
                    : 'border-zinc-800/30 bg-zinc-900/20 opacity-40 hover:opacity-60'
                }`}
        >
            {/* Checkbox + label */}
            <div className="flex items-center gap-1.5 px-2.5 pt-2.5 pb-1">
                <div
                    className={`w-4 h-4 rounded flex items-center justify-center shrink-0 transition-all duration-150 border-2 ${isSelected
                            ? `${categoryColor.text} border-current bg-current`
                            : 'border-zinc-600 bg-transparent'
                        }`}
                >
                    {isSelected && <FiCheck className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
                </div>
                <span className="text-[11px] font-mono font-semibold text-zinc-300 truncate">{icon.label}</span>
                {icon.essential && (
                    <span className="text-[8px] font-mono font-bold uppercase px-1 py-px rounded bg-bp-green/10 text-bp-green border border-bp-green/20 shrink-0">
                        ★
                    </span>
                )}
                {icon.maskable && (
                    <span className="text-[7px] font-mono font-bold uppercase px-1 py-px rounded bg-purple-400/10 text-purple-400 border border-purple-400/20 shrink-0">
                        MASK
                    </span>
                )}
            </div>

            {/* Preview */}
            <div className="flex-1 flex items-center justify-center px-2 py-3 min-h-[60px]">
                {preview ? (
                    <div className="relative">
                        <div
                            className="checkerboard rounded overflow-hidden"
                            style={{
                                width: isWide ? Math.min(icon.width / (icon.height / 40), 100) : displaySize,
                                height: isWide ? 40 : displaySize,
                            }}
                        >
                            <img
                                src={preview}
                                alt={icon.filename}
                                className="w-full h-full object-contain"
                                style={{ imageRendering: icon.width <= 32 ? 'pixelated' : 'auto' }}
                            />
                        </div>
                        {/* Maskable safe zone overlay */}
                        {icon.maskable && !isWide && (
                            <div
                                className="absolute inset-0 pointer-events-none"
                                style={{
                                    width: displaySize,
                                    height: displaySize,
                                }}
                            >
                                <div className="w-full h-full rounded-full border border-dashed border-purple-400/40" />
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="w-8 h-8 rounded border-2 border-dashed border-zinc-700/30 flex items-center justify-center">
                        <FiPlus className="w-3 h-3 text-zinc-600" />
                    </div>
                )}
            </div>

            {/* Info */}
            <div className="px-2.5 pb-2 space-y-0.5">
                <div className="flex items-center justify-between gap-1">
                    <p className="text-[9px] text-zinc-500 font-mono truncate flex-1">{icon.description}</p>
                    {onDownload && preview && (
                        <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); onDownload(); }}
                            className="shrink-0 p-0.5 rounded text-zinc-600 hover:text-bp-blue transition-colors"
                            title={`Download ${icon.filename}`}
                            aria-label={`Download ${icon.filename} as PNG`}
                        >
                            <FiDownload className="w-3 h-3" />
                        </button>
                    )}
                </div>
                <p className="text-[9px] text-zinc-600 font-mono truncate">{icon.filename}</p>
            </div>
        </div>
    );
}

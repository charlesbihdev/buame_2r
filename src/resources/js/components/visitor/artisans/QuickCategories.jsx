import { Hammer, Home, Paintbrush, Scissors, Wrench, Zap } from 'lucide-react';
import { Droplets, Flame } from 'lucide-react';

const SKILL_TYPES = [
    { icon: Hammer, label: 'Carpenter', key: 'carpenter' },
    { icon: Home, label: 'Mason', key: 'mason' },
    { icon: Zap, label: 'Electrician', key: 'electrician' },
    { icon: Droplets, label: 'Plumber', key: 'plumber' },
    { icon: Paintbrush, label: 'Tiler', key: 'tiler' },
    { icon: Scissors, label: 'Tailor', key: 'tailor' },
    { icon: Flame, label: 'Welder', key: 'welder' },
    { icon: Paintbrush, label: 'Painter', key: 'painter' },
];

export function QuickCategories({ categoryCounts, activeSkillType, onCategoryClick }) {
    return (
        <div className="mt-8 flex flex-wrap justify-center gap-3">
            {SKILL_TYPES.map((cat) => {
                const count = categoryCounts?.[cat.key] || 0;
                const isActive = activeSkillType === cat.key;

                return (
                    <button
                        key={cat.key}
                        onClick={() => onCategoryClick(cat.key)}
                        className={`flex items-center gap-2 rounded-full border-2 px-5 py-2.5 font-semibold transition-all ${
                            isActive
                                ? 'border-[var(--primary)] bg-[var(--primary)]/10'
                                : 'border-[var(--primary)]/30 bg-white hover:border-[var(--primary)] hover:bg-[var(--primary)]/10'
                        } dark:bg-[var(--card)]`}
                    >
                        <cat.icon className="h-5 w-5 text-[var(--primary)]" />
                        <span className="text-sm dark:text-white">{cat.label}</span>
                        <span className="rounded-full bg-[var(--primary)]/20 px-2 py-0.5 text-xs font-bold text-[var(--foreground)] dark:text-[var(--primary)]">
                            {count}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}

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
                                ? 'border-[#13ec13] bg-[#13ec13]/10'
                                : 'border-[#13ec13]/30 bg-white hover:border-[#13ec13] hover:bg-[#13ec13]/10'
                        } dark:bg-[#162816]`}
                    >
                        <cat.icon className="h-5 w-5 text-[#13ec13]" />
                        <span className="text-sm dark:text-white">{cat.label}</span>
                        <span className="rounded-full bg-[#13ec13]/20 px-2 py-0.5 text-xs font-bold text-[#0d1b0d] dark:text-[#13ec13]">
                            {count}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}

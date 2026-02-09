import { artisanSkills } from '@/config/artisan-skills';
import { Hammer, Home, Paintbrush, Scissors, Wrench, Zap, Car, Cake, Sparkles, Gem, Footprints, Mic, Calendar } from 'lucide-react';
import { Droplets, Flame, Palette, Radio, Truck, Drill, Printer, Tv, Wind, Satellite, Smartphone, Briefcase, Sun, CircleDot } from 'lucide-react';
import { Shield, Camera, Music, Utensils, Monitor, Sofa, Lock, Bug, Shirt, Volume2, Leaf } from 'lucide-react';

const roleIcons = {
    // Trades
    mason: Home,
    carpenter: Hammer,
    plumber: Droplets,
    electrician: Zap,
    welder: Flame,
    painter: Paintbrush,
    tiler: Home,
    tailor: Scissors,
    mechanic: Car,
    bakery_pastry_chef: Cake,
    makeup_artistry: Sparkles,
    bead_making: Gem,
    shoe_making_cobbler: Footprints,
    event_mc: Mic,
    event_planners: Calendar,
    graphics_designer: Palette,
    radio_presenter: Radio,
    drivers_chauffeurs: Truck,
    borehole_drillers: Drill,
    printer_repairers: Printer,
    tv_decoder_repairers: Tv,
    air_conditioning_installers: Wind,
    multi_tv_dstv_installers: Satellite,
    phone_repairers: Smartphone,
    leather_work_bag_making: Briefcase,
    candle_making: Sun,
    soap_cosmetics_making: Sparkles,
    sewing_embroidery: Scissors,
    furniture_maker_upholsterer: Sofa,
    glass_mirror_installers: CircleDot,
    security_system_installers: Shield,
    solar_panel_installers: Sun,
    welding_fabrication: Flame,
    motorcycle_bicycle_repairers: Wrench,
    computer_technicians: Monitor,
    interior_designers: Palette,
    landscape_designers: Leaf,
    plaster_false_ceiling_installers: Home,
    flooring_specialists: Home,
    locksmiths: Lock,
    pest_control_experts: Bug,
    tailoring_fashion_design: Scissors,
    photography_videography: Camera,
    dj_music_entertainment: Music,
    printing_publishing: Printer,
    food_vendors_catering: Utensils,
    barbers: Scissors,
    decoration: Sparkles,
};

const SKILL_TYPES = artisanSkills.map(skill => ({
    icon: roleIcons[skill.id] || Wrench,
    label: skill.label,
    key: skill.id
})).sort((a, b) => a.label.localeCompare(b.label));

export function QuickCategories({ categoryCounts, activeSkillType, onCategoryClick }) {
    return (
        <div className="mt-8 w-full">
            <div className="relative">
                {/* Left fade indicator */}
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none z-10 dark:from-[var(--background)]" />

                <div className="overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory">
                    <div className="flex gap-3 px-4 min-w-max pb-4">
                        {SKILL_TYPES.map((cat) => {
                            const count = categoryCounts?.[cat.key] || 0;
                            const isActive = activeSkillType === cat.key;

                            return (
                                <button
                                    key={cat.key}
                                    onClick={() => onCategoryClick(cat.key)}
                                    className={`flex items-center gap-2 rounded-full border-2 px-5 py-2.5 font-semibold transition-all snap-start flex-shrink-0 ${isActive
                                        ? 'border-[var(--primary)] bg-[var(--primary)]/10'
                                        : 'border-[var(--primary)]/30 bg-white hover:border-[var(--primary)] hover:bg-[var(--primary)]/10'
                                        } dark:bg-[var(--card)]`}
                                >
                                    <cat.icon className="h-5 w-5 text-[var(--primary)]" />
                                    <span className="text-sm dark:text-white whitespace-nowrap">{cat.label}</span>
                                    <span className="rounded-full bg-[var(--primary)]/20 px-2 py-0.5 text-xs font-bold text-white dark:text-[var(--primary)]">
                                        {count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Right fade indicator */}
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none z-10 dark:from-[var(--background)]" />
            </div>
        </div>
    );
}

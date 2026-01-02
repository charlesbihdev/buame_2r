import { router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Hammer, Hotel, Bike, Home, ShoppingBag, Briefcase, Lock } from 'lucide-react';

const categoryConfig = {
    artisans: { label: 'Artisans', icon: Hammer, color: 'blue' },
    hotels: { label: 'Hotel', icon: Hotel, color: 'green' },
    transport: { label: 'Okada', icon: Bike, color: 'orange' },
    rentals: { label: 'Rentals', icon: Home, color: 'purple' },
    marketplace: { label: 'Marketplace', icon: ShoppingBag, color: 'pink' },
    jobs: { label: 'Jobs', icon: Briefcase, color: 'gray' },
};

export default function CategorySwitcher({ paidCategories, activeCategory, unpaidCategories }) {
    const handleSwitch = (category) => {
        router.post(route('user.dashboard.switch-category'), { category }, { preserveState: true });
    };

    const handleAddCategory = (category) => {
        router.visit(route('choose-path') + `?redirect=payment&category=${category}`);
    };

    return (
        <div className="mb-6 rounded-xl border border-[#e7f3e7] dark:border-[#2a4d2a] bg-white dark:bg-[#1a331a] p-4">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-[#4c9a4c] dark:text-[#8fcc8f]">
                Your Categories
            </h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                {Object.entries(categoryConfig).map(([value, config]) => {
                    const Icon = config.icon;
                    const isPaid = paidCategories?.some((cat) => cat.category === value);
                    const isActive = activeCategory === value;

                    if (isPaid) {
                        return (
                            <button
                                key={value}
                                onClick={() => !isActive && handleSwitch(value)}
                                className={`flex flex-col items-center gap-2 rounded-lg border-2 p-3 transition-all ${
                                    isActive
                                        ? 'border-[#13ec13] bg-[#13ec13]/10'
                                        : 'border-[#e7f3e7] dark:border-[#2a4d2a] hover:border-[#13ec13]/50'
                                }`}
                            >
                                <div
                                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                                        isActive
                                            ? 'bg-[#13ec13] text-[#0d1b0d]'
                                            : 'bg-[#13ec13]/10 text-[#13ec13]'
                                    }`}
                                >
                                    <Icon className="h-5 w-5" />
                                </div>
                                <span
                                    className={`text-xs font-semibold ${
                                        isActive
                                            ? 'text-[#0d1b0d] dark:text-white'
                                            : 'text-[#4c9a4c] dark:text-[#8fcc8f]'
                                    }`}
                                >
                                    {config.label}
                                </span>
                            </button>
                        );
                    }

                    return (
                        <button
                            key={value}
                            onClick={() => handleAddCategory(value)}
                            className="flex flex-col items-center gap-2 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 p-3 opacity-60 hover:opacity-100 transition-opacity"
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-400">
                                <Lock className="h-5 w-5" />
                            </div>
                            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">{config.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}


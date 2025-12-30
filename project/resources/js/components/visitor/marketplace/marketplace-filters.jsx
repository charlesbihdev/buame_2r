import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export function MarketplaceFilters() {
    const categories = [
        { id: 'all', label: 'All Categories' },
        { id: 'electronics', label: 'Electronics' },
        { id: 'furniture', label: 'Furniture' },
        { id: 'food', label: 'Food' },
        { id: 'agriculture', label: 'Agriculture' },
        { id: 'clothes', label: 'Clothes' },
        { id: 'others', label: 'Others' },
    ];

    return (
        <aside className="hidden min-h-[calc(100vh-80px)] w-80 shrink-0 flex-col gap-8 border-r border-[#e7f3e7] bg-white p-6 dark:border-white/10 dark:bg-white/5 lg:flex">
            {/* Active Filters Summary */}
            <div>
                <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Active Filters</h3>
                <div className="grid grid-cols-1 overflow-hidden rounded-lg border border-[#e7f3e7] bg-background-light dark:border-white/10 dark:bg-background-dark">
                    <div className="flex items-center justify-between border-b border-[#e7f3e7] p-3 dark:border-white/10">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Location</span>
                        <span className="text-sm font-medium dark:text-white">Sefwi Bekwai</span>
                    </div>
                    <div className="flex items-center justify-between p-3">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Sort By</span>
                        <span className="text-sm font-medium dark:text-white">Recommended</span>
                    </div>
                </div>
            </div>

            {/* Categories */}
            <div>
                <h3 className="mb-4 text-base font-bold dark:text-white">Categories</h3>
                <div className="flex flex-col gap-3">
                    {categories.map((category) => (
                        <Label key={category.id} className="group flex cursor-pointer items-center gap-3">
                            <Checkbox
                                defaultChecked={category.id === 'all'}
                                className="rounded border-gray-300 bg-transparent text-[#13ec13] focus:ring-[#13ec13]"
                            />
                            <span className="text-sm font-medium transition-colors group-hover:text-[#13ec13] dark:text-gray-200">
                                {category.label}
                            </span>
                        </Label>
                    ))}
                </div>
            </div>

            {/* Price Range */}
            <div>
                <h3 className="mb-4 text-base font-bold dark:text-white">Price Range (₵)</h3>
                <div className="relative w-full pb-2 pt-6">
                    <div className="relative h-1 w-full rounded-full bg-[#e7f3e7] dark:bg-white/10">
                        <div className="absolute left-[10%] right-[25%] top-0 bottom-0 rounded-full bg-[#13ec13]" />
                        <div className="absolute left-[10%] -top-1.5 -ml-2 cursor-pointer group">
                            <div className="size-4 rounded-full border-2 border-[#13ec13] bg-white shadow transition-transform hover:scale-110" />
                            <div className="absolute -left-1 -top-7 whitespace-nowrap rounded bg-[#102210] px-1.5 py-0.5 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                                ₵50
                            </div>
                        </div>
                        <div className="absolute right-[25%] -top-1.5 -mr-2 cursor-pointer group">
                            <div className="size-4 rounded-full border-2 border-[#13ec13] bg-white shadow transition-transform hover:scale-110" />
                            <div className="absolute -right-1 -top-7 whitespace-nowrap rounded bg-[#102210] px-1.5 py-0.5 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                                ₵500
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 flex justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span>Min: ₵0</span>
                        <span>Max: ₵1000+</span>
                    </div>
                </div>
            </div>

            {/* Rating Filter */}
            <div>
                <h3 className="mb-4 text-base font-bold dark:text-white">Rating</h3>
                <div className="flex flex-col gap-2">
                    <Label className="flex cursor-pointer items-center gap-2">
                        <input
                            type="radio"
                            name="rating"
                            value="5.0"
                            className="border-gray-300 bg-transparent text-[#13ec13] focus:ring-[#13ec13]"
                        />
                        <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                                <span key={i} className="text-[18px]">
                                    ★
                                </span>
                            ))}
                        </div>
                        <span className="text-sm dark:text-gray-300">5.0 only</span>
                    </Label>
                    <Label className="flex cursor-pointer items-center gap-2">
                        <input
                            type="radio"
                            name="rating"
                            value="4.0"
                            defaultChecked
                            className="border-gray-300 bg-transparent text-[#13ec13] focus:ring-[#13ec13]"
                        />
                        <div className="flex text-yellow-400">
                            {[...Array(4)].map((_, i) => (
                                <span key={i} className="text-[18px]">
                                    ★
                                </span>
                            ))}
                            <span className="text-[18px] text-gray-300 dark:text-gray-600">★</span>
                        </div>
                        <span className="text-sm dark:text-gray-300">4.0 & up</span>
                    </Label>
                </div>
            </div>
        </aside>
    );
}


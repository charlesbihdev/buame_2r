import { Package, Eye, TrendingUp } from 'lucide-react';

export function Overview({ categoryData }) {
    const stats = categoryData?.stats || { total: 0, active: 0, views: 0 };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="mb-4 text-2xl font-bold text-[#0d1b0d] dark:text-white">Overview</h2>
                <p className="text-gray-600 dark:text-gray-400">Welcome to your dashboard. Select a category to get started.</p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-[#e7f3e7] dark:border-[#2a4d2a] bg-white dark:bg-[#1a331a] p-6">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-bold uppercase tracking-wide text-[#4c9a4c] dark:text-[#8fcc8f]">Total Listings</p>
                        <Package className="h-5 w-5 text-[#13ec13]" />
                    </div>
                    <p className="mt-2 text-3xl font-bold text-[#0d1b0d] dark:text-white">{stats.total || 0}</p>
                </div>

                <div className="rounded-xl border border-[#e7f3e7] dark:border-[#2a4d2a] bg-white dark:bg-[#1a331a] p-6">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-bold uppercase tracking-wide text-[#4c9a4c] dark:text-[#8fcc8f]">Active</p>
                        <TrendingUp className="h-5 w-5 text-[#13ec13]" />
                    </div>
                    <p className="mt-2 text-3xl font-bold text-[#0d1b0d] dark:text-white">{stats.active || 0}</p>
                </div>

                <div className="rounded-xl border border-[#e7f3e7] dark:border-[#2a4d2a] bg-white dark:bg-[#1a331a] p-6">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-bold uppercase tracking-wide text-[#4c9a4c] dark:text-[#8fcc8f]">Total Views</p>
                        <Eye className="h-5 w-5 text-[#13ec13]" />
                    </div>
                    <p className="mt-2 text-3xl font-bold text-[#0d1b0d] dark:text-white">{stats.views || 0}</p>
                </div>
            </div>
        </div>
    );
}


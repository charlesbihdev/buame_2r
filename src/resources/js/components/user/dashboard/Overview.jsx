import { Package, Eye, TrendingUp } from 'lucide-react';

export function Overview({ categoryData }) {
    const stats = categoryData?.stats || { total: 0, active: 0, views: 0 };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="mb-4 text-2xl font-bold text-[var(--foreground)]">Overview</h2>
                <p className="text-gray-600">Welcome to your dashboard. Select a category to get started.</p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {/* Total Listings - Green (Primary) */}
                <div className="rounded-xl border border-[var(--buame-border-light)]#2a4d2a] bg-white#1a331a] p-6">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-bold uppercase tracking-wide text-[var(--primary)]#8fcc8f]">Total Listings</p>
                        <Package className="h-5 w-5 text-[var(--primary)]" />
                    </div>
                    <p className="mt-2 text-3xl font-bold text-[var(--primary)]">{stats.total || 0}</p>
                </div>

                {/* Active - Gold (Secondary/Premium) */}
                <div className="rounded-xl border border-[var(--buame-border-light)]#2a4d2a] bg-white#1a331a] p-6">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-bold uppercase tracking-wide text-[var(--secondary)]">Active</p>
                        <TrendingUp className="h-5 w-5 text-[var(--secondary)]" />
                    </div>
                    <p className="mt-2 text-3xl font-bold text-[var(--secondary)]">{stats.active || 0}</p>
                </div>

                {/* Total Views - Blue (Accent/Info) */}
                <div className="rounded-xl border border-[var(--buame-border-light)]#2a4d2a] bg-white#1a331a] p-6">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-bold uppercase tracking-wide text-[var(--accent)]">Total Views</p>
                        <Eye className="h-5 w-5 text-[var(--accent)]" />
                    </div>
                    <p className="mt-2 text-3xl font-bold text-[var(--accent)]">{stats.views || 0}</p>
                </div>
            </div>
        </div>
    );
}


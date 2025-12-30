import VisitorLayout from '@/layouts/visitor/visitor-layout';
import { MarketplaceHero } from '@/components/visitor/marketplace/marketplace-hero';
import { MarketplaceFilters } from '@/components/visitor/marketplace/marketplace-filters';
import { MarketplaceToolbar } from '@/components/visitor/marketplace/marketplace-toolbar';
import { MarketplaceProducts } from '@/components/visitor/marketplace/marketplace-products';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { Head } from '@inertiajs/react';

export default function Marketplace() {
    return (
        <VisitorLayout>
            <Head title="Marketplace - BUAME 2R" />
            <MarketplaceHero />
            <div className="flex grow flex-col lg:flex-row">
                <MarketplaceFilters />
                <main className="flex flex-1 flex-col bg-background-light p-4 dark:bg-background-dark md:p-6 lg:p-8">
                    <MarketplaceToolbar />
                    <MarketplaceProducts />
                    {/* Load More */}
                    <div className="mt-12 flex justify-center">
                        <Button
                            variant="outline"
                            className="flex items-center justify-center gap-2 rounded-lg border border-[#e7f3e7] bg-white px-6 py-3 text-sm font-bold text-gray-700 transition-colors hover:bg-gray-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                        >
                            Load More Results
                            <ChevronDown className="h-5 w-5" />
                        </Button>
                    </div>
                </main>
            </div>
        </VisitorLayout>
    );
}


import { ProviderCTA } from '@/components/visitor/services/provider-cta';
import { ServicesGrid } from '@/components/visitor/services/services-grid';
import { ServicesHeader } from '@/components/visitor/services/services-header';
import { ServicesHero } from '@/components/visitor/services/services-hero';
import VisitorLayout from '@/layouts/visitor/visitor-layout';
import { Head } from '@inertiajs/react';

export default function Services() {
    return (
        <VisitorLayout>
            <Head title="Services - BUAME 2R" />
            <main className="flex w-full flex-1 flex-col items-center px-4 py-6 md:px-10 lg:px-20 xl:px-40">
                <div className="layout-content-container flex w-full max-w-[1200px] flex-col gap-8 md:gap-12">
                    <ServicesHero />
                    <ServicesHeader />
                    <ServicesGrid />
                    <ProviderCTA />
                </div>
            </main>
        </VisitorLayout>
    );
}

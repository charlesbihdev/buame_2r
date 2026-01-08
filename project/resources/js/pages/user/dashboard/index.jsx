import { ArtisansSection } from '@/components/user/dashboard/artisans/ArtisansSection';
import CategorySwitcher from '@/components/user/dashboard/CategorySwitcher';
import { HotelsSection } from '@/components/user/dashboard/hotels/HotelsSection';
import { JobsSection } from '@/components/user/dashboard/jobs/JobsSection';
import { MarketplaceSection } from '@/components/user/dashboard/marketplace/MarketplaceSection';
import { Overview } from '@/components/user/dashboard/Overview';
import { RentalsSection } from '@/components/user/dashboard/rentals/RentalsSection';
import { TransportSection } from '@/components/user/dashboard/transport/TransportSection';
import DashboardLayout from '@/layouts/user/dashboard-layout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ user, paidCategories, unpaidCategories, activeCategory, categoryData, payments, activeSection = 'profile' }) {
    const renderCategorySection = () => {
        if (!activeCategory) {
            return <Overview categoryData={categoryData} />;
        }

        switch (activeCategory) {
            case 'artisans':
                return <ArtisansSection activeSection={activeSection} profile={categoryData?.profile} />;
            case 'marketplace':
                return <MarketplaceSection activeTab={activeSection || 'store'} data={categoryData} />;
            case 'hotels':
                return <HotelsSection activeTab={activeSection} data={categoryData} />;
            case 'transport':
                return <TransportSection activeTab={activeSection} data={categoryData} />;
            case 'rentals':
                return <RentalsSection activeTab={activeSection} data={categoryData} />;
            case 'jobs':
                return <JobsSection activeTab={activeSection} data={categoryData} />;
            default:
                return <Overview categoryData={categoryData} />;
        }
    };

    return (
        <DashboardLayout user={user} activeCategory={activeCategory} activeSection={activeSection} categoryData={categoryData}>
            <Head title={`Dashboard - ${activeCategory ? activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1) : 'BUAME 2R'}`} />
            <div className="mx-auto w-full max-w-[1400px] p-4 md:p-6 lg:p-8">
                <CategorySwitcher paidCategories={paidCategories} activeCategory={activeCategory} unpaidCategories={unpaidCategories} />
                {renderCategorySection()}
            </div>
        </DashboardLayout>
    );
}

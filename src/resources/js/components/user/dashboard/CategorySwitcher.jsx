import PaymentModal from '@/components/user/dashboard/PaymentModal';
import SubscriptionStatusBadge from '@/components/user/SubscriptionStatusBadge';
import { switchCategory } from '@/services/dashboardNavigation';
import { Bike, Briefcase, Hammer, Home, Hotel, Lock, ShoppingBag } from 'lucide-react';
import { useState } from 'react';

const categoryConfig = {
    artisans: { label: 'Artisans', icon: Hammer, color: 'blue' },
    hotels: { label: 'Hotel', icon: Hotel, color: 'green' },
    transport: { label: 'Okada/Car', icon: Bike, color: 'orange' },
    rentals: { label: 'Rentals', icon: Home, color: 'purple' },
    marketplace: { label: 'Marketplace', icon: ShoppingBag, color: 'pink' },
    jobs: { label: 'Jobs', icon: Briefcase, color: 'gray' },
};

export default function CategorySwitcher({ paidCategories, activeCategory, unpaidCategories, isFreeAccess = false, freeAccessDays = 30 }) {
    const [paymentModalOpen, setPaymentModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleSwitch = (category) => {
        switchCategory(category);
    };

    const handleAddCategory = (category) => {
        setSelectedCategory(category);
        setPaymentModalOpen(true);
    };

    const closePaymentModal = () => {
        setPaymentModalOpen(false);
        setSelectedCategory(null);
    };

    return (
        <div className="mb-6 rounded-xl border border-[var(--buame-border-light)] bg-white p-4#2a4d2a]#1a331a]">
            <h3 className="mb-4 text-sm font-bold tracking-wide text-[#4c9a4c] uppercase#8fcc8f]">Your Categories</h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                {Object.entries(categoryConfig).map(([value, config]) => {
                    const Icon = config.icon;
                    const subscription = paidCategories?.find((cat) => cat.category === value);
                    const isPaid = !!subscription;
                    const isActive = activeCategory === value;

                    if (isPaid) {
                        return (
                            <button
                                key={value}
                                onClick={() => !isActive && handleSwitch(value)}
                                className={`flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 p-3 transition-all ${
                                    isActive
                                        ? 'border-[var(--primary)] bg-[var(--primary)]/10'
                                        : 'border-[var(--buame-border-light)] hover:border-[var(--primary)]/50#2a4d2a]'
                                }`}
                            >
                                <div
                                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                                        isActive ? 'bg-[var(--primary)] text-white' : 'bg-[var(--primary)]/10 text-[var(--primary)]'
                                    }`}
                                >
                                    <Icon className="h-5 w-5" />
                                </div>
                                <span
                                    className={`text-xs font-semibold ${
                                        isActive ? 'text-[var(--foreground)]' : 'text-[#4c9a4c]#8fcc8f]'
                                    }`}
                                >
                                    {config.label}
                                </span>
                                {subscription && (
                                    <SubscriptionStatusBadge
                                        status={subscription.subscription_status}
                                        expiresAt={subscription.expires_at}
                                        showExpiry={false}
                                        size="small"
                                    />
                                )}
                            </button>
                        );
                    }

                    return (
                        <button
                            key={value}
                            onClick={() => handleAddCategory(value)}
                            className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed border-gray-300 p-3 opacity-60 transition-opacity hover:opacity-100"
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-400">
                                <Lock className="h-5 w-5" />
                            </div>
                            <span className="text-xs font-semibold text-gray-500">{config.label}</span>
                        </button>
                    );
                })}
            </div>

            {/* Payment Modal */}
            <PaymentModal
                isOpen={paymentModalOpen}
                onClose={closePaymentModal}
                category={selectedCategory}
                isFreeAccess={isFreeAccess}
                freeAccessDays={freeAccessDays}
            />
        </div>
    );
}

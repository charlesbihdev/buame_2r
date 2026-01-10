import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { router, usePage } from '@inertiajs/react';
import { AlertCircle, Bike, Briefcase, CheckCircle, CreditCard, Hammer, Home, Hotel, ShoppingBag } from 'lucide-react';
import { useState } from 'react';

const categoryIcons = {
    artisans: Hammer,
    hotels: Hotel,
    transport: Bike,
    rentals: Home,
    marketplace: ShoppingBag,
    jobs: Briefcase,
};

export default function PaymentModal({ isOpen, onClose, category }) {
    const [isProcessing, setIsProcessing] = useState(false);
    const [selectedTier, setSelectedTier] = useState('starter');
    const { categories } = usePage().props;

    const categoryData = categories?.[category];
    if (!categoryData) return null;

    const Icon = categoryIcons[category] || Briefcase;
    const tiers = categoryData.tiers;
    const isMarketplace = category === 'marketplace';

    // Calculate display amount based on tier for marketplace
    const displayAmount = isMarketplace && tiers && tiers[selectedTier] ? tiers[selectedTier].price : categoryData.price;

    const handlePayment = () => {
        setIsProcessing(true);
        const data = { category };

        // console.log(data);
        // Only include tier for marketplace
        if (isMarketplace) {
            data.tier = selectedTier;
        }
        console.log(data);

        router.post(route('user.dashboard.payment.initialize'), data, {
            onFinish: () => setIsProcessing(false),
            onError: () => setIsProcessing(false),
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="flex max-h-[90vh] flex-col sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl font-bold">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--primary)]/10">
                            <Icon className="h-5 w-5 text-[var(--primary)]" />
                        </div>
                        Add {categoryData.label} Category
                    </DialogTitle>
                    <DialogDescription>Subscribe to the {categoryData.label} category to start using its features</DialogDescription>
                </DialogHeader>

                <div className="flex-1 space-y-4 overflow-y-auto py-4">
                    {/* Tier Selection for Marketplace */}
                    {isMarketplace && tiers && (
                        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
                            <h3 className="mb-3 text-sm font-bold text-[var(--foreground)] dark:text-white">Select Your Store Plan</h3>
                            <div className="space-y-2">
                                {Object.entries(tiers).map(([tierKey, tier]) => (
                                    <button
                                        key={tierKey}
                                        type="button"
                                        onClick={() => setSelectedTier(tierKey)}
                                        className={`w-full rounded-lg border-2 p-3 text-left transition-all ${
                                            selectedTier === tierKey
                                                ? 'border-[var(--primary)] bg-[var(--primary)]/10'
                                                : 'border-gray-200 bg-white hover:border-[var(--primary)]/50 dark:border-gray-700 dark:bg-[var(--card)]'
                                        }`}
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2">
                                                    <h4 className="text-sm font-bold text-[var(--foreground)] dark:text-white">{tier.name}</h4>
                                                    {selectedTier === tierKey && <CheckCircle className="h-4 w-4 text-[var(--primary)]" />}
                                                </div>
                                                <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">{tier.description}</p>
                                                <p className="mt-1 text-xs text-gray-500">Up to {tier.product_limit} products</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-lg font-bold text-[var(--primary)]">GH₵ {tier.price}</p>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Price Card */}
                    <div className="rounded-lg border-2 border-[var(--primary)]/20 bg-[var(--primary)]/5 p-4">
                        <div className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">Subscription Fee</div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-black text-[var(--foreground)] dark:text-white">GH₵ {displayAmount.toFixed(2)}</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">one-time</span>
                        </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-2">
                        <div className="text-sm font-semibold text-[var(--foreground)] dark:text-white">What you'll get:</div>
                        <ul className="space-y-1.5 text-sm text-gray-600 dark:text-gray-400">
                            <li className="flex items-start gap-2">
                                <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--primary)]" />
                                <span>Full access to {categoryData.label} dashboard</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--primary)]" />
                                <span>Create and manage your profile</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--primary)]" />
                                <span>Receive customer inquiries</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--primary)]" />
                                <span>Showcase your services to visitors</span>
                            </li>
                        </ul>
                    </div>

                    {/* Payment Info - Blue for trust/information */}
                    <div className="flex items-start gap-2 rounded-lg border border-[var(--accent)]/30 bg-[var(--accent)]/10 p-3 dark:border-[var(--accent)]/20 dark:bg-[var(--accent)]/5">
                        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)] dark:text-[var(--accent)]" />
                        <p className="text-xs text-[var(--accent)] dark:text-[var(--accent)]/80">
                            You'll be redirected to Paystack for secure payment processing. After successful payment, you'll be automatically
                            redirected back to your dashboard.
                        </p>
                    </div>
                </div>

                <DialogFooter className="gap-2 sm:gap-0">
                    <Button type="button" variant="outline" onClick={onClose} disabled={isProcessing}>
                        Cancel
                    </Button>
                    <Button
                        type="button"
                        onClick={handlePayment}
                        disabled={isProcessing}
                        className="cursor-pointer gap-2 bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90"
                    >
                        {isProcessing ? (
                            <>
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--foreground)] border-t-transparent" />
                                Processing...
                            </>
                        ) : (
                            <>
                                <CreditCard className="h-4 w-4" />
                                Pay GH₵ {displayAmount.toFixed(2)}
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

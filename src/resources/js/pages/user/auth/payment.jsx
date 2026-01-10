import { Button } from '@/components/ui/button';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { Check, CheckCircle, CreditCard } from 'lucide-react';
import { useState } from 'react';

const categoryLabels = {
    artisans: 'Artisans',
    hotels: 'Hotel',
    transport: 'Okada',
    rentals: 'Rentals',
    marketplace: 'Marketplace',
    jobs: 'Jobs',
};

export default function Payment({ category, amount, categories, user, tiers, selectedTier }) {
    const [selectedTierState, setSelectedTierState] = useState(selectedTier || 'starter');
    const { data, setData, post, processing, errors } = useForm({
        category: category,
        tier: category === 'marketplace' ? selectedTier || 'starter' : undefined,
    });

    const handleTierChange = (tierKey) => {
        setSelectedTierState(tierKey);
        setData('tier', tierKey);
    };

    const submit = (e) => {
        e.preventDefault();

        // Prepare form data
        const formData = {
            category: category,
        };

        // Only include tier for marketplace
        if (category === 'marketplace') {
            formData.tier = selectedTierState || 'starter';
        }

        console.log('Submitting payment with data:', formData);

        // Use router.post directly to ensure data is sent correctly
        router.post(route('user.register.payment'), formData, {
            onError: (errors) => {
                console.error('Payment submission errors:', errors);
            },
            onSuccess: () => {
                console.log('Payment submitted successfully');
            },
        });
    };

    // Calculate amount based on selected tier
    const displayAmount = category === 'marketplace' && tiers && tiers[selectedTierState] ? tiers[selectedTierState].price : amount;

    return (
        <>
            <Head title="Payment" />

            <div className="flex min-h-screen items-center justify-center bg-[#f6f8f6] px-4 py-12 dark:bg-[var(--buame-background-dark)]">
                <div className="w-full max-w-2xl">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold text-[var(--foreground)] dark:text-white">Complete Payment</h1>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">You're almost there! Complete payment to activate your account.</p>
                    </div>

                    <div className="rounded-2xl border border-[var(--buame-border-light)] bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                        {/* Category Switcher */}
                        {categories && categories.length > 1 && (
                            <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
                                <p className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">Want to switch category?</p>
                                <div className="flex flex-wrap gap-2">
                                    {categories.map((cat) => (
                                        <Link
                                            key={cat.value}
                                            href={route('user.register', { category: cat.value })}
                                            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                                                cat.value === category
                                                    ? 'bg-[var(--primary)] text-white'
                                                    : 'bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'
                                            }`}
                                        >
                                            {cat.label} (GH₵ {cat.price})
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Tier Selection for Marketplace */}
                        {category === 'marketplace' && tiers && (
                            <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
                                <h3 className="mb-4 text-lg font-bold text-[var(--foreground)] dark:text-white">Select Your Store Plan</h3>
                                <div className="space-y-3">
                                    {Object.entries(tiers).map(([tierKey, tier]) => (
                                        <button
                                            key={tierKey}
                                            type="button"
                                            onClick={() => handleTierChange(tierKey)}
                                            className={`w-full rounded-lg border-2 p-4 text-left transition-all ${
                                                selectedTierState === tierKey
                                                    ? 'border-[var(--primary)] bg-[var(--primary)]/10'
                                                    : 'border-gray-200 bg-white hover:border-[var(--primary)]/50 dark:border-gray-700 dark:bg-[var(--card)]'
                                            }`}
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2">
                                                        <h4 className="font-bold text-[var(--foreground)] dark:text-white">{tier.name}</h4>
                                                        {selectedTierState === tierKey && <CheckCircle className="h-5 w-5 text-[var(--primary)]" />}
                                                    </div>
                                                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{tier.description}</p>
                                                    <p className="mt-2 text-xs text-gray-500">Up to {tier.product_limit} products</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-xl font-bold text-[var(--primary)]">GH₵ {tier.price}</p>
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Order Summary */}
                        <div className="mb-8 rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
                            <h3 className="mb-4 text-lg font-bold text-[var(--foreground)] dark:text-white">Order Summary</h3>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600 dark:text-gray-400">Category</span>
                                    <span className="font-semibold text-[var(--foreground)] dark:text-white">{categoryLabels[category]}</span>
                                </div>
                                {category === 'marketplace' && tiers && tiers[selectedTierState] && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">Plan</span>
                                        <span className="font-semibold text-[var(--foreground)] dark:text-white">{tiers[selectedTierState].name}</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600 dark:text-gray-400">Registration Fee</span>
                                    <span className="font-semibold text-[var(--foreground)] dark:text-white">GH₵ {displayAmount}</span>
                                </div>
                                <div className="border-t border-gray-200 pt-2 dark:border-gray-700">
                                    <div className="flex justify-between">
                                        <span className="font-bold text-[var(--foreground)] dark:text-white">Total</span>
                                        <span className="text-2xl font-bold text-[var(--primary)]">GH₵ {displayAmount}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={submit} className="space-y-6">
                            {/* Paystack Payment Option */}
                            <div>
                                <label className="mb-3 block text-sm font-semibold text-[var(--foreground)] dark:text-white">Payment Method</label>
                                <div className="rounded-lg border-2 border-[var(--primary)] bg-[var(--primary)]/10 p-4">
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--primary)] text-white">
                                            <CreditCard className="h-6 w-6" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-semibold text-[var(--foreground)] dark:text-white">Paystack</p>
                                            <p className="text-xs text-gray-600 dark:text-gray-400">
                                                Secure payment via card, bank transfer, or mobile money
                                            </p>
                                        </div>
                                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--primary)]">
                                            <Check className="h-3 w-3 text-white" />
                                        </div>
                                    </div>
                                </div>
                                {errors.payment && <p className="mt-2 text-sm text-red-600">{errors.payment}</p>}
                            </div>

                            <Button
                                type="submit"
                                disabled={processing}
                                className="h-12 w-full bg-[var(--primary)] text-base font-bold text-white hover:bg-[#0eb50e] disabled:opacity-50"
                            >
                                {processing ? 'Redirecting to Paystack...' : `Pay GH₵ ${displayAmount} with Paystack`}
                            </Button>
                        </form>

                        <div className="mt-6 rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
                            <p className="text-sm text-blue-800 dark:text-blue-300">
                                🔒 <strong>Secure Payment:</strong> You'll be redirected to Paystack's secure payment page to complete your
                                transaction.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

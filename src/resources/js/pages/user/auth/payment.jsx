import { Button } from '@/components/ui/button';
import BillingCycleSelector from '@/components/user/BillingCycleSelector';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { Check, CheckCircle, CreditCard, Gift } from 'lucide-react';
import { useState } from 'react';

const categoryLabels = {
    artisans: 'Artisans',
    hotels: 'Hotel',
    transport: 'Okada',
    rentals: 'Rentals',
    marketplace: 'Marketplace',
    jobs: 'Jobs',
};

export default function Payment({ category, amount, categories, user, tiers, selectedTier, categoryConfig, isFreeAccess, freeAccessDays }) {
    const [selectedTierState, setSelectedTierState] = useState(selectedTier || 'starter');
    const [billingCycle, setBillingCycle] = useState('monthly');

    const { data, setData, post, processing, errors } = useForm({
        category: category,
        tier: category === 'marketplace' ? selectedTier || 'starter' : undefined,
        billing_cycle: 'monthly',
    });

    const handleTierChange = (tierKey) => {
        setSelectedTierState(tierKey);
        setData('tier', tierKey);
    };

    const handleBillingCycleChange = (cycle) => {
        setBillingCycle(cycle);
        setData('billing_cycle', cycle);
    };

    const submit = (e) => {
        e.preventDefault();

        const formData = {
            category: category,
        };

        if (category === 'marketplace') {
            formData.tier = selectedTierState || 'starter';
        }

        if (isFreeAccess) {
            // Submit to free access route
            router.post(route('user.register.free-access'), formData, {
                onError: (errors) => {
                    console.error('Free access errors:', errors);
                },
            });
        } else {
            // Normal Paystack payment
            formData.billing_cycle = billingCycle;
            router.post(route('user.register.payment'), formData, {
                onError: (errors) => {
                    console.error('Payment submission errors:', errors);
                },
            });
        }
    };

    // Get pricing based on category and tier
    const getPricing = () => {
        if (category === 'marketplace' && tiers && tiers[selectedTierState]?.pricing) {
            return tiers[selectedTierState].pricing;
        }
        if (categoryConfig?.pricing) {
            return categoryConfig.pricing;
        }
        // Fallback pricing calculation
        return {
            monthly: amount,
            biannually: amount * 5.4,
            annual: amount * 9.6,
        };
    };

    const pricing = getPricing();
    const displayAmount = pricing[billingCycle] || amount;

    const getBillingCycleLabel = () => {
        switch (billingCycle) {
            case 'biannually':
                return '6 months';
            case 'annual':
                return '12 months';
            default:
                return '1 month';
        }
    };

    return (
        <>
            <Head title={isFreeAccess ? 'Activate Free Access' : 'Payment'} />

            <div className="flex min-h-screen items-center justify-center bg-[#f6f8f6] px-4 py-12 dark:bg-[var(--buame-background-dark)]">
                <div className="w-full max-w-2xl">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold text-[var(--foreground)] dark:text-white">
                            {isFreeAccess ? 'Activate Free Access' : 'Complete Payment'}
                        </h1>
                        <p className="mt-2 text-gray-600 dark:text-gray-400">
                            {isFreeAccess
                                ? 'Select your category to get started with free access!'
                                : "You're almost there! Complete payment to activate your account."}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-[var(--buame-border-light)] bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                        {/* Category Selection/Switcher - Always show */}
                        {categories && categories.length > 0 && (
                            <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
                                <p className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    {category ? 'Want to switch category?' : 'Select a Category'}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {categories.map((cat) => (
                                        <Link
                                            key={cat.value}
                                            href={route('user.register.payment', { category: cat.value })}
                                            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                                                cat.value === category
                                                    ? 'bg-[var(--primary)] text-white'
                                                    : 'bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600'
                                            }`}
                                        >
                                            {cat.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Free Access Banner */}
                        {isFreeAccess && (
                            <div className="mb-6 rounded-lg border-2 border-green-500 bg-green-50 p-6 dark:border-green-600 dark:bg-green-900/20">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-500 text-white">
                                        <Gift className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-green-700 dark:text-green-300">Free Access Period</h3>
                                        <p className="mt-1 text-green-600 dark:text-green-400">
                                            Get <strong>{freeAccessDays} days</strong> free access. No payment
                                            required!
                                        </p>
                                        <p className="mt-2 text-sm text-green-600 dark:text-green-400">
                                            After your free period ends, you'll receive reminders to subscribe and continue using the platform.
                                        </p>
                                    </div>
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
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Billing Cycle Selector - Hidden in free access mode */}
                        {!isFreeAccess && (
                            <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
                                <BillingCycleSelector selected={billingCycle} onChange={handleBillingCycleChange} pricing={pricing} />
                            </div>
                        )}

                        {/* Order Summary */}
                        <div className="mb-8 rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800">
                            <h3 className="mb-4 text-lg font-bold text-[var(--foreground)] dark:text-white">
                                {isFreeAccess ? 'Selection Summary' : 'Order Summary'}
                            </h3>
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
                                {isFreeAccess ? (
                                    <>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600 dark:text-gray-400">Access Period</span>
                                            <span className="font-semibold text-[var(--foreground)] dark:text-white">{freeAccessDays} days</span>
                                        </div>
                                        <div className="border-t border-gray-200 pt-2 dark:border-gray-700">
                                            <div className="flex justify-between">
                                                <span className="font-bold text-[var(--foreground)] dark:text-white">Total</span>
                                                <div className="text-right">
                                                    <span className="text-2xl font-bold text-green-600">FREE</span>
                                                    <p className="text-xs text-gray-500">for {freeAccessDays} days</p>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600 dark:text-gray-400">Billing Cycle</span>
                                            <span className="font-semibold text-[var(--foreground)] dark:text-white capitalize">{billingCycle}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600 dark:text-gray-400">Subscription Fee</span>
                                            <span className="font-semibold text-[var(--foreground)] dark:text-white">
                                                GH₵ {displayAmount?.toFixed(2) || amount}
                                            </span>
                                        </div>
                                        <div className="border-t border-gray-200 pt-2 dark:border-gray-700">
                                            <div className="flex justify-between">
                                                <span className="font-bold text-[var(--foreground)] dark:text-white">Total</span>
                                                <div className="text-right">
                                                    <span className="text-2xl font-bold text-[var(--primary)]">
                                                        GH₵ {displayAmount?.toFixed(2) || amount}
                                                    </span>
                                                    <p className="text-xs text-gray-500">/ {getBillingCycleLabel()}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        <form onSubmit={submit} className="space-y-6">
                            {/* Paystack Payment Option - Hidden in free access mode */}
                            {!isFreeAccess && (
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
                                </div>
                            )}

                            {errors.payment && <p className="text-sm text-red-600">{errors.payment}</p>}
                            {errors.billing_cycle && <p className="text-sm text-red-600">{errors.billing_cycle}</p>}

                            <Button
                                type="submit"
                                disabled={processing}
                                className={`h-12 w-full text-base font-bold text-white disabled:opacity-50 ${
                                    isFreeAccess ? 'bg-green-600 hover:bg-green-700' : 'bg-[var(--primary)] hover:bg-[#0eb50e]'
                                }`}
                            >
                                {processing
                                    ? isFreeAccess
                                        ? 'Activating...'
                                        : 'Redirecting to Paystack...'
                                    : isFreeAccess
                                      ? `Activate ${freeAccessDays}-Day Free Access`
                                      : `Pay GH₵ ${displayAmount?.toFixed(2) || amount} with Paystack`}
                            </Button>
                        </form>

                        <div className={`mt-6 rounded-lg p-4 ${isFreeAccess ? 'bg-green-50 dark:bg-green-900/20' : 'bg-blue-50 dark:bg-blue-900/20'}`}>
                            <p className={`text-sm ${isFreeAccess ? 'text-green-800 dark:text-green-300' : 'text-blue-800 dark:text-blue-300'}`}>
                                {isFreeAccess ? (
                                    <>
                                        Your free access will be active for <strong>{freeAccessDays} days</strong>. We'll send you reminders before it
                                        expires so you can subscribe to continue using the platform.
                                    </>
                                ) : (
                                    <>
                                        Your subscription will be active for <strong>{getBillingCycleLabel()}</strong>. We'll send you reminders before
                                        it expires so you can renew on time.
                                    </>
                                )}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

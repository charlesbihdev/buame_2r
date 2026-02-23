import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import BillingCycleSelector from '@/components/user/BillingCycleSelector';
import { router, usePage } from '@inertiajs/react';
import {
    AlertCircle,
    Bike,
    Briefcase,
    Camera,
    CheckCircle,
    CreditCard,
    Eye,
    Gift,
    Hammer,
    Home,
    Hotel,
    ImageIcon,
    LayoutDashboard,
    MapPin,
    MessageSquare,
    Phone,
    ShoppingBag,
    Star,
    Store,
    Users,
} from 'lucide-react';
import { useState } from 'react';

const categoryIcons = {
    artisans: Hammer,
    hotels: Hotel,
    transport: Bike,
    rentals: Home,
    marketplace: ShoppingBag,
    jobs: Briefcase,
};

const categoryBenefits = {
    artisans: [
        { icon: Eye, text: 'Your profile visible to customers searching for your skill' },
        { icon: ImageIcon, text: 'Upload photos of your past work as a portfolio' },
        { icon: Phone, text: 'Customers contact you directly via call or WhatsApp' },
        { icon: Star, text: 'Collect reviews and build your reputation' },
    ],
    hotels: [
        { icon: Camera, text: 'Show off your hotel with a beautiful photo gallery' },
        { icon: MapPin, text: 'Appear in local search so guests find you first' },
        { icon: Phone, text: 'Guests reach you directly to book rooms' },
        { icon: Star, text: 'Build trust with guest ratings and reviews' },
    ],
    transport: [
        { icon: Eye, text: 'Get listed so passengers can find and call you' },
        { icon: Phone, text: 'Your number, your passengers, no middleman' },
        { icon: MapPin, text: 'Show your service area so nearby people find you' },
        { icon: Star, text: 'Build a trusted name with rider reviews' },
    ],
    rentals: [
        { icon: Camera, text: 'Upload property photos that attract tenants fast' },
        { icon: Eye, text: 'Your listing seen by hundreds of people searching' },
        { icon: Phone, text: 'Tenants contact you direct, no agent wahala' },
        { icon: MapPin, text: 'Show your property location for easy discovery' },
    ],
    marketplace: [
        { icon: Store, text: 'Your own seller profile, like a shop that never closes' },
        { icon: ShoppingBag, text: 'List all your products with photos and prices' },
        { icon: Phone, text: 'Buyers call or WhatsApp you to purchase directly' },
        { icon: Users, text: 'Reach more buyers than word of mouth ever could' },
    ],
    jobs: [
        { icon: LayoutDashboard, text: 'Post job openings and manage listings easily' },
        { icon: Users, text: 'Skilled local workers see your posting and reach out' },
        { icon: Phone, text: 'Candidates contact you directly to apply' },
        { icon: MessageSquare, text: 'Describe exactly what you need, attract the right fit' },
    ],
};

export default function PaymentModal({ isOpen, onClose, category, subscription, isFreeAccess = false, freeAccessDays = 30 }) {
    const [isProcessing, setIsProcessing] = useState(false);
    const [selectedTier, setSelectedTier] = useState('starter');
    const isRenewal =
        subscription &&
        (subscription.subscription_status === 'expired' ||
            subscription.subscription_status === 'grace_period' ||
            subscription.is_expiring_soon);
    const [billingCycle, setBillingCycle] = useState(subscription?.billing_cycle || 'monthly');
    const { categories } = usePage().props;

    const categoryData = categories?.[category];
    if (!categoryData) return null;

    const Icon = categoryIcons[category] || Briefcase;
    const tiers = categoryData.tiers;
    const isMarketplace = category === 'marketplace';
    const benefits = categoryBenefits[category] || categoryBenefits.artisans;

    // Get pricing based on category and tier
    const getPricing = () => {
        if (isMarketplace && tiers && tiers[selectedTier]?.pricing) {
            return tiers[selectedTier].pricing;
        }
        return (
            categoryData.pricing || {
                monthly: categoryData.price,
                biannually: categoryData.price * 5.4,
                annual: categoryData.price * 9.6,
            }
        );
    };

    const pricing = getPricing();
    const displayAmount = pricing[billingCycle] || categoryData.price;

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

    const handlePayment = () => {
        setIsProcessing(true);

        const data = {
            category,
        };

        if (isMarketplace) {
            data.tier = selectedTier;
        }

        // If free access is enabled, use free access route
        if (isFreeAccess) {
            router.post(route('user.dashboard.free-access'), data, {
                onFinish: () => {
                    setIsProcessing(false);
                    onClose();
                },
                onError: () => setIsProcessing(false),
            });
            return;
        }

        // Otherwise, use normal payment flow
        data.billing_cycle = billingCycle;
        router.post(route('user.dashboard.payment.initialize'), data, {
            onFinish: () => setIsProcessing(false),
            onError: () => setIsProcessing(false),
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="flex max-h-[90vh] flex-col gap-0 overflow-hidden p-0 sm:max-w-lg">
                {/* Header with colored accent */}
                <div className="relative bg-gradient-to-br from-[var(--primary)] to-[var(--primary)]/80 px-6 pb-5 pt-6 text-white">
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                            <Icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <DialogHeader className="space-y-0">
                                <DialogTitle className="text-lg font-bold text-white">
                                    {isRenewal ? `Renew ${categoryData.label}` : `Get ${categoryData.label}`}
                                </DialogTitle>
                                <DialogDescription className="text-sm text-white/70">
                                    {isRenewal
                                        ? 'Continue where you left off'
                                        : `Unlock your ${categoryData.label.toLowerCase()} presence`}
                                </DialogDescription>
                            </DialogHeader>
                        </div>
                    </div>

                    {/* Free Access Badge inline */}
                    {isFreeAccess && (
                        <div className="mt-4 flex items-center gap-2.5 rounded-lg bg-white/15 px-3.5 py-2.5 backdrop-blur-sm">
                            <Gift className="h-5 w-5 shrink-0 text-green-300" />
                            <div className="min-w-0">
                                <span className="text-sm font-semibold text-white">
                                    {freeAccessDays} days free
                                </span>
                                <span className="ml-1.5 text-xs text-white/70">No payment needed to start</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Scrollable body */}
                <div className="flex-1 space-y-5 overflow-y-auto px-6 py-5">
                    {/* Tier Selection for Marketplace */}
                    {isMarketplace && tiers && (
                        <div>
                            <h3 className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                Choose your plan
                            </h3>
                            <div className="space-y-2">
                                {Object.entries(tiers).map(([tierKey, tier]) => (
                                    <button
                                        key={tierKey}
                                        type="button"
                                        onClick={() => setSelectedTier(tierKey)}
                                        className={`w-full rounded-xl border-2 p-3.5 text-left transition-all ${
                                            selectedTier === tierKey
                                                ? 'border-[var(--primary)] bg-[var(--primary)]/5 ring-1 ring-[var(--primary)]/20'
                                                : 'border-border bg-card hover:border-[var(--primary)]/40'
                                        }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2">
                                                    <h4 className="text-sm font-bold text-foreground">{tier.name}</h4>
                                                    {selectedTier === tierKey && (
                                                        <CheckCircle className="h-4 w-4 text-[var(--primary)]" />
                                                    )}
                                                </div>
                                                <p className="mt-0.5 text-xs text-muted-foreground">{tier.description}</p>
                                            </div>
                                            <span className="text-xs font-medium text-muted-foreground">
                                                Up to {tier.product_limit} products
                                            </span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Billing Cycle Selector - Hide when using free access */}
                    {!isFreeAccess && <BillingCycleSelector selected={billingCycle} onChange={setBillingCycle} pricing={pricing} />}

                    {/* Price Display - Hide when using free access */}
                    {!isFreeAccess && (
                        <div className="flex items-baseline gap-2 rounded-xl bg-muted/50 px-4 py-3">
                            <span className="text-3xl font-black text-foreground">
                                GH&#8373; {displayAmount?.toFixed(2) || '0.00'}
                            </span>
                            <span className="text-sm text-muted-foreground">/ {getBillingCycleLabel()}</span>
                        </div>
                    )}

                    {/* Category-specific benefits */}
                    <div>
                        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            What you get
                        </h3>
                        <div className="grid grid-cols-1 gap-2.5">
                            {benefits.map((benefit, index) => {
                                const BenefitIcon = benefit.icon;
                                return (
                                    <div key={index} className="flex items-start gap-3 rounded-lg">
                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--primary)]/10">
                                            <BenefitIcon className="h-4 w-4 text-[var(--primary)]" />
                                        </div>
                                        <span className="pt-1 text-sm text-foreground">{benefit.text}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Payment Info - Hide when using free access */}
                    {!isFreeAccess && (
                        <div className="flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50 p-3">
                            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                            <p className="text-xs leading-relaxed text-amber-700">
                                You'll be redirected to Paystack for secure payment. Active for {getBillingCycleLabel()}, with
                                reminders before expiry.
                            </p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="border-t border-border px-6 py-4">
                    <div className="flex gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            disabled={isProcessing}
                            className="flex-1"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="button"
                            onClick={handlePayment}
                            disabled={isProcessing}
                            className="flex-[2] cursor-pointer gap-2 bg-[var(--primary)] font-semibold text-white hover:bg-[var(--primary)]/90"
                        >
                            {isProcessing ? (
                                <>
                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                    Processing...
                                </>
                            ) : isFreeAccess ? (
                                <>
                                    <Gift className="h-4 w-4" />
                                    Start {freeAccessDays}-Day Free Trial
                                </>
                            ) : (
                                <>
                                    <CreditCard className="h-4 w-4" />
                                    {isRenewal ? 'Renew' : 'Pay'} GH&#8373; {displayAmount?.toFixed(2) || '0.00'}
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

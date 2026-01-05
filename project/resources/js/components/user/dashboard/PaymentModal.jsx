import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { router, usePage } from '@inertiajs/react';
import { AlertCircle, Bike, Briefcase, CreditCard, Hammer, Home, Hotel, ShoppingBag } from 'lucide-react';
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
    const { categories } = usePage().props;

    const categoryData = categories?.[category];
    if (!categoryData) return null;

    const Icon = categoryIcons[category] || Briefcase;

    const handlePayment = () => {
        setIsProcessing(true);
        router.post(
            route('user.dashboard.payment.initialize'),
            { category },
            {
                onFinish: () => setIsProcessing(false),
                onError: () => setIsProcessing(false),
            },
        );
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl font-bold">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#13ec13]/10">
                            <Icon className="h-5 w-5 text-[#13ec13]" />
                        </div>
                        Add {categoryData.label} Category
                    </DialogTitle>
                    <DialogDescription>Subscribe to the {categoryData.label} category to start using its features</DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    {/* Price Card */}
                    <div className="rounded-lg border-2 border-[#13ec13]/20 bg-[#13ec13]/5 p-4">
                        <div className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">Subscription Fee</div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-black text-[#0d1b0d] dark:text-white">GH₵ {categoryData.price.toFixed(2)}</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">one-time</span>
                        </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-2">
                        <div className="text-sm font-semibold text-[#0d1b0d] dark:text-white">What you'll get:</div>
                        <ul className="space-y-1.5 text-sm text-gray-600 dark:text-gray-400">
                            <li className="flex items-start gap-2">
                                <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#13ec13]" />
                                <span>Full access to {categoryData.label} dashboard</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#13ec13]" />
                                <span>Create and manage your profile</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#13ec13]" />
                                <span>Receive customer inquiries</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#13ec13]" />
                                <span>Showcase your services to visitors</span>
                            </li>
                        </ul>
                    </div>

                    {/* Payment Info */}
                    <div className="flex items-start gap-2 rounded-lg border border-blue-200 bg-blue-50 p-3 dark:border-blue-900 dark:bg-blue-950/20">
                        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" />
                        <p className="text-xs text-blue-800 dark:text-blue-300">
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
                        className="cursor-pointer gap-2 bg-[#13ec13] text-[#0d1b0d] hover:bg-[#0ea80e]"
                    >
                        {isProcessing ? (
                            <>
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#0d1b0d] border-t-transparent" />
                                Processing...
                            </>
                        ) : (
                            <>
                                <CreditCard className="h-4 w-4" />
                                Pay GH₵ {categoryData.price.toFixed(2)}
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

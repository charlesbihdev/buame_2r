import { router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { CreditCard, Plus, CheckCircle, XCircle, Clock } from 'lucide-react';

export function PaymentSection({ payments, paidCategories }) {
    const handleAddCategory = () => {
        router.visit(route('choose-path'));
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-[var(--foreground)] dark:text-white">Payment Management</h2>
                <Button onClick={handleAddCategory} className="bg-[var(--primary)] text-white hover:bg-[#0eb50e]">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Category
                </Button>
            </div>

            <div className="rounded-xl border border-[var(--buame-border-light)] dark:border-[#2a4d2a] bg-white dark:bg-[#1a331a] p-6">
                <h3 className="mb-4 text-lg font-bold text-[var(--foreground)] dark:text-white">Payment History</h3>
                {payments && payments.length > 0 ? (
                    <div className="space-y-3">
                        {payments.map((payment) => (
                            <div
                                key={payment.id}
                                className="flex items-center justify-between rounded-lg border border-[var(--buame-border-light)] dark:border-[#2a4d2a] p-4"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--primary)]/10">
                                        <CreditCard className="h-5 w-5 text-[var(--primary)]" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-[var(--foreground)] dark:text-white">
                                            {payment.category.charAt(0).toUpperCase() + payment.category.slice(1)}
                                        </p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            {new Date(payment.created_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="font-bold text-[var(--foreground)] dark:text-white">GH₵ {payment.amount}</span>
                                    {payment.status === 'completed' ? (
                                        <CheckCircle className="h-5 w-5 text-green-500" />
                                    ) : payment.status === 'pending' ? (
                                        <Clock className="h-5 w-5 text-yellow-500" />
                                    ) : (
                                        <XCircle className="h-5 w-5 text-red-500" />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-600 dark:text-gray-400">No payment history yet.</p>
                )}
            </div>
        </div>
    );
}


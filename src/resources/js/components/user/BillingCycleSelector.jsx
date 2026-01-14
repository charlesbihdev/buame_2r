import { CheckCircle } from 'lucide-react';

const cycles = [
    { key: 'monthly', label: 'Monthly', badge: null, months: 1 },
    { key: 'biannually', label: 'Biannually', badge: 'Save 10%', months: 6 },
    { key: 'annual', label: 'Annual', badge: 'Save 20%', months: 12 },
];

export default function BillingCycleSelector({ selected, onChange, pricing }) {
    const getMonthlyEquivalent = (cycleKey, price) => {
        const cycle = cycles.find((c) => c.key === cycleKey);
        if (!cycle || !price) return null;
        return (price / cycle.months).toFixed(2);
    };

    return (
        <div className="space-y-3">
            <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300">Select Billing Cycle</h3>
            <div className="grid grid-cols-3 gap-3">
                {cycles.map((cycle) => {
                    const price = pricing?.[cycle.key];
                    const monthlyEquiv = getMonthlyEquivalent(cycle.key, price);

                    return (
                        <button
                            key={cycle.key}
                            type="button"
                            onClick={() => onChange(cycle.key)}
                            className={`relative rounded-lg border-2 p-3 text-center transition-all ${
                                selected === cycle.key
                                    ? 'border-[var(--primary)] bg-[var(--primary)]/10'
                                    : 'border-gray-200 hover:border-[var(--primary)]/50 dark:border-gray-700 dark:hover:border-[var(--primary)]/50'
                            }`}
                        >
                            {cycle.badge && (
                                <span className="absolute -top-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-green-500 px-2 py-0.5 text-[10px] font-bold text-white">
                                    {cycle.badge}
                                </span>
                            )}
                            <div className="flex flex-col items-center gap-1 pt-1">
                                {selected === cycle.key && <CheckCircle className="h-4 w-4 text-[var(--primary)]" />}
                                <span className="text-sm font-semibold text-[var(--foreground)] dark:text-white">{cycle.label}</span>
                                <span className="text-lg font-bold text-[var(--primary)]">GH₵ {price?.toFixed(2) || '0.00'}</span>
                                {cycle.key !== 'monthly' && monthlyEquiv && (
                                    <span className="text-[10px] text-gray-500 dark:text-gray-400">GH₵ {monthlyEquiv}/mo</span>
                                )}
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

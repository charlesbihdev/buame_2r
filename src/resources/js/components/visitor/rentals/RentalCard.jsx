import { MapPin, Home, Wrench, Tractor, Car, Store, Building2, Map } from 'lucide-react';
import { Link } from '@inertiajs/react';

// Rental type icon mapping
const typeIcons = {
    house: Home,
    equipment: Tractor,
    tools: Wrench,
    land: Map,
    commercial: Building2,
    vehicle: Car,
    store: Store,
};

const getTypeIcon = (type) => {
    return typeIcons[type] || Home;
};

// Format rental type for display
const formatRentalType = (type) => {
    const labels = {
        house: 'House',
        equipment: 'Equipment',
        tools: 'Tools',
        land: 'Land',
        commercial: 'Commercial',
        vehicle: 'Vehicle',
        store: 'Store',
    };
    return labels[type] || type;
};

// Format period label
const getPeriodLabel = (period) => {
    if (period === 'day') return '/day';
    if (period === 'week') return '/week';
    if (period === 'month') return '/month';
    if (period === 'year') return '/year';
    return '/month';
};

export function RentalCard({ rental }) {
    const TypeIcon = getTypeIcon(rental.type);

    return (
        <Link
            href={`/rentals/${rental.id}`}
            className="group flex flex-col rounded-xl border-2 border-gray-100 bg-white p-5 transition-all hover:border-[var(--primary)]/50 hover:shadow-lg dark:border-gray-800 dark:bg-[var(--card)]"
        >
            {/* Rental Image */}
            <div className="relative mb-4 h-40 w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
                {rental.image ? (
                    <div
                        className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                        style={{
                            backgroundImage: `url("${rental.image}")`,
                        }}
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[var(--primary)]/10 to-[var(--primary)]/5">
                        <TypeIcon className="h-16 w-16 text-[var(--primary)]" />
                    </div>
                )}
                <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-[var(--primary)] px-3 py-1 text-xs font-bold text-white">
                    <TypeIcon className="h-3 w-3" />
                    {formatRentalType(rental.type)}
                </div>
            </div>

            {/* Details */}
            <div className="flex flex-1 flex-col">
                <div className="mb-2">
                    <h3 className="text-lg font-bold text-[var(--foreground)] dark:text-white">{rental.name}</h3>
                </div>

                <div className="mb-3 flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                    <MapPin className="h-3 w-3" />
                    {rental.location}
                </div>

                {/* Features */}
                {rental.features && rental.features.length > 0 && (
                    <div className="mb-3 flex flex-wrap gap-1">
                        {rental.features.slice(0, 3).map((feature, idx) => (
                            <span
                                key={idx}
                                className="rounded-md bg-[var(--primary)]/10 px-2 py-0.5 text-xs font-semibold text-white dark:text-[var(--primary)]"
                            >
                                {feature}
                            </span>
                        ))}
                        {rental.features.length > 3 && (
                            <span className="rounded-md bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                                +{rental.features.length - 3}
                            </span>
                        )}
                    </div>
                )}

                <div className="mt-auto space-y-2 border-t border-gray-100 pt-3 dark:border-gray-800">
                    {parseFloat(rental?.price) > 0 && (
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-xl font-black text-[var(--foreground)] dark:text-[var(--primary)]">
                                    ₵{parseFloat(rental.price).toLocaleString()}
                                </div>
                                <div className="text-xs text-gray-500">{getPeriodLabel(rental.period)}</div>
                            </div>
                        </div>
                    )}
                    <button className="w-full rounded-lg border border-[var(--primary)] bg-transparent px-4 py-2 text-xs font-semibold text-[var(--primary)] transition-colors hover:bg-[var(--primary)] hover:text-white">
                        View Details
                    </button>
                </div>
            </div>
        </Link>
    );
}





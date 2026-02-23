import { Button } from '@/components/ui/button';
import { BadgeCheck, MapPin, Star, Users, Bike, Car, Truck, Bus } from 'lucide-react';
import { Link } from '@inertiajs/react';

// Transport type icon mapping
const typeIcons = {
    okada: Bike,
    car: Car,
    taxi: Car,
    bus: Bus,
    cargo: Truck,
    other: Car,
};

const getTypeIcon = (type) => {
    return typeIcons[type] || Car;
};

// Format transport type for display
const formatTransportType = (type) => {
    const labels = {
        okada: 'Okada',
        car: 'Car',
        taxi: 'Taxi',
        bus: 'Bus',
        cargo: 'Cargo',
        other: 'Other',
    };
    return labels[type] || type;
};

export function TransportCard({ ride }) {
    const TypeIcon = getTypeIcon(ride.type);

    return (
        <Link
            href={`/transport/${ride.id}`}
            className="group flex flex-col rounded-xl border-2 border-gray-100 bg-white p-5 transition-all hover:border-[var(--primary)]/50 hover:shadow-lg"
        >
            {/* Transport Image */}
            <div className="relative mb-4 h-40 w-full overflow-hidden rounded-xl bg-gray-100">
                {ride.image ? (
                    <div
                        className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                        style={{
                            backgroundImage: `url("${ride.image}")`,
                        }}
                    />
                ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-1 bg-gradient-to-br from-[var(--primary)]/20 via-[var(--primary)]/10 to-[var(--primary)]/5">
                        <TypeIcon className="h-14 w-14 text-[var(--primary)] opacity-90" aria-hidden />
                        <span className="text-xs font-medium text-[var(--primary)] opacity-80">{formatTransportType(ride.type)}</span>
                    </div>
                )}
                {ride.is_verified && (
                    <div className="absolute right-2 top-2">
                        <BadgeCheck className="h-5 w-5 fill-[var(--primary)] text-white" />
                    </div>
                )}
                <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-[var(--primary)] px-3 py-1 text-xs font-bold text-[var(--primary-foreground)]">
                    <TypeIcon className="h-3 w-3" />
                    {formatTransportType(ride.type)}
                </div>
            </div>

            {/* Details */}
            <div className="flex flex-1 flex-col">
                <div className="mb-2">
                    <h3 className="text-lg font-bold text-[var(--foreground)]">{ride.driver_name}</h3>
                </div>

                <div className="mb-3 flex items-center gap-1 text-xs text-gray-600">
                    <MapPin className="h-3 w-3 shrink-0" />
                    <span>{ride.location}</span>
                </div>

                {/* Seats + Reviews row */}
                <div className="mb-4 flex flex-wrap items-center gap-2 text-xs">
                    <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 font-medium text-gray-700">
                        <Users className="h-3.5 w-3.5" />
                        {ride.seats_available != null && ride.seats_available !== '' ? ride.seats_available : '—'} seats
                    </span>
                    {Number(ride.reviews_count) > 0 ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 font-medium text-amber-800">
                            <Star className="h-3.5 w-3.5 fill-amber-500" />
                            {ride.rating} · {ride.reviews_count} review{ride.reviews_count !== 1 ? 's' : ''}
                        </span>
                    ) : (
                        <span className="rounded-full bg-gray-100 px-2.5 py-1 font-medium text-gray-500">
                            No reviews yet
                        </span>
                    )}
                </div>

                {/* Price (if set) + CTA */}
                <div className="mt-auto border-t border-gray-100 pt-4">
                    {Number(ride?.price_per_seat) > 0 && (
                        <div className="mb-3">
                            <div className="text-lg font-bold text-[var(--foreground)]">GH₵{ride.price_per_seat}</div>
                            <div className="text-xs text-gray-500">per seat</div>
                        </div>
                    )}
                    <span className="block w-full rounded-lg bg-[var(--primary)] py-2.5 text-center text-sm font-semibold text-[var(--primary-foreground)] transition-colors group-hover:opacity-95">
                        View Details
                    </span>
                </div>
            </div>
        </Link>
    );
}

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
            className="group flex flex-col rounded-xl border-2 border-gray-100 bg-white p-5 transition-all hover:border-[#13ec13]/50 hover:shadow-lg dark:border-gray-800 dark:bg-[#162816]"
        >
            {/* Transport Image */}
            <div className="relative mb-4 h-40 w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
                {ride.image ? (
                    <div
                        className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                        style={{
                            backgroundImage: `url("${ride.image}")`,
                        }}
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#13ec13]/10 to-[#13ec13]/5">
                        <TypeIcon className="h-16 w-16 text-[#13ec13]" />
                    </div>
                )}
                {ride.is_verified && (
                    <div className="absolute right-2 top-2">
                        <BadgeCheck className="h-5 w-5 fill-[#13ec13] text-white" />
                    </div>
                )}
                <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-full bg-[#13ec13] px-3 py-1 text-xs font-bold text-[#0d1b0d]">
                    <TypeIcon className="h-3 w-3" />
                    {formatTransportType(ride.type)}
                </div>
            </div>

            {/* Details */}
            <div className="flex flex-1 flex-col">
                <div className="mb-2">
                    <h3 className="text-lg font-bold text-[#0d1b0d] dark:text-white">{ride.company_name}</h3>
                </div>

                <div className="mb-3 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-bold">{ride.rating}</span>
                        <span className="text-gray-400">({ride.reviews_count})</span>
                    </div>
                </div>

                <div className="mb-3 flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                    <MapPin className="h-3 w-3" />
                    {ride.location}
                </div>

                {/* Seats Available */}
                <div className="mb-3 flex items-center gap-1">
                    <span className="flex items-center gap-1 rounded-md bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                        <Users className="h-3 w-3" />
                        {ride.seats_available} seats
                    </span>
                </div>

                <div className="mt-auto space-y-2 border-t border-gray-100 pt-3 dark:border-gray-800">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-xl font-black text-[#0d1b0d] dark:text-[#13ec13]">GH₵{ride.price_per_seat}</div>
                            <div className="text-xs text-gray-500">/seat</div>
                        </div>
                    </div>
                    <Button asChild variant="outline" className="w-full border-[#13ec13] text-xs text-[#13ec13] hover:bg-[#13ec13] hover:text-[#0d1b0d]">
                        <span>View Details</span>
                    </Button>
                </div>
            </div>
        </Link>
    );
}

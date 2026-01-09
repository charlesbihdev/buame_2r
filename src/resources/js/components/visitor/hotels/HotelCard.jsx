import { Button } from '@/components/ui/button';
import { BadgeCheck, MapPin, Star, Wifi, Car, UtensilsCrossed, Wind, Users, Clock } from 'lucide-react';
import { Link } from '@inertiajs/react';

// Amenity icon mapping
const amenityIcons = {
    WiFi: Wifi,
    'Free WiFi': Wifi,
    Wifi: Wifi,
    Parking: Car,
    'Air Conditioning': Wind,
    AC: Wind,
    Restaurant: UtensilsCrossed,
    Bar: UtensilsCrossed,
    'Swimming Pool': Users,
    Gym: Users,
    Spa: Users,
    'Room Service': UtensilsCrossed,
    Laundry: Users,
    'Business Center': Users,
    'Conference Room': Users,
    '24/7 Reception': Clock,
    Security: BadgeCheck,
    'Pet Friendly': Users,
    'Airport Shuttle': Car,
    'Breakfast Included': UtensilsCrossed,
    Kitchen: UtensilsCrossed,
    TV: Users,
    'Hot Water': Wind,
};

const getAmenityIcon = (amenity) => {
    return amenityIcons[amenity] || Wifi;
};

export function HotelCard({ hotel }) {
    // Format hotel type
    const formatHotelType = (type) => {
        return type
            ?.replace('_', ' ')
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    return (
        <Link
            href={`/hotels/${hotel.id}`}
            className="group flex flex-col rounded-xl border-2 border-gray-100 bg-white p-5 transition-all hover:border-[#13ec13]/50 hover:shadow-lg dark:border-gray-800 dark:bg-[#162816]"
        >
            {/* Hotel Image */}
            <div className="relative mb-4 h-40 w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
                {hotel.image ? (
                    <div
                        className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                        style={{
                            backgroundImage: `url("${hotel.image}")`,
                        }}
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#13ec13]/10 to-[#13ec13]/5">
                        <span className="text-4xl font-bold text-[#13ec13]">{hotel.name.charAt(0).toUpperCase()}</span>
                    </div>
                )}
                {hotel.is_verified && (
                    <div className="absolute right-2 top-2">
                        <BadgeCheck className="h-5 w-5 fill-[#13ec13] text-white" />
                    </div>
                )}
                <div className="absolute bottom-2 left-2 rounded-full bg-[#13ec13] px-3 py-1 text-xs font-bold text-[#0d1b0d]">
                    {formatHotelType(hotel.type)}
                </div>
            </div>

            {/* Details */}
            <div className="flex flex-1 flex-col">
                <div className="mb-2">
                    <h3 className="text-lg font-bold text-[#0d1b0d] dark:text-white">{hotel.name}</h3>
                </div>

                <div className="mb-3 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-bold">{hotel.rating}</span>
                        <span className="text-gray-400">({hotel.reviews_count})</span>
                    </div>
                </div>

                <div className="mb-3 flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                    <MapPin className="h-3 w-3" />
                    {hotel.location}
                </div>

                {/* Amenities */}
                {hotel.amenities && hotel.amenities.length > 0 && (
                    <div className="mb-3 flex flex-wrap gap-1">
                        {hotel.amenities.slice(0, 3).map((amenity, idx) => {
                            const Icon = getAmenityIcon(amenity);
                            return (
                                <span
                                    key={idx}
                                    className="flex items-center gap-1 rounded-md bg-[#13ec13]/10 px-2 py-0.5 text-xs font-semibold text-[#0d1b0d] dark:text-[#13ec13]"
                                >
                                    <Icon className="h-3 w-3" />
                                    {amenity}
                                </span>
                            );
                        })}
                        {hotel.amenities.length > 3 && (
                            <span className="rounded-md bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                                +{hotel.amenities.length - 3}
                            </span>
                        )}
                    </div>
                )}

                <div className="mt-auto space-y-2 border-t border-gray-100 pt-3 dark:border-gray-800">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-xl font-black text-[#0d1b0d] dark:text-[#13ec13]">GH₵{hotel.price_per_night}</div>
                            <div className="text-xs text-gray-500">/night</div>
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


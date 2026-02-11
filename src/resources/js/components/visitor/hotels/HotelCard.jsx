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
            className="group flex flex-col rounded-xl border-2 border-border bg-card p-5 transition-all hover:border-primary/50 hover:shadow-lg"
        >
            {/* Hotel Image */}
            <div className="relative mb-4 h-40 w-full overflow-hidden rounded-xl bg-muted">
                {hotel.image ? (
                    <div
                        className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                        style={{
                            backgroundImage: `url("${hotel.image}")`,
                        }}
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                        <span className="text-4xl font-bold text-primary">{hotel.name.charAt(0).toUpperCase()}</span>
                    </div>
                )}
                {hotel.is_verified && (
                    <div className="absolute right-2 top-2">
                        <BadgeCheck className="h-5 w-5 fill-primary text-white" />
                    </div>
                )}
                <div className="absolute bottom-2 left-2 rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                    {formatHotelType(hotel.type)}
                </div>
            </div>

            {/* Details */}
            <div className="flex flex-1 flex-col">
                <div className="mb-2">
                    <h3 className="text-lg font-bold text-foreground">{hotel.name}</h3>
                </div>

                <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-secondary text-secondary" />
                        <span className="font-bold">{hotel.rating}</span>
                        <span className="text-muted-foreground">({hotel.reviews_count})</span>
                    </div>
                </div>

                <div className="mb-3 flex items-center gap-1 text-xs text-muted-foreground">
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
                                    className="flex items-center gap-1 rounded-md bg-primary/10 px-2 py-0.5 text-xs font-semibold text-foreground"
                                >
                                    <Icon className="h-3 w-3" />
                                    {amenity}
                                </span>
                            );
                        })}
                        {hotel.amenities.length > 3 && (
                            <span className="rounded-md bg-muted px-2 py-0.5 text-xs font-semibold text-muted-foreground">
                                +{hotel.amenities.length - 3}
                            </span>
                        )}
                    </div>
                )}

                <div className="mt-auto space-y-2 border-t border-border pt-3">
                    {hotel?.price_per_night > 0 && (
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-xl font-black text-primary">GH₵{hotel.price_per_night}</div>
                                <div className="text-xs text-muted-foreground">/night</div>
                            </div>
                        </div>
                    )}
                    <Button asChild variant="outline" className="w-full border-primary text-xs text-primary hover:bg-primary hover:text-primary-foreground">
                        <span>View Details</span>
                    </Button>
                </div>
            </div>
        </Link>
    );
}


import { router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Hotel, MapPin } from 'lucide-react';

export function HotelsListings({ listings }) {
    const handleCreate = () => {
        router.visit(route('user.dashboard.hotels.create'));
    };

    const handleEdit = (id) => {
        router.visit(route('user.dashboard.hotels.edit', id));
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-[#0d1b0d] dark:text-white">My Hotels</h3>
                <Button onClick={handleCreate} className="bg-[#13ec13] text-[#0d1b0d] hover:bg-[#0eb50e]">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Hotel
                </Button>
            </div>

            {listings && listings.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {listings.map((listing) => {
                        const primaryImage = listing.images?.find((img) => img.is_primary) || listing.images?.[0];
                        return (
                            <div
                                key={listing.id}
                                className="rounded-xl border border-[#e7f3e7] dark:border-[#2a4d2a] bg-white dark:bg-[#1a331a] overflow-hidden transition-all hover:shadow-lg"
                            >
                                <div className="aspect-video w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                                    {primaryImage ? (
                                        <img
                                            src={primaryImage.image_path}
                                            alt={listing.name}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center">
                                            <Hotel className="h-12 w-12 text-gray-400" />
                                        </div>
                                    )}
                                </div>
                                <div className="p-4">
                                    <h4 className="font-bold text-[#0d1b0d] dark:text-white">{listing.name}</h4>
                                    <p className="mt-1 text-sm text-[#4c9a4c] dark:text-[#8fcc8f]">
                                        {listing.type ? listing.type.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase()) : 'Hotel'}
                                    </p>
                                    <div className="mt-2 flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                                        <MapPin className="h-3 w-3" />
                                        <span>{listing.location}</span>
                                    </div>
                                    {listing.price_per_night && (
                                        <p className="mt-2 text-sm font-semibold text-[#0d1b0d] dark:text-white">
                                            GH₵ {parseFloat(listing.price_per_night).toFixed(2)}/night
                                        </p>
                                    )}
                                    <div className="mt-4 flex items-center gap-2">
                                        <Button
                                            onClick={() => handleEdit(listing.id)}
                                            variant="outline"
                                            size="sm"
                                            className="flex-1"
                                        >
                                            <Edit className="mr-2 h-3 w-3" />
                                            Edit
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 p-12 text-center">
                    <Hotel className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-4 text-gray-600 dark:text-gray-400">No hotels listed yet</p>
                    <Button onClick={handleCreate} className="mt-4 bg-[#13ec13] text-[#0d1b0d] hover:bg-[#0eb50e]">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Your First Hotel
                    </Button>
                </div>
            )}
        </div>
    );
}


import { router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Home, MapPin } from 'lucide-react';

export function RentalsListings({ listings }) {
    const handleCreate = () => {
        router.visit(route('user.dashboard.rentals.create'));
    };

    const handleEdit = (id) => {
        router.visit(route('user.dashboard.rentals.edit', id));
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-[#0d1b0d] dark:text-white">My Rentals</h3>
                <Button onClick={handleCreate} className="bg-[#13ec13] text-[#0d1b0d] hover:bg-[#0eb50e]">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Rental
                </Button>
            </div>

            {listings && listings.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {listings.map((listing) => (
                        <div
                            key={listing.id}
                            className="rounded-xl border border-[#e7f3e7] dark:border-[#2a4d2a] bg-white dark:bg-[#1a331a] overflow-hidden transition-all hover:shadow-lg"
                        >
                            <div className="aspect-video w-full bg-gray-100 dark:bg-gray-800" />
                            <div className="p-4">
                                <h4 className="font-bold text-[#0d1b0d] dark:text-white">{listing.title}</h4>
                                <p className="mt-1 text-sm font-semibold text-[#13ec13]">GH₵ {listing.price_per_month}/month</p>
                                <div className="mt-2 flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                                    <MapPin className="h-3 w-3" />
                                    <span>{listing.location}</span>
                                </div>
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
                    ))}
                </div>
            ) : (
                <div className="rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 p-12 text-center">
                    <Home className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-4 text-gray-600 dark:text-gray-400">No rentals listed yet</p>
                    <Button onClick={handleCreate} className="mt-4 bg-[#13ec13] text-[#0d1b0d] hover:bg-[#0eb50e]">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Your First Rental
                    </Button>
                </div>
            )}
        </div>
    );
}


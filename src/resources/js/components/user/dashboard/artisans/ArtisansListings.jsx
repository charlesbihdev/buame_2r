import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';
import { Edit, Eye, MapPin, Plus } from 'lucide-react';

export function ArtisansListings({ listings }) {
    const handleCreate = () => {
        router.visit(route('user.dashboard.artisans.create'));
    };

    const handleEdit = (id) => {
        router.visit(route('user.dashboard.artisans.edit', id));
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-[var(--foreground)]">My Artisan Listings</h3>
                <Button onClick={handleCreate} className="cursor-pointer bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90">
                    <Plus className="mr-2 h-4 w-4" />
                    New Listing
                </Button>
            </div>

            {listings && listings.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {listings.map((listing) => (
                        <div
                            key={listing.id}
                            className="overflow-hidden rounded-xl border border-[var(--buame-border-light)] bg-white transition-all hover:shadow-lg#2a4d2a]#1a331a]"
                        >
                            <div className="aspect-video w-full bg-gray-100" />
                            <div className="p-4">
                                <h4 className="font-bold text-[var(--foreground)]">{listing.name}</h4>
                                <div className="mt-2 flex items-center gap-2 text-xs text-gray-600">
                                    <MapPin className="h-3 w-3" />
                                    <span>{listing.location}</span>
                                </div>
                                <div className="mt-4 flex items-center gap-2">
                                    <Button onClick={() => handleEdit(listing.id)} variant="outline" size="sm" className="flex-1">
                                        <Edit className="mr-2 h-3 w-3" />
                                        Edit
                                    </Button>
                                    <Button variant="outline" size="sm" className="flex-1">
                                        <Eye className="mr-2 h-3 w-3" />
                                        View
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="rounded-xl border-2 border-dashed border-gray-300 p-12 text-center">
                    <p className="text-gray-600">No listings yet</p>
                    <Button onClick={handleCreate} className="mt-4 cursor-pointer bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90">
                        <Plus className="mr-2 h-4 w-4" />
                        Create Your First Listing
                    </Button>
                </div>
            )}
        </div>
    );
}

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { router } from '@inertiajs/react';
import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

export function RentalFeatures({ profile }) {
    const [newFeature, setNewFeature] = useState('');

    if (!profile) {
        return (
            <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">
                <p className="text-gray-600">Loading features...</p>
            </div>
        );
    }

    const features = profile?.features || [];

    const handleAddFeature = (e) => {
        e.preventDefault();
        if (!newFeature.trim()) return;

        router.post(
            route('user.dashboard.rentals.features.store', { rental: profile.id }),
            { feature: newFeature.trim() },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setNewFeature('');
                },
            }
        );
    };

    const handleDeleteFeature = (featureId) => {
        router.delete(
            route('user.dashboard.rentals.features.destroy', { rental: profile.id, feature: featureId }),
            { preserveScroll: true }
        );
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h3 className="text-lg font-bold text-[var(--foreground)]">Rental Features</h3>
                <p className="text-sm text-gray-600">
                    Add features that describe your rental (e.g., 2 Bedrooms, Air Conditioning, WiFi)
                </p>
            </div>

            {/* Add Feature Form */}
            <div className="rounded-xl border border-[var(--buame-border-light)] bg-white p-6">
                <form onSubmit={handleAddFeature} className="flex gap-3">
                    <Input
                        value={newFeature}
                        onChange={(e) => setNewFeature(e.target.value)}
                        placeholder="Type a feature and press +"
                        className="flex-1"
                    />
                    <Button
                        type="submit"
                        disabled={!newFeature.trim()}
                        className="cursor-pointer bg-[var(--primary)] text-white hover:bg-[var(--primary)]"
                    >
                        <Plus className="h-5 w-5" />
                    </Button>
                </form>
            </div>

            {/* Features List */}
            {features.length > 0 ? (
                <div className="rounded-xl border border-[var(--buame-border-light)] bg-white p-6">
                    <h4 className="mb-4 text-sm font-semibold text-gray-700">
                        Added Features ({features.length})
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {features.map((feature) => (
                            <div
                                key={feature.id}
                                className="flex items-center gap-2 rounded-full bg-[var(--primary)]/10 px-4 py-2 text-sm font-medium text-white"
                            >
                                <span>{feature.feature}</span>
                                <button
                                    onClick={() => handleDeleteFeature(feature.id)}
                                    className="rounded-full p-0.5 text-gray-500 hover:bg-red-100 hover:text-red-600"
                                >
                                    <Trash2 className="h-3.5 w-3.5" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 p-8 text-center">
                    <p className="text-sm text-gray-500">
                        No features added yet. Type a feature above and click + to add.
                    </p>
                </div>
            )}
        </div>
    );
}

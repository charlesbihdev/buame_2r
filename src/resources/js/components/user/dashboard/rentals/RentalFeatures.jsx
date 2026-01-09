import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { router } from '@inertiajs/react';
import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

export function RentalFeatures({ profile }) {
    const [newFeature, setNewFeature] = useState('');

    if (!profile) {
        return (
            <div className="rounded-xl border border-gray-200 bg-white p-8 text-center dark:border-gray-800 dark:bg-[#162816]">
                <p className="text-gray-600 dark:text-gray-400">Loading features...</p>
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
                <h3 className="text-lg font-bold text-[#0d1b0d] dark:text-white">Rental Features</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Add features that describe your rental (e.g., 2 Bedrooms, Air Conditioning, WiFi)
                </p>
            </div>

            {/* Add Feature Form */}
            <div className="rounded-xl border border-[#e7f3e7] bg-white p-6 dark:border-[#2a4d2a] dark:bg-[#1a331a]">
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
                        className="bg-[#13ec13] text-[#0d1b0d] hover:bg-[#0fdc0f]"
                    >
                        <Plus className="h-5 w-5" />
                    </Button>
                </form>
            </div>

            {/* Features List */}
            {features.length > 0 ? (
                <div className="rounded-xl border border-[#e7f3e7] bg-white p-6 dark:border-[#2a4d2a] dark:bg-[#1a331a]">
                    <h4 className="mb-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                        Added Features ({features.length})
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {features.map((feature) => (
                            <div
                                key={feature.id}
                                className="flex items-center gap-2 rounded-full bg-[#13ec13]/10 px-4 py-2 text-sm font-medium text-[#0d1b0d] dark:bg-[#13ec13]/20 dark:text-white"
                            >
                                <span>{feature.feature}</span>
                                <button
                                    onClick={() => handleDeleteFeature(feature.id)}
                                    className="rounded-full p-0.5 text-gray-500 hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/30"
                                >
                                    <Trash2 className="h-3.5 w-3.5" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 p-8 text-center dark:border-gray-700 dark:bg-gray-800/50">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        No features added yet. Type a feature above and click + to add.
                    </p>
                </div>
            )}
        </div>
    );
}

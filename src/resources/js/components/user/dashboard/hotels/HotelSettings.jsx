import { Button } from '@/components/ui/button';
import { FormError } from '@/components/ui/form-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm, usePage } from '@inertiajs/react';
import { CheckCircle, Plus, Save, Trash2, X } from 'lucide-react';
import { useState } from 'react';

export function HotelSettings({ profile }) {
    const { errors: pageErrors } = usePage().props;
    const [amenities, setAmenities] = useState(profile?.amenities || []);
    const [newAmenity, setNewAmenity] = useState('');
    const [features, setFeatures] = useState(profile?.features?.map((f) => f.feature) || []);
    const [newFeature, setNewFeature] = useState('');

    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        _method: 'PUT',
        amenities: amenities,
        features: features,
    });

    // Common amenities for hotels
    const commonAmenities = [
        'WiFi',
        'Parking',
        'Air Conditioning',
        'Restaurant',
        'Bar',
        'Swimming Pool',
        'Gym',
        'Spa',
        'Room Service',
        'Laundry',
        'Business Center',
        'Conference Room',
        '24/7 Reception',
        'Security',
        'Pet Friendly',
        'Airport Shuttle',
        'Breakfast Included',
        'Kitchen',
        'TV',
        'Hot Water',
    ];

    const handleAddAmenity = (amenity) => {
        if (amenity && !amenities.includes(amenity)) {
            const updated = [...amenities, amenity];
            setAmenities(updated);
            setData('amenities', updated);
        }
    };

    const handleRemoveAmenity = (amenity) => {
        const updated = amenities.filter((a) => a !== amenity);
        setAmenities(updated);
        setData('amenities', updated);
    };

    const handleAddFeature = () => {
        if (newFeature.trim() && !features.includes(newFeature.trim())) {
            const updated = [...features, newFeature.trim()];
            setFeatures(updated);
            setData('features', updated);
            setNewFeature('');
        }
    };

    const handleRemoveFeature = (index) => {
        const updated = features.filter((_, i) => i !== index);
        setFeatures(updated);
        setData('features', updated);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('HotelSettings - Form submit started');
        console.log('HotelSettings - Profile:', profile);
        console.log('HotelSettings - Form data:', data);
        
        if (!profile?.id) {
            console.error('Profile ID is missing. Cannot submit form.');
            return;
        }
        
        console.log('HotelSettings - Submitting to:', route('user.dashboard.hotels.update', profile.id));
        post(route('user.dashboard.hotels.update', profile.id), {
            preserveScroll: true,
            onSuccess: (page) => {
                console.log('HotelSettings - Success!', page);
                // Success handled by recentlySuccessful
            },
            onError: (errors) => {
                console.error('HotelSettings - Errors:', errors);
            },
            onFinish: () => {
                console.log('HotelSettings - Request finished');
            },
        });
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-[#0d1b0d] dark:text-white">Hotel Settings</h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Manage amenities and features for your property</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Amenities Section */}
                <div className="rounded-xl border border-[#e7f3e7] bg-white p-6 dark:border-[#2a4d2a] dark:bg-[#1a331a]">
                    <h3 className="mb-4 text-lg font-bold text-[#0d1b0d] dark:text-white">Amenities</h3>
                    <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                        Select amenities available at your property. These help guests find your property.
                    </p>

                    {/* Quick Add Common Amenities */}
                    <div className="mb-4">
                        <Label className="mb-2 block text-sm">Quick Add</Label>
                        <div className="flex flex-wrap gap-2">
                            {commonAmenities.map((amenity) => (
                                <button
                                    key={amenity}
                                    type="button"
                                    onClick={() => handleAddAmenity(amenity)}
                                    disabled={amenities.includes(amenity)}
                                    className="rounded-md border border-[#e7f3e7] bg-white px-3 py-1 text-xs font-medium text-[#0d1b0d] transition-colors hover:bg-[#f6f8f6] disabled:opacity-50 disabled:cursor-not-allowed dark:border-[#2a4d2a] dark:bg-[#1a331a] dark:text-white dark:hover:bg-[#254225]"
                                >
                                    {amenities.includes(amenity) ? '✓ ' : '+ '}
                                    {amenity}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Custom Amenity Input */}
                    <div className="mb-4">
                        <Label htmlFor="custom_amenity" className="mb-2 block text-sm">
                            Add Custom Amenity
                        </Label>
                        <div className="flex gap-2">
                            <Input
                                id="custom_amenity"
                                value={newAmenity}
                                onChange={(e) => setNewAmenity(e.target.value)}
                                placeholder="e.g., Rooftop Terrace"
                                className="flex-1"
                            />
                            <Button
                                type="button"
                                onClick={() => {
                                    handleAddAmenity(newAmenity);
                                    setNewAmenity('');
                                }}
                                disabled={!newAmenity.trim() || amenities.includes(newAmenity.trim())}
                                className="bg-[#13ec13] text-[#0d1b0d] hover:bg-[#0eb50e]"
                            >
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Selected Amenities */}
                    {amenities.length > 0 ? (
                        <div>
                            <Label className="mb-2 block text-sm">Selected Amenities ({amenities.length})</Label>
                            <div className="flex flex-wrap gap-2">
                                {amenities.map((amenity) => (
                                    <div
                                        key={amenity}
                                        className="flex items-center gap-1 rounded-md bg-[#13ec13]/10 px-3 py-1 text-sm text-[#0d1b0d] dark:text-white"
                                    >
                                        <span>{amenity}</span>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveAmenity(amenity)}
                                            className="ml-1 text-red-600 hover:text-red-700"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500 dark:text-gray-400">No amenities added yet</p>
                    )}
                    <FormError error={errors.amenities || pageErrors?.amenities} className="mt-1" />
                </div>

                {/* Features Section */}
                <div className="rounded-xl border border-[#e7f3e7] bg-white p-6 dark:border-[#2a4d2a] dark:bg-[#1a331a]">
                    <h3 className="mb-4 text-lg font-bold text-[#0d1b0d] dark:text-white">Features & Services</h3>
                    <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                        Add special features or services your property offers (e.g., "24/7 Reception", "Room Service").
                    </p>

                    {/* Add Feature Input */}
                    <div className="mb-4">
                        <Label htmlFor="new_feature" className="mb-2 block text-sm">
                            Add Feature
                        </Label>
                        <div className="flex gap-2">
                            <Input
                                id="new_feature"
                                value={newFeature}
                                onChange={(e) => setNewFeature(e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        handleAddFeature();
                                    }
                                }}
                                placeholder="e.g., 24/7 Reception"
                                className="flex-1"
                            />
                            <Button
                                type="button"
                                onClick={handleAddFeature}
                                disabled={!newFeature.trim()}
                                className="bg-[#13ec13] text-[#0d1b0d] hover:bg-[#0eb50e]"
                            >
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Features List */}
                    {features.length > 0 ? (
                        <div>
                            <Label className="mb-2 block text-sm">Features ({features.length})</Label>
                            <div className="space-y-2">
                                {features.map((feature, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between rounded-md border border-[#e7f3e7] bg-white px-3 py-2 dark:border-[#2a4d2a] dark:bg-[#1a331a]"
                                    >
                                        <span className="text-sm text-[#0d1b0d] dark:text-white">{feature}</span>
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveFeature(index)}
                                            className="text-red-600 hover:text-red-700"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500 dark:text-gray-400">No features added yet</p>
                    )}
                    <FormError error={errors.features || pageErrors?.features} className="mt-1" />
                </div>

                {/* Submit Button */}
                <div className="flex items-center justify-end gap-4">
                    {recentlySuccessful && (
                        <div className="flex items-center gap-2 text-sm text-green-600">
                            <CheckCircle className="h-4 w-4" />
                            <span>Settings saved successfully</span>
                        </div>
                    )}
                    <button
                        type="submit"
                        disabled={processing}
                        className="inline-flex items-center justify-center gap-2 rounded-md bg-[#13ec13] px-4 py-2 text-sm font-medium whitespace-nowrap text-[#0d1b0d] transition-[color,box-shadow] hover:cursor-pointer hover:bg-[#0eb50e] disabled:pointer-events-none disabled:opacity-50"
                    >
                        <Save className="h-4 w-4" />
                        {processing ? 'Saving...' : 'Save Settings'}
                    </button>
                </div>
            </form>
        </div>
    );
}


import { Button } from '@/components/ui/button';
import { FormError } from '@/components/ui/form-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ListingVisibilityBanner } from '@/components/user/dashboard/ListingVisibilityBanner';
import { router, useForm, usePage } from '@inertiajs/react';
import { CheckCircle, Loader2, Save, Upload } from 'lucide-react';
import { useRef, useState } from 'react';
import SaveButton from '@/components/user/dashboard/SaveButton';

export function RentalProfile({ profile }) {
    const { errors: pageErrors } = usePage().props;
    const [imagePreview, setImagePreview] = useState(null);
    const [showPricing, setShowPricing] = useState(false);
    const fileInputRef = useRef(null);

    if (!profile) {
        return (
            <div className="rounded-xl border border-gray-200 bg-white p-8 text-center dark:border-gray-800 dark:bg-[var(--card)]">
                <p className="text-gray-600 dark:text-gray-400">Loading rental profile...</p>
            </div>
        );
    }

    const { data, setData, post, processing, errors, recentlySuccessful, isDirty } = useForm({
        _method: 'PUT',
        name: profile?.name || '',
        type: profile?.type || 'house',
        description: profile?.description || '',
        price: profile?.price || '',
        period: profile?.period || 'month',
        location: profile?.location || '',
        phone: profile?.phone || '',
        whatsapp: profile?.whatsapp || '',
        email: profile?.email || '',
        rental_terms: profile?.rental_terms || '',
        primary_image: null,
    });

    const rentalTypes = [
        { value: 'house', label: 'House' },
        { value: 'equipment', label: 'Equipment' },
        { value: 'tools', label: 'Tools' },
        { value: 'land', label: 'Land' },
        { value: 'commercial', label: 'Commercial' },
        { value: 'vehicle', label: 'Vehicle' },
        { value: 'store', label: 'Store' },
    ];

    const periods = [
        { value: 'day', label: 'Per Day' },
        { value: 'week', label: 'Per Week' },
        { value: 'month', label: 'Per Month' },
        { value: 'year', label: 'Per Year' },
    ];

    const handleSubmit = (e) => {
        e?.preventDefault();
        post(route('user.dashboard.rentals.update', profile.id), {
            forceFormData: true,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('primary_image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const primaryImage = profile?.images?.find((img) => img.is_primary) || profile?.images?.[0];

    return (
        <div className="space-y-6">
            {/* Visibility Banner with save button */}
            {profile && (
                <ListingVisibilityBanner
                    listing={profile}
                    routeName="user.dashboard.rentals.toggle-active"
                    label="Listing"
                    saveButton={{
                        isProcessing: processing,
                        isDirty: isDirty,
                        onClick: handleSubmit
                    }}
                />
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Primary Image Upload */}
                <div className="rounded-xl border border-[var(--buame-border-light)] bg-white p-6 dark:border-[#2a4d2a] dark:bg-[#1a331a]">
                    <h3 className="mb-4 text-lg font-bold text-[var(--foreground)] dark:text-white">Primary Image</h3>
                    <div className="flex items-start gap-6">
                        <div
                            className="relative h-40 w-40 cursor-pointer overflow-hidden rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 transition-colors hover:border-[var(--primary)] dark:border-gray-700 dark:bg-gray-800"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            {imagePreview || primaryImage?.image_path ? (
                                <img src={imagePreview || primaryImage?.image_path} alt="Rental preview" className="h-full w-full object-cover" />
                            ) : (
                                <div className="flex h-full w-full flex-col items-center justify-center text-gray-400">
                                    <Upload className="mb-2 h-8 w-8" />
                                    <span className="text-xs">Click to upload</span>
                                </div>
                            )}
                            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Upload a primary image for your rental listing. This will be the main image shown in search results.
                            </p>
                            <p className="mt-2 text-xs text-gray-500">Recommended: 800x600px, max 5MB</p>
                            <FormError error={errors.primary_image || pageErrors?.primary_image} className="mt-2" />
                        </div>
                    </div>
                </div>

                {/* Basic Information */}
                <div className="rounded-xl border border-[var(--buame-border-light)] bg-white p-6 dark:border-[#2a4d2a] dark:bg-[#1a331a]">
                    <h3 className="mb-4 text-lg font-bold text-[var(--foreground)] dark:text-white">Basic Information</h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <Label htmlFor="name">Rental Name</Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="mt-1"
                                placeholder="2 Bedroom Apartment in Bekwai"
                            />
                            <FormError error={errors.name || pageErrors?.name} className="mt-1" />
                        </div>

                        <div>
                            <Label htmlFor="type">Rental Type</Label>
                            <select
                                id="type"
                                value={data.type}
                                onChange={(e) => setData('type', e.target.value)}
                                className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-[var(--primary)] focus:ring-[var(--primary)] dark:border-gray-700 dark:bg-[var(--foreground)] dark:text-white"
                            >
                                {rentalTypes.map((type) => (
                                    <option key={type.value} value={type.value}>
                                        {type.label}
                                    </option>
                                ))}
                            </select>
                            <FormError error={errors.type || pageErrors?.type} className="mt-1" />
                        </div>

                        <div className="md:col-span-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                className="mt-1"
                                rows={4}
                                placeholder="Describe your rental property or item..."
                            />
                            <FormError error={errors.description || pageErrors?.description} className="mt-1" />
                        </div>
                    </div>
                </div>

                {/* Pricing Section */}
                <div className="rounded-xl border border-[var(--buame-border-light)] bg-white p-6 dark:border-[#2a4d2a] dark:bg-[#1a331a]">
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-lg font-bold text-[var(--foreground)] dark:text-white">Pricing</h3>
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="showPricing"
                                checked={showPricing}
                                onChange={(e) => setShowPricing(e.target.checked)}
                                className="h-4 w-4 rounded border-gray-300 text-[var(--primary)] focus:ring-[var(--primary)]"
                            />
                            <Label htmlFor="showPricing" className="cursor-pointer text-sm text-gray-600 dark:text-gray-400">
                                Show pricing
                            </Label>
                        </div>
                    </div>
                    {showPricing && (
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <Label htmlFor="price">Price (GH₵)</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={data.price}
                                    onChange={(e) => setData('price', e.target.value)}
                                    className="mt-1"
                                    placeholder="500.00"
                                />
                                <FormError error={errors.price || pageErrors?.price} className="mt-1" />
                            </div>

                            <div>
                                <Label htmlFor="period">Rental Period</Label>
                                <select
                                    id="period"
                                    value={data.period}
                                    onChange={(e) => setData('period', e.target.value)}
                                    className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-[var(--primary)] focus:ring-[var(--primary)] dark:border-gray-700 dark:bg-[var(--foreground)] dark:text-white"
                                >
                                    {periods.map((period) => (
                                        <option key={period.value} value={period.value}>
                                            {period.label}
                                        </option>
                                    ))}
                                </select>
                                <FormError error={errors.period || pageErrors?.period} className="mt-1" />
                            </div>
                        </div>
                    )}
                </div>

                {/* Location & Contact Section */}
                <div className="rounded-xl border border-[var(--buame-border-light)] bg-white p-6 dark:border-[#2a4d2a] dark:bg-[#1a331a]">
                    <h3 className="mb-4 text-lg font-bold text-[var(--foreground)] dark:text-white">Location & Contact</h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <Label htmlFor="location">Location</Label>
                            <Input
                                id="location"
                                value={data.location}
                                onChange={(e) => setData('location', e.target.value)}
                                className="mt-1"
                                placeholder="Western North"
                            />
                            <FormError error={errors.location || pageErrors?.location} className="mt-1" />
                        </div>

                        <div>
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                                id="phone"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                className="mt-1"
                                placeholder="+233 24 123 4567"
                            />
                            <FormError error={errors.phone || pageErrors?.phone} className="mt-1" />
                        </div>

                        <div>
                            <Label htmlFor="whatsapp">WhatsApp (optional)</Label>
                            <Input
                                id="whatsapp"
                                value={data.whatsapp}
                                onChange={(e) => setData('whatsapp', e.target.value)}
                                className="mt-1"
                                placeholder="+233 24 123 4567"
                            />
                            <FormError error={errors.whatsapp || pageErrors?.whatsapp} className="mt-1" />
                        </div>

                        <div>
                            <Label htmlFor="email">Email (optional)</Label>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="mt-1"
                                placeholder="contact@example.com"
                            />
                            <FormError error={errors.email || pageErrors?.email} className="mt-1" />
                        </div>
                    </div>
                </div>

                {/* Rental Terms Section */}
                <div className="rounded-xl border border-[var(--buame-border-light)] bg-white p-6 dark:border-[#2a4d2a] dark:bg-[#1a331a]">
                    <h3 className="mb-4 text-lg font-bold text-[var(--foreground)] dark:text-white">Rental Terms</h3>
                    <div>
                        <Label htmlFor="rental_terms">Terms & Conditions (optional)</Label>
                        <Textarea
                            id="rental_terms"
                            value={data.rental_terms}
                            onChange={(e) => setData('rental_terms', e.target.value)}
                            className="mt-1"
                            rows={4}
                            placeholder="Minimum 6 months lease, 2 months advance required, no pets allowed..."
                        />
                        <FormError error={errors.rental_terms || pageErrors?.rental_terms} className="mt-1" />
                    </div>
                </div>

                {/* Save Button */}
                <div className="rounded-xl border border-[var(--buame-border-light)] bg-white p-6 dark:border-[#2a4d2a] dark:bg-[#1a331a]">
                    <div className="flex flex-wrap items-center justify-end gap-4">
                        {recentlySuccessful && (
                            <div className="flex items-center gap-2 text-sm text-green-600">
                                <CheckCircle className="h-4 w-4" />
                                <span>Profile saved successfully</span>
                            </div>
                        )}
                        <SaveButton isProcessing={processing} isDirty={isDirty} onClick={handleSubmit} position="bottom" />
                    </div>
                </div>
            </form>
        </div>
    );
}

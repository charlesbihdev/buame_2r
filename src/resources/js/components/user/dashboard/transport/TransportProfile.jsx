import { Button } from '@/components/ui/button';
import { FormError } from '@/components/ui/form-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { router, useForm, usePage } from '@inertiajs/react';
import { CheckCircle, Image as ImageIcon, Loader2, Save, Upload, X } from 'lucide-react';
import { useState } from 'react';
import { ListingVisibilityBanner } from '@/components/user/dashboard/ListingVisibilityBanner';
import SaveButton from '@/components/user/dashboard/SaveButton';
import { DashboardShareLink } from '@/components/user/dashboard/DashboardShareLink';

export function TransportProfile({ profile }) {
    const { errors: pageErrors } = usePage().props;
    const primaryImage = profile?.images?.find((img) => img.is_primary) || profile?.images?.[0];
    const [profileImagePreview, setProfileImagePreview] = useState(primaryImage?.image_path || null);
    const [showPricing, setShowPricing] = useState(!!(profile?.price_per_seat || profile?.seats_available));

    // Ensure profile exists - if not, show message
    if (!profile || !profile.id) {
        return (
            <div className="space-y-6">
                <div className="rounded-xl border border-[var(--buame-border-light)] bg-white p-6">
                    <p className="text-gray-600">Loading profile...</p>
                </div>
            </div>
        );
    }

    const { data, setData, post, processing, errors, recentlySuccessful, isDirty } = useForm({
        _method: 'PUT',
        driver_name: profile?.driver_name || '',
        type: profile?.type || 'okada',
        description: profile?.description || '',
        location: profile?.location || '',
        phone: profile?.phone || '',
        phone_2: profile?.phone_2 || '',
        whatsapp: profile?.whatsapp || '',
        email: profile?.email || '',
        price_per_seat: profile?.price_per_seat || '',
        seats_available: profile?.seats_available || '',
        operating_hours: profile?.operating_hours || '',
        primary_image: null,
    });

    const transportTypes = [
        { value: 'okada', label: 'Okada' },
        { value: 'car', label: 'Car' },
        { value: 'taxi', label: 'Taxi' },
        { value: 'bus', label: 'Bus' },
        { value: 'cargo', label: 'Cargo' },
        { value: 'other', label: 'Other' },
    ];

    const handleProfileImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('primary_image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveProfileImage = () => {
        setData('primary_image', null);
        setProfileImagePreview(null);
    };

    const handleSubmit = (e) => {
        e?.preventDefault();
        if (!profile?.id) {
            console.error('Profile ID is missing. Cannot submit form.');
            return;
        }
        // Use POST with _method spoofing for file uploads (Laravel limitation with PUT)
        post(route('user.dashboard.transport.update', profile.id), {
            preserveScroll: true,
            forceFormData: true,
        });
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-[var(--foreground)]">Transport Profile</h2>
                <p className="mt-1 text-sm text-gray-600">Manage your transport service information</p>
            </div>

            {/* Visibility Banner with save button */}
            {profile && (
                <ListingVisibilityBanner
                    listing={profile}
                    routeName="user.dashboard.transport.toggle-active"
                    label="Service"
                    saveButton={{
                        isProcessing: processing,
                        isDirty: isDirty,
                        onClick: handleSubmit
                    }}
                />
            )}

            {/* Share Link */}
            {profile?.id && (
                <DashboardShareLink
                    label="Transport Service Link"
                    url={`/transport/${profile.id}`}
                    description="Share this link so customers can book a ride"
                />
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Profile Image Section */}
                <div className="rounded-xl border border-[var(--buame-border-light)] bg-white p-6">
                    <h3 className="mb-4 text-lg font-bold text-[var(--foreground)]">Vehicle Image</h3>
                    <div className="flex items-start gap-6">
                        {profileImagePreview ? (
                            <div className="relative">
                                <img
                                    src={profileImagePreview}
                                    alt="Vehicle"
                                    className="h-32 w-32 rounded-lg border border-[var(--buame-border-light)] object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={handleRemoveProfileImage}
                                    className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        ) : (
                            <div className="flex h-32 w-32 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
                                <ImageIcon className="h-12 w-12 text-gray-400" />
                            </div>
                        )}
                        <div className="flex-1">
                            <Label htmlFor="primary_image">Primary Image</Label>
                            <p className="mt-1 mb-3 text-xs text-gray-500">
                                This image will be displayed as your vehicle/service thumbnail to visitors
                            </p>
                            <label
                                htmlFor="primary_image"
                                className="flex cursor-pointer items-center gap-2 rounded-md border border-[var(--buame-border-light)] bg-white px-4 py-2 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[#f6f8f6]"
                            >
                                <Upload className="h-4 w-4" />
                                {profileImagePreview ? 'Change Image' : 'Upload Image'}
                            </label>
                            <input id="primary_image" type="file" className="hidden" accept="image/*" onChange={handleProfileImageChange} />
                            <FormError error={errors.primary_image || pageErrors?.primary_image} className="mt-1" />
                        </div>
                    </div>
                </div>

                {/* Basic Information Section */}
                <div className="rounded-xl border border-[var(--buame-border-light)] bg-white p-6">
                    <h3 className="mb-4 text-lg font-bold text-[var(--foreground)]">Basic Information</h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <Label htmlFor="driver_name">Driver/Rider Name</Label>
                            <Input
                                id="driver_name"
                                value={data.driver_name}
                                onChange={(e) => setData('driver_name', e.target.value)}
                                className="mt-1"
                                placeholder="Kwame Asante"
                            />
                            <FormError error={errors.driver_name || pageErrors?.driver_name} className="mt-1" />
                        </div>

                        <div>
                            <Label htmlFor="type">Service Type</Label>
                            <Select value={data.type} onValueChange={(value) => setData('type', value)}>
                                <SelectTrigger className="mt-1">
                                    <SelectValue placeholder="Select service type" />
                                </SelectTrigger>
                                <SelectContent>
                                    {transportTypes.map((type) => (
                                        <SelectItem key={type.value} value={type.value}>
                                            {type.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormError error={errors.type || pageErrors?.type} className="mt-1" />
                        </div>

                    </div>
                </div>

                {/* Pricing Section */}
                <div className="rounded-xl border border-[var(--buame-border-light)] bg-white p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-lg font-bold text-[var(--foreground)]">Pricing</h3>
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="showPricing"
                                checked={showPricing}
                                onChange={(e) => setShowPricing(e.target.checked)}
                                className="h-4 w-4 rounded border-gray-300 text-[var(--primary)] focus:ring-[var(--primary)]"
                            />
                            <Label htmlFor="showPricing" className="cursor-pointer text-sm text-gray-600">
                                Show pricing
                            </Label>
                        </div>
                    </div>
                    {showPricing && (
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <Label htmlFor="price_per_seat">Price per Seat (GH₵)</Label>
                                <Input
                                    id="price_per_seat"
                                    type="number"
                                    step="0.01"
                                    value={data.price_per_seat}
                                    onChange={(e) => setData('price_per_seat', e.target.value)}
                                    className="mt-1"
                                    placeholder="15.00"
                                />
                                <FormError error={errors.price_per_seat || pageErrors?.price_per_seat} className="mt-1" />
                            </div>

                            <div>
                                <Label htmlFor="seats_available">Seats Available</Label>
                                <Input
                                    id="seats_available"
                                    type="number"
                                    value={data.seats_available}
                                    onChange={(e) => setData('seats_available', e.target.value)}
                                    className="mt-1"
                                    placeholder="4"
                                />
                                <FormError error={errors.seats_available || pageErrors?.seats_available} className="mt-1" />
                            </div>
                        </div>
                    )}
                </div>

                {/* Description Section */}
                <div className="rounded-xl border border-[var(--buame-border-light)] bg-white p-6">
                    <h3 className="mb-4 text-lg font-bold text-[var(--foreground)]">About Your Service</h3>
                    <div>
                        <Label htmlFor="description">Description <span className="text-sm font-normal text-gray-500">(Optional)</span></Label>
                        <Textarea
                            id="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className="mt-1"
                            rows={4}
                            placeholder="Describe your transport service, vehicle condition, and what makes you stand out..."
                        />
                        <FormError error={errors.description || pageErrors?.description} className="mt-1" />
                    </div>
                </div>

                {/* Location & Contact Section */}
                <div className="rounded-xl border border-[var(--buame-border-light)] bg-white p-6">
                    <h3 className="mb-4 text-lg font-bold text-[var(--foreground)]">Location & Contact</h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <Label htmlFor="location">Working Location</Label>
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
                            <Label htmlFor="phone_2">Phone 2 <span className="text-sm font-normal text-gray-500">(Optional)</span></Label>
                            <Input
                                id="phone_2"
                                value={data.phone_2}
                                onChange={(e) => setData('phone_2', e.target.value)}
                                className="mt-1"
                                placeholder="+233 24 987 6543"
                            />
                            <FormError error={errors.phone_2 || pageErrors?.phone_2} className="mt-1" />
                        </div>

                        <div>
                            <Label htmlFor="whatsapp">WhatsApp <span className="text-sm font-normal text-gray-500">(Optional)</span></Label>
                            <Input
                                id="whatsapp"
                                value={data.whatsapp}
                                onChange={(e) => setData('whatsapp', e.target.value)}
                                className="mt-1"
                                placeholder="+233241234567"
                            />
                            <FormError error={errors.whatsapp || pageErrors?.whatsapp} className="mt-1" />
                        </div>

                        <div>
                            <Label htmlFor="email">Email <span className="text-sm font-normal text-gray-500">(Optional)</span></Label>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="mt-1"
                                placeholder="contact@fastokada.com"
                            />
                            <FormError error={errors.email || pageErrors?.email} className="mt-1" />
                        </div>
                    </div>
                </div>

                {/* Operating Hours Section */}
                <div className="rounded-xl border border-[var(--buame-border-light)] bg-white p-6">
                    <h3 className="mb-4 text-lg font-bold text-[var(--foreground)]">Operating Hours</h3>
                    <div>
                        <Label htmlFor="operating_hours">Operating Hours <span className="text-sm font-normal text-gray-500">(Optional)</span></Label>
                        <Input
                            id="operating_hours"
                            value={data.operating_hours}
                            onChange={(e) => setData('operating_hours', e.target.value)}
                            className="mt-1"
                            placeholder="Daily: 5:00 AM - 8:00 PM"
                        />
                        <p className="mt-1 text-xs text-gray-500">When are you available for rides?</p>
                        <FormError error={errors.operating_hours || pageErrors?.operating_hours} className="mt-1" />
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex items-center justify-end gap-4">
                    {recentlySuccessful && (
                        <div className="flex items-center gap-2 text-sm text-green-600">
                            <CheckCircle className="h-4 w-4" />
                            <span>Profile saved successfully</span>
                        </div>
                    )}
                    <SaveButton isProcessing={processing} isDirty={isDirty} onClick={handleSubmit} position="bottom" />
                </div>
            </form>
        </div>
    );
}

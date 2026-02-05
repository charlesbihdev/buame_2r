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

export function HotelProfile({ profile }) {
    console.log('HotelProfile - profile:', profile);
    const { errors: pageErrors } = usePage().props;
    const primaryImage = profile?.images?.find((img) => img.is_primary) || profile?.images?.[0];
    const [profileImagePreview, setProfileImagePreview] = useState(primaryImage?.image_path || null);

    // Ensure profile exists - if not, show message
    if (!profile || !profile.id) {
        return (
            <div className="space-y-6">
                <div className="rounded-xl border border-[var(--buame-border-light)] bg-white p-6 dark:border-[#2a4d2a] dark:bg-[#1a331a]">
                    <p className="text-gray-600 dark:text-gray-400">Loading profile...</p>
                </div>
            </div>
        );
    }

    const { data, setData, post, processing, errors, recentlySuccessful, isDirty } = useForm({
        _method: 'PUT',
        name: profile?.name || '',
        type: profile?.type || 'hotel',
        description: profile?.description || '',
        location: profile?.location || '',
        address: profile?.address || '',
        phone: profile?.phone || '',
        whatsapp: profile?.whatsapp || '',
        email: profile?.email || '',
        price_per_night: profile?.price_per_night || '',
        rooms_count: profile?.rooms_count || '',
        check_in_time: profile?.check_in_time || '08:00',
        check_out_time: profile?.check_out_time || '20:00',
        primary_image: null,
    });

    const hotelTypes = [
        { value: 'hotel', label: 'Hotel' },
        { value: 'guest_house', label: 'Guest House' },
        { value: 'lodge', label: 'Lodge' },
        { value: 'short_stay', label: 'Short Stay' },
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
        post(route('user.dashboard.hotels.update', profile.id), {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                // Keep preview as is on success
            },
        });
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-[var(--foreground)] dark:text-white">Hotel Profile</h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Manage your hotel profile information</p>
            </div>

            {/* Visibility Banner with save button */}
            {profile && (
                <ListingVisibilityBanner
                    listing={profile}
                    routeName="user.dashboard.hotels.toggle-active"
                    label="Hotel"
                    saveButton={{
                        isProcessing: processing,
                        isDirty: isDirty,
                        onClick: handleSubmit
                    }}
                />
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Profile Image Section */}
                <div className="rounded-xl border border-[var(--buame-border-light)] bg-white p-6 dark:border-[#2a4d2a] dark:bg-[#1a331a]">
                    <h3 className="mb-4 text-lg font-bold text-[var(--foreground)] dark:text-white">Hotel Image</h3>
                    <div className="flex items-start gap-6">
                        {profileImagePreview ? (
                            <div className="relative">
                                <img
                                    src={profileImagePreview}
                                    alt="Hotel"
                                    className="h-32 w-32 rounded-lg border border-[var(--buame-border-light)] object-cover dark:border-[#2a4d2a]"
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
                            <div className="flex h-32 w-32 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
                                <ImageIcon className="h-12 w-12 text-gray-400" />
                            </div>
                        )}
                        <div className="flex-1">
                            <Label htmlFor="primary_image">Primary Image</Label>
                            <p className="mt-1 mb-3 text-xs text-gray-500 dark:text-gray-400">
                                This image will be displayed as your hotel thumbnail to visitors
                            </p>
                            <label
                                htmlFor="primary_image"
                                className="flex cursor-pointer items-center gap-2 rounded-md border border-[var(--buame-border-light)] bg-white px-4 py-2 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[#f6f8f6] dark:border-[#2a4d2a] dark:bg-[#1a331a] dark:text-white dark:hover:bg-[#254225]"
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
                <div className="rounded-xl border border-[var(--buame-border-light)] bg-white p-6 dark:border-[#2a4d2a] dark:bg-[#1a331a]">
                    <h3 className="mb-4 text-lg font-bold text-[var(--foreground)] dark:text-white">Basic Information</h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <Label htmlFor="name">Hotel Name</Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="mt-1"
                                placeholder="Royal Palm Hotel"
                            />
                            <FormError error={errors.name || pageErrors?.name} className="mt-1" />
                        </div>

                        <div>
                            <Label htmlFor="type">Property Type</Label>
                            <Select value={data.type} onValueChange={(value) => setData('type', value)}>
                                <SelectTrigger className="mt-1">
                                    <SelectValue placeholder="Select property type" />
                                </SelectTrigger>
                                <SelectContent>
                                    {hotelTypes.map((type) => (
                                        <SelectItem key={type.value} value={type.value}>
                                            {type.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormError error={errors.type || pageErrors?.type} className="mt-1" />
                        </div>

                        <div>
                            <Label htmlFor="price_per_night">Price per Night (GH₵)</Label>
                            <Input
                                id="price_per_night"
                                type="number"
                                step="0.01"
                                value={data.price_per_night}
                                onChange={(e) => setData('price_per_night', e.target.value)}
                                className="mt-1"
                                placeholder="150.00"
                            />
                            <FormError error={errors.price_per_night || pageErrors?.price_per_night} className="mt-1" />
                        </div>

                        <div>
                            <Label htmlFor="rooms_count">Number of Rooms</Label>
                            <Input
                                id="rooms_count"
                                type="number"
                                value={data.rooms_count}
                                onChange={(e) => setData('rooms_count', e.target.value)}
                                className="mt-1"
                                placeholder="25"
                            />
                            <FormError error={errors.rooms_count || pageErrors?.rooms_count} className="mt-1" />
                        </div>
                    </div>
                </div>

                {/* Description Section */}
                <div className="rounded-xl border border-[var(--buame-border-light)] bg-white p-6 dark:border-[#2a4d2a] dark:bg-[#1a331a]">
                    <h3 className="mb-4 text-lg font-bold text-[var(--foreground)] dark:text-white">About Your Property</h3>
                    <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className="mt-1"
                            rows={4}
                            placeholder="Describe your property, its unique features, and what makes it special..."
                        />
                        <FormError error={errors.description || pageErrors?.description} className="mt-1" />
                    </div>
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
                            <Label htmlFor="address">Full Address</Label>
                            <Input
                                id="address"
                                value={data.address}
                                onChange={(e) => setData('address', e.target.value)}
                                className="mt-1"
                                placeholder="Street address"
                            />
                            <FormError error={errors.address || pageErrors?.address} className="mt-1" />
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
                            <Label htmlFor="whatsapp">WhatsApp</Label>
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
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="mt-1"
                                placeholder="info@royalpalmhotel.com"
                            />
                            <FormError error={errors.email || pageErrors?.email} className="mt-1" />
                        </div>
                    </div>
                </div>

                {/* Operating Hours Section */}
                <div className="rounded-xl border border-[var(--buame-border-light)] bg-white p-6 dark:border-[#2a4d2a] dark:bg-[#1a331a]">
                    <h3 className="mb-4 text-lg font-bold text-[var(--foreground)] dark:text-white">Operating Hours</h3>
                    <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                        Set the hours when your hotel reception is open and available for guests
                    </p>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <Label htmlFor="check_in_time">Opening Time</Label>
                            <Input
                                id="check_in_time"
                                type="time"
                                value={data.check_in_time}
                                onChange={(e) => setData('check_in_time', e.target.value)}
                                className="mt-1"
                            />
                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">When your reception opens</p>
                            <FormError error={errors.check_in_time || pageErrors?.check_in_time} className="mt-1" />
                        </div>

                        <div>
                            <Label htmlFor="check_out_time">Closing Time</Label>
                            <Input
                                id="check_out_time"
                                type="time"
                                value={data.check_out_time}
                                onChange={(e) => setData('check_out_time', e.target.value)}
                                className="mt-1"
                            />
                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">When your reception closes</p>
                            <FormError error={errors.check_out_time || pageErrors?.check_out_time} className="mt-1" />
                        </div>
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

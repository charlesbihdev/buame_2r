import { FormError } from '@/components/ui/form-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useForm, usePage } from '@inertiajs/react';
import { CheckCircle, Image as ImageIcon, Save, Upload, X } from 'lucide-react';
import { useState } from 'react';

export function TransportProfile({ profile }) {
    const { errors: pageErrors } = usePage().props;
    const primaryImage = profile?.images?.find((img) => img.is_primary) || profile?.images?.[0];
    const [profileImagePreview, setProfileImagePreview] = useState(primaryImage?.image_path || null);

    // Ensure profile exists - if not, show message
    if (!profile || !profile.id) {
        return (
            <div className="space-y-6">
                <div className="rounded-xl border border-[#e7f3e7] bg-white p-6 dark:border-[#2a4d2a] dark:bg-[#1a331a]">
                    <p className="text-gray-600 dark:text-gray-400">Loading profile...</p>
                </div>
            </div>
        );
    }

    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        _method: 'PUT',
        company_name: profile?.company_name || '',
        type: profile?.type || 'okada',
        description: profile?.description || '',
        location: profile?.location || '',
        address: profile?.address || '',
        phone: profile?.phone || '',
        whatsapp: profile?.whatsapp || '',
        email: profile?.email || '',
        price_per_seat: profile?.price_per_seat || '',
        seats_available: profile?.seats_available || '',
        operating_hours: profile?.operating_hours || '',
        is_active: profile?.is_active ?? true,
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
        e.preventDefault();
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
                <h2 className="text-2xl font-bold text-[#0d1b0d] dark:text-white">Transport Profile</h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Manage your transport service information</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Profile Image Section */}
                <div className="rounded-xl border border-[#e7f3e7] bg-white p-6 dark:border-[#2a4d2a] dark:bg-[#1a331a]">
                    <h3 className="mb-4 text-lg font-bold text-[#0d1b0d] dark:text-white">Vehicle Image</h3>
                    <div className="flex items-start gap-6">
                        {profileImagePreview ? (
                            <div className="relative">
                                <img
                                    src={profileImagePreview}
                                    alt="Vehicle"
                                    className="h-32 w-32 rounded-lg border border-[#e7f3e7] object-cover dark:border-[#2a4d2a]"
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
                                This image will be displayed as your vehicle/service thumbnail to visitors
                            </p>
                            <label
                                htmlFor="primary_image"
                                className="flex cursor-pointer items-center gap-2 rounded-md border border-[#e7f3e7] bg-white px-4 py-2 text-sm font-medium text-[#0d1b0d] transition-colors hover:bg-[#f6f8f6] dark:border-[#2a4d2a] dark:bg-[#1a331a] dark:text-white dark:hover:bg-[#254225]"
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
                <div className="rounded-xl border border-[#e7f3e7] bg-white p-6 dark:border-[#2a4d2a] dark:bg-[#1a331a]">
                    <h3 className="mb-4 text-lg font-bold text-[#0d1b0d] dark:text-white">Basic Information</h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <Label htmlFor="company_name">Company/Service Name</Label>
                            <Input
                                id="company_name"
                                value={data.company_name}
                                onChange={(e) => setData('company_name', e.target.value)}
                                className="mt-1"
                                placeholder="Fast Okada & Car Riders"
                            />
                            <FormError error={errors.company_name || pageErrors?.company_name} className="mt-1" />
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
                </div>

                {/* Description Section */}
                <div className="rounded-xl border border-[#e7f3e7] bg-white p-6 dark:border-[#2a4d2a] dark:bg-[#1a331a]">
                    <h3 className="mb-4 text-lg font-bold text-[#0d1b0d] dark:text-white">About Your Service</h3>
                    <div>
                        <Label htmlFor="description">Description</Label>
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
                <div className="rounded-xl border border-[#e7f3e7] bg-white p-6 dark:border-[#2a4d2a] dark:bg-[#1a331a]">
                    <h3 className="mb-4 text-lg font-bold text-[#0d1b0d] dark:text-white">Location & Contact</h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <Label htmlFor="location">Base Location</Label>
                            <Input
                                id="location"
                                value={data.location}
                                onChange={(e) => setData('location', e.target.value)}
                                className="mt-1"
                                placeholder="Sefwi Bekwai"
                            />
                            <FormError error={errors.location || pageErrors?.location} className="mt-1" />
                        </div>

                        <div>
                            <Label htmlFor="address">Station/Pickup Address</Label>
                            <Input
                                id="address"
                                value={data.address}
                                onChange={(e) => setData('address', e.target.value)}
                                className="mt-1"
                                placeholder="Main Lorry Station, Bekwai"
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
                                placeholder="contact@fastokada.com"
                            />
                            <FormError error={errors.email || pageErrors?.email} className="mt-1" />
                        </div>
                    </div>
                </div>

                {/* Operating Hours Section */}
                <div className="rounded-xl border border-[#e7f3e7] bg-white p-6 dark:border-[#2a4d2a] dark:bg-[#1a331a]">
                    <h3 className="mb-4 text-lg font-bold text-[#0d1b0d] dark:text-white">Operating Hours</h3>
                    <div>
                        <Label htmlFor="operating_hours">Operating Hours</Label>
                        <Input
                            id="operating_hours"
                            value={data.operating_hours}
                            onChange={(e) => setData('operating_hours', e.target.value)}
                            className="mt-1"
                            placeholder="Daily: 5:00 AM - 8:00 PM"
                        />
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                            When are you available for rides?
                        </p>
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
                    <button
                        type="submit"
                        disabled={processing}
                        className="inline-flex items-center justify-center gap-2 rounded-md bg-[#13ec13] px-4 py-2 text-sm font-medium whitespace-nowrap text-[#0d1b0d] transition-[color,box-shadow] hover:cursor-pointer hover:bg-[#0eb50e] disabled:pointer-events-none disabled:opacity-50"
                    >
                        <Save className="h-4 w-4" />
                        {processing ? 'Saving...' : 'Save Profile'}
                    </button>
                </div>
            </form>
        </div>
    );
}

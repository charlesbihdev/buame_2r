import { Button } from '@/components/ui/button';
import { FormError } from '@/components/ui/form-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useForm, usePage } from '@inertiajs/react';
import { CheckCircle, Image as ImageIcon, Save, Upload, X } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ArtisanProfile({ profile }) {
    const { errors: pageErrors } = usePage().props;
    const [specialties, setSpecialties] = useState(profile?.specialties?.map((s) => s.specialty) || []);
    const [newSpecialty, setNewSpecialty] = useState('');
    const [profileImagePreview, setProfileImagePreview] = useState(profile?.profile_image || null);

    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        _method: 'PUT',
        name: profile?.name || '',
        skill: profile?.skill || '',
        skill_type: profile?.skill_type || 'other',
        description: profile?.description || '',
        experience_years: profile?.experience_years || '',
        experience_level: profile?.experience_level || '',
        price_per_day: profile?.price_per_day || '',
        location: profile?.location || '',
        address: profile?.address || '',
        phone: profile?.phone || '',
        whatsapp: profile?.whatsapp || '',
        email: profile?.email || '',
        working_hours: profile?.working_hours || '',
        is_available: profile?.is_available ?? true,
        specialties: specialties,
        profile_image: null,
    });

    const skillTypes = [
        { value: 'carpenter', label: 'Carpenter' },
        { value: 'mason', label: 'Mason' },
        { value: 'electrician', label: 'Electrician' },
        { value: 'plumber', label: 'Plumber' },
        { value: 'tiler', label: 'Tiler' },
        { value: 'tailor', label: 'Tailor' },
        { value: 'welder', label: 'Welder' },
        { value: 'painter', label: 'Painter' },
        { value: 'other', label: 'Other' },
    ];

    const experienceLevels = [
        { value: 'beginner', label: 'Beginner' },
        { value: 'intermediate', label: 'Intermediate' },
        { value: 'expert', label: 'Expert' },
    ];

    const handleAddSpecialty = () => {
        if (newSpecialty.trim() && !specialties.includes(newSpecialty.trim())) {
            const updatedSpecialties = [...specialties, newSpecialty.trim()];
            setSpecialties(updatedSpecialties);
            setData('specialties', updatedSpecialties);
            setNewSpecialty('');
        }
    };

    const handleRemoveSpecialty = (index) => {
        const updatedSpecialties = specialties.filter((_, i) => i !== index);
        setSpecialties(updatedSpecialties);
        setData('specialties', updatedSpecialties);
    };

    const handleProfileImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('profile_image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveProfileImage = () => {
        setData('profile_image', null);
        setProfileImagePreview(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!profile?.id) {
            console.error('Profile ID is missing. Cannot submit form.');
            return;
        }
        // Use POST with _method spoofing for file uploads (Laravel limitation with PUT)
        post(route('user.dashboard.artisans.update', profile.id), {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                // Keep preview as is on success
            },
        });
    };

    // Update form data when specialties change
    useEffect(() => {
        setData('specialties', specialties);
    }, [specialties, setData]);

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-[var(--foreground)] dark:text-white">Artisan Profile</h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Manage your artisan profile information</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="rounded-xl border border-[var(--buame-border-light)] bg-white p-6 dark:border-[#2a4d2a] dark:bg-[#1a331a]">
                    <h3 className="mb-4 text-lg font-bold text-[var(--foreground)] dark:text-white">Profile Image</h3>
                    <div className="flex items-start gap-6">
                        {profileImagePreview ? (
                            <div className="relative">
                                <img
                                    src={profileImagePreview}
                                    alt="Profile"
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
                            <Label htmlFor="profile_image">Profile Image (Thumbnail)</Label>
                            <p className="mt-1 mb-3 text-xs text-gray-500 dark:text-gray-400">
                                This image will be displayed as your thumbnail to visitors
                            </p>
                            <label
                                htmlFor="profile_image"
                                className="flex cursor-pointer items-center gap-2 rounded-md border border-[var(--buame-border-light)] bg-white px-4 py-2 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[#f6f8f6] dark:border-[#2a4d2a] dark:bg-[#1a331a] dark:text-white dark:hover:bg-[#254225]"
                            >
                                <Upload className="h-4 w-4" />
                                {profileImagePreview ? 'Change Image' : 'Upload Image'}
                            </label>
                            <input id="profile_image" type="file" className="hidden" accept="image/*" onChange={handleProfileImageChange} />
                            <FormError error={errors.profile_image || pageErrors?.profile_image} className="mt-1" />
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-[var(--buame-border-light)] bg-white p-6 dark:border-[#2a4d2a] dark:bg-[#1a331a]">
                    <h3 className="mb-4 text-lg font-bold text-[var(--foreground)] dark:text-white">Basic Information</h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="mt-1"
                                placeholder="Kwame Mensah"
                            />
                            <FormError error={errors.name || pageErrors?.name} className="mt-1" />
                        </div>

                        <div>
                            <Label htmlFor="skill_type">Skill Type</Label>
                            <Select value={data.skill_type} onValueChange={(value) => setData('skill_type', value)}>
                                <SelectTrigger className="mt-1">
                                    <SelectValue placeholder="Select skill type" />
                                </SelectTrigger>
                                <SelectContent>
                                    {skillTypes.map((type) => (
                                        <SelectItem key={type.value} value={type.value}>
                                            {type.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormError error={errors.skill_type || pageErrors?.skill_type} className="mt-1" />
                        </div>

                        <div>
                            <Label htmlFor="skill">Skill/Title</Label>
                            <Input
                                id="skill"
                                value={data.skill}
                                onChange={(e) => setData('skill', e.target.value)}
                                className="mt-1"
                                placeholder="Master Carpenter"
                            />
                            <FormError error={errors.skill || pageErrors?.skill} className="mt-1" />
                        </div>

                        <div>
                            <Label htmlFor="experience_years">Years of Experience</Label>
                            <Input
                                id="experience_years"
                                type="number"
                                value={data.experience_years}
                                onChange={(e) => setData('experience_years', e.target.value)}
                                className="mt-1"
                                placeholder="12"
                            />
                            <FormError error={errors.experience_years || pageErrors?.experience_years} className="mt-1" />
                        </div>

                        <div>
                            <Label htmlFor="experience_level">Experience Level</Label>
                            <Select value={data.experience_level} onValueChange={(value) => setData('experience_level', value)}>
                                <SelectTrigger className="mt-1">
                                    <SelectValue placeholder="Select experience level" />
                                </SelectTrigger>
                                <SelectContent>
                                    {experienceLevels.map((level) => (
                                        <SelectItem key={level.value} value={level.value}>
                                            {level.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormError error={errors.experience_level || pageErrors?.experience_level} className="mt-1" />
                        </div>

                        <div>
                            <Label htmlFor="price_per_day">Average Price per Day (GH₵)</Label>
                            <Input
                                id="price_per_day"
                                type="number"
                                step="0.01"
                                value={data.price_per_day}
                                onChange={(e) => setData('price_per_day', e.target.value)}
                                className="mt-1"
                                placeholder="80.00"
                            />
                            <FormError error={errors.price_per_day || pageErrors?.price_per_day} className="mt-1" />
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-[var(--buame-border-light)] bg-white p-6 dark:border-[#2a4d2a] dark:bg-[#1a331a]">
                    <h3 className="mb-4 text-lg font-bold text-[var(--foreground)] dark:text-white">About</h3>
                    <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className="mt-1"
                            rows={4}
                            placeholder="Experienced master carpenter with over 12 years of expertise..."
                        />
                        <FormError error={errors.description || pageErrors?.description} className="mt-1" />
                    </div>
                </div>

                <div className="rounded-xl border border-[var(--buame-border-light)] bg-white p-6 dark:border-[#2a4d2a] dark:bg-[#1a331a]">
                    <h3 className="mb-4 text-lg font-bold text-[var(--foreground)] dark:text-white">Specialties</h3>
                    <div className="flex gap-2">
                        <Input
                            value={newSpecialty}
                            onChange={(e) => setNewSpecialty(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSpecialty())}
                            placeholder="Add specialty (e.g., Furniture)"
                            className="flex-1"
                        />
                        <Button type="button" onClick={handleAddSpecialty} variant="outline">
                            Add
                        </Button>
                    </div>
                    {specialties.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                            {specialties.map((spec, index) => (
                                <span
                                    key={index}
                                    className="flex items-center gap-2 rounded-md bg-[var(--primary)]/10 px-3 py-1 text-sm font-semibold text-white dark:text-[var(--primary)]"
                                >
                                    {spec}
                                    <button type="button" onClick={() => handleRemoveSpecialty(index)} className="text-red-600 hover:text-red-800">
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>
                    )}
                </div>

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
                                placeholder="kwame.mensah@example.com"
                            />
                            <FormError error={errors.email || pageErrors?.email} className="mt-1" />
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-[var(--buame-border-light)] bg-white p-6 dark:border-[#2a4d2a] dark:bg-[#1a331a]">
                    <h3 className="mb-4 text-lg font-bold text-[var(--foreground)] dark:text-white">Working Hours</h3>
                    <div>
                        <Label htmlFor="working_hours">Working Hours</Label>
                        <Input
                            id="working_hours"
                            value={data.working_hours}
                            onChange={(e) => setData('working_hours', e.target.value)}
                            className="mt-1"
                            placeholder="Mon-Sat: 7:00 AM - 6:00 PM"
                        />
                        <FormError error={errors.working_hours || pageErrors?.working_hours} className="mt-1" />
                    </div>
                </div>

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
                        className="inline-flex items-center justify-center gap-2 rounded-md bg-[var(--primary)] px-4 py-2 text-sm font-medium whitespace-nowrap text-white transition-[color,box-shadow] hover:cursor-pointer hover:bg-[#0eb50e] disabled:pointer-events-none disabled:opacity-50"
                    >
                        <Save className="h-4 w-4" />
                        {processing ? 'Saving...' : 'Save Profile'}
                    </button>
                </div>
            </form>
        </div>
    );
}

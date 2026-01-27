import { Button } from '@/components/ui/button';
import { FormError } from '@/components/ui/form-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useForm, router } from '@inertiajs/react';
import { CheckCircle, Copy, ExternalLink, Eye, EyeOff } from 'lucide-react';
import { useEffect, useState } from 'react';

export function JobPosterSettings({ poster }) {
    const [copied, setCopied] = useState(false);
    const [slugValue, setSlugValue] = useState(poster?.slug || '');

    const { data, setData, put, processing, errors, reset } = useForm({
        name: poster?.name || '',
        slug: poster?.slug || '',
        description: poster?.description || '',
        location: poster?.location || '',
        phone: poster?.phone || '',
        whatsapp: poster?.whatsapp || '',
        email: poster?.email || '',
        website: poster?.website || '',
    });

    useEffect(() => {
        if (poster) {
            setData({
                name: poster.name || '',
                slug: poster.slug || '',
                description: poster.description || '',
                location: poster.location || '',
                phone: poster.phone || '',
                whatsapp: poster.whatsapp || '',
                email: poster.email || '',
                website: poster.website || '',
            });
            setSlugValue(poster.slug || '');
        }
    }, [poster]);

    const handleNameChange = (e) => {
        const name = e.target.value;
        setData('name', name);
        if (!slugValue || slugValue === poster?.slug) {
            const generatedSlug = name
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '');
            setData('slug', generatedSlug);
            setSlugValue(generatedSlug);
        }
    };

    const handleSlugChange = (e) => {
        const slug = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '');
        setData('slug', slug);
        setSlugValue(slug);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('user.dashboard.jobs.poster.update'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            },
        });
    };

    const handleToggleActive = () => {
        router.post(route('user.dashboard.jobs.poster.toggle-active'), {}, {
            preserveScroll: true,
        });
    };

    const handleCopy = () => {
        const posterUrl = `${window.location.origin}/jobs/employer/${data.slug || poster?.slug}`;
        navigator.clipboard.writeText(posterUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const posterUrl = `${window.location.origin}/jobs/employer/${data.slug || poster?.slug || 'your-profile'}`;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-2xl font-bold text-[var(--foreground)] dark:text-white">Employer Profile</h2>
                <p className="mt-1 text-gray-600 dark:text-gray-400">Manage your employer profile and contact information</p>
            </div>

            {/* Visibility Toggle */}
            <div
                className={`rounded-xl border-2 p-6 ${poster?.is_active ? 'border-[var(--primary)] bg-[var(--buame-border-light)] dark:bg-[#1a331a]' : 'border-[var(--accent)]/30 bg-[var(--accent)]/10 dark:border-[var(--accent)]/20 dark:bg-[var(--accent)]/5'}`}
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div
                            className={`flex h-12 w-12 items-center justify-center rounded-full ${poster?.is_active ? 'bg-[var(--primary)]/20' : 'bg-[var(--accent)]/20 dark:bg-[var(--accent)]/10'}`}
                        >
                            {poster?.is_active ? (
                                <Eye className="h-6 w-6 text-[var(--primary)]" />
                            ) : (
                                <EyeOff className="h-6 w-6 text-[var(--accent)] dark:text-[var(--accent)]" />
                            )}
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-[var(--foreground)] dark:text-white">
                                Profile is {poster?.is_active ? 'Visible' : 'Hidden'}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {poster?.is_active
                                    ? 'Your employer profile and jobs are visible to visitors'
                                    : 'Your profile is hidden from visitors. Toggle to make it visible.'}
                            </p>
                        </div>
                    </div>
                    <Button
                        onClick={handleToggleActive}
                        variant={poster?.is_active ? 'outline' : 'default'}
                        className={poster?.is_active ? '' : 'bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90'}
                    >
                        {poster?.is_active ? 'Hide Profile' : 'Show Profile'}
                    </Button>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Company Name and Slug */}
                <div className="rounded-xl border border-[var(--buame-border-light)] bg-white p-6 dark:border-[#2a4d2a] dark:bg-[#1a331a]">
                    <div className="grid gap-6 md:grid-cols-2">
                        <div>
                            <Label htmlFor="name" className="mb-2 block text-sm font-semibold text-[var(--foreground)] dark:text-white">
                                Company / Employer Name *
                            </Label>
                            <Input id="name" value={data.name} onChange={handleNameChange} placeholder="Enter company name" className="w-full" required />
                            <FormError error={errors.name} />
                        </div>
                        <div>
                            <Label htmlFor="slug" className="mb-2 block text-sm font-semibold text-[var(--foreground)] dark:text-white">
                                Profile URL Slug
                            </Label>
                            <div className="flex items-center gap-2">
                                <span className="text-sm whitespace-nowrap text-gray-500">/jobs/employer/</span>
                                <Input
                                    id="slug"
                                    value={data.slug}
                                    onChange={handleSlugChange}
                                    placeholder="your-company"
                                    className="flex-1"
                                    pattern="[a-z0-9-]+"
                                />
                            </div>
                            <FormError error={errors.slug} />
                            <p className="mt-1 text-xs text-gray-500">Lowercase letters, numbers, and hyphens only</p>
                        </div>
                    </div>
                </div>

                {/* Description and Link */}
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="rounded-xl border border-[var(--buame-border-light)] bg-white p-6 dark:border-[#2a4d2a] dark:bg-[#1a331a]">
                        <Label htmlFor="description" className="mb-2 block text-sm font-semibold text-[var(--foreground)] dark:text-white">
                            About Your Company
                        </Label>
                        <Textarea
                            id="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            placeholder="Tell job seekers about your company..."
                            rows={4}
                            className="w-full"
                        />
                        <FormError error={errors.description} />
                    </div>

                    <div className="rounded-xl border border-[var(--buame-border-light)] bg-white p-6 dark:border-[#2a4d2a] dark:bg-[#1a331a]">
                        <Label className="mb-2 block text-sm font-semibold text-[var(--foreground)] dark:text-white">Your Profile Link</Label>
                        <div className="flex gap-2">
                            <Input value={posterUrl} readOnly className="flex-1 text-sm" />
                            <Button onClick={handleCopy} variant="outline" type="button" size="icon">
                                {copied ? <CheckCircle className="h-4 w-4 text-[var(--primary)]" /> : <Copy className="h-4 w-4" />}
                            </Button>
                            <Button variant="outline" asChild type="button" size="icon">
                                <a href={posterUrl} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="h-4 w-4" />
                                </a>
                            </Button>
                        </div>
                        <p className="mt-2 text-xs text-gray-500">Share this link to show all your job postings</p>
                    </div>
                </div>

                {/* Location */}
                <div className="rounded-xl border border-[var(--buame-border-light)] bg-white p-6 dark:border-[#2a4d2a] dark:bg-[#1a331a]">
                    <Label htmlFor="location" className="mb-2 block text-sm font-semibold text-[var(--foreground)] dark:text-white">
                        Business Location
                    </Label>
                    <Input
                        id="location"
                        value={data.location}
                        onChange={(e) => setData('location', e.target.value)}
                        placeholder="e.g., Accra, Ghana"
                        className="w-full"
                    />
                    <FormError error={errors.location} />
                </div>

                {/* Contact Information */}
                <div className="rounded-xl border border-[var(--buame-border-light)] bg-white p-6 dark:border-[#2a4d2a] dark:bg-[#1a331a]">
                    <h3 className="mb-4 font-semibold text-[var(--foreground)] dark:text-white">Contact Information</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <Label htmlFor="phone" className="mb-2 block text-sm font-semibold text-[var(--foreground)] dark:text-white">
                                Phone Number *
                            </Label>
                            <Input
                                id="phone"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                placeholder="Phone number"
                            />
                            <FormError error={errors.phone} />
                        </div>

                        <div>
                            <Label htmlFor="whatsapp" className="mb-2 block text-sm font-semibold text-[var(--foreground)] dark:text-white">
                                WhatsApp
                            </Label>
                            <Input
                                id="whatsapp"
                                value={data.whatsapp}
                                onChange={(e) => setData('whatsapp', e.target.value)}
                                placeholder="WhatsApp number"
                            />
                            <FormError error={errors.whatsapp} />
                        </div>

                        <div>
                            <Label htmlFor="email" className="mb-2 block text-sm font-semibold text-[var(--foreground)] dark:text-white">
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="Email address"
                            />
                            <FormError error={errors.email} />
                        </div>

                        <div>
                            <Label htmlFor="website" className="mb-2 block text-sm font-semibold text-[var(--foreground)] dark:text-white">
                                Website
                            </Label>
                            <Input
                                id="website"
                                type="url"
                                value={data.website}
                                onChange={(e) => setData('website', e.target.value)}
                                placeholder="https://yourcompany.com"
                            />
                            <FormError error={errors.website} />
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                    <Button
                        type="submit"
                        disabled={processing}
                        className="cursor-pointer bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90"
                    >
                        {processing ? 'Saving...' : 'Save Changes'}
                    </Button>
                </div>
            </form>
        </div>
    );
}

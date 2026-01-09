import { Button } from '@/components/ui/button';
import { FormError } from '@/components/ui/form-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { router, useForm } from '@inertiajs/react';
import { ArrowUpRight, CheckCircle, Copy, ExternalLink, Eye, EyeOff } from 'lucide-react';
import { useEffect, useState } from 'react';
import { StoreVisibilityToggle } from './StoreVisibilityToggle';

export function StoreSettings({ store, tiers }) {
    const [copied, setCopied] = useState(false);
    const [slugValue, setSlugValue] = useState(store?.slug || '');

    const { data, setData, put, processing, errors, reset } = useForm({
        name: store?.name || '',
        slug: store?.slug || '',
        description: store?.description || '',
    });

    useEffect(() => {
        if (store) {
            setData({
                name: store.name || '',
                slug: store.slug || '',
                description: store.description || '',
            });
            setSlugValue(store.slug || '');
        }
    }, [store]);

    const handleNameChange = (e) => {
        const name = e.target.value;
        setData('name', name);
        // Auto-generate slug from name if slug hasn't been manually edited
        if (!slugValue || slugValue === store?.slug) {
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
        put(route('user.dashboard.marketplace.store.update'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            },
        });
    };

    const handleCopy = () => {
        const storeUrl = `${window.location.origin}/store/${data.slug || store?.slug}`;
        navigator.clipboard.writeText(storeUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleUpgrade = (tier) => {
        router.post(route('user.dashboard.marketplace.store.upgrade'), {
            tier,
        });
    };

    const storeUrl = `${window.location.origin}/store/${data.slug || store?.slug || 'your-store'}`;
    const currentTier = tiers?.[store?.tier || 'starter'];
    const currentTierIndex = ['starter', 'professional', 'enterprise'].indexOf(store?.tier || 'starter');
    const availableTiers = Object.entries(tiers || {}).slice(currentTierIndex + 1);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-2xl font-bold text-[#0d1b0d] dark:text-white">Store Settings</h2>
                <p className="mt-1 text-gray-600 dark:text-gray-400">Manage your store information and visibility</p>
            </div>

            {/* Store Visibility Toggle - Prominent at the top */}
            <div className={`rounded-xl border-2 p-6 ${store?.is_active ? 'border-[#13ec13] bg-[#e7f3e7] dark:bg-[#1a331a]' : 'border-orange-300 bg-orange-50 dark:border-orange-700 dark:bg-orange-900/20'}`}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className={`flex h-12 w-12 items-center justify-center rounded-full ${store?.is_active ? 'bg-[#13ec13]/20' : 'bg-orange-200 dark:bg-orange-800'}`}>
                            {store?.is_active ? (
                                <Eye className="h-6 w-6 text-[#13ec13]" />
                            ) : (
                                <EyeOff className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                            )}
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-[#0d1b0d] dark:text-white">
                                Store is {store?.is_active ? 'Visible' : 'Hidden'}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {store?.is_active
                                    ? 'Your store and products are visible to visitors'
                                    : 'Your store is hidden from visitors. Toggle to make it visible.'}
                            </p>
                        </div>
                    </div>
                    <StoreVisibilityToggle store={store} />
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Store Name and Slug - Side by Side */}
                <div className="rounded-xl border border-[#e7f3e7] bg-white p-6 dark:border-[#2a4d2a] dark:bg-[#1a331a]">
                    <div className="grid gap-6 md:grid-cols-2">
                        <div>
                            <Label htmlFor="name" className="mb-2 block text-sm font-semibold text-[#0d1b0d] dark:text-white">
                                Store Name
                            </Label>
                            <Input id="name" value={data.name} onChange={handleNameChange} placeholder="Enter your store name" className="w-full" />
                            <FormError error={errors.name} />
                        </div>
                        <div>
                            <Label htmlFor="slug" className="mb-2 block text-sm font-semibold text-[#0d1b0d] dark:text-white">
                                Store URL Slug
                            </Label>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-500 whitespace-nowrap">/store/</span>
                                <Input
                                    id="slug"
                                    value={data.slug}
                                    onChange={handleSlugChange}
                                    placeholder="your-store-name"
                                    className="flex-1"
                                    pattern="[a-z0-9-]+"
                                />
                            </div>
                            <FormError error={errors.slug} />
                            <p className="mt-1 text-xs text-gray-500">Lowercase letters, numbers, and hyphens only</p>
                        </div>
                    </div>
                </div>

                {/* Store Description and Link - Side by Side */}
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="rounded-xl border border-[#e7f3e7] bg-white p-6 dark:border-[#2a4d2a] dark:bg-[#1a331a]">
                        <Label htmlFor="description" className="mb-2 block text-sm font-semibold text-[#0d1b0d] dark:text-white">
                            Store Description
                        </Label>
                        <Textarea
                            id="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            placeholder="Tell customers about your store..."
                            rows={4}
                            className="w-full"
                        />
                        <FormError error={errors.description} />
                    </div>

                    <div className="rounded-xl border border-[#e7f3e7] bg-white p-6 dark:border-[#2a4d2a] dark:bg-[#1a331a]">
                        <Label className="mb-2 block text-sm font-semibold text-[#0d1b0d] dark:text-white">Your Store Link</Label>
                        <div className="flex gap-2">
                            <Input value={storeUrl} readOnly className="flex-1 text-sm" />
                            <Button onClick={handleCopy} variant="outline" type="button" size="icon">
                                {copied ? <CheckCircle className="h-4 w-4 text-[#13ec13]" /> : <Copy className="h-4 w-4" />}
                            </Button>
                            <Button variant="outline" asChild type="button" size="icon">
                                <a href={storeUrl} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="h-4 w-4" />
                                </a>
                            </Button>
                        </div>
                        <p className="mt-2 text-xs text-gray-500">Share this link to let people view your products</p>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                    <Button type="submit" disabled={processing} className="bg-[#13ec13] text-[#0d1b0d] hover:bg-[#0eb50e]">
                        {processing ? 'Saving...' : 'Save Changes'}
                    </Button>
                </div>
            </form>

            {/* Current Plan and Upgrade - Side by Side */}
            <div className="grid gap-6 md:grid-cols-2">
                {/* Current Tier */}
                {currentTier && (
                    <div className="rounded-xl border border-[#e7f3e7] bg-white p-6 dark:border-[#2a4d2a] dark:bg-[#1a331a]">
                        <h4 className="mb-3 font-semibold text-[#0d1b0d] dark:text-white">Current Plan</h4>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-lg font-bold text-[#0d1b0d] dark:text-white">{currentTier.name}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {store?.products_count || 0} / {store?.product_limit || 5} products used
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-2xl font-bold text-[#13ec13]">GH₵ {currentTier.price}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Upgrade Options */}
                {availableTiers.length > 0 && (
                    <div className="rounded-xl border border-[#e7f3e7] bg-white p-6 dark:border-[#2a4d2a] dark:bg-[#1a331a]">
                        <h4 className="mb-3 font-semibold text-[#0d1b0d] dark:text-white">Upgrade Your Store</h4>
                        <div className="space-y-3">
                            {availableTiers.map(([key, tier]) => (
                                <div key={key} className="flex items-center justify-between rounded-lg border border-gray-200 p-3 dark:border-gray-700">
                                    <div>
                                        <p className="font-semibold text-[#0d1b0d] dark:text-white">{tier.name}</p>
                                        <p className="text-xs text-gray-500">Up to {tier.product_limit} products</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <p className="font-bold text-[#13ec13]">GH₵ {tier.price}</p>
                                        <Button onClick={() => handleUpgrade(key)} size="sm" className="bg-[#13ec13] text-[#0d1b0d] hover:bg-[#0eb50e]">
                                            <ArrowUpRight className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

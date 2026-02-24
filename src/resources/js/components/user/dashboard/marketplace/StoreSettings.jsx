import { Button } from '@/components/ui/button';
import { FormError } from '@/components/ui/form-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { VideoLinksManager } from '@/components/ui/VideoLinksManager';
import { router, useForm, usePage } from '@inertiajs/react';
import { ArrowUpRight, CheckCircle, Copy, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { ListingVisibilityBanner } from '@/components/user/dashboard/ListingVisibilityBanner';
import SaveButton from '@/components/user/dashboard/SaveButton';

export function StoreSettings({ store, tiers, isFreeAccess = false }) {
    const { errors: pageErrors } = usePage().props;
    const [copied, setCopied] = useState(false);
    const [slugValue, setSlugValue] = useState(store?.slug ?? '');
    const { data, setData, put, processing, errors, reset, isDirty } = useForm({
        name: store?.name || '',
        slug: store?.slug || '',
        description: store?.description || '',
    });

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
        e?.preventDefault();
        put(route('user.dashboard.marketplace.store.update'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            },
        });
    };

    const copyTextToClipboard = async (text) => {
        // Preferred modern API (requires secure context in most browsers)
        if (navigator?.clipboard?.writeText && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
            return;
        }

        // Fallback for non-secure contexts / older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.top = '-9999px';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    };

    const handleCopy = async () => {
        const storeUrl = `${window.location.origin}/store/${data.slug || store?.slug}`;
        try {
            await copyTextToClipboard(storeUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Copy failed:', err);
        }
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
                <h2 className="text-2xl font-bold text-[var(--foreground)]">Store Settings</h2>
                <p className="mt-1 text-gray-600">Manage your store information and visibility</p>
            </div>

            {/* Store Visibility Toggle - Using reusable ListingVisibilityBanner (only when store exists, like artisans/hotels) */}
            {store && (
                <ListingVisibilityBanner
                    listing={store}
                    routeName="user.dashboard.marketplace.store.toggle-active"
                    label="Store"
                    saveButton={{
                        isProcessing: processing,
                        isDirty: isDirty,
                        onClick: handleSubmit,
                    }}
                />
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Store Name and Slug - Side by Side */}
                <div className="rounded-xl border border-[var(--buame-border-light)] bg-white p-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        <div>
                            <Label htmlFor="name" className="mb-2 block text-sm font-semibold text-[var(--foreground)]">
                                Store Name
                            </Label>
                            <Input id="name" value={data.name} onChange={handleNameChange} placeholder="Enter your store name" className="w-full" />
                            <FormError error={errors.name || pageErrors?.name} className="mt-1" />
                        </div>
                        <div>
                            <Label htmlFor="slug" className="mb-2 block text-sm font-semibold text-[var(--foreground)]">
                                Store URL Slug
                            </Label>
                            <div className="flex items-center gap-2">
                                <span className="text-sm whitespace-nowrap text-gray-500">/store/</span>
                                <Input
                                    id="slug"
                                    value={data.slug}
                                    onChange={handleSlugChange}
                                    placeholder="your-store-name"
                                    className="flex-1"
                                    pattern="[a-z0-9\-]+"
                                />
                            </div>
                            <FormError error={errors.slug || pageErrors?.slug} className="mt-1" />
                            <p className="mt-1 text-xs text-gray-500">Lowercase letters, numbers, and hyphens only</p>
                        </div>
                    </div>
                </div>

                {/* Store Description and Link - Side by Side */}
                <div className="grid gap-6 md:grid-cols-2">
                    <div className="rounded-xl border border-[var(--buame-border-light)] bg-white p-6">
                        <Label htmlFor="description" className="mb-2 block text-sm font-semibold text-[var(--foreground)]">
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
                        <FormError error={errors.description || pageErrors?.description} className="mt-1" />
                    </div>

                    <div className="rounded-xl border border-[var(--buame-border-light)] bg-white p-6">
                        <Label className="mb-2 block text-sm font-semibold text-[var(--foreground)]">Your Store Link</Label>
                        <div className="flex gap-2">
                            <Input value={storeUrl} readOnly className="flex-1 text-sm" />
                            <Button onClick={handleCopy} variant="outline" type="button" size="icon">
                                {copied ? <CheckCircle className="h-4 w-4 text-[var(--primary)]" /> : <Copy className="h-4 w-4" />}
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
                    <SaveButton isProcessing={processing} isDirty={isDirty} onClick={handleSubmit} position="bottom" />
                </div>
            </form>

            {/* Video Links */}
            {store && (
                <VideoLinksManager
                    videoLinks={store?.video_links || []}
                    storeRouteName="user.dashboard.marketplace.store.video-links.store"
                    destroyRouteName="user.dashboard.marketplace.store.video-links.destroy"
                />
            )}

            {/* Current Plan and Upgrade - Side by Side */}
            <div className="grid gap-6 md:grid-cols-2">
                {/* Current Tier */}
                {currentTier && (
                    <div className="rounded-xl border border-[var(--buame-border-light)] bg-white p-6">
                        <h4 className="mb-3 font-semibold text-[var(--foreground)]">Current Plan</h4>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-lg font-bold text-[var(--foreground)]">{currentTier.name}</p>
                                <p className="text-sm text-gray-600">
                                    {store?.products_count || 0} / {store?.product_limit || 10} products used
                                </p>
                            </div>
                            <div className="text-right">
                                {isFreeAccess ? (
                                    <p className="text-2xl font-bold text-[var(--primary)]">Free Access</p>
                                ) : (
                                    <p className="text-2xl font-bold text-[var(--primary)]">GH₵ {currentTier.price}</p>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Upgrade Options */}
                {!isFreeAccess && availableTiers.length > 0 && (
                    <div className="rounded-xl border border-[var(--buame-border-light)] bg-white p-6">
                        <h4 className="mb-3 font-semibold text-[var(--foreground)]">Upgrade Your Store</h4>
                        <div className="space-y-3">
                            {availableTiers.map(([key, tier]) => (
                                <div
                                    key={key}
                                    className="flex items-center justify-between rounded-lg border border-gray-200 p-3"
                                >
                                    <div>
                                        <p className="font-semibold text-[var(--foreground)]">{tier.name}</p>
                                        <p className="text-xs text-gray-500">Up to {tier.product_limit} products</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <p className="font-bold text-[var(--secondary)]">GH₵ {tier.price}</p>
                                        <Button
                                            onClick={() => handleUpgrade(key)}
                                            size="sm"
                                            className="bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:bg-[var(--secondary)]/90"
                                        >
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

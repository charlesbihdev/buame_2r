import { Button } from '@/components/ui/button';
import { FormError } from '@/components/ui/form-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle, Copy, ExternalLink } from 'lucide-react';
import { useState } from 'react';

export function SlugEditor({ slug, prefix, onSlugChange, error, label = 'URL Slug' }) {
    const [copied, setCopied] = useState(false);

    const handleSlugChange = (e) => {
        const value = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '');
        onSlugChange(value);
    };

    const fullUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}${prefix}${slug || 'your-slug'}`;

    const copyTextToClipboard = async (text) => {
        if (navigator?.clipboard?.writeText && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
            return;
        }

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
        try {
            await copyTextToClipboard(fullUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Copy failed:', err);
        }
    };

    return (
        <div className="space-y-4">
            {/* Slug Input */}
            <div>
                <Label htmlFor="slug" className="mb-2 block text-sm font-semibold text-[var(--foreground)]">
                    {label}
                </Label>
                <div className="flex items-center gap-2">
                    <span className="text-sm whitespace-nowrap text-gray-500">{prefix}</span>
                    <Input
                        id="slug"
                        value={slug || ''}
                        onChange={handleSlugChange}
                        placeholder="your-custom-slug"
                        className="flex-1"
                        pattern="[a-z0-9\-]+"
                    />
                </div>
                <FormError error={error} className="mt-1" />
                <p className="mt-1 text-xs text-gray-500">Lowercase letters, numbers, and hyphens only</p>
            </div>

            {/* Link Preview & Copy */}
            <div>
                <Label className="mb-2 block text-sm font-semibold text-[var(--foreground)]">Your Public Link</Label>
                <div className="flex gap-2">
                    <Input value={fullUrl} readOnly className="flex-1 bg-gray-50 text-sm" />
                    <Button onClick={handleCopy} variant="outline" type="button" size="icon" title="Copy Link">
                        {copied ? <CheckCircle className="h-4 w-4 text-[var(--primary)]" /> : <Copy className="h-4 w-4" />}
                    </Button>
                    <Button variant="outline" asChild type="button" size="icon" title="Open Link">
                        <a href={fullUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                        </a>
                    </Button>
                </div>
                <p className="mt-2 text-xs text-gray-500">Share this link to let people view your listing</p>
            </div>
        </div>
    );
}

export function generateSlugFromName(name) {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

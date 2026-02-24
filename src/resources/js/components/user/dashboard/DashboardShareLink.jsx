import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle, Copy, ExternalLink } from 'lucide-react';
import { useState } from 'react';

export function DashboardShareLink({ label = 'Share Profile Link', url, description = 'Share this link to let people view your profile' }) {
    const [copied, setCopied] = useState(false);

    // Construct full URL if a relative path is provided
    const shareUrl = url.startsWith('http') ? url : `${window.location.origin}${url.startsWith('/') ? '' : '/'}${url}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="rounded-xl border border-[var(--buame-border-light)] bg-white p-6">
            <Label className="mb-2 block text-sm font-semibold text-[var(--foreground)]">{label}</Label>
            <div className="flex gap-2">
                <Input value={shareUrl} readOnly className="flex-1 bg-gray-50 text-sm" />
                <Button onClick={handleCopy} variant="outline" type="button" size="icon" title="Copy Link">
                    {copied ? <CheckCircle className="h-4 w-4 text-[var(--primary)]" /> : <Copy className="h-4 w-4" />}
                </Button>
                <Button variant="outline" asChild type="button" size="icon" title="Open Link">
                    <a href={shareUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                    </a>
                </Button>
            </div>
            {description && <p className="mt-2 text-xs text-gray-500">{description}</p>}
        </div>
    );
}

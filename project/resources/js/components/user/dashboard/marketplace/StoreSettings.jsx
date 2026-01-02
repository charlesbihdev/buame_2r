import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Copy, ExternalLink, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export function StoreSettings() {
    const [storeLink, setStoreLink] = useState('https://buame2r.com/store/your-store-name');
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(storeLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-bold text-[#0d1b0d] dark:text-white">Store Settings</h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Manage your store link and catalog settings</p>
            </div>

            <div className="rounded-xl border border-[#e7f3e7] dark:border-[#2a4d2a] bg-white dark:bg-[#1a331a] p-6">
                <label className="mb-2 block text-sm font-semibold text-[#0d1b0d] dark:text-white">Your Store Link</label>
                <div className="flex gap-2">
                    <Input value={storeLink} readOnly className="flex-1" />
                    <Button onClick={handleCopy} variant="outline">
                        {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                    <Button variant="outline" asChild>
                        <a href={storeLink} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                        </a>
                    </Button>
                </div>
                <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                    Share this link to let people view your product catalog
                </p>
            </div>

            <div className="rounded-xl border border-[#e7f3e7] dark:border-[#2a4d2a] bg-white dark:bg-[#1a331a] p-6">
                <h4 className="mb-4 font-semibold text-[#0d1b0d] dark:text-white">Catalog Settings</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Store catalog feature coming soon. You'll be able to customize your store appearance and manage your catalog.
                </p>
            </div>
        </div>
    );
}


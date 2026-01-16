import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { router } from '@inertiajs/react';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

export function ListingVisibilityToggle({ listing, routeName, label = 'Listing' }) {
    const [isActive, setIsActive] = useState(listing?.is_active ?? false);
    const [processing, setProcessing] = useState(false);

    const handleToggle = () => {
        setIsActive(!isActive);
        setProcessing(true);

        router.post(
            route(routeName),
            {},
            {
                preserveScroll: true,
                preserveState: true,
                only: ['categoryData', 'flash'],
                onFinish: () => setProcessing(false),
                onError: (errors) => {
                    setIsActive(isActive); // Revert on error
                    setProcessing(false);
                },
            },
        );
    };

    return (
        <div className="flex items-center gap-2 rounded-lg border border-[var(--buame-border-light)] bg-white px-3 py-1.5 md:px-4 md:py-2 dark:border-[#2a4d2a] dark:bg-[#1a331a]">
            {isActive ? <Eye className="h-4 w-4 text-[var(--primary)]" /> : <EyeOff className="h-4 w-4 text-gray-400" />}
            <div className="hidden flex-col md:flex">
                <Label className="cursor-pointer text-xs font-semibold text-[var(--foreground)] dark:text-white">{isActive ? 'Visible' : 'Hidden'}</Label>
                <span className="text-xs text-gray-500 dark:text-gray-400">{label}</span>
            </div>
            <Switch checked={isActive} onCheckedChange={handleToggle} disabled={processing} className="ml-1 md:ml-2" />
        </div>
    );
}

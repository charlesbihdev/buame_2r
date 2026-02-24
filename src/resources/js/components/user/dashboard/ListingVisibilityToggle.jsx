import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { router } from '@inertiajs/react';
import { Eye, EyeOff } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ListingVisibilityToggle({ listing, routeName, label = 'Listing', onBeforeToggle }) {
    const [isActive, setIsActive] = useState(listing?.is_active ?? false);
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        setIsActive(listing?.is_active ?? false);
    }, [listing?.is_active]);

    const handleToggle = () => {
        // Check if there's a beforeToggle callback that prevents the toggle
        if (onBeforeToggle && onBeforeToggle() === false) {
            return;
        }

        const previousState = isActive;
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
                onError: () => {
                    setIsActive(previousState);
                    setProcessing(false);
                },
            },
        );
    };

    return (
        <div className="] flex items-center gap-2 rounded-lg border border-[var(--buame-border-light)] bg-white px-3 py-1.5 md:px-4 md:py-2">
            {isActive ? <Eye className="h-4 w-4 text-[var(--primary)]" /> : <EyeOff className="h-4 w-4 text-gray-400" />}
            <div className="hidden flex-col md:flex">
                <Label className="cursor-pointer text-xs font-semibold text-[var(--foreground)]">{isActive ? 'Visible' : 'Hidden'}</Label>
                <span className="text-xs text-gray-500">{label}</span>
            </div>
            <Switch checked={isActive} onCheckedChange={handleToggle} disabled={processing} className="ml-1 md:ml-2" />
        </div>
    );
}

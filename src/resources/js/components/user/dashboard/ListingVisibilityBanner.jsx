import { Eye, EyeOff } from 'lucide-react';
import { ListingVisibilityToggle } from './ListingVisibilityToggle';

export function ListingVisibilityBanner({ listing, routeName, label = 'Listing' }) {
    const isActive = listing?.is_active ?? false;

    return (
        <div
            className={`rounded-xl border-2 p-6 ${isActive ? 'border-[var(--primary)] bg-[var(--buame-border-light)] dark:bg-[#1a331a]' : 'border-[var(--accent)]/30 bg-[var(--accent)]/10 dark:border-[var(--accent)]/20 dark:bg-[var(--accent)]/5'}`}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div
                        className={`flex h-12 w-12 items-center justify-center rounded-full ${isActive ? 'bg-[var(--primary)]/20' : 'bg-[var(--accent)]/20 dark:bg-[var(--accent)]/10'}`}
                    >
                        {isActive ? (
                            <Eye className="h-6 w-6 text-[var(--primary)]" />
                        ) : (
                            <EyeOff className="h-6 w-6 text-[var(--accent)] dark:text-[var(--accent)]" />
                        )}
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-[var(--foreground)] dark:text-white">
                            {label} is {isActive ? 'Visible' : 'Hidden'}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {isActive
                                ? `Your ${label.toLowerCase()} is visible to visitors`
                                : `Your ${label.toLowerCase()} is hidden from visitors. Toggle to make it visible.`}
                        </p>
                    </div>
                </div>
                <ListingVisibilityToggle listing={listing} routeName={routeName} label={label} />
            </div>
        </div>
    );
}

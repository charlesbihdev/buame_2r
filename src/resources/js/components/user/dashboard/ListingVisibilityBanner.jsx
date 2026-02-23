import { Eye, EyeOff } from 'lucide-react';
import { ListingVisibilityToggle } from './ListingVisibilityToggle';
import SaveButton from './SaveButton';

export function ListingVisibilityBanner({ listing, routeName, label = 'Listing', onBeforeToggle, saveButton }) {
    const isActive = listing?.is_active ?? false;

    return (
        <div
            className={`rounded-xl border-2 p-6 ${isActive ? 'border-[var(--primary)] bg-[var(--buame-border-light)]#1a331a]' : 'border-[var(--accent)]/30 bg-[var(--accent)]/10'}`}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div
                        className={`flex h-12 w-12 items-center justify-center rounded-full ${isActive ? 'bg-[var(--primary)]/20' : 'bg-[var(--accent)]/20'}`}
                    >
                        {isActive ? (
                            <Eye className="h-6 w-6 text-[var(--primary)]" />
                        ) : (
                            <EyeOff className="h-6 w-6 text-[var(--accent)]" />
                        )}
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-[var(--foreground)]">
                            {label} is {isActive ? 'Visible' : 'Hidden'}
                        </h3>
                        <p className="text-sm text-gray-600">
                            {isActive
                                ? `Your ${label.toLowerCase()} is visible to visitors`
                                : `Your ${label.toLowerCase()} is hidden from visitors. Toggle to make it visible.`}
                        </p>
                    </div>
                </div>
                {/* Render save button side by side with toggle - Responsive layout */}
                <div className="flex flex-col items-end gap-2 sm:flex-row sm:items-center">
                    {saveButton && (
                        <SaveButton
                            isProcessing={saveButton.isProcessing}
                            isDirty={saveButton.isDirty}
                            onClick={saveButton.onClick}
                            position="top"
                        />
                    )}
                    <ListingVisibilityToggle listing={listing} routeName={routeName} label={label} onBeforeToggle={onBeforeToggle} />
                </div>
            </div>
        </div>
    );
}

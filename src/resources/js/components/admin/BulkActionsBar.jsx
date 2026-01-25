import { Button } from '@/components/ui/button';
import { Check, Trash2, X } from 'lucide-react';

export function BulkActionsBar({ selectedCount, onApprove, onDisapprove, onDelete, onClear, showDelete = false, processing = false }) {
    if (selectedCount === 0) return null;

    return (
        <div className="bg-primary/5 border-primary/20 flex items-center justify-between rounded-lg border px-4 py-3">
            <span className="text-foreground text-sm font-medium">
                {selectedCount} review{selectedCount > 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center gap-2">
                {onApprove && (
                    <Button variant="outline" size="sm" onClick={onApprove} disabled={processing} className="gap-2">
                        <Check className="h-4 w-4" />
                        Approve
                    </Button>
                )}
                {onDisapprove && (
                    <Button variant="outline" size="sm" onClick={onDisapprove} disabled={processing} className="gap-2">
                        <X className="h-4 w-4" />
                        Disapprove
                    </Button>
                )}
                {showDelete && onDelete && (
                    <Button variant="destructive" size="sm" onClick={onDelete} disabled={processing} className="gap-2">
                        <Trash2 className="h-4 w-4" />
                        Delete
                    </Button>
                )}
                <Button variant="ghost" size="sm" onClick={onClear} disabled={processing}>
                    Clear Selection
                </Button>
            </div>
        </div>
    );
}

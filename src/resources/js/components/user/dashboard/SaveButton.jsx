import { Button } from '@/components/ui/button';
import { CheckCircle, Loader2, Save } from 'lucide-react';

export default function SaveButton({ isProcessing, isDirty, onClick, position = 'bottom' }) {
    return (
        <Button
            type="button"
            onClick={onClick}
            disabled={!isDirty || isProcessing}
            variant={isDirty ? 'default' : 'ghost'}
            className="gap-2"
        >
            {isProcessing ? (
                <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving...
                </>
            ) : isDirty ? (
                <>
                    <Save className="h-4 w-4" />
                    Save Changes
                </>
            ) : (
                <>
                    <CheckCircle className="h-4 w-4" />
                    Saved
                </>
            )}
        </Button>
    );
}

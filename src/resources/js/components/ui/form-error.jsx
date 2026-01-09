import { AlertCircle } from 'lucide-react';

export function FormError({ error, className = '' }) {
    if (!error) return null;

    return (
        <div className={`flex items-center gap-2 text-sm text-red-600 dark:text-red-400 ${className}`}>
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
        </div>
    );
}

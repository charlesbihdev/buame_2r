import { AlertCircle } from 'lucide-react';

export function FormError({ error, className = '' }) {
    if (!error) return null;

    // Handle both string and array errors
    const errorMessage = Array.isArray(error) ? error[0] : error;

    return (
        <div className={`flex items-center gap-2 text-sm text-red-600 ${className}`}>
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{errorMessage}</span>
        </div>
    );
}

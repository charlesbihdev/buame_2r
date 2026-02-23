import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export function StarRating({ value = 0, onChange, readonly = false, size = 'md', showLabel = false }) {
    const sizes = {
        sm: 'h-4 w-4',
        md: 'h-6 w-6',
        lg: 'h-8 w-8',
    };

    const labels = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];

    return (
        <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    onClick={() => !readonly && onChange?.(star)}
                    disabled={readonly}
                    className={cn(
                        'transition-transform',
                        !readonly && 'cursor-pointer hover:scale-110',
                        readonly && 'cursor-default',
                    )}
                >
                    <Star
                        className={cn(
                            sizes[size],
                            'transition-colors',
                            star <= value
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300',
                        )}
                    />
                </button>
            ))}
            {showLabel && value > 0 && (
                <span className="ml-2 text-sm font-medium text-gray-600">
                    {labels[value]}
                </span>
            )}
        </div>
    );
}

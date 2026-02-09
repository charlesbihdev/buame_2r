import { Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

export function BackToHome({ to = "/", label = "Back to Home", className = "" }) {
    return (
        <Link
            href={to}
            className={`inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)] transition-colors hover:text-[var(--primary)]/80 ${className}`}
        >
            <ArrowLeft className="h-4 w-4" />
            {label}
        </Link>
    );
}

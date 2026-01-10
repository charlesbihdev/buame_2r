import { Link } from '@inertiajs/react';

export function AppLogo({ className = '', size = 'default' }) {
    const sizeClasses = {
        default: 'h-18',
        sm: 'h-10',
        lg: 'h-24',
    };

    return (
        <Link href="/" className={`flex items-center gap-2 ${className}`}>
            <img src="/assets/logo/logo.png" alt="2RBUAME Logo" className={`${sizeClasses[size]} w-auto`} />
        </Link>
    );
}

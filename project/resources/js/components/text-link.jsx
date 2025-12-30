import { Link } from '@inertiajs/react';

export default function TextLink({ href, children, className = '', ...props }) {
    return (
        <Link href={href} className={`text-sm text-primary hover:underline ${className}`} {...props}>
            {children}
        </Link>
    );
}


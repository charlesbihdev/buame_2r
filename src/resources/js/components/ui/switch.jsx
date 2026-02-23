import * as React from 'react';

export function Switch({ checked, onCheckedChange, id, className = '', ...props }) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            id={id}
            onClick={() => onCheckedChange(!checked)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 ${
                checked ? 'bg-[var(--primary)]' : 'bg-gray-300'
            } ${className}`}
            {...props}
        >
            <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    checked ? 'translate-x-6' : 'translate-x-1'
                }`}
            />
        </button>
    );
}


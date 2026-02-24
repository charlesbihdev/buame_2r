import * as React from 'react';
import { cn } from '@/lib/utils';

const Tabs = React.forwardRef(({ className, value, onValueChange, ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState(value || '');

    React.useEffect(() => {
        if (value !== undefined) {
            setInternalValue(value);
        }
    }, [value]);

    const handleValueChange = (newValue) => {
        setInternalValue(newValue);
        if (onValueChange) {
            onValueChange(newValue);
        }
    };

    return (
        <div ref={ref} className={cn('w-full', className)} {...props}>
            {React.Children.map(props.children, (child) => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child, {
                        value: internalValue,
                        onValueChange: handleValueChange,
                    });
                }
                return child;
            })}
        </div>
    );
});
Tabs.displayName = 'Tabs';

const TabsList = React.forwardRef(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            'inline-flex h-10 items-center justify-center rounded-lg bg-[#f6f8f6] p-1 text-gray-600',
            className
        )}
        {...props}
    />
));
TabsList.displayName = 'TabsList';

const TabsTrigger = React.forwardRef(({ className, value, onValueChange, activeValue, children, ...props }, ref) => {
    const isActive = activeValue === value;

    return (
        <button
            ref={ref}
            type="button"
            className={cn(
                'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] disabled:pointer-events-none disabled:opacity-50',
                isActive
                    ? 'bg-white text-[var(--foreground)] shadow-sm'
                    : 'text-gray-600 hover:text-[var(--foreground)]',
                className
            )}
            onClick={() => onValueChange?.(value)}
            {...props}
        >
            {children}
        </button>
    );
});
TabsTrigger.displayName = 'TabsTrigger';

const TabsContent = React.forwardRef(({ className, value, activeValue, ...props }, ref) => {
    if (activeValue !== value) {
        return null;
    }

    return <div ref={ref} className={cn('mt-2 focus-visible:outline-none', className)} {...props} />;
});
TabsContent.displayName = 'TabsContent';

export { Tabs, TabsList, TabsTrigger, TabsContent };


import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

export function ServiceCard({
    icon: Icon,
    category,
    title,
    description,
    image,
    buttonText,
    buttonUrl,
    secondaryButtonText,
    secondaryButtonUrl,
    fullWidth = false,
}) {
    return (
        <div
            className={`@container flex flex-col overflow-hidden rounded-xl border border-[var(--buame-border-light)] bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md dark:border-white/10 dark:bg-white/5 ${
                fullWidth ? 'lg:col-span-2' : ''
            }`}
        >
            <div className="flex h-full flex-col sm:flex-row">
                <div
                    className="min-h-[200px] w-full bg-cover bg-center sm:min-h-0 sm:w-2/5"
                    style={{
                        backgroundImage: `url(${image})`,
                    }}
                />
                <div className={`flex w-full flex-col justify-between gap-4 p-5 md:p-6 ${fullWidth ? 'sm:w-2/3' : 'sm:w-3/5'}`}>
                    <div>
                        <div className="mb-2 flex items-center gap-2">
                            <Icon className="h-5 w-5 text-[var(--primary)]" />
                            <p className="text-xs font-bold tracking-wider text-[#4c9a4c] uppercase dark:text-gray-400">{category}</p>
                        </div>
                        <h3 className={`mb-2 leading-tight font-bold text-[var(--foreground)] dark:text-white ${fullWidth ? 'text-2xl' : 'text-xl'}`}>
                            {title}
                        </h3>
                        <p className={`leading-relaxed text-[#4c9a4c] dark:text-gray-300 ${fullWidth ? 'max-w-2xl text-base' : 'text-sm'}`}>
                            {description}
                        </p>
                    </div>
                    <div className={`mt-auto flex gap-3 ${fullWidth ? 'pt-2' : ''}`}>
                        <Button
                            asChild
                            className={`rounded-lg border border-[var(--primary)]/20 bg-[var(--primary)]/10 px-4 text-sm font-bold text-[var(--primary)] transition-all hover:bg-[var(--primary)] hover:text-white dark:text-[var(--primary)] ${
                                fullWidth ? 'h-10 px-6' : ''
                            }`}
                        >
                            <Link href={buttonUrl}>{buttonText}</Link>
                        </Button>
                        {secondaryButtonText && secondaryButtonUrl && (
                            <Button
                                asChild
                                variant="outline"
                                className={`rounded-lg border border-[var(--buame-border-light)] bg-transparent px-4 text-sm font-bold text-[var(--foreground)] transition-colors hover:bg-gray-50 dark:border-white/20 dark:text-white dark:hover:bg-white/5 ${
                                    fullWidth ? 'h-10 px-6' : ''
                                }`}
                            >
                                <Link href={secondaryButtonUrl}>{secondaryButtonText}</Link>
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

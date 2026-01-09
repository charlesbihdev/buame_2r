import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

export function Pagination({ artisans, filters }) {
    if (artisans.last_page <= 1) return null;

    const buildPageUrl = (page) => {
        const params = new URLSearchParams();
        params.set('page', page);
        if (filters?.search) params.set('search', filters.search);
        if (filters?.location) params.set('location', filters.location);
        if (filters?.skill_type) params.set('skill_type', filters.skill_type);
        if (filters?.experience_level) params.set('experience_level', filters.experience_level);
        if (filters?.sort) params.set('sort', filters.sort);

        return `/artisans?${params.toString()}`;
    };

    return (
        <div className="mt-12 flex items-center justify-center gap-2">
            {/* Previous Button */}
            {artisans.prev_page_url ? (
                <Button asChild variant="outline" size="sm">
                    <Link href={artisans.prev_page_url} preserveState preserveScroll>
                        Previous
                    </Link>
                </Button>
            ) : (
                <Button variant="outline" size="sm" disabled>
                    Previous
                </Button>
            )}

            {/* Page Numbers */}
            <div className="flex gap-1">
                {Array.from({ length: artisans.last_page }, (_, i) => i + 1).map((page) => {
                    // Show first page, last page, current page, and pages around current
                    const showPage =
                        page === 1 || page === artisans.last_page || (page >= artisans.current_page - 1 && page <= artisans.current_page + 1);

                    if (!showPage) {
                        // Show ellipsis
                        if (page === artisans.current_page - 2 || page === artisans.current_page + 2) {
                            return (
                                <span key={page} className="px-3 py-1 text-sm text-gray-500">
                                    ...
                                </span>
                            );
                        }
                        return null;
                    }

                    const isActive = page === artisans.current_page;
                    return (
                        <Button
                            key={page}
                            asChild={!isActive}
                            variant={isActive ? 'default' : 'outline'}
                            size="sm"
                            className={isActive ? 'bg-[#13ec13] text-[#0d1b0d] hover:bg-[#0fdc0f]' : ''}
                        >
                            {isActive ? (
                                <span>{page}</span>
                            ) : (
                                <Link href={buildPageUrl(page)} preserveState preserveScroll>
                                    {page}
                                </Link>
                            )}
                        </Button>
                    );
                })}
            </div>

            {/* Next Button */}
            {artisans.next_page_url ? (
                <Button asChild variant="outline" size="sm">
                    <Link href={artisans.next_page_url} preserveState preserveScroll>
                        Next
                    </Link>
                </Button>
            ) : (
                <Button variant="outline" size="sm" disabled>
                    Next
                </Button>
            )}
        </div>
    );
}

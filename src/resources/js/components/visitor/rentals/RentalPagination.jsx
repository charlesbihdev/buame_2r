import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

export function RentalPagination({ rentals, filters }) {
    if (!rentals || rentals.last_page <= 1) {
        return null;
    }

    const buildPageUrl = (page) => {
        const params = new URLSearchParams();
        params.set('page', page);
        if (filters?.search) params.set('search', filters.search);
        if (filters?.location) params.set('location', filters.location);
        if (filters?.type) params.set('type', filters.type);
        if (filters?.sort) params.set('sort', filters.sort);

        return `/rentals?${params.toString()}`;
    };

    return (
        <div className="mt-12 flex items-center justify-center gap-2">
            {/* Previous Button */}
            {rentals.prev_page_url ? (
                <Button asChild variant="outline" size="sm">
                    <Link href={rentals.prev_page_url} preserveState preserveScroll>
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
                {Array.from({ length: rentals.last_page }, (_, i) => i + 1).map((page) => {
                    // Show first page, last page, current page, and pages around current
                    const showPage =
                        page === 1 || page === rentals.last_page || (page >= rentals.current_page - 1 && page <= rentals.current_page + 1);

                    if (!showPage) {
                        // Show ellipsis
                        if (page === rentals.current_page - 2 || page === rentals.current_page + 2) {
                            return (
                                <span key={page} className="px-3 py-1 text-sm text-gray-500">
                                    ...
                                </span>
                            );
                        }
                        return null;
                    }

                    const isActive = page === rentals.current_page;
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
            {rentals.next_page_url ? (
                <Button asChild variant="outline" size="sm">
                    <Link href={rentals.next_page_url} preserveState preserveScroll>
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


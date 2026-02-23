import { useState, useEffect, useRef } from 'react';
import { Button } from './button';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';

/**
 * Reusable Pagination Component
 * Supports both traditional pagination and infinite scroll
 */
export function Pagination({ 
    currentPage = 1, 
    totalPages = 1, 
    onPageChange,
    mode = 'pagination', // 'pagination' or 'infinite'
    hasMore = false,
    isLoading = false,
    className = '',
}) {
    const [isVisible, setIsVisible] = useState(false);
    const loadMoreRef = useRef(null);

    // Infinite scroll observer
    useEffect(() => {
        if (mode !== 'infinite' || !hasMore || isLoading) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !isLoading) {
                    onPageChange(currentPage + 1);
                }
            },
            { threshold: 0.1 }
        );

        if (loadMoreRef.current) {
            observer.observe(loadMoreRef.current);
        }

        return () => {
            if (loadMoreRef.current) {
                observer.unobserve(loadMoreRef.current);
            }
        };
    }, [mode, hasMore, isLoading, currentPage, onPageChange]);

    // Traditional pagination
    if (mode === 'pagination') {
        const pages = [];
        const maxVisible = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        let endPage = Math.min(totalPages, startPage + maxVisible - 1);

        if (endPage - startPage < maxVisible - 1) {
            startPage = Math.max(1, endPage - maxVisible + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return (
            <div className={`flex items-center justify-center gap-2 ${className}`}>
                <Button
                    variant="outline"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="h-10 w-10 p-0"
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>

                {startPage > 1 && (
                    <>
                        <Button
                            variant="outline"
                            onClick={() => onPageChange(1)}
                            className="h-10 w-10 p-0"
                        >
                            1
                        </Button>
                        {startPage > 2 && <span className="px-2 text-gray-500">...</span>}
                    </>
                )}

                {pages.map((page) => (
                    <Button
                        key={page}
                        variant={page === currentPage ? 'default' : 'outline'}
                        onClick={() => onPageChange(page)}
                        className={`h-10 w-10 p-0 ${
                            page === currentPage
                                ? 'bg-[var(--primary)] text-white hover:bg-[var(--primary)]'
                                : ''
                        }`}
                    >
                        {page}
                    </Button>
                ))}

                {endPage < totalPages && (
                    <>
                        {endPage < totalPages - 1 && <span className="px-2 text-gray-500">...</span>}
                        <Button
                            variant="outline"
                            onClick={() => onPageChange(totalPages)}
                            className="h-10 w-10 p-0"
                        >
                            {totalPages}
                        </Button>
                    </>
                )}

                <Button
                    variant="outline"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="h-10 w-10 p-0"
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        );
    }

    // Infinite scroll mode
    return (
        <div className={`flex flex-col items-center justify-center gap-4 ${className}`}>
            {isLoading && (
                <div className="flex items-center gap-2 text-gray-600">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span className="text-sm">Loading more...</span>
                </div>
            )}
            {hasMore && !isLoading && (
                <div ref={loadMoreRef} className="h-20 w-full" />
            )}
            {!hasMore && currentPage > 1 && (
                <p className="text-sm text-gray-500">No more items to load</p>
            )}
        </div>
    );
}



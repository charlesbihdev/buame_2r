import { ReviewCard } from '@/components/ui/review-card';
import { Button } from '@/components/ui/button';
import { ChevronDown, MessageSquare, Star } from 'lucide-react';

export function ReviewList({ reviews, onLoadMore, hasMore, loading, onOpenForm }) {
    if (!reviews || reviews.length === 0) {
        return (
            <div className="p-12 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                    <MessageSquare className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="mb-2 font-semibold text-[var(--foreground)]">
                    No Reviews Yet
                </h3>
                <p className="mb-6 text-sm text-gray-500">
                    Be the first to share your experience!
                </p>
                <Button onClick={onOpenForm}>
                    <Star className="mr-2 h-4 w-4" />
                    Write the First Review
                </Button>
            </div>
        );
    }

    return (
        <>
            <div className="divide-y divide-gray-200">
                {reviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                ))}
            </div>

            {hasMore && (
                <div className="border-t border-gray-200 p-4 text-center">
                    <Button variant="ghost" onClick={onLoadMore} disabled={loading}>
                        {loading ? (
                            'Loading...'
                        ) : (
                            <>
                                Load More Reviews
                                <ChevronDown className="ml-2 h-4 w-4" />
                            </>
                        )}
                    </Button>
                </div>
            )}
        </>
    );
}

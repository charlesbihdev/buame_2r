import { useState } from 'react';
import { Star, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StarRating } from '@/components/ui/star-rating';
import { ReviewForm } from '@/components/ui/review-form';
import { ReviewList } from '@/components/ui/review-list';
import { cn } from '@/lib/utils';

export function ReviewSection({
    reviewableType,
    reviewableId,
    reviews = [],
    averageRating = 0,
    reviewsCount = 0,
    ratingBreakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
}) {
    const [showForm, setShowForm] = useState(false);
    const [displayedReviews, setDisplayedReviews] = useState(reviews.slice(0, 10));
    const [page, setPage] = useState(1);
    const reviewsPerPage = 10;

    const hasMore = displayedReviews.length < reviews.length;

    const handleLoadMore = () => {
        const nextPage = page + 1;
        const startIndex = page * reviewsPerPage;
        const endIndex = startIndex + reviewsPerPage;
        const moreReviews = reviews.slice(startIndex, endIndex);
        setDisplayedReviews([...displayedReviews, ...moreReviews]);
        setPage(nextPage);
    };

    const handleFormSuccess = () => {
        setShowForm(false);
        // Reload the page to show the new review pending approval message
        window.location.reload();
    };

    const handleOpenForm = () => {
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
    };

    const getPercentage = (count) => {
        if (reviewsCount === 0) return 0;
        return Math.round((count / reviewsCount) * 100);
    };

    return (
        <div className="mt-8 rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-[var(--card)]">
            {/* Header with gradient accent */}
            <div className="border-b border-gray-200 bg-gradient-to-r from-[var(--primary)]/5 to-transparent p-6 dark:border-gray-800">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-[var(--foreground)] dark:text-white">
                            Customer Reviews
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            See what others are saying
                        </p>
                    </div>
                    {!showForm && (
                        <Button onClick={handleOpenForm}>
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Write a Review
                        </Button>
                    )}
                </div>
            </div>

            {/* Rating Summary - Two Column Layout */}
            {reviewsCount > 0 && (
                <div className="grid gap-6 p-6 md:grid-cols-2">
                    {/* Left: Big Rating Display */}
                    <div className="flex flex-col items-center justify-center rounded-xl bg-gray-50 p-6 dark:bg-gray-800/50">
                        <div className="text-5xl font-black text-[var(--foreground)] dark:text-white">
                            {averageRating.toFixed(1)}
                        </div>
                        <div className="mt-2 flex items-center gap-1">
                            <StarRating value={Math.round(averageRating)} readonly size="md" />
                        </div>
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                            Based on {reviewsCount} {reviewsCount === 1 ? 'review' : 'reviews'}
                        </p>
                    </div>

                    {/* Right: Rating Breakdown Bars */}
                    <div className="space-y-3">
                        {[5, 4, 3, 2, 1].map((stars) => {
                            const count = ratingBreakdown[stars] || 0;
                            const percentage = getPercentage(count);

                            return (
                                <div key={stars} className="flex items-center gap-3">
                                    <span className="w-3 text-sm font-semibold text-gray-600 dark:text-gray-400">
                                        {stars}
                                    </span>
                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                                        <div
                                            className="h-full rounded-full bg-yellow-400 transition-all"
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>
                                    <span className="w-12 text-right text-sm text-gray-500 dark:text-gray-400">
                                        {percentage}%
                                    </span>
                                    <span className="w-8 text-right text-sm text-gray-500 dark:text-gray-400">
                                        ({count})
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Review Form (Collapsible) */}
            {showForm && (
                <ReviewForm
                    key={`review-form-${reviewableType}-${reviewableId}`}
                    reviewableType={reviewableType}
                    reviewableId={reviewableId}
                    onSuccess={handleFormSuccess}
                    onCancel={handleCloseForm}
                />
            )}

            {/* Reviews List */}
            <ReviewList
                reviews={displayedReviews}
                onLoadMore={handleLoadMore}
                hasMore={hasMore}
                loading={false}
                onOpenForm={handleOpenForm}
            />
        </div>
    );
}

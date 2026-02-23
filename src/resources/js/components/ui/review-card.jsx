import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { StarRating } from '@/components/ui/star-rating';
import { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';

export function ReviewCard({ review }) {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const openLightbox = (image) => {
        setSelectedImage(image);
        setLightboxOpen(true);
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
        setSelectedImage(null);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffDays === 0) {
            return 'Today';
        }
        if (diffDays === 1) {
            return 'Yesterday';
        }
        if (diffDays < 7) {
            return `${diffDays}d ago`;
        }
        if (diffDays < 30) {
            const weeks = Math.floor(diffDays / 7);
            return `${weeks}w ago`;
        }
        if (diffDays < 365) {
            const months = Math.floor(diffDays / 30);
            return `${months}mo ago`;
        }
        return date.toLocaleDateString();
    };

    return (
        <>
            <div className="p-6">
                <div className="flex gap-4">
                    {/* Avatar */}
                    <Avatar className="h-12 w-12 shrink-0">
                        <AvatarFallback className="bg-[var(--primary)]/10 text-[var(--primary)] font-semibold">
                            {review.initials}
                        </AvatarFallback>
                    </Avatar>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        {/* Header Row */}
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className="font-semibold text-[var(--foreground)]">
                                {review.reviewer_name}
                            </span>
                            <span className="text-sm text-gray-500">•</span>
                            <StarRating value={review.rating} readonly size="sm" />
                            <span className="text-sm text-gray-500">•</span>
                            <span className="text-sm text-gray-500">
                                {formatDate(review.created_at)}
                            </span>
                        </div>

                        {/* Comment */}
                        {review.comment && (
                            <p className="text-gray-700 leading-relaxed mb-3">
                                {review.comment}
                            </p>
                        )}

                        {/* Images Grid */}
                        {review.images && review.images.length > 0 && (
                            <div className="flex gap-2">
                                {review.images.map((img, i) => (
                                    <button
                                        key={i}
                                        onClick={() => openLightbox(img.url)}
                                        className="group relative h-20 w-20 overflow-hidden rounded-lg bg-gray-100"
                                    >
                                        <img
                                            src={img.url}
                                            alt={`Review image ${i + 1}`}
                                            className="h-full w-full object-cover transition-transform group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all group-hover:bg-black/30">
                                            <ZoomIn className="h-5 w-5 text-white opacity-0 transition-opacity group-hover:opacity-100" />
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Lightbox Modal */}
            {lightboxOpen && selectedImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
                    onClick={closeLightbox}
                >
                    <button
                        onClick={closeLightbox}
                        className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                    >
                        <X className="h-6 w-6" />
                    </button>
                    <div className="relative max-h-[85vh] max-w-5xl">
                        <img
                            src={selectedImage}
                            alt="Review image"
                            className="max-h-[85vh] w-full rounded-lg object-contain"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                </div>
            )}
        </>
    );
}

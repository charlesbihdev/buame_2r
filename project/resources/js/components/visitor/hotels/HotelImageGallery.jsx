import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { useState } from 'react';

export function HotelImageGallery({ images }) {
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

    if (!images || images.length === 0) {
        return (
            <div className="rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center dark:border-gray-700 dark:bg-gray-900">
                <p className="text-gray-500 dark:text-gray-400">No images available yet</p>
            </div>
        );
    }

    // Sort images: primary first, then by display_order
    const sortedImages = [...images].sort((a, b) => {
        if (a.is_primary) return -1;
        if (b.is_primary) return 1;
        return a.display_order - b.display_order;
    });

    const primaryImage = sortedImages.find((img) => img.is_primary) || sortedImages[0];
    const otherImages = sortedImages.filter((img) => !img.is_primary);

    const openLightbox = (index) => {
        setSelectedIndex(index);
        setCurrentSlideIndex(index);
    };

    const closeLightbox = () => {
        setSelectedIndex(null);
    };

    const nextSlide = () => {
        setCurrentSlideIndex((prev) => (prev + 1) % sortedImages.length);
    };

    const prevSlide = () => {
        setCurrentSlideIndex((prev) => (prev - 1 + sortedImages.length) % sortedImages.length);
    };

    return (
        <>
            {/* Main Image Display */}
            <div className="mb-4 h-96 overflow-hidden rounded-xl bg-gray-200 dark:bg-gray-800">
                {primaryImage ? (
                    <button
                        onClick={() => openLightbox(0)}
                        className="group relative h-full w-full"
                    >
                        <img
                            src={primaryImage.image_path}
                            alt={primaryImage.is_primary ? 'Primary' : 'Hotel'}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/40">
                            <ZoomIn className="h-8 w-8 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        </div>
                    </button>
                ) : (
                    <div className="flex h-full w-full items-center justify-center">
                        <span className="text-gray-500 dark:text-gray-400">No image available</span>
                    </div>
                )}
            </div>

            {/* Thumbnail Grid */}
            {otherImages.length > 0 && (
                <div className="grid grid-cols-4 gap-2">
                    {otherImages.slice(0, 4).map((image, index) => (
                        <button
                            key={image.id}
                            onClick={() => openLightbox(index + 1)}
                            className="group relative aspect-square overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800"
                        >
                            <img
                                src={image.image_path}
                                alt={`Hotel image ${index + 2}`}
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/40">
                                <ZoomIn className="h-4 w-4 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            </div>
                        </button>
                    ))}
                    {otherImages.length > 4 && (
                        <button
                            onClick={() => openLightbox(5)}
                            className="group relative aspect-square overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800"
                        >
                            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                                <span className="text-sm font-semibold text-white">+{otherImages.length - 4}</span>
                            </div>
                            {otherImages[4] && (
                                <img
                                    src={otherImages[4].image_path}
                                    alt="More images"
                                    className="h-full w-full object-cover opacity-50"
                                />
                            )}
                        </button>
                    )}
                </div>
            )}

            {/* Lightbox/Slideshow Modal */}
            {selectedIndex !== null && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4">
                    {/* Close Button */}
                    <button
                        onClick={closeLightbox}
                        className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                    >
                        <X className="h-6 w-6" />
                    </button>

                    {/* Previous Button */}
                    {sortedImages.length > 1 && (
                        <button
                            onClick={prevSlide}
                            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                        >
                            <ChevronLeft className="h-6 w-6" />
                        </button>
                    )}

                    {/* Main Image */}
                    <div className="relative max-h-[85vh] max-w-5xl">
                        {sortedImages[currentSlideIndex]?.image_path ? (
                            <img
                                src={sortedImages[currentSlideIndex].image_path}
                                alt={`Hotel image ${currentSlideIndex + 1}`}
                                className="max-h-[85vh] w-full rounded-lg object-contain"
                            />
                        ) : (
                            <div className="flex h-[50vh] w-[50vw] items-center justify-center rounded-lg bg-gray-800">
                                <span className="text-lg text-gray-400">No image available</span>
                            </div>
                        )}

                        {/* Image Counter */}
                        <div className="mt-4 text-center">
                            <p className="text-sm text-gray-400">
                                {currentSlideIndex + 1} / {sortedImages.length}
                            </p>
                        </div>
                    </div>

                    {/* Next Button */}
                    {sortedImages.length > 1 && (
                        <button
                            onClick={nextSlide}
                            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                        >
                            <ChevronRight className="h-6 w-6" />
                        </button>
                    )}

                    {/* Thumbnail Navigation */}
                    {sortedImages.length > 1 && (
                        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-black/50 p-2 backdrop-blur-sm">
                            {sortedImages.map((image, index) => (
                                <button
                                    key={image.id}
                                    onClick={() => setCurrentSlideIndex(index)}
                                    className={`h-2 w-2 rounded-full transition-all ${
                                        index === currentSlideIndex ? 'w-8 bg-[#13ec13]' : 'bg-white/50 hover:bg-white/75'
                                    }`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </>
    );
}




import { ChevronLeft, ChevronRight, X, ZoomIn, Home } from 'lucide-react';
import { useState } from 'react';

export function RentalImageGallery({ images, primaryImage, rentalName = 'Rental' }) {
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

    // Combine primary image with other images
    const allImages = primaryImage ? [primaryImage, ...(images || [])] : images || [];

    if (allImages.length === 0) {
        return (
            <div className="mb-6 flex h-96 items-center justify-center overflow-hidden rounded-xl bg-gray-200">
                <Home className="h-24 w-24 text-gray-400" />
            </div>
        );
    }

    const openLightbox = (index) => {
        setSelectedIndex(index);
        setCurrentSlideIndex(index);
    };

    const closeLightbox = () => {
        setSelectedIndex(null);
    };

    const nextSlide = () => {
        setCurrentSlideIndex((prev) => (prev + 1) % allImages.length);
    };

    const prevSlide = () => {
        setCurrentSlideIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
    };

    return (
        <>
            {/* Main Image Display */}
            <div className="mb-4 h-96 overflow-hidden rounded-xl bg-gray-200">
                {allImages[0] ? (
                    <button onClick={() => openLightbox(0)} className="group relative h-full w-full">
                        <img
                            src={allImages[0]}
                            alt={rentalName}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/40">
                            <ZoomIn className="h-8 w-8 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        </div>
                    </button>
                ) : (
                    <div className="flex h-full w-full items-center justify-center">
                        <Home className="h-24 w-24 text-gray-400" />
                    </div>
                )}
            </div>

            {/* Thumbnail Grid */}
            {allImages.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                    {allImages.slice(1, 5).map((image, index) => (
                        <button
                            key={index}
                            onClick={() => openLightbox(index + 1)}
                            className="group relative aspect-square overflow-hidden rounded-lg bg-gray-100"
                        >
                            <img
                                src={image}
                                alt={`${rentalName} ${index + 2}`}
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/40">
                                <ZoomIn className="h-4 w-4 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            </div>
                        </button>
                    ))}
                    {allImages.length > 5 && (
                        <button
                            onClick={() => openLightbox(5)}
                            className="group relative aspect-square overflow-hidden rounded-lg bg-gray-100"
                        >
                            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                                <span className="text-sm font-semibold text-white">+{allImages.length - 5}</span>
                            </div>
                            {allImages[5] && (
                                <img
                                    src={allImages[5]}
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
                    {allImages.length > 1 && (
                        <button
                            onClick={prevSlide}
                            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                        >
                            <ChevronLeft className="h-6 w-6" />
                        </button>
                    )}

                    {/* Main Image */}
                    <div className="relative max-h-[85vh] max-w-5xl">
                        {allImages[currentSlideIndex] ? (
                            <img
                                src={allImages[currentSlideIndex]}
                                alt={`${rentalName} ${currentSlideIndex + 1}`}
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
                                {currentSlideIndex + 1} / {allImages.length}
                            </p>
                        </div>
                    </div>

                    {/* Next Button */}
                    {allImages.length > 1 && (
                        <button
                            onClick={nextSlide}
                            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                        >
                            <ChevronRight className="h-6 w-6" />
                        </button>
                    )}

                    {/* Thumbnail Navigation */}
                    {allImages.length > 1 && (
                        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-black/50 p-2 backdrop-blur-sm">
                            {allImages.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlideIndex(index)}
                                    className={`h-2 w-2 rounded-full transition-all ${
                                        index === currentSlideIndex ? 'w-8 bg-[var(--primary)]' : 'bg-white/50 hover:bg-white/75'
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





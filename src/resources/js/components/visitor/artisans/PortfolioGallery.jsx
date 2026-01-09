import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import { useState } from 'react';

export function PortfolioGallery({ portfolio }) {
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

    if (!portfolio || portfolio.length === 0) {
        return (
            <div className="rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center dark:border-gray-700 dark:bg-gray-900">
                <p className="text-gray-500 dark:text-gray-400">No portfolio items available yet</p>
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
        setCurrentSlideIndex((prev) => (prev + 1) % portfolio.length);
    };

    const prevSlide = () => {
        setCurrentSlideIndex((prev) => (prev - 1 + portfolio.length) % portfolio.length);
    };

    return (
        <>
            {/* Gallery Grid */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {portfolio.map((item, index) => (
                    <button
                        key={item.id}
                        onClick={() => openLightbox(index)}
                        className="group relative aspect-square overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800"
                    >
                        {item.image_path ? (
                            <>
                                <img src={item.image_path} alt={item.item} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110" />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/40">
                                    <ZoomIn className="h-8 w-8 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                </div>
                            </>
                        ) : (
                            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#13ec13]/10 to-[#13ec13]/5">
                                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">No Image</span>
                            </div>
                        )}
                        {item.item && (
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                                <p className="truncate text-sm font-semibold text-white">{item.item}</p>
                            </div>
                        )}
                    </button>
                ))}
            </div>

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
                    {portfolio.length > 1 && (
                        <button
                            onClick={prevSlide}
                            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                        >
                            <ChevronLeft className="h-6 w-6" />
                        </button>
                    )}

                    {/* Main Image */}
                    <div className="relative max-h-[85vh] max-w-5xl">
                        {portfolio[currentSlideIndex]?.image_path ? (
                            <img
                                src={portfolio[currentSlideIndex].image_path}
                                alt={portfolio[currentSlideIndex].item}
                                className="max-h-[85vh] w-full rounded-lg object-contain"
                            />
                        ) : (
                            <div className="flex h-[50vh] w-[50vw] items-center justify-center rounded-lg bg-gray-800">
                                <span className="text-lg text-gray-400">No image available</span>
                            </div>
                        )}

                        {/* Image Info */}
                        <div className="mt-4 text-center">
                            <p className="text-lg font-semibold text-white">{portfolio[currentSlideIndex].item}</p>
                            <p className="mt-1 text-sm text-gray-400">
                                {currentSlideIndex + 1} / {portfolio.length}
                            </p>
                        </div>
                    </div>

                    {/* Next Button */}
                    {portfolio.length > 1 && (
                        <button
                            onClick={nextSlide}
                            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                        >
                            <ChevronRight className="h-6 w-6" />
                        </button>
                    )}

                    {/* Thumbnail Navigation */}
                    {portfolio.length > 1 && (
                        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-black/50 p-2 backdrop-blur-sm">
                            {portfolio.map((item, index) => (
                                <button
                                    key={item.id}
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

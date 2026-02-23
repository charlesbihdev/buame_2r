import { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function TransportImageGallery({ images }) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);

    if (!images || images.length === 0) {
        return (
            <div className="flex h-64 w-full items-center justify-center rounded-xl bg-gray-100">
                <p className="text-gray-500">No images available</p>
            </div>
        );
    }

    const currentImage = images[selectedIndex];

    const goToPrevious = () => {
        setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const goToNext = () => {
        setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    return (
        <>
            {/* Main Image */}
            <div className="relative mb-4 overflow-hidden rounded-xl">
                <div
                    className="aspect-video w-full cursor-pointer bg-cover bg-center"
                    style={{
                        backgroundImage: `url("${currentImage?.image_path}")`,
                    }}
                    onClick={() => setIsLightboxOpen(true)}
                />

                {/* Navigation Arrows */}
                {images.length > 1 && (
                    <>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                            onClick={(e) => {
                                e.stopPropagation();
                                goToPrevious();
                            }}
                        >
                            <ChevronLeft className="h-6 w-6" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                            onClick={(e) => {
                                e.stopPropagation();
                                goToNext();
                            }}
                        >
                            <ChevronRight className="h-6 w-6" />
                        </Button>
                    </>
                )}

                {/* Image Counter */}
                <div className="absolute bottom-2 right-2 rounded-full bg-black/50 px-3 py-1 text-xs font-semibold text-white">
                    {selectedIndex + 1} / {images.length}
                </div>
            </div>

            {/* Thumbnail Strip */}
            {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                    {images.map((image, index) => (
                        <button
                            key={image.id}
                            className={`h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                                index === selectedIndex
                                    ? 'border-[var(--primary)] ring-2 ring-[var(--primary)]/50'
                                    : 'border-transparent opacity-70 hover:opacity-100'
                            }`}
                            onClick={() => setSelectedIndex(index)}
                        >
                            <div
                                className="h-full w-full bg-cover bg-center"
                                style={{
                                    backgroundImage: `url("${image.image_path}")`,
                                }}
                            />
                        </button>
                    ))}
                </div>
            )}

            {/* Lightbox */}
            {isLightboxOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
                    onClick={() => setIsLightboxOpen(false)}
                >
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-4 top-4 text-white hover:bg-white/20"
                        onClick={() => setIsLightboxOpen(false)}
                    >
                        <X className="h-6 w-6" />
                    </Button>

                    <div className="relative max-h-[90vh] max-w-[90vw]">
                        <img
                            src={currentImage?.image_path}
                            alt={`Image ${selectedIndex + 1}`}
                            className="max-h-[90vh] max-w-[90vw] object-contain"
                            onClick={(e) => e.stopPropagation()}
                        />

                        {images.length > 1 && (
                            <>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        goToPrevious();
                                    }}
                                >
                                    <ChevronLeft className="h-8 w-8" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        goToNext();
                                    }}
                                >
                                    <ChevronRight className="h-8 w-8" />
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

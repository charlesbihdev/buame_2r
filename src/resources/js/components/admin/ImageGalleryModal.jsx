import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

export function ImageGalleryModal({ open, onOpenChange, images = [], title = 'Review Images' }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Reset index when modal opens with new images
    useEffect(() => {
        if (open) {
            setCurrentIndex(0);
        }
    }, [open, images]);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    if (!images.length) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <div className="relative">
                    {/* Main Image */}
                    <div className="relative aspect-video overflow-hidden rounded-lg bg-black">
                        <img
                            src={`/storage/${images[currentIndex]?.image_path}`}
                            alt={`Image ${currentIndex + 1}`}
                            className="h-full w-full object-contain"
                        />
                    </div>

                    {/* Navigation Arrows */}
                    {images.length > 1 && (
                        <>
                            <Button
                                variant="secondary"
                                size="icon"
                                className="absolute left-2 top-1/2 -translate-y-1/2"
                                onClick={handlePrev}
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="secondary"
                                size="icon"
                                className="absolute right-2 top-1/2 -translate-y-1/2"
                                onClick={handleNext}
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </>
                    )}

                    {/* Image Counter */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-sm text-white">
                        {currentIndex + 1} / {images.length}
                    </div>
                </div>

                {/* Thumbnails */}
                {images.length > 1 && (
                    <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                        {images.map((image, idx) => (
                            <button
                                key={image.id || idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`h-16 w-16 shrink-0 overflow-hidden rounded-md border-2 transition-colors ${
                                    idx === currentIndex ? 'border-primary' : 'border-transparent'
                                }`}
                            >
                                <img
                                    src={`/storage/${image.image_path}`}
                                    alt={`Thumbnail ${idx + 1}`}
                                    className="h-full w-full object-cover"
                                />
                            </button>
                        ))}
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}

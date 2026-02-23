import { useForm } from '@inertiajs/react';
import { useState, useRef } from 'react';
import { Camera, X, MessageSquare, Loader2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { StarRating } from '@/components/ui/star-rating';
import { cn } from '@/lib/utils';

export function ReviewForm({ reviewableType, reviewableId, onSuccess, onCancel }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        reviewer_name: '',
        reviewer_phone: '',
        rating: 0,
        comment: '',
        images: [],
    });

    const [hoveredStar, setHoveredStar] = useState(0);
    const [previewImages, setPreviewImages] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('reviews.store', { type: reviewableType, id: reviewableId }), {
            forceFormData: true,
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                reset();
                setPreviewImages([]);
            },
        });
    };

    const handleFileSelect = (e) => {
        const files = Array.from(e.target.files || []);
        addImages(files);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const files = Array.from(e.dataTransfer.files || []);
        addImages(files);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const addImages = (files) => {
        const imageFiles = files.filter((file) => file.type.startsWith('image/'));
        const remainingSlots = 3 - data.images.length;
        const filesToAdd = imageFiles.slice(0, remainingSlots);

        if (filesToAdd.length > 0) {
            const newImages = [...data.images, ...filesToAdd];
            setData('images', newImages);

            // Create previews
            filesToAdd.forEach((file) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreviewImages((prev) => [...prev, reader.result]);
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const removeImage = (index) => {
        const newImages = data.images.filter((_, i) => i !== index);
        const newPreviews = previewImages.filter((_, i) => i !== index);
        setData('images', newImages);
        setPreviewImages(newPreviews);
    };

    return (
        <div className="border-t border-gray-200 p-6">
            <div className="mx-auto max-w-2xl">
                <h3 className="mb-6 text-lg font-bold text-[var(--foreground)]">
                    Share Your Experience
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Two Column for Name & Phone */}
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <Label htmlFor="name" className="mb-2 block text-sm font-medium">
                                Your Name *
                            </Label>
                            <Input
                                id="name"
                                placeholder="Enter your name"
                                value={data.reviewer_name}
                                onChange={(e) => setData('reviewer_name', e.target.value)}
                            />
                            {errors.reviewer_name && (
                                <p className="mt-1 text-sm text-red-500">{errors.reviewer_name}</p>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="phone" className="mb-2 block text-sm font-medium">
                                Phone Number *
                            </Label>
                            <Input
                                id="phone"
                                placeholder="+233 XX XXX XXXX"
                                value={data.reviewer_phone}
                                onChange={(e) => setData('reviewer_phone', e.target.value)}
                            />
                            {errors.reviewer_phone && (
                                <p className="mt-1 text-sm text-red-500">{errors.reviewer_phone}</p>
                            )}
                        </div>
                    </div>

                    {/* Star Rating Selector */}
                    <div>
                        <Label className="mb-2 block text-sm font-medium">Your Rating *</Label>
                        <div
                            className="flex items-center gap-1"
                            onMouseLeave={() => setHoveredStar(0)}
                        >
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setData('rating', star)}
                                    onMouseEnter={() => setHoveredStar(star)}
                                    className="p-1 transition-transform hover:scale-110"
                                >
                                    <Star
                                        className={cn(
                                            'h-8 w-8 transition-colors',
                                            (hoveredStar || data.rating) >= star
                                                ? 'fill-yellow-400 text-yellow-400'
                                                : 'text-gray-300 hover:text-yellow-300',
                                        )}
                                    />
                                </button>
                            ))}
                            {data.rating > 0 && (
                                <span className="ml-3 text-sm font-medium text-gray-600">
                                    {
                                        ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][
                                            data.rating
                                        ]
                                    }
                                </span>
                            )}
                        </div>
                        {errors.rating && <p className="mt-1 text-sm text-red-500">{errors.rating}</p>}
                    </div>

                    {/* Comment */}
                    <div>
                        <Label htmlFor="comment" className="mb-2 block text-sm font-medium">
                            Your Review *
                        </Label>
                        <Textarea
                            id="comment"
                            placeholder="Share your experience with this product..."
                            rows={4}
                            value={data.comment}
                            onChange={(e) => setData('comment', e.target.value)}
                            className="resize-none"
                        />
                        {errors.comment && <p className="mt-1 text-sm text-red-500">{errors.comment}</p>}
                    </div>

                    {/* Image Upload */}
                    <div>
                        <Label className="mb-2 block text-sm font-medium">
                            Add Photos (Optional)
                        </Label>
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            className={cn(
                                'cursor-pointer rounded-xl border-2 border-dashed p-6 text-center transition-colors',
                                isDragging
                                    ? 'border-[var(--primary)] bg-[var(--primary)]/5'
                                    : 'border-gray-300 hover:border-[var(--primary)]',
                                data.images.length >= 3 && 'cursor-not-allowed opacity-50',
                            )}
                        >
                            <Camera className="mx-auto h-10 w-10 text-gray-400" />
                            <p className="mt-2 text-sm text-gray-600">
                                <span className="font-semibold text-[var(--primary)]">
                                    Click to upload
                                </span>{' '}
                                or drag and drop
                            </p>
                            <p className="mt-1 text-xs text-gray-500">
                                Max 3 images, 2MB each (JPEG, PNG, WebP)
                            </p>
                            <input
                                ref={fileInputRef}
                                type="file"
                                multiple
                                accept="image/jpeg,image/png,image/webp"
                                className="hidden"
                                onChange={handleFileSelect}
                                disabled={data.images.length >= 3}
                            />
                        </div>

                        {/* Image Previews */}
                        {previewImages.length > 0 && (
                            <div className="mt-4 flex gap-3">
                                {previewImages.map((preview, i) => (
                                    <div key={i} className="group relative">
                                        <img
                                            src={preview}
                                            alt={`Preview ${i + 1}`}
                                            className="h-20 w-20 rounded-lg object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(i)}
                                            className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {errors.images && <p className="mt-1 text-sm text-red-500">{errors.images}</p>}
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex items-center justify-end gap-3 pt-4">
                        <Button type="button" variant="ghost" onClick={onCancel}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                <>
                                    <MessageSquare className="mr-2 h-4 w-4" />
                                    Submit Review
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

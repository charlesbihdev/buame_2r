import { FormError } from '@/components/ui/form-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import { Loader2, Upload, X } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

export function RentalImageForm({ rentalId, image, isOpen, onClose }) {
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        image: null,
        display_order: image?.display_order || 0,
    });

    useEffect(() => {
        if (image) {
            setImagePreview(image.image_path);
            setData('display_order', image.display_order || 0);
        } else {
            setImagePreview(null);
            reset();
        }
    }, [image, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();

        if (image) {
            // Update existing image
            post(route('user.dashboard.rentals.images.update', { rental: rentalId, image: image.id }), {
                forceFormData: true,
                onSuccess: () => {
                    onClose();
                    reset();
                    setImagePreview(null);
                },
            });
        } else {
            // Create new image
            post(route('user.dashboard.rentals.images.store', rentalId), {
                forceFormData: true,
                onSuccess: () => {
                    onClose();
                    reset();
                    setImagePreview(null);
                },
            });
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleClose = () => {
        onClose();
        reset();
        setImagePreview(null);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-md rounded-xl bg-white p-6 dark:bg-[#162816]">
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-[#0d1b0d] dark:text-white">
                        {image ? 'Edit Image' : 'Add New Image'}
                    </h3>
                    <button
                        onClick={handleClose}
                        className="rounded-full p-1 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Image Upload */}
                    <div>
                        <Label>Image</Label>
                        <div
                            className="mt-2 cursor-pointer overflow-hidden rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 transition-colors hover:border-[#13ec13] dark:border-gray-700 dark:bg-gray-800"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            {imagePreview ? (
                                <div className="relative aspect-video">
                                    <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity hover:opacity-100">
                                        <span className="text-sm font-semibold text-white">Click to change</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex aspect-video flex-col items-center justify-center text-gray-400">
                                    <Upload className="mb-2 h-8 w-8" />
                                    <span className="text-sm">Click to upload image</span>
                                    <span className="mt-1 text-xs">Max 5MB, JPG/PNG/WebP</span>
                                </div>
                            )}
                        </div>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                        <FormError error={errors.image} className="mt-1" />
                    </div>

                    {/* Display Order */}
                    <div>
                        <Label htmlFor="display_order">Display Order</Label>
                        <Input
                            id="display_order"
                            type="number"
                            min="0"
                            value={data.display_order}
                            onChange={(e) => setData('display_order', parseInt(e.target.value) || 0)}
                            className="mt-1"
                            placeholder="0"
                        />
                        <p className="mt-1 text-xs text-gray-500">Lower numbers appear first</p>
                        <FormError error={errors.display_order} className="mt-1" />
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 pt-4">
                        <Button type="button" variant="outline" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={processing || (!image && !data.image)}
                            className="bg-[#13ec13] text-[#0d1b0d] hover:bg-[#0fdc0f]"
                        >
                            {processing ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Saving...
                                </>
                            ) : image ? (
                                'Update Image'
                            ) : (
                                'Add Image'
                            )}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

import { FormError } from '@/components/ui/form-error';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import { Loader2, Upload, X } from 'lucide-react';
import { useRef, useState } from 'react';

export function RentalImageForm({ rentalId, image, isOpen, onClose }) {
    const [imagePreview, setImagePreview] = useState(image?.image_path || null);
    const fileInputRef = useRef(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        image: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (image) {
            // Update existing image
            post(route('user.dashboard.rentals.images.update', { rental: rentalId, image: image.id }), {
                forceFormData: true,
                onSuccess: () => {
                    reset();
                    setImagePreview(null);
                    onClose();
                },
            });
        } else {
            // Add new image
            post(route('user.dashboard.rentals.images.store', { rental: rentalId }), {
                forceFormData: true,
                onSuccess: () => {
                    reset();
                    setImagePreview(null);
                    onClose();
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
        reset();
        setImagePreview(image?.image_path || null);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-md rounded-xl bg-white p-6 dark:bg-[var(--card)]">
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-[var(--foreground)] dark:text-white">
                        {image ? 'Edit Image' : 'Add New Image'}
                    </h3>
                    <button
                        onClick={handleClose}
                        className="rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Image Upload */}
                    <div>
                        <Label>Image</Label>
                        <div
                            className="mt-2 flex h-48 cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 transition-colors hover:border-[var(--primary)] dark:border-gray-700 dark:bg-gray-800"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            {imagePreview ? (
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="flex flex-col items-center text-gray-400">
                                    <Upload className="mb-2 h-10 w-10" />
                                    <span className="text-sm">Click to upload</span>
                                    <span className="text-xs">Max 5MB (JPEG, PNG, WebP)</span>
                                </div>
                            )}
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </div>
                        <FormError error={errors.image} className="mt-1" />
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 pt-2">
                        <Button type="button" variant="outline" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={processing || (!image && !data.image)}
                            className="cursor-pointer bg-[var(--primary)] text-white hover:bg-[var(--primary)]"
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

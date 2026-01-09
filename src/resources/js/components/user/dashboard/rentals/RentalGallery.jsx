import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';
import { ImagePlus, Star, Trash2, Edit2 } from 'lucide-react';
import { useState } from 'react';
import { RentalImageForm } from './RentalImageForm';

export function RentalGallery({ profile }) {
    const [showImageForm, setShowImageForm] = useState(false);
    const [editingImage, setEditingImage] = useState(null);

    if (!profile) {
        return (
            <div className="rounded-xl border border-gray-200 bg-white p-8 text-center dark:border-gray-800 dark:bg-[#162816]">
                <p className="text-gray-600 dark:text-gray-400">Loading gallery...</p>
            </div>
        );
    }

    const images = profile?.images || [];

    const handleSetPrimary = (imageId) => {
        router.put(
            route('user.dashboard.rentals.images.primary', { rental: profile.id, image: imageId }),
            {},
            {
                preserveScroll: true,
            }
        );
    };

    const handleDeleteImage = (imageId) => {
        if (confirm('Are you sure you want to delete this image?')) {
            router.delete(route('user.dashboard.rentals.images.destroy', { rental: profile.id, image: imageId }), {
                preserveScroll: true,
            });
        }
    };

    const handleEditImage = (image) => {
        setEditingImage(image);
        setShowImageForm(true);
    };

    const handleAddImage = () => {
        setEditingImage(null);
        setShowImageForm(true);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-bold text-[#0d1b0d] dark:text-white">Rental Gallery</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Manage images for your rental listing ({images.length} images)
                    </p>
                </div>
                <Button onClick={handleAddImage} className="bg-[#13ec13] text-[#0d1b0d] hover:bg-[#0fdc0f]">
                    <ImagePlus className="mr-2 h-4 w-4" />
                    Add Image
                </Button>
            </div>

            {/* Image Grid */}
            {images.length > 0 ? (
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                    {images.map((image) => (
                        <div
                            key={image.id}
                            className="group relative aspect-square overflow-hidden rounded-xl border-2 border-gray-100 bg-gray-100 dark:border-gray-800 dark:bg-gray-800"
                        >
                            <img
                                src={image.image_path}
                                alt="Rental"
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />

                            {/* Primary Badge */}
                            {image.is_primary && (
                                <div className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-[#13ec13] px-2 py-1 text-xs font-bold text-[#0d1b0d]">
                                    <Star className="h-3 w-3 fill-current" />
                                    Primary
                                </div>
                            )}

                            {/* Hover Actions */}
                            <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                                {!image.is_primary && (
                                    <Button
                                        size="sm"
                                        variant="secondary"
                                        onClick={() => handleSetPrimary(image.id)}
                                        className="h-8"
                                    >
                                        <Star className="mr-1 h-3 w-3" />
                                        Set Primary
                                    </Button>
                                )}
                                <Button
                                    size="sm"
                                    variant="secondary"
                                    onClick={() => handleEditImage(image)}
                                    className="h-8"
                                >
                                    <Edit2 className="h-3 w-3" />
                                </Button>
                                <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => handleDeleteImage(image.id)}
                                    className="h-8"
                                >
                                    <Trash2 className="h-3 w-3" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 p-12 text-center dark:border-gray-700 dark:bg-gray-800/50">
                    <ImagePlus className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                    <h4 className="mb-2 font-semibold text-gray-700 dark:text-gray-300">No images yet</h4>
                    <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
                        Add images to showcase your rental listing
                    </p>
                    <Button onClick={handleAddImage} className="bg-[#13ec13] text-[#0d1b0d] hover:bg-[#0fdc0f]">
                        <ImagePlus className="mr-2 h-4 w-4" />
                        Add First Image
                    </Button>
                </div>
            )}

            {/* Image Form Modal */}
            <RentalImageForm
                rentalId={profile.id}
                image={editingImage}
                isOpen={showImageForm}
                onClose={() => {
                    setShowImageForm(false);
                    setEditingImage(null);
                }}
            />
        </div>
    );
}

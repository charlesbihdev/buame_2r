import { Button } from '@/components/ui/button';
import { VideoLinksManager } from '@/components/ui/VideoLinksManager';
import { router } from '@inertiajs/react';
import { Edit, Image as ImageIcon, Plus, Trash2, Star } from 'lucide-react';
import { useState } from 'react';
import { TransportImageForm } from './TransportImageForm';

export function TransportGallery({ profile }) {
    const images = profile?.images || [];
    const [showForm, setShowForm] = useState(false);
    const [editingImage, setEditingImage] = useState(null);

    const handleEdit = (image) => {
        setEditingImage(image);
        setShowForm(true);
    };

    const handleDelete = (imageId) => {
        if (confirm('Are you sure you want to delete this image?')) {
            router.delete(route('user.dashboard.transport.images.destroy', imageId), {
                preserveScroll: true,
            });
        }
    };

    const handleSetPrimary = (imageId) => {
        router.post(
            route('user.dashboard.transport.images.set-primary', imageId),
            {},
            {
                preserveScroll: true,
            }
        );
    };

    const handleAdd = () => {
        setEditingImage(null);
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setEditingImage(null);
    };

    const primaryImage = images.find((img) => img.is_primary);
    const otherImages = images.filter((img) => !img.is_primary);

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-[var(--foreground)] dark:text-white">Vehicle Gallery</h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Manage your vehicle images and showcase your service</p>
            </div>

            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-[var(--foreground)] dark:text-white">Vehicle Images</h3>
                <Button onClick={handleAdd} className="cursor-pointer bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Image
                </Button>
            </div>

            {/* Primary Image */}
            {primaryImage && (
                <div className="rounded-xl border border-[var(--buame-border-light)] bg-white p-4 dark:border-[#2a4d2a] dark:bg-[#1a331a]">
                    <div className="mb-2 flex items-center gap-2">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-semibold text-[var(--foreground)] dark:text-white">Primary Image</span>
                    </div>
                    <div className="group relative overflow-hidden rounded-lg">
                        <img
                            src={primaryImage.image_path}
                            alt="Primary"
                            className="h-64 w-full object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute top-2 right-2 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                            <button
                                onClick={() => handleEdit(primaryImage)}
                                className="rounded-lg bg-white p-2 shadow-md transition-colors hover:bg-gray-100 dark:bg-[#1a331a] dark:hover:bg-[#254225]"
                                title="Edit"
                            >
                                <Edit className="h-4 w-4 text-[var(--primary)]" />
                            </button>
                            <button
                                onClick={() => handleDelete(primaryImage.id)}
                                className="rounded-lg bg-white p-2 shadow-md transition-colors hover:bg-gray-100 dark:bg-[#1a331a] dark:hover:bg-[#254225]"
                                title="Delete"
                            >
                                <Trash2 className="h-4 w-4 text-red-600" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Other Images Grid */}
            {otherImages.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {otherImages.map((image) => (
                        <div
                            key={image.id}
                            className="group relative overflow-hidden rounded-xl border border-[var(--buame-border-light)] bg-white transition-all hover:shadow-lg dark:border-[#2a4d2a] dark:bg-[#1a331a]"
                        >
                            <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden bg-gray-100 dark:bg-gray-800">
                                <img src={image.image_path} alt="Vehicle" className="h-full w-full object-cover" />
                                <div className="absolute top-2 right-2 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                                    <button
                                        onClick={() => handleSetPrimary(image.id)}
                                        className="rounded-lg bg-white p-2 shadow-md transition-colors hover:bg-gray-100 dark:bg-[#1a331a] dark:hover:bg-[#254225]"
                                        title="Set as Primary"
                                    >
                                        <Star className="h-4 w-4 text-yellow-400" />
                                    </button>
                                    <button
                                        onClick={() => handleEdit(image)}
                                        className="rounded-lg bg-white p-2 shadow-md transition-colors hover:bg-gray-100 dark:bg-[#1a331a] dark:hover:bg-[#254225]"
                                        title="Edit"
                                    >
                                        <Edit className="h-4 w-4 text-[var(--primary)]" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(image.id)}
                                        className="rounded-lg bg-white p-2 shadow-md transition-colors hover:bg-gray-100 dark:bg-[#1a331a] dark:hover:bg-[#254225]"
                                        title="Delete"
                                    >
                                        <Trash2 className="h-4 w-4 text-red-600" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                !primaryImage && (
                    <div className="rounded-xl border-2 border-dashed border-gray-300 p-12 text-center dark:border-gray-700">
                        <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-4 text-gray-600 dark:text-gray-400">No images uploaded yet</p>
                        <Button onClick={handleAdd} className="mt-4 cursor-pointer bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Your First Image
                        </Button>
                    </div>
                )
            )}

            {showForm && <TransportImageForm image={editingImage} onClose={handleCloseForm} profile={profile} />}

            {/* Video Links */}
            <VideoLinksManager
                videoLinks={profile?.video_links || []}
                storeRouteName="user.dashboard.transport.video-links.store"
                destroyRouteName="user.dashboard.transport.video-links.destroy"
            />
        </div>
    );
}

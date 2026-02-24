import { Button } from '@/components/ui/button';
import { VideoLinksManager } from '@/components/ui/VideoLinksManager';
import { router } from '@inertiajs/react';
import { Edit, Image as ImageIcon, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { PortfolioForm } from './PortfolioForm';

export function Portfolio({ profile }) {
    const portfolio = profile?.portfolio || [];
    const [showForm, setShowForm] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    const handleEdit = (item) => {
        setEditingItem(item);
        setShowForm(true);
    };

    const handleDelete = (itemId) => {
        if (confirm('Are you sure you want to delete this portfolio item?')) {
            router.delete(route('user.dashboard.artisans.portfolio.destroy', itemId), {
                preserveScroll: true,
            });
        }
    };

    const handleAdd = () => {
        setEditingItem(null);
        setShowForm(true);
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setEditingItem(null);
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-[var(--foreground)]">Portfolio</h2>
                <p className="mt-1 text-sm text-gray-600">Showcase your completed work</p>
            </div>

            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-[var(--foreground)]">My Portfolio</h3>
                <Button onClick={handleAdd} className="cursor-pointer bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Work
                </Button>
            </div>

            {portfolio.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {portfolio.map((item) => (
                        <div
                            key={item.id}
                            className="group relative overflow-hidden rounded-xl border border-[var(--buame-border-light)] bg-white transition-all hover:shadow-lg"
                        >
                            <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden bg-gray-100">
                                {item.image_path ? (
                                    <img src={item.image_path} alt={item.item} className="h-full w-full object-cover" />
                                ) : (
                                    <ImageIcon className="h-12 w-12 text-gray-400" />
                                )}
                                <div className="absolute top-2 right-2 flex gap-2">
                                    <button
                                        onClick={() => handleEdit(item)}
                                        className="rounded-lg bg-white p-2 shadow-md transition-colors hover:bg-gray-100"
                                        title="Edit"
                                    >
                                        <Edit className="h-4 w-4 text-[var(--primary)]" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="rounded-lg bg-white p-2 shadow-md transition-colors hover:bg-gray-100"
                                        title="Delete"
                                    >
                                        <Trash2 className="h-4 w-4 text-red-600" />
                                    </button>
                                </div>
                            </div>
                            <div className="p-4">
                                <p className="font-semibold text-[var(--foreground)]">{item.item || 'Work Item'}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="rounded-xl border-2 border-dashed border-gray-300 p-12 text-center">
                    <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-4 text-gray-600">No portfolio items yet</p>
                    <Button onClick={handleAdd} className="mt-4 cursor-pointer bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Your First Work
                    </Button>
                </div>
            )}

            {showForm && <PortfolioForm portfolio={editingItem} onClose={handleCloseForm} />}

            {/* Video Links */}
            <VideoLinksManager
                videoLinks={profile?.video_links || []}
                storeRouteName="user.dashboard.artisans.video-links.store"
                destroyRouteName="user.dashboard.artisans.video-links.destroy"
            />
        </div>
    );
}

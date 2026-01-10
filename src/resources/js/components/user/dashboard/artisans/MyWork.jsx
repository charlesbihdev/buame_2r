import { Button } from '@/components/ui/button';
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
                <h2 className="text-2xl font-bold text-[var(--foreground)] dark:text-white">Portfolio</h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Showcase your completed work</p>
            </div>

            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-[var(--foreground)] dark:text-white">My Portfolio</h3>
                <Button onClick={handleAdd} className="bg-[var(--primary)] text-white hover:bg-[#0eb50e]">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Work
                </Button>
            </div>

            {portfolio.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {portfolio.map((item) => (
                        <div
                            key={item.id}
                            className="group relative overflow-hidden rounded-xl border border-[var(--buame-border-light)] bg-white transition-all hover:shadow-lg dark:border-[#2a4d2a] dark:bg-[#1a331a]"
                        >
                            <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden bg-gray-100 dark:bg-gray-800">
                                {item.image_path ? (
                                    <img src={item.image_path} alt={item.item} className="h-full w-full object-cover" />
                                ) : (
                                    <ImageIcon className="h-12 w-12 text-gray-400" />
                                )}
                                <div className="absolute top-2 right-2 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                                    <button
                                        onClick={() => handleEdit(item)}
                                        className="rounded-lg bg-white p-2 shadow-md transition-colors hover:bg-gray-100 dark:bg-[#1a331a] dark:hover:bg-[#254225]"
                                        title="Edit"
                                    >
                                        <Edit className="h-4 w-4 text-[var(--primary)]" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="rounded-lg bg-white p-2 shadow-md transition-colors hover:bg-gray-100 dark:bg-[#1a331a] dark:hover:bg-[#254225]"
                                        title="Delete"
                                    >
                                        <Trash2 className="h-4 w-4 text-red-600" />
                                    </button>
                                </div>
                            </div>
                            <div className="p-4">
                                <p className="font-semibold text-[var(--foreground)] dark:text-white">{item.item || 'Work Item'}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="rounded-xl border-2 border-dashed border-gray-300 p-12 text-center dark:border-gray-700">
                    <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-4 text-gray-600 dark:text-gray-400">No portfolio items yet</p>
                    <Button onClick={handleAdd} className="mt-4 bg-[var(--primary)] text-white hover:bg-[#0eb50e]">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Your First Work
                    </Button>
                </div>
            )}

            {showForm && <PortfolioForm portfolio={editingItem} onClose={handleCloseForm} />}
        </div>
    );
}

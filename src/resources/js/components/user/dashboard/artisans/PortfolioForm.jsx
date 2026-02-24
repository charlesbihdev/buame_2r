import { Button } from '@/components/ui/button';
import { FormError } from '@/components/ui/form-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm, usePage } from '@inertiajs/react';
import { Upload, X } from 'lucide-react';
import { useState } from 'react';

export function PortfolioForm({ portfolio, onClose }) {
    const { errors: pageErrors } = usePage().props;
    const [preview, setPreview] = useState(portfolio?.image_path || null);
    const isEdit = !!portfolio;

    const { data, setData, post, put, processing, errors, reset } = useForm({
        item: portfolio?.item || '',
        image: null,
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setData('image', null);
        setPreview(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEdit) {
            put(route('user.dashboard.artisans.portfolio.update', portfolio.id), {
                preserveScroll: true,
                forceFormData: true,
                onSuccess: () => {
                    reset();
                    onClose();
                },
            });
        } else {
            post(route('user.dashboard.artisans.portfolio.store'), {
                preserveScroll: true,
                forceFormData: true,
                onSuccess: () => {
                    reset();
                    setPreview(null);
                    onClose();
                },
            });
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-md rounded-xl border border-[var(--buame-border-light)] bg-white p-6">
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-xl font-bold text-[var(--foreground)]">{isEdit ? 'Edit Portfolio Item' : 'Add Portfolio Item'}</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="image">Image *</Label>
                        <div className="mt-2">
                            {preview ? (
                                <div className="relative">
                                    <img
                                        src={preview}
                                        alt="Preview"
                                        className="h-48 w-full rounded-lg border border-[var(--buame-border-light)] object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleRemoveImage}
                                        className="absolute top-2 right-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            ) : (
                                <label
                                    htmlFor="image"
                                    className="flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 transition-colors hover:bg-gray-50"
                                >
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <Upload className="mb-3 h-10 w-10 text-gray-400" />
                                        <p className="mb-2 text-sm text-gray-500">
                                            <span className="font-semibold">Click to upload</span> or drag and drop
                                        </p>
                                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                                    </div>
                                    <input id="image" type="file" className="hidden" accept="image/*" onChange={handleImageChange} required={!isEdit || !preview} />
                                </label>
                            )}
                        </div>
                        <FormError error={errors.image || pageErrors?.image} className="mt-1" />
                    </div>

                    <div>
                        <Label htmlFor="item">Work Description <span className="text-sm font-normal text-gray-500">(Optional)</span></Label>
                        <Input
                            id="item"
                            value={data.item}
                            onChange={(e) => setData('item', e.target.value)}
                            className="mt-1"
                            placeholder="e.g., Custom dining tables"
                        />
                        <FormError error={errors.item || pageErrors?.item} className="mt-1" />
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-4">
                        <Button type="button" variant="outline" onClick={onClose} disabled={processing}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing} className="cursor-pointer bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90">
                            {processing ? 'Saving...' : isEdit ? 'Update' : 'Add Item'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FormError } from '@/components/ui/form-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useForm, usePage } from '@inertiajs/react';
import { ImagePlus, Link2, Plus, X } from 'lucide-react';
import { useState } from 'react';

export function ProductFormModal({ isOpen, onClose, store }) {
    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        title: '',
        category: '',
        has_price: false,
        price: '',
        price_type: '',
        condition: 'new',
        location: '',
        latitude: '',
        longitude: '',
        description: '',
        delivery_available: false,
        warranty: '',
        images: [],
        specifications: [],
        video_links: [],
    });
    const [imagePreviews, setImagePreviews] = useState([]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const totalImages = data.images.length + files.length;

        if (totalImages > 10) {
            return;
        }

        const newImages = [...data.images, ...files];
        setData('images', newImages);

        const newPreviews = files.map((file) => URL.createObjectURL(file));
        setImagePreviews((prev) => [...prev, ...newPreviews]);
    };

    const removeImage = (index) => {
        URL.revokeObjectURL(imagePreviews[index]);
        setData(
            'images',
            data.images.filter((_, i) => i !== index),
        );
        setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    };

    const addSpecification = () => {
        setData('specifications', [...data.specifications, '']);
    };

    const updateSpecification = (index, value) => {
        const updated = [...data.specifications];
        updated[index] = value;
        setData('specifications', updated);
    };

    const removeSpecification = (index) => {
        setData(
            'specifications',
            data.specifications.filter((_, i) => i !== index),
        );
    };

    const addVideoLink = () => {
        if (data.video_links.length < 5) {
            setData('video_links', [...data.video_links, '']);
        }
    };

    const updateVideoLink = (index, value) => {
        const updated = [...data.video_links];
        updated[index] = value;
        setData('video_links', updated);
    };

    const removeVideoLink = (index) => {
        setData(
            'video_links',
            data.video_links.filter((_, i) => i !== index),
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('user.dashboard.marketplace.store'), {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: () => {
                handleClose();
            },
        });
    };

    const handleClose = () => {
        imagePreviews.forEach((preview) => URL.revokeObjectURL(preview));
        reset();
        clearErrors();
        setImagePreviews([]);
        onClose();
    };

    const { marketplaceCategories = {} } = usePage().props;
    const categories = Object.entries(marketplaceCategories).map(([value, label]) => ({ value, label }));

    const conditions = [
        { value: 'new', label: 'New' },
        { value: 'like_new', label: 'Like New' },
        { value: 'used', label: 'Used' },
        { value: 'refurbished', label: 'Refurbished' },
    ];

    if (!isOpen) return null;

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Add New Product</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Images */}
                    <div>
                        <Label>Product Images (Max 10)</Label>
                        <div className="mt-2 grid grid-cols-4 gap-2 sm:grid-cols-5">
                            {imagePreviews.map((preview, index) => (
                                <div key={index} className="group relative aspect-square">
                                    <img src={preview} alt={`Preview ${index + 1}`} className="h-full w-full rounded-lg border object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(index)}
                                        className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                                    >
                                        <X className="h-3 w-3" />
                                    </button>
                                    {index === 0 && (
                                        <span className="absolute bottom-1 left-1 rounded bg-[var(--primary)] px-1.5 py-0.5 text-xs font-medium text-white">
                                            Primary
                                        </span>
                                    )}
                                </div>
                            ))}
                            {data.images.length < 10 && (
                                <label className="flex aspect-square cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 transition-colors hover:border-[var(--primary)]">
                                    <input type="file" accept="image/*" multiple onChange={handleImageChange} className="hidden" />
                                    <ImagePlus className="h-6 w-6 text-gray-400" />
                                </label>
                            )}
                        </div>
                        <FormError error={errors.images} />
                    </div>

                    {/* Title */}
                    <div>
                        <Label htmlFor="title">Product Title *</Label>
                        <Input
                            id="title"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            placeholder="Enter product title"
                            required
                        />
                        <FormError error={errors.title} />
                    </div>

                    {/* Category */}
                    <div>
                        <Label htmlFor="category">Category *</Label>
                        <Select value={data.category} onValueChange={(value) => setData('category', value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((cat) => (
                                    <SelectItem key={cat.value} value={cat.value}>
                                        {cat.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormError error={errors.category} />
                    </div>

                    {/* Price Toggle */}
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="has_price"
                            checked={data.has_price}
                            onChange={(e) => setData('has_price', e.target.checked)}
                            className="h-4 w-4 rounded border-gray-300"
                        />
                        <Label htmlFor="has_price" className="cursor-pointer">
                            Add Price
                        </Label>
                    </div>

                    {/* Price */}
                    {data.has_price && (
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="price">Price (GH₵)</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={data.price}
                                    onChange={(e) => setData('price', e.target.value)}
                                    placeholder="0.00"
                                />
                                <FormError error={errors.price} />
                            </div>
                            <div>
                                <Label htmlFor="price_type">Price Type</Label>
                                <Input
                                    id="price_type"
                                    value={data.price_type}
                                    onChange={(e) => setData('price_type', e.target.value)}
                                    placeholder="e.g., /kg, /bunch"
                                />
                            </div>
                        </div>
                    )}

                    {/* Condition */}
                    <div>
                        <Label htmlFor="condition">Condition <span className="text-sm font-normal text-gray-500">(Optional)</span></Label>
                        <Select value={data.condition} onValueChange={(value) => setData('condition', value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select condition" />
                            </SelectTrigger>
                            <SelectContent>
                                {conditions.map((cond) => (
                                    <SelectItem key={cond.value} value={cond.value}>
                                        {cond.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Location */}
                    <div>
                        <Label htmlFor="location">Location *</Label>
                        <Input
                            id="location"
                            value={data.location}
                            onChange={(e) => setData('location', e.target.value)}
                            placeholder="Enter location"
                            required
                        />
                        <FormError error={errors.location} />
                    </div>

                    {/* Description */}
                    <div>
                        <Label htmlFor="description">Description <span className="text-sm font-normal text-gray-500">(Optional)</span></Label>
                        <Textarea
                            id="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            placeholder="Describe your product..."
                            rows={4}
                        />
                    </div>

                    {/* Delivery Available */}
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="delivery_available"
                            checked={data.delivery_available}
                            onChange={(e) => setData('delivery_available', e.target.checked)}
                            className="h-4 w-4 rounded border-gray-300"
                        />
                        <Label htmlFor="delivery_available" className="cursor-pointer">
                            Delivery Available
                        </Label>
                    </div>

                    {/* Warranty */}
                    <div>
                        <Label htmlFor="warranty">Warranty <span className="text-sm font-normal text-gray-500">(Optional)</span></Label>
                        <Input
                            id="warranty"
                            value={data.warranty}
                            onChange={(e) => setData('warranty', e.target.value)}
                            placeholder="e.g., 1 year warranty"
                        />
                    </div>

                    {/* Specifications */}
                    <div>
                        <div className="mb-2 flex items-center justify-between">
                            <Label>Specifications <span className="text-sm font-normal text-gray-500">(Optional)</span></Label>
                            <Button type="button" variant="outline" size="sm" onClick={addSpecification} className="h-8 gap-1 text-xs">
                                <Plus className="h-3 w-3" />
                                Add Specification
                            </Button>
                        </div>
                        <div className="space-y-2">
                            {data.specifications.map((spec, index) => (
                                <div key={index} className="flex gap-2">
                                    <Input
                                        value={spec}
                                        onChange={(e) => updateSpecification(index, e.target.value)}
                                        placeholder="e.g., 128GB Storage, 8GB RAM"
                                        className="flex-1"
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => removeSpecification(index)}
                                        className="h-10 w-10 p-0"
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                            {data.specifications.length === 0 && (
                                <p className="text-sm text-gray-500">
                                    Add product specifications to help buyers understand your product better.
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Video Links */}
                    <div>
                        <div className="mb-2 flex items-center justify-between">
                            <Label>Video Links <span className="text-sm font-normal text-gray-500">(Optional, max 5)</span></Label>
                            {data.video_links.length < 5 && (
                                <Button type="button" variant="outline" size="sm" onClick={addVideoLink} className="h-8 gap-1 text-xs">
                                    <Link2 className="h-3 w-3" />
                                    Add Video Link
                                </Button>
                            )}
                        </div>
                        <div className="space-y-2">
                            {data.video_links.map((link, index) => (
                                <div key={index} className="flex gap-2">
                                    <Input
                                        value={link}
                                        onChange={(e) => updateVideoLink(index, e.target.value)}
                                        placeholder="e.g., https://youtube.com/watch?v=... or https://tiktok.com/@user/video/..."
                                        className="flex-1"
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={() => removeVideoLink(index)}
                                        className="h-10 w-10 p-0"
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                            {data.video_links.length === 0 && (
                                <p className="text-sm text-gray-500">
                                    Add video links to showcase your product in action.
                                </p>
                            )}
                        </div>
                        <FormError error={errors.video_links} />
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={handleClose} disabled={processing}>
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={processing}
                            className="cursor-pointer bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90"
                        >
                            {processing ? 'Adding...' : 'Add Product'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

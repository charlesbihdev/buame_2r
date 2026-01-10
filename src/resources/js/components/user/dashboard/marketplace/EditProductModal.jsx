import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FormError } from '@/components/ui/form-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@inertiajs/react';
import { ImagePlus, Plus, X } from 'lucide-react';
import { useState } from 'react';

export function EditProductModal({ isOpen, onClose, product }) {
    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        _method: 'put',
        title: product?.title || '',
        category: product?.category || '',
        price: product?.price || '',
        price_type: product?.price_type || '',
        condition: product?.condition || 'new',
        location: product?.location || '',
        latitude: product?.latitude || '',
        longitude: product?.longitude || '',
        description: product?.description || '',
        delivery_available: product?.delivery_available || false,
        warranty: product?.warranty || '',
        images: [],
        remove_images: [],
        specifications: [],
        remove_specifications: [],
    });

    const [newImagePreviews, setNewImagePreviews] = useState([]);
    const [existingImages, setExistingImages] = useState(product?.images || []);
    const [existingSpecifications, setExistingSpecifications] = useState(product?.specifications || []);

    // Update form data when product changes
    // useEffect(() => {
    //     if (product && isOpen) {
    //         setData({
    //             title: product.title || '',
    //             category: product.category || '',
    //             price: product.price || '',
    //             price_type: product.price_type || '',
    //             condition: product.condition || 'new',
    //             location: product.location || '',
    //             latitude: product.latitude || '',
    //             longitude: product.longitude || '',
    //             description: product.description || '',
    //             delivery_available: product.delivery_available || false,
    //             warranty: product.warranty || '',
    //             images: [],
    //             remove_images: [],
    //         });
    //         setExistingImages(product.images || []);
    //     }
    // }, [product, isOpen, setData]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const totalImages = existingImages.length - data.remove_images.length + data.images.length + files.length;

        if (totalImages > 10) {
            return;
        }

        const addedImages = [...data.images, ...files];
        setData('images', addedImages);

        const addedPreviews = files.map((file) => URL.createObjectURL(file));
        setNewImagePreviews((prev) => [...prev, ...addedPreviews]);
    };

    const removeNewImage = (index) => {
        URL.revokeObjectURL(newImagePreviews[index]);
        setData(
            'images',
            data.images.filter((_, i) => i !== index),
        );
        setNewImagePreviews((prev) => prev.filter((_, i) => i !== index));
    };

    const toggleRemoveExistingImage = (imageId) => {
        const newRemoveImages = data.remove_images.includes(imageId)
            ? data.remove_images.filter((id) => id !== imageId)
            : [...data.remove_images, imageId];
        setData('remove_images', newRemoveImages);
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

    const toggleRemoveExistingSpecification = (specId) => {
        const newRemoveSpecs = data.remove_specifications.includes(specId)
            ? data.remove_specifications.filter((id) => id !== specId)
            : [...data.remove_specifications, specId];
        setData('remove_specifications', newRemoveSpecs);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('user.dashboard.marketplace.update', product.id), {
            preserveScroll: true,
            // forceFormData: true,
            onSuccess: () => {
                handleClose();
            },
        });
    };

    const handleClose = () => {
        newImagePreviews.forEach((preview) => URL.revokeObjectURL(preview));
        reset();
        clearErrors();
        setNewImagePreviews([]);
        setExistingImages([]);
        setExistingSpecifications([]);
        onClose();
    };

    const categories = [
        { value: 'electronics', label: 'Electronics' },
        { value: 'furniture', label: 'Furniture' },
        { value: 'food', label: 'Food' },
        { value: 'agriculture', label: 'Agriculture' },
        { value: 'clothes', label: 'Clothes' },
        { value: 'others', label: 'Others' },
    ];

    const conditions = [
        { value: 'new', label: 'New' },
        { value: 'like_new', label: 'Like New' },
        { value: 'used', label: 'Used' },
        { value: 'refurbished', label: 'Refurbished' },
    ];

    const activeExistingImages = existingImages.filter((img) => !data.remove_images.includes(img.id));
    const totalImages = activeExistingImages.length + data.images.length;

    if (!isOpen || !product) return null;

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Edit Product</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Images */}
                    <div>
                        <Label>Product Images (Max 10)</Label>
                        <div className="mt-2 grid grid-cols-4 gap-2 sm:grid-cols-5">
                            {/* Existing Images */}
                            {existingImages.map((image, index) => {
                                const isMarkedForRemoval = data.remove_images.includes(image.id);
                                return (
                                    <div
                                        key={`existing-${image.id}`}
                                        className={`group relative aspect-square ${isMarkedForRemoval ? 'opacity-40' : ''}`}
                                    >
                                        <img
                                            src={`/storage/${image.image_path}`}
                                            alt={`Product ${index + 1}`}
                                            className="h-full w-full rounded-lg border object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => toggleRemoveExistingImage(image.id)}
                                            className={`absolute -top-2 -right-2 rounded-full p-1 text-white transition-opacity ${
                                                isMarkedForRemoval ? 'bg-green-500 opacity-100' : 'bg-red-500 opacity-0 group-hover:opacity-100'
                                            }`}
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                        {image.is_primary && !isMarkedForRemoval && (
                                            <span className="absolute bottom-1 left-1 rounded bg-[var(--primary)] px-1.5 py-0.5 text-xs font-medium text-white">
                                                Primary
                                            </span>
                                        )}
                                        {isMarkedForRemoval && (
                                            <span className="absolute bottom-1 left-1 rounded bg-red-500 px-1.5 py-0.5 text-xs font-medium text-white">
                                                Remove
                                            </span>
                                        )}
                                    </div>
                                );
                            })}

                            {/* New Images */}
                            {newImagePreviews.map((preview, index) => (
                                <div key={`new-${index}`} className="group relative aspect-square">
                                    <img src={preview} alt={`New ${index + 1}`} className="h-full w-full rounded-lg border object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => removeNewImage(index)}
                                        className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                                    >
                                        <X className="h-3 w-3" />
                                    </button>
                                    <span className="absolute bottom-1 left-1 rounded bg-blue-500 px-1.5 py-0.5 text-xs font-medium text-white">
                                        New
                                    </span>
                                </div>
                            ))}

                            {/* Add More */}
                            {totalImages < 10 && (
                                <label className="flex aspect-square cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 transition-colors hover:border-[var(--primary)] dark:border-gray-600">
                                    <input type="file" accept="image/*" multiple onChange={handleImageChange} className="hidden" />
                                    <ImagePlus className="h-6 w-6 text-gray-400" />
                                </label>
                            )}
                        </div>
                        <FormError error={errors.images} />
                    </div>

                    {/* Title */}
                    <div>
                        <Label htmlFor="edit-title">Product Title *</Label>
                        <Input
                            id="edit-title"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            placeholder="Enter product title"
                            required
                        />
                        <FormError error={errors.title} />
                    </div>

                    {/* Category */}
                    <div>
                        <Label htmlFor="edit-category">Category *</Label>
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

                    {/* Price */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="edit-price">Price (GH₵) *</Label>
                            <Input
                                id="edit-price"
                                type="number"
                                step="0.01"
                                min="0"
                                value={data.price}
                                onChange={(e) => setData('price', e.target.value)}
                                placeholder="0.00"
                                required
                            />
                            <FormError error={errors.price} />
                        </div>
                        <div>
                            <Label htmlFor="edit-price_type">Price Type</Label>
                            <Input
                                id="edit-price_type"
                                value={data.price_type}
                                onChange={(e) => setData('price_type', e.target.value)}
                                placeholder="e.g., /kg, /bunch"
                            />
                        </div>
                    </div>

                    {/* Condition */}
                    <div>
                        <Label htmlFor="edit-condition">Condition</Label>
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
                        <Label htmlFor="edit-location">Location *</Label>
                        <Input
                            id="edit-location"
                            value={data.location}
                            onChange={(e) => setData('location', e.target.value)}
                            placeholder="Enter location"
                            required
                        />
                        <FormError error={errors.location} />
                    </div>

                    {/* Description */}
                    <div>
                        <Label htmlFor="edit-description">Description</Label>
                        <Textarea
                            id="edit-description"
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
                            id="edit-delivery_available"
                            checked={data.delivery_available}
                            onChange={(e) => setData('delivery_available', e.target.checked)}
                            className="h-4 w-4 rounded border-gray-300"
                        />
                        <Label htmlFor="edit-delivery_available" className="cursor-pointer">
                            Delivery Available
                        </Label>
                    </div>

                    {/* Warranty */}
                    <div>
                        <Label htmlFor="edit-warranty">Warranty</Label>
                        <Input
                            id="edit-warranty"
                            value={data.warranty}
                            onChange={(e) => setData('warranty', e.target.value)}
                            placeholder="e.g., 1 year warranty"
                        />
                    </div>

                    {/* Specifications */}
                    <div>
                        <div className="mb-2 flex items-center justify-between">
                            <Label>Specifications</Label>
                            <Button type="button" variant="outline" size="sm" onClick={addSpecification} className="h-8 gap-1 text-xs">
                                <Plus className="h-3 w-3" />
                                Add Specification
                            </Button>
                        </div>
                        <div className="space-y-2">
                            {/* Existing Specifications */}
                            {existingSpecifications.map((spec, index) => {
                                const isMarkedForRemoval = data.remove_specifications.includes(spec.id);
                                return (
                                    <div key={`existing-spec-${spec.id}`} className={`flex gap-2 ${isMarkedForRemoval ? 'opacity-40' : ''}`}>
                                        <Input value={spec.specification} disabled className={`flex-1 ${isMarkedForRemoval ? 'line-through' : ''}`} />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => toggleRemoveExistingSpecification(spec.id)}
                                            className={`h-10 w-10 p-0 ${isMarkedForRemoval ? 'bg-green-500 text-white hover:bg-green-600' : ''}`}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                );
                            })}

                            {/* New Specifications */}
                            {data.specifications.map((spec, index) => (
                                <div key={`new-spec-${index}`} className="flex gap-2">
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

                            {existingSpecifications.length === 0 && data.specifications.length === 0 && (
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Add product specifications to help buyers understand your product better.
                                </p>
                            )}
                        </div>
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={handleClose} disabled={processing}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing} className="bg-[var(--primary)] text-white hover:bg-[#0eb50e]">
                            {processing ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

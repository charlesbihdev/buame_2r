import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FormError } from '@/components/ui/form-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { router } from '@inertiajs/react';
import { ImagePlus, X } from 'lucide-react';
import { useState } from 'react';

export function ProductFormModal({ isOpen, onClose, store }) {
    const [data, setData] = useState({
        title: '',
        category: '',
        price: '',
        price_type: '',
        condition: 'new',
        location: '',
        latitude: '',
        longitude: '',
        description: '',
        delivery_available: false,
        warranty: '',
    });
    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [processing, setProcessing] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (field, value) => {
        setData((prev) => ({ ...prev, [field]: value }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const totalImages = images.length + files.length;

        if (totalImages > 10) {
            setErrors((prev) => ({ ...prev, images: 'Maximum 10 images allowed' }));
            return;
        }

        const newImages = [...images, ...files];
        setImages(newImages);

        // Create previews
        const newPreviews = files.map((file) => URL.createObjectURL(file));
        setImagePreviews((prev) => [...prev, ...newPreviews]);
    };

    const removeImage = (index) => {
        URL.revokeObjectURL(imagePreviews[index]);
        setImages((prev) => prev.filter((_, i) => i !== index));
        setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setProcessing(true);
        setErrors({});

        const formData = new FormData();
        Object.keys(data).forEach((key) => {
            if (data[key] !== '' && data[key] !== null) {
                formData.append(key, data[key]);
            }
        });

        images.forEach((image) => {
            formData.append('images[]', image);
        });

        router.post(route('user.dashboard.marketplace.store'), formData, {
            preserveScroll: true,
            onSuccess: () => {
                handleClose();
            },
            onError: (errs) => {
                setErrors(errs);
            },
            onFinish: () => {
                setProcessing(false);
            },
        });
    };

    const handleClose = () => {
        // Cleanup previews
        imagePreviews.forEach((preview) => URL.revokeObjectURL(preview));
        setData({
            title: '',
            category: '',
            price: '',
            price_type: '',
            condition: 'new',
            location: '',
            latitude: '',
            longitude: '',
            description: '',
            delivery_available: false,
            warranty: '',
        });
        setImages([]);
        setImagePreviews([]);
        setErrors({});
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
                                        <span className="absolute bottom-1 left-1 rounded bg-[#13ec13] px-1.5 py-0.5 text-xs font-medium text-[#0d1b0d]">
                                            Primary
                                        </span>
                                    )}
                                </div>
                            ))}
                            {images.length < 10 && (
                                <label className="flex aspect-square cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 transition-colors hover:border-[#13ec13] dark:border-gray-600">
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
                            onChange={(e) => handleChange('title', e.target.value)}
                            placeholder="Enter product title"
                            required
                        />
                        <FormError error={errors.title} />
                    </div>

                    {/* Category */}
                    <div>
                        <Label htmlFor="category">Category *</Label>
                        <Select value={data.category} onValueChange={(value) => handleChange('category', value)}>
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
                            <Label htmlFor="price">Price (GH₵) *</Label>
                            <Input
                                id="price"
                                type="number"
                                step="0.01"
                                min="0"
                                value={data.price}
                                onChange={(e) => handleChange('price', e.target.value)}
                                placeholder="0.00"
                                required
                            />
                            <FormError error={errors.price} />
                        </div>
                        <div>
                            <Label htmlFor="price_type">Price Type</Label>
                            <Input
                                id="price_type"
                                value={data.price_type}
                                onChange={(e) => handleChange('price_type', e.target.value)}
                                placeholder="e.g., /kg, /bunch"
                            />
                        </div>
                    </div>

                    {/* Condition */}
                    <div>
                        <Label htmlFor="condition">Condition</Label>
                        <Select value={data.condition} onValueChange={(value) => handleChange('condition', value)}>
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
                            onChange={(e) => handleChange('location', e.target.value)}
                            placeholder="Enter location"
                            required
                        />
                        <FormError error={errors.location} />
                    </div>

                    {/* Description */}
                    <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={data.description}
                            onChange={(e) => handleChange('description', e.target.value)}
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
                            onChange={(e) => handleChange('delivery_available', e.target.checked)}
                            className="h-4 w-4 rounded border-gray-300"
                        />
                        <Label htmlFor="delivery_available" className="cursor-pointer">
                            Delivery Available
                        </Label>
                    </div>

                    {/* Warranty */}
                    <div>
                        <Label htmlFor="warranty">Warranty</Label>
                        <Input
                            id="warranty"
                            value={data.warranty}
                            onChange={(e) => handleChange('warranty', e.target.value)}
                            placeholder="e.g., 1 year warranty"
                        />
                    </div>

                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={handleClose} disabled={processing}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing} className="bg-[#13ec13] text-[#0d1b0d] hover:bg-[#0eb50e]">
                            {processing ? 'Adding...' : 'Add Product'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

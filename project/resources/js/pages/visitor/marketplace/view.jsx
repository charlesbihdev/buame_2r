import VisitorLayout from '@/layouts/visitor/visitor-layout';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Phone, Mail, MessageCircle, MapPin, Star, Package, Truck, ChevronLeft, ChevronRight, Store, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function MarketplaceView({ product }) {
    if (!product) {
        return (
            <VisitorLayout>
                <Head title="Product Not Found | BUAME 2R Marketplace" />
                <div className="mx-auto max-w-6xl px-4 py-8 md:px-8">
                    <div className="rounded-xl border border-gray-200 bg-white p-12 text-center dark:border-gray-800 dark:bg-[#162816]">
                        <p className="text-lg text-gray-600 dark:text-gray-400">Product not found.</p>
                        <Link
                            href="/marketplace"
                            className="mt-4 inline-block rounded-lg bg-[#13ec13] px-6 py-2 font-bold text-[#0d1b0d] transition-colors hover:bg-[#0fdc0f]"
                        >
                            Back to Marketplace
                        </Link>
                    </div>
                </div>
            </VisitorLayout>
        );
    }

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = product.images && product.images.length > 0 ? product.images : [product.primary_image];
    const currentImage = images[currentImageIndex] || product.primary_image;

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const whatsappUrl = product.whatsapp_url || (product.whatsapp ? `https://wa.me/${product.whatsapp.replace(/\D/g, '')}?text=Hello, I'm interested in buying ${product.title}.` : null);

    return (
        <VisitorLayout>
            <Head title={`${product.title} | BUAME 2R Marketplace`} />
            <div className="mx-auto max-w-6xl px-4 py-8 md:px-8">
                <Link
                    href="/marketplace"
                    className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition-colors hover:text-[#13ec13] dark:text-gray-400"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Marketplace
                </Link>

                <div className="grid gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        {/* Image Gallery */}
                        <div className="relative mb-6 h-96 overflow-hidden rounded-xl bg-gray-200">
                            <div
                                className="h-full w-full bg-cover bg-center transition-transform duration-300"
                                style={{
                                    backgroundImage: `url(${currentImage})`,
                                }}
                            />
                            {images.length > 1 && (
                                <>
                                    <button
                                        onClick={prevImage}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
                                    >
                                        <ChevronLeft className="h-6 w-6" />
                                    </button>
                                    <button
                                        onClick={nextImage}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
                                    >
                                        <ChevronRight className="h-6 w-6" />
                                    </button>
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                        {images.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setCurrentImageIndex(index)}
                                                className={`h-2 rounded-full transition-all ${
                                                    index === currentImageIndex ? 'w-8 bg-white' : 'w-2 bg-white/50'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Header */}
                        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[#162816]">
                            <div className="mb-4">
                                <div className="mb-2 flex items-center gap-2">
                                    <span className="rounded-full bg-[#13ec13]/20 px-3 py-1 text-sm font-semibold text-[#0d1b0d] dark:text-[#13ec13]">
                                        {product.category}
                                    </span>
                                    {product.condition && (
                                        <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                                            {product.condition}
                                        </span>
                                    )}
                                </div>
                                <h1 className="mb-3 text-3xl font-bold text-[#0d1b0d] dark:text-white">{product.title}</h1>
                                <div className="flex flex-wrap items-center gap-4">
                                    {(product.rating > 0 || product.reviews > 0) && (
                                        <div className="flex items-center gap-1">
                                            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                            <span className="font-bold">{product.rating || 0}</span>
                                            <span className="text-gray-500">({product.reviews || 0} reviews)</span>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                                        <MapPin className="h-5 w-5" />
                                        {product.location}
                                    </div>
                                    {product.store && product.store.is_active && (
                                        <Link
                                            href={`/store/${product.store.slug}`}
                                            className="group flex items-center gap-1.5 rounded-full bg-[#13ec13]/10 px-3 py-1.5 text-sm font-semibold text-[#13ec13] transition-colors hover:bg-[#13ec13]/20 dark:bg-[#13ec13]/20"
                                        >
                                            <Store className="h-4 w-4" />
                                            <span>{product.store.name}</span>
                                            <ExternalLink className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[#162816]">
                            <h2 className="mb-3 text-xl font-bold text-[#0d1b0d] dark:text-white">Description</h2>
                            <p className="mb-4 whitespace-pre-wrap text-gray-700 dark:text-gray-300">{product.description || 'No description available.'}</p>
                            
                            {product.specifications && product.specifications.length > 0 && (
                                <div className="mb-4">
                                    <h3 className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Specifications</h3>
                                    <ul className="list-disc space-y-1 pl-5 text-sm text-gray-600 dark:text-gray-400">
                                        {product.specifications.map((spec, idx) => (
                                            <li key={idx}>{spec}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Delivery & Warranty */}
                        {(product.delivery_available || product.warranty) && (
                            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[#162816]">
                                <h2 className="mb-4 text-xl font-bold text-[#0d1b0d] dark:text-white">Additional Information</h2>
                                <div className="space-y-3">
                                    {product.delivery_available && (
                                        <div className="flex items-center gap-3">
                                            <Truck className="h-5 w-5 text-[#13ec13]" />
                                            <div>
                                                <div className="text-sm text-gray-600 dark:text-gray-400">Delivery</div>
                                                <div className="font-semibold text-[#0d1b0d] dark:text-white">Available</div>
                                            </div>
                                        </div>
                                    )}
                                    {product.warranty && (
                                        <div className="flex items-center gap-3">
                                            <Package className="h-5 w-5 text-[#13ec13]" />
                                            <div>
                                                <div className="text-sm text-gray-600 dark:text-gray-400">Warranty</div>
                                                <div className="font-semibold text-[#0d1b0d] dark:text-white">{product.warranty}</div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8 space-y-6">
                            {/* Store Card */}
                            {product.store && product.store.is_active && (
                                <div className="rounded-xl border border-[#13ec13]/20 bg-[#13ec13]/5 p-5 dark:border-[#13ec13]/30 dark:bg-[#13ec13]/10">
                                    <div className="mb-2 flex items-center gap-2">
                                        <Store className="h-5 w-5 text-[#13ec13]" />
                                        <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">Sold by</span>
                                    </div>
                                    <Link
                                        href={`/store/${product.store.slug}`}
                                        className="group mb-2 block"
                                    >
                                        <h3 className="text-lg font-bold text-[#0d1b0d] transition-colors group-hover:text-[#13ec13] dark:text-white">
                                            {product.store.name}
                                            <ExternalLink className="ml-1.5 inline h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                                        </h3>
                                    </Link>
                                    {product.store.description && (
                                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                                            {product.store.description}
                                        </p>
                                    )}
                                    <Link
                                        href={`/store/${product.store.slug}`}
                                        className="mt-3 inline-block text-sm font-semibold text-[#13ec13] transition-colors hover:text-[#0fdc0f] hover:underline"
                                    >
                                        View Store →
                                    </Link>
                                </div>
                            )}

                            {/* Pricing */}
                            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[#162816]">
                                <div className="mb-2 text-sm text-gray-600 dark:text-gray-400">Price</div>
                                <div className="mb-4 text-3xl font-black text-[#0d1b0d] dark:text-[#13ec13]">{product.price}</div>
                            </div>

                            {/* Contact */}
                            {(product.phone || product.email || whatsappUrl) && (
                                <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[#162816]">
                                    <h3 className="mb-4 text-lg font-bold text-[#0d1b0d] dark:text-white">Contact Seller</h3>
                                    <div className="space-y-3">
                                        {product.phone && (
                                            <a
                                                href={`tel:${product.phone}`}
                                                className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 transition-colors hover:bg-[#13ec13]/10 hover:border-[#13ec13] dark:border-gray-700 dark:bg-gray-800"
                                            >
                                                <Phone className="h-5 w-5 text-[#13ec13]" />
                                                <span className="font-semibold text-[#0d1b0d] dark:text-white">{product.phone}</span>
                                            </a>
                                        )}
                                        {whatsappUrl && (
                                            <a
                                                href={whatsappUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 transition-colors hover:bg-[#13ec13]/10 hover:border-[#13ec13] dark:border-gray-700 dark:bg-gray-800"
                                            >
                                                <MessageCircle className="h-5 w-5 text-[#13ec13]" />
                                                <span className="font-semibold text-[#0d1b0d] dark:text-white">WhatsApp</span>
                                            </a>
                                        )}
                                        {product.email && (
                                            <a
                                                href={`mailto:${product.email}`}
                                                className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 transition-colors hover:bg-[#13ec13]/10 hover:border-[#13ec13] dark:border-gray-700 dark:bg-gray-800"
                                            >
                                                <Mail className="h-5 w-5 text-[#13ec13]" />
                                                <span className="font-semibold text-[#0d1b0d] dark:text-white">{product.email}</span>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="space-y-3">
                                {whatsappUrl && (
                                    <Button
                                        asChild
                                        className="w-full bg-[#13ec13] text-[#0d1b0d] hover:bg-[#0fdc0f]"
                                    >
                                        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                                            <MessageCircle className="mr-2 h-5 w-5" />
                                            Contact via WhatsApp
                                        </a>
                                    </Button>
                                )}
                                {product.phone && (
                                    <Button
                                        asChild
                                        variant="outline"
                                        className="w-full border-[#13ec13] text-[#13ec13] hover:bg-[#13ec13] hover:text-[#0d1b0d]"
                                    >
                                        <a href={`tel:${product.phone}`}>
                                            <Phone className="mr-2 h-5 w-5" />
                                            Call Seller
                                        </a>
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </VisitorLayout>
    );
}



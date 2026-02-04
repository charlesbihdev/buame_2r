import VisitorLayout from '@/layouts/visitor/visitor-layout';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Phone, Mail, MessageCircle, MapPin, Star, Package, Truck, ChevronLeft, ChevronRight, Store, ExternalLink, X, ZoomIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ReviewSection } from '@/components/ui/review-section';
import { CautionBanner } from '@/components/ui/caution-banner';
import { useState } from 'react';

export default function MarketplaceView({ product, reviews = [], average_rating = 0, reviews_count = 0, rating_breakdown = {} }) {
    if (!product) {
        return (
            <VisitorLayout>
                <Head title="Product Not Found">
                    <meta name="robots" content="noindex, nofollow" />
                </Head>
                <div className="mx-auto max-w-6xl px-4 py-8 md:px-8">
                    <div className="rounded-xl border border-gray-200 bg-white p-12 text-center dark:border-gray-800 dark:bg-[var(--card)]">
                        <p className="text-lg text-gray-600 dark:text-gray-400">Product not found.</p>
                        <Link
                            href="/marketplace"
                            className="mt-4 inline-block rounded-lg bg-[var(--primary)] px-6 py-2 font-bold text-white transition-colors hover:bg-[var(--primary)]"
                        >
                            Back to Marketplace
                        </Link>
                    </div>
                </div>
            </VisitorLayout>
        );
    }

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const images = product.images && product.images.length > 0 ? product.images : [product.primary_image];
    const currentImage = images[currentImageIndex] || product.primary_image;

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    const openLightbox = (index) => {
        setCurrentImageIndex(index);
        setLightboxOpen(true);
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
    };

    const whatsappUrl = product.whatsapp_url || (product.whatsapp ? `https://wa.me/${product.whatsapp.replace(/\D/g, '')}?text=Hello, I'm interested in buying ${product.title}.` : null);

    const productDescription = product.description ? product.description.substring(0, 150) : `${product.title} available for ${product.price || 'negotiable price'}`;

    return (
        <VisitorLayout>
            <Head title={`${product.title} | Marketplace`}>
                <meta name="description" content={`${product.title} - ${product.price || 'Contact for price'}. ${productDescription}${productDescription.length >= 150 ? '...' : ''} Located in ${product.location}.`} />
                <meta name="keywords" content={`${product.title}, ${product.category}, buy ${product.title}, ${product.location}, 2RBUAME marketplace`} />
                <meta property="og:title" content={`${product.title} | 2RBUAME Marketplace`} />
                <meta property="og:description" content={`${product.title} - ${product.price || 'Contact for price'}. Shop now on 2RBUAME.`} />
                <meta property="og:type" content="product" />
                {product.primary_image && <meta property="og:image" content={product.primary_image} />}
                <meta name="twitter:title" content={`${product.title} | 2RBUAME Marketplace`} />
                <meta name="twitter:description" content={`${product.title} - ${product.price || 'Contact for price'}. Shop now on 2RBUAME.`} />
                {product.primary_image && <meta name="twitter:image" content={product.primary_image} />}
            </Head>
            <div className="mx-auto max-w-6xl px-4 py-8 md:px-8">
                <Link
                    href="/marketplace"
                    className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition-colors hover:text-[var(--primary)] dark:text-gray-400"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Marketplace
                </Link>

                {/* Caution Banner */}
                <CautionBanner type="product" className="mb-8" />

                <div className="grid gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        {/* Image Gallery */}
                        <div className="mb-6">
                            {/* Primary Image */}
                            <button
                                onClick={() => openLightbox(currentImageIndex)}
                                className="group relative mb-4 aspect-[4/3] w-full overflow-hidden rounded-xl bg-gray-200 dark:bg-gray-800"
                            >
                                <img
                                    src={currentImage}
                                    alt={product.title}
                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/30">
                                    <ZoomIn className="h-10 w-10 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                </div>
                            </button>

                            {/* Thumbnail Grid */}
                            {images.length > 1 && (
                                <div className="grid grid-cols-4 gap-2 sm:grid-cols-5 md:grid-cols-6">
                                    {images.map((image, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentImageIndex(index)}
                                            className={`group relative aspect-square overflow-hidden rounded-lg bg-gray-100 transition-all dark:bg-gray-800 ${
                                                index === currentImageIndex
                                                    ? 'ring-2 ring-[var(--primary)] ring-offset-2'
                                                    : 'hover:ring-2 hover:ring-gray-300 hover:ring-offset-1'
                                            }`}
                                        >
                                            <img
                                                src={image}
                                                alt={`${product.title} - Image ${index + 1}`}
                                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                            />
                                            {index !== currentImageIndex && (
                                                <div className="absolute inset-0 bg-black/0 transition-all group-hover:bg-black/20" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Header */}
                        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[var(--card)]">
                            <div className="mb-4">
                                <div className="mb-2 flex items-center gap-2">
                                    <span className="rounded-full bg-[var(--primary)]/20 px-3 py-1 text-sm font-semibold text-white dark:text-[var(--primary)]">
                                        {product.category}
                                    </span>
                                    {product.condition && (
                                        <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                                            {product.condition}
                                        </span>
                                    )}
                                </div>
                                <h1 className="mb-3 text-3xl font-bold text-[var(--foreground)] dark:text-white">{product.title}</h1>
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
                                            className="group flex items-center gap-1.5 rounded-full bg-[var(--primary)]/10 px-3 py-1.5 text-sm font-semibold text-[var(--primary)] transition-colors hover:bg-[var(--primary)]/20 dark:bg-[var(--primary)]/20"
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
                        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[var(--card)]">
                            <h2 className="mb-3 text-xl font-bold text-[var(--foreground)] dark:text-white">Description</h2>
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
                            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[var(--card)]">
                                <h2 className="mb-4 text-xl font-bold text-[var(--foreground)] dark:text-white">Additional Information</h2>
                                <div className="space-y-3">
                                    {product.delivery_available && (
                                        <div className="flex items-center gap-3">
                                            <Truck className="h-5 w-5 text-[var(--primary)]" />
                                            <div>
                                                <div className="text-sm text-gray-600 dark:text-gray-400">Delivery</div>
                                                <div className="font-semibold text-[var(--foreground)] dark:text-white">Available</div>
                                            </div>
                                        </div>
                                    )}
                                    {product.warranty && (
                                        <div className="flex items-center gap-3">
                                            <Package className="h-5 w-5 text-[var(--primary)]" />
                                            <div>
                                                <div className="text-sm text-gray-600 dark:text-gray-400">Warranty</div>
                                                <div className="font-semibold text-[var(--foreground)] dark:text-white">{product.warranty}</div>
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
                                <div className="rounded-xl border border-[var(--primary)]/20 bg-[var(--primary)]/5 p-5 dark:border-[var(--primary)]/30 dark:bg-[var(--primary)]/10">
                                    <div className="mb-2 flex items-center gap-2">
                                        <Store className="h-5 w-5 text-[var(--primary)]" />
                                        <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">Sold by</span>
                                    </div>
                                    <Link
                                        href={`/store/${product.store.slug}`}
                                        className="group mb-2 block"
                                    >
                                        <h3 className="text-lg font-bold text-[var(--foreground)] transition-colors group-hover:text-[var(--primary)] dark:text-white">
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
                                        className="mt-3 inline-block text-sm font-semibold text-[var(--primary)] transition-colors hover:text-[var(--primary)] hover:underline"
                                    >
                                        View Store →
                                    </Link>
                                </div>
                            )}

                            {/* Pricing */}
                            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[var(--card)]">
                                <div className="mb-2 text-sm text-gray-600 dark:text-gray-400">Price</div>
                                <div className="mb-4 text-3xl font-black text-[var(--foreground)] dark:text-[var(--primary)]">
                                    {product.price || 'Contact for price'}
                                </div>
                            </div>

                            {/* Contact */}
                            {(product.phone || product.email || whatsappUrl) && (
                                <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[var(--card)]">
                                    <h3 className="mb-4 text-lg font-bold text-[var(--foreground)] dark:text-white">Contact Seller</h3>
                                    <div className="space-y-3">
                                        {product.phone && (
                                            <a
                                                href={`tel:${product.phone}`}
                                                className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 transition-colors hover:bg-[var(--primary)]/10 hover:border-[var(--primary)] dark:border-gray-700 dark:bg-gray-800"
                                            >
                                                <Phone className="h-5 w-5 text-[var(--primary)]" />
                                                <span className="font-semibold text-[var(--foreground)] dark:text-white">{product.phone}</span>
                                            </a>
                                        )}
                                        {whatsappUrl && (
                                            <a
                                                href={whatsappUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 transition-colors hover:bg-[var(--primary)]/10 hover:border-[var(--primary)] dark:border-gray-700 dark:bg-gray-800"
                                            >
                                                <MessageCircle className="h-5 w-5 text-[var(--primary)]" />
                                                <span className="font-semibold text-[var(--foreground)] dark:text-white">WhatsApp</span>
                                            </a>
                                        )}
                                        {product.email && (
                                            <a
                                                href={`mailto:${product.email}`}
                                                className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 transition-colors hover:bg-[var(--primary)]/10 hover:border-[var(--primary)] dark:border-gray-700 dark:bg-gray-800"
                                            >
                                                <Mail className="h-5 w-5 text-[var(--primary)]" />
                                                <span className="font-semibold text-[var(--foreground)] dark:text-white">{product.email}</span>
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
                                        className="w-full bg-[var(--primary)] text-white hover:bg-[var(--primary)]"
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
                                        className="w-full border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white"
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

                {/* Reviews Section */}
                <ReviewSection
                    reviewableType="marketplace"
                    reviewableId={product.id}
                    reviews={reviews}
                    averageRating={average_rating}
                    reviewsCount={reviews_count}
                    ratingBreakdown={rating_breakdown}
                />
            </div>

            {/* Lightbox/Zoom Modal */}
            {lightboxOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4">
                    {/* Close Button */}
                    <button
                        onClick={closeLightbox}
                        className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                    >
                        <X className="h-6 w-6" />
                    </button>

                    {/* Previous Button */}
                    {images.length > 1 && (
                        <button
                            onClick={prevImage}
                            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                        >
                            <ChevronLeft className="h-6 w-6" />
                        </button>
                    )}

                    {/* Main Image */}
                    <div className="relative max-h-[85vh] max-w-5xl">
                        <img
                            src={currentImage}
                            alt={product.title}
                            className="max-h-[85vh] w-full rounded-lg object-contain"
                        />

                        {/* Image Counter */}
                        <div className="mt-4 text-center">
                            <p className="text-lg font-semibold text-white">{product.title}</p>
                            <p className="mt-1 text-sm text-gray-400">
                                {currentImageIndex + 1} / {images.length}
                            </p>
                        </div>
                    </div>

                    {/* Next Button */}
                    {images.length > 1 && (
                        <button
                            onClick={nextImage}
                            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                        >
                            <ChevronRight className="h-6 w-6" />
                        </button>
                    )}

                    {/* Thumbnail Navigation */}
                    {images.length > 1 && (
                        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-black/50 p-2 backdrop-blur-sm">
                            {images.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentImageIndex(index)}
                                    className={`h-2 w-2 rounded-full transition-all ${
                                        index === currentImageIndex ? 'w-8 bg-[var(--primary)]' : 'bg-white/50 hover:bg-white/75'
                                    }`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            )}
        </VisitorLayout>
    );
}

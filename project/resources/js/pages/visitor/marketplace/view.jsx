import VisitorLayout from '@/layouts/visitor/visitor-layout';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Phone, Mail, MessageCircle, MapPin, Star, Package, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function MarketplaceView({ product }) {
    const productData = product || {
        id: 1,
        name: 'Samsung Galaxy S21',
        category: 'Electronics',
        price: 1200,
        condition: 'Like New',
        location: 'Sefwi Bekwai',
        rating: 4.7,
        reviews: 23,
        phone: '+233 24 123 4567',
        whatsapp: '+233241234567',
        email: 'seller@example.com',
        description: 'Samsung Galaxy S21 in excellent condition. Bought 6 months ago, comes with original box, charger, and screen protector. No scratches or damages.',
        specifications: [
            '128GB Storage',
            '8GB RAM',
            '6.2" Display',
            'Triple Camera System',
        ],
        delivery: 'Available',
        warranty: '3 months seller warranty',
    };

    const whatsappUrl = `https://wa.me/${productData.whatsapp.replace(/\D/g, '')}?text=Hello, I'm interested in buying ${productData.name}.`;

    return (
        <VisitorLayout>
            <Head title={`${productData.name} | BUAME 2R Marketplace`} />
            
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
                        {/* Image */}
                        <div className="mb-6 h-96 overflow-hidden rounded-xl bg-gray-200">
                            <div
                                className="h-full w-full bg-cover bg-center"
                                style={{
                                    backgroundImage:
                                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAg78sW3lyp6Wao4ZLItpAE1qlyXEQnJFeqXp_mXmXcaR9trXYm3pOWoEuYZEoBhysEpiOUUTQjBHc1fwvEnefYzIu2tQ230a4AEi8PYO4NLbBBMq5Lf1k8dNgJR2A-Nd0dVXasUuGJ0sK5DDztEacT0gxOvbKUP4C_D9oAJAT00bK_TgTLhzwZLGTEwn4uoxjK3o1QRUm8I3BgFInzlxSVVUr5W9OWnk4zPCZp8nlf59wX6TXtSXcMy3c158nDXNNV1dNZQbreWUA")',
                                }}
                            />
                        </div>

                        {/* Header */}
                        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[#162816]">
                            <div className="mb-4">
                                <div className="mb-2 flex items-center gap-2">
                                    <span className="rounded-full bg-[#13ec13]/20 px-3 py-1 text-sm font-semibold text-[#0d1b0d] dark:text-[#13ec13]">
                                        {productData.category}
                                    </span>
                                    <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                                        {productData.condition}
                                    </span>
                                </div>
                                <h1 className="mb-3 text-3xl font-bold text-[#0d1b0d] dark:text-white">{productData.name}</h1>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-1">
                                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                        <span className="font-bold">{productData.rating}</span>
                                        <span className="text-gray-500">({productData.reviews} reviews)</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                                        <MapPin className="h-5 w-5" />
                                        {productData.location}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[#162816]">
                            <h2 className="mb-3 text-xl font-bold text-[#0d1b0d] dark:text-white">Description</h2>
                            <p className="mb-4 text-gray-700 dark:text-gray-300">{productData.description}</p>
                            
                            <div className="mb-4">
                                <h3 className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">Specifications</h3>
                                <ul className="list-disc space-y-1 pl-5 text-sm text-gray-600 dark:text-gray-400">
                                    {productData.specifications.map((spec, idx) => (
                                        <li key={idx}>{spec}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Delivery & Warranty */}
                        <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[#162816]">
                            <h2 className="mb-4 text-xl font-bold text-[#0d1b0d] dark:text-white">Additional Information</h2>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <Truck className="h-5 w-5 text-[#13ec13]" />
                                    <div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">Delivery</div>
                                        <div className="font-semibold text-[#0d1b0d] dark:text-white">{productData.delivery}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Package className="h-5 w-5 text-[#13ec13]" />
                                    <div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">Warranty</div>
                                        <div className="font-semibold text-[#0d1b0d] dark:text-white">{productData.warranty}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8 space-y-6">
                            {/* Pricing */}
                            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[#162816]">
                                <div className="mb-2 text-sm text-gray-600 dark:text-gray-400">Price</div>
                                <div className="mb-4 text-3xl font-black text-[#0d1b0d] dark:text-[#13ec13]">₵{productData.price}</div>
                            </div>

                            {/* Contact */}
                            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[#162816]">
                                <h3 className="mb-4 text-lg font-bold text-[#0d1b0d] dark:text-white">Contact Seller</h3>
                                <div className="space-y-3">
                                    <a
                                        href={`tel:${productData.phone}`}
                                        className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 transition-colors hover:bg-[#13ec13]/10 hover:border-[#13ec13] dark:border-gray-700 dark:bg-gray-800"
                                    >
                                        <Phone className="h-5 w-5 text-[#13ec13]" />
                                        <span className="font-semibold text-[#0d1b0d] dark:text-white">{productData.phone}</span>
                                    </a>
                                    <a
                                        href={whatsappUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 transition-colors hover:bg-[#13ec13]/10 hover:border-[#13ec13] dark:border-gray-700 dark:bg-gray-800"
                                    >
                                        <MessageCircle className="h-5 w-5 text-[#13ec13]" />
                                        <span className="font-semibold text-[#0d1b0d] dark:text-white">WhatsApp</span>
                                    </a>
                                    <a
                                        href={`mailto:${productData.email}`}
                                        className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 transition-colors hover:bg-[#13ec13]/10 hover:border-[#13ec13] dark:border-gray-700 dark:bg-gray-800"
                                    >
                                        <Mail className="h-5 w-5 text-[#13ec13]" />
                                        <span className="font-semibold text-[#0d1b0d] dark:text-white">{productData.email}</span>
                                    </a>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-3">
                                <Button
                                    asChild
                                    className="w-full bg-[#13ec13] text-[#0d1b0d] hover:bg-[#0fdc0f]"
                                >
                                    <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                                        <MessageCircle className="mr-2 h-5 w-5" />
                                        Contact via WhatsApp
                                    </a>
                                </Button>
                                <Button
                                    asChild
                                    variant="outline"
                                    className="w-full border-[#13ec13] text-[#13ec13] hover:bg-[#13ec13] hover:text-[#0d1b0d]"
                                >
                                    <a href={`tel:${productData.phone}`}>
                                        <Phone className="mr-2 h-5 w-5" />
                                        Call Seller
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </VisitorLayout>
    );
}



import { Button } from '@/components/ui/button';
import { Phone, Mail, MessageCircle, Globe, MapPin, CheckCircle, Share2, Star, Briefcase } from 'lucide-react';

export function EmployerProfileHero({
    poster,
    jobCount = 0,
    averageRating = 0,
    reviewsCount = 0,
    onShare
}) {
    const whatsappUrl = poster.whatsapp
        ? `https://wa.me/${poster.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(`Hello, I'm interested in jobs posted by ${poster.name}.`)}`
        : poster.phone
          ? `https://wa.me/${poster.phone.replace(/\D/g, '')}?text=${encodeURIComponent(`Hello, I'm interested in jobs posted by ${poster.name}.`)}`
          : null;

    const contactActions = [
        poster.phone && {
            icon: Phone,
            label: 'Call',
            href: `tel:${poster.phone}`,
            value: poster.phone,
        },
        poster.email && {
            icon: Mail,
            label: 'Email',
            href: `mailto:${poster.email}`,
            value: poster.email,
        },
        whatsappUrl && {
            icon: MessageCircle,
            label: 'WhatsApp',
            href: whatsappUrl,
            value: 'Chat',
            external: true,
        },
        poster.website && {
            icon: Globe,
            label: 'Website',
            href: poster.website,
            value: 'Visit',
            external: true,
        },
    ].filter(Boolean);

    return (
        <div className="relative overflow-hidden bg-gradient-to-br from-[var(--primary)]/10 via-white to-[var(--primary)]/5 dark:from-[var(--primary)]/20 dark:via-[var(--card)] dark:to-[var(--primary)]/10">
            {/* Decorative Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
                <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-[var(--primary)]"></div>
                <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-[var(--primary)]"></div>
            </div>

            <div className="relative mx-auto max-w-7xl px-4 py-6 md:px-8 md:py-8">
                <div className="grid gap-8 lg:grid-cols-3 lg:gap-12">
                    {/* Left: Logo & Info */}
                    <div className="lg:col-span-2">
                        <div className="flex flex-col gap-6 md:flex-row md:items-start">
                            {/* Logo */}
                            {poster.logo && (
                                <div className="relative flex-shrink-0">
                                    <div className="relative h-32 w-32 overflow-hidden rounded-2xl bg-white shadow-xl ring-4 ring-white/50 dark:bg-gray-800 dark:ring-gray-700/50 md:h-40 md:w-40">
                                        <img
                                            src={poster.logo}
                                            alt={poster.name}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    {poster.is_verified && (
                                        <div className="absolute -bottom-2 -right-2 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--primary)] shadow-lg ring-4 ring-white dark:ring-[var(--card)]">
                                            <CheckCircle className="h-6 w-6 text-white" />
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Info */}
                            <div className="flex-1 space-y-4">
                                {/* Title & Verification */}
                                <div className="space-y-2">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <h1 className="text-3xl font-black text-[var(--foreground)] dark:text-white md:text-4xl lg:text-5xl">
                                            {poster.name}
                                        </h1>
                                        {poster.is_verified && (
                                            <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--primary)]/10 px-3 py-1 text-sm font-bold text-[var(--primary)]">
                                                <CheckCircle className="h-4 w-4" />
                                                Verified
                                            </span>
                                        )}
                                    </div>
                                    {poster.location && (
                                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                            <MapPin className="h-5 w-5" />
                                            <span className="text-lg font-medium">{poster.location}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Description */}
                                {poster.description && (
                                    <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 md:text-lg">
                                        {poster.description}
                                    </p>
                                )}

                                {/* Stats */}
                                <div className="flex flex-wrap items-center gap-6 text-sm md:text-base">
                                    <div className="flex items-center gap-2">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--primary)]/10">
                                            <Briefcase className="h-5 w-5 text-[var(--primary)]" />
                                        </div>
                                        <div>
                                            <div className="text-2xl font-black text-[var(--foreground)] dark:text-white">
                                                {jobCount}
                                            </div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                                {jobCount === 1 ? 'Job' : 'Jobs'} Posted
                                            </div>
                                        </div>
                                    </div>

                                    {reviewsCount > 0 && (
                                        <div className="flex items-center gap-2">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-400/10">
                                                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                            </div>
                                            <div>
                                                <div className="text-2xl font-black text-[var(--foreground)] dark:text-white">
                                                    {averageRating.toFixed(1)}
                                                </div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                                    {reviewsCount} {reviewsCount === 1 ? 'Review' : 'Reviews'}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Contact Actions */}
                    <div className="space-y-4">
                        {/* Share Button */}
                        {onShare && (
                            <Button
                                onClick={onShare}
                                variant="outline"
                                className="w-full border-2 border-[var(--primary)]/20 bg-white/80 font-semibold hover:border-[var(--primary)] hover:bg-[var(--primary)]/5 dark:bg-gray-800/80"
                            >
                                <Share2 className="mr-2 h-5 w-5" />
                                Share Profile
                            </Button>
                        )}

                        {/* Contact Actions */}
                        {contactActions.length > 0 && (
                            <div className="space-y-3">
                                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider dark:text-gray-400">
                                    Contact Employer
                                </h3>
                                <div className="grid gap-2">
                                    {contactActions.map((action, index) => {
                                        const Icon = action.icon;
                                        return (
                                            <a
                                                key={index}
                                                href={action.href}
                                                target={action.external ? '_blank' : undefined}
                                                rel={action.external ? 'noopener noreferrer' : undefined}
                                                className="group flex items-center gap-3 rounded-xl border-2 border-gray-200 bg-white/80 p-4 transition-all hover:border-[var(--primary)] hover:bg-[var(--primary)]/5 hover:shadow-md dark:border-gray-700 dark:bg-gray-800/80 dark:hover:border-[var(--primary)]"
                                            >
                                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--primary)]/10 transition-colors group-hover:bg-[var(--primary)]/20">
                                                    <Icon className="h-6 w-6 text-[var(--primary)]" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                                                        {action.label}
                                                    </div>
                                                    <div className="font-bold text-[var(--foreground)] dark:text-white">
                                                        {action.value}
                                                    </div>
                                                </div>
                                            </a>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

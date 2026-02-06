import { Button } from '@/components/ui/button';
import { BadgeCheck, Briefcase, MapPin, Phone, Star } from 'lucide-react';
import { Link } from '@inertiajs/react';

// Helper function to format skill type for display
const formatSkillType = (skillType) => {
    const skillTypeLabels = {
        carpenter: 'Carpenter',
        mason: 'Mason',
        electrician: 'Electrician',
        plumber: 'Plumber',
        tiler: 'Tiler',
        tailor: 'Tailor',
        welder: 'Welder',
        painter: 'Painter',
        hairdressing: 'Hairdressing',
        mechanic: 'Mechanic',
        bakery: 'Bakery',
        decoration: 'Decoration',
        makeup_artistry: 'Makeup Artistry',
        bead_making: 'Bead Making',
        shoe_making: 'Shoe Making',
        event_mc: 'Event MC',
        event_planners: 'Event Planners',
        graphics_designer: 'Graphics Designer',
        radio_presenter: 'Radio Presenter',
        drivers: 'Drivers',
        borehole_drillers: 'Borehole Drillers',
        printer_repairers: 'Printer Repairers',
        tv_decoder_repairers: 'TV & Decoder Repairers',
        air_conditioning_installers: 'Air-Conditioning Installers',
        multi_tv_dstv_installers: 'Multi TV, DStv Installers',
        phone_repairers: 'Phone Repairers',
        other: 'Other',
    };
    return skillTypeLabels[skillType] || skillType?.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) || 'Artisan';
};

export function ArtisanCard({ artisan }) {
    return (
        <Link
            href={`/artisans/${artisan.id}`}
            className="group flex flex-col rounded-xl border-2 border-border bg-card p-5 transition-all hover:border-primary/50 hover:shadow-lg"
        >
            {/* Profile Image */}
            <div className="relative mb-4 h-40 w-full overflow-hidden rounded-xl bg-muted">
                {artisan.profile_image ? (
                    <div
                        className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                        style={{
                            backgroundImage: `url("${artisan.profile_image}")`,
                        }}
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                        <span className="text-4xl font-bold text-primary">{artisan.name.charAt(0).toUpperCase()}</span>
                    </div>
                )}
                {/* Skill Type Badge - Top Left */}
                {artisan.skill_type && (
                    <div className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-[var(--primary)] px-2 py-1 text-xs font-bold text-white">
                        <Briefcase className="h-3 w-3" />
                        {formatSkillType(artisan.skill_type)}
                    </div>
                )}
                {/* Available Badge - Top Right */}
                {artisan.is_available && (
                    <div className="absolute right-2 top-2 rounded-full bg-green-500 px-2 py-1 text-xs font-bold text-white">Available</div>
                )}
                {artisan.is_verified && (
                    <div className="absolute bottom-2 right-2">
                        <BadgeCheck className="h-5 w-5 fill-primary text-white" />
                    </div>
                )}
            </div>

            {/* Details */}
            <div className="flex flex-1 flex-col">
                <div className="mb-2">
                    <h3 className="text-lg font-bold text-foreground">{artisan.name}</h3>
                    {artisan.company_name && <p className="text-sm font-medium text-primary">{artisan.company_name}</p>}
                </div>

                <div className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-secondary text-secondary" />
                        <span className="font-bold">{artisan.rating}</span>
                        <span className="text-muted-foreground">({artisan.reviews_count})</span>
                    </div>
                </div>

                <div className="mb-3 flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {artisan.location}
                </div>

                {artisan.specialties && artisan.specialties.length > 0 && (
                    <div className="mb-3 flex flex-wrap gap-1">
                        {artisan.specialties.map((spec, idx) => (
                            <span key={idx} className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-semibold text-foreground">
                                {spec}
                            </span>
                        ))}
                    </div>
                )}

                <div className="mt-auto space-y-2 border-t border-border pt-3">
                    <div className="flex items-center justify-between">
                        {artisan.show_price && artisan.price_per_day ? (
                            <div>
                                <div className="text-xl font-black text-primary">GH₵{artisan.price_per_day}</div>
                                <div className="text-xs text-muted-foreground">/day</div>
                            </div>
                        ) : (
                            <div className="text-sm text-muted-foreground">Contact for pricing</div>
                        )}
                        {artisan.experience_years && <div className="text-xs text-muted-foreground">{artisan.experience_years} years</div>}
                    </div>
                    <div className="flex gap-2">
                        <Button asChild variant="outline" className="flex-1 border-primary text-xs text-primary hover:bg-primary hover:text-primary-foreground">
                            <Link href={`/artisans/${artisan.id}`}>View</Link>
                        </Button>
                        {artisan.phone && (
                            <Button asChild className="bg-primary text-xs text-primary-foreground hover:bg-primary/90">
                                <a href={`tel:${artisan.phone}`}>
                                    <Phone className="h-3 w-3" />
                                </a>
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
}

import { HotelGallery } from './HotelGallery';
import { HotelProfile } from './HotelProfile';
import { HotelSettings } from './HotelSettings';
import { HotelsListings } from './HotelsListings';

export function HotelsSection({ activeSection, profile }) {
    // Handle different sections based on URL query parameter
    switch (activeSection) {
        case 'gallery':
            return <HotelGallery profile={profile} />;
        case 'settings':
            return <HotelSettings profile={profile} />;
        case 'profile':
        default:
            return <HotelProfile profile={profile} />;
    }
}


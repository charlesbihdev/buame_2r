import { RentalGallery } from './RentalGallery';
import { RentalProfile } from './RentalProfile';

export function RentalsSection({ activeSection, profile }) {
    switch (activeSection) {
        case 'gallery':
            return <RentalGallery profile={profile} />;
        case 'profile':
        default:
            return <RentalProfile profile={profile} />;
    }
}

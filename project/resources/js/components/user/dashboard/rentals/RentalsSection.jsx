import { RentalFeatures } from './RentalFeatures';
import { RentalGallery } from './RentalGallery';
import { RentalProfile } from './RentalProfile';

export function RentalsSection({ activeTab, data }) {
    const profile = data?.profile;

    switch (activeTab) {
        case 'features':
            return <RentalFeatures profile={profile} />;
        case 'gallery':
            return <RentalGallery profile={profile} />;
        case 'profile':
        default:
            return <RentalProfile profile={profile} />;
    }
}

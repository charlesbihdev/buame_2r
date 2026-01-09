import { TransportGallery } from './TransportGallery';
import { TransportProfile } from './TransportProfile';

export function TransportSection({ activeSection, profile }) {
    // Handle different sections based on URL query parameter
    switch (activeSection) {
        case 'gallery':
            return <TransportGallery profile={profile} />;
        case 'profile':
        default:
            return <TransportProfile profile={profile} />;
    }
}


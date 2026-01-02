import { ArtisanProfile } from './ArtisanProfile';
import { Portfolio } from './MyWork';

export function ArtisansSection({ activeSection, profile }) {
    if (activeSection === 'portfolio') {
        return <Portfolio profile={profile} />;
    }

    // Default to profile
    return <ArtisanProfile profile={profile} />;
}


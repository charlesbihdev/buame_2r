# BUAME 2R - Page URLs Reference

## Project Structure

### Visitor Pages (Public)
All visitor pages are located in: `resources/js/pages/visitor/`
- Uses `VisitorLayout` which includes the `BuameNavbar`

### Dashboard Pages (Auth Required)
Dashboard pages are located in: `resources/js/pages/`
- Uses separate dashboard layouts (to be created later)

## Main Pages & Routes

### General Market / Marketplace
- **Page Component**: `resources/js/pages/visitor/marketplace.jsx`
- **Route URL**: `/marketplace`
- **Route Name**: `marketplace`
- **Note**: General marketplace for buying and selling

### Food & Guest House
- **Page Component**: `resources/js/pages/visitor/food-stay.jsx`
- **Route URL**: `/food-stay`
- **Route Name**: `food-stay`
- **Note**: Will be separated into two pages later (Food and Guest House)

### Jobs
- **Page Component**: `resources/js/pages/visitor/jobs.jsx`
- **Route URL**: `/jobs`
- **Route Name**: `jobs`
- **Note**: Job listings and applications

## Navbar Navigation Items

The `BuameNavbar` component includes:
- **Home** → `/` (route: `home`)
- **Services** → `/services` (route: `services`)
- **About** → `/about` (route: `about`)
- **Contact** → `/contact` (route: `contact`)
- **Join as Provider** → `/join-as-provider` (route: `join-as-provider`)
- **Log In** → `/login` (route: `login`)

## Visitor Layout

All visitor pages use the `VisitorLayout` which:
- Includes the `BuameNavbar` at the top
- Provides consistent styling and structure
- Located at: `resources/js/layouts/visitor/visitor-layout.jsx`

## Component Usage

### Using Visitor Layout in Pages
```jsx
import VisitorLayout from '@/layouts/visitor/visitor-layout';
import { Head } from '@inertiajs/react';

export default function YourPage() {
    return (
        <VisitorLayout>
            <Head title="Your Page Title" />
            {/* Your page content */}
        </VisitorLayout>
    );
}
```

### Direct Navbar Usage
```jsx
import { BuameNavbar } from '@/components/buame-navbar';

// In your layout or page component
<BuameNavbar />
```

## Features

- ✅ Responsive design (mobile menu with Sheet component)
- ✅ Active route highlighting
- ✅ Dark mode support
- ✅ Matches original design from `buame_2r_home_page/code.html`
- ✅ Uses Inertia.js Link for navigation
- ✅ Sticky header with backdrop blur
- ✅ Visitor pages separated from dashboard pages
- ✅ Consistent layout across all visitor pages


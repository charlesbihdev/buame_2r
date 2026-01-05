# Rentals Dashboard Implementation Plan

## Current State
- **Database**: Migrations exist for `rentals`, `rental_features`, `rental_images` tables
- **Models**: Rental, RentalFeature, RentalImage exist with relationships
- **Visitor Pages**: index.jsx and view.jsx exist with dummy data
- **Dashboard**: Basic RentalsSection.jsx and RentalsListings.jsx exist but are minimal
- **Controller**: RentalsController exists but uses wrong field names (title vs name, price_per_month vs price)

## Issues to Fix
1. Controller validation uses `title` but model uses `name`
2. Controller uses `price_per_month` but model uses `price` + `period`
3. Dashboard components don't show full rental data
4. No profile/gallery/settings tabs like hotels/transport

## Rental Types (from migration enum)
- room, equipment, tools, land, commercial, vehicle, store

## Database Fields to Support
- name, type, price, period (day/week/month)
- location, phone, whatsapp, email
- description, bedrooms, bathrooms, area, furnished
- available_from, rental_terms
- is_verified, is_active, views_count

---

## Implementation Tasks

### 1. Update Dashboard Structure (Following Hotels/Transport Pattern)

**RentalsSection.jsx** - Update to use section switching:
- Profile section (default)
- Gallery section
- No settings tab (like transport)

**Create RentalProfile.jsx** - Main profile form with:
- Basic Info: name, type (dropdown), description
- Pricing: price, period (day/week/month dropdown)
- Location & Contact: location, phone, whatsapp, email
- Property Details (conditional based on type):
  - For room/commercial/store: bedrooms, bathrooms, area, furnished
  - For equipment/tools/vehicle/land: just area (optional)
- Availability: available_from date, rental_terms
- Status: is_active toggle
- Primary image upload

**Create RentalGallery.jsx** - Image management:
- Grid display of rental images
- Add/edit/delete images
- Set primary image

**Create RentalImageForm.jsx** - Modal for image upload

### 2. Update RentalsController.php
- Fix validation to use correct field names (name, price, period, etc.)
- Add image upload routes
- Match the pattern from TransportController/HotelsController

### 3. Update Dashboard Routes
- Add image management routes for rentals

### 4. Update DashboardController.php
- Load rental profile data with images (like transport/hotels)

### 5. Update dashboard-layout.jsx
- Add rentals sidebar nav items (Profile, Gallery)

### 6. Update dashboard/index.jsx
- Pass correct props to RentalsSection

### 7. Create Visitor Controller (RentalsController in Visitor namespace)
- index() - List rentals with filters (type, location, search, sort, pagination)
- show() - Display individual rental

### 8. Update Visitor Pages
- Connect index.jsx to real data from controller
- Connect view.jsx to real data from controller

---

## Files to Create/Modify

### Create:
- `components/user/dashboard/rentals/RentalProfile.jsx`
- `components/user/dashboard/rentals/RentalGallery.jsx`
- `components/user/dashboard/rentals/RentalImageForm.jsx`
- `app/Http/Controllers/Visitor/RentalsController.php`

### Modify:
- `components/user/dashboard/rentals/RentalsSection.jsx` (add section switching)
- `app/Http/Controllers/User/Dashboard/RentalsController.php` (fix validation)
- `app/Http/Controllers/User/Dashboard/DashboardController.php` (load rental data)
- `routes/user/dashboard.php` (add rental image routes)
- `resources/js/layouts/user/dashboard-layout.jsx` (add rentals nav)
- `resources/js/pages/user/dashboard/index.jsx` (pass rentals props)
- `resources/js/pages/visitor/rentals/index.jsx` (connect to backend)
- `resources/js/pages/visitor/rentals/view.jsx` (connect to backend)
- `routes/web.php` (update rentals routes to use controller)

---

## Rental Types UI Considerations
Different rental types should show different fields:
- **Room/Commercial/Store**: Show bedrooms, bathrooms, area, furnished
- **Equipment/Tools/Vehicle**: Show just description, maybe area
- **Land**: Show area, rental_terms

The form should conditionally show/hide these fields based on selected type.

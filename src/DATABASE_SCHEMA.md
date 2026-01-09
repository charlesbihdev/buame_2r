# BUAME 2R Database Schema Documentation

This document describes the complete database schema for the BUAME 2R platform, including all tables, columns, relationships, and business logic for user authentication, category management, and payment systems.

---

## Table of Contents

1. [Users & Authentication](#users--authentication)
2. [Category Management](#category-management)
3. [Payment System](#payment-system)
4. [Artisans](#artisans)
5. [Hotels](#hotels)
6. [Transport](#transport)
7. [Rentals](#rentals)
8. [Marketplace](#marketplace)
9. [Jobs](#jobs)
10. [Supporting Tables](#supporting-tables)
11. [Business Logic & Workflows](#business-logic--workflows)

---

## Users & Authentication

### `users` Table

Stores user account information with phone-based authentication.

| Column                         | Type            | Constraints                 | Description                          |
| ------------------------------ | --------------- | --------------------------- | ------------------------------------ |
| `id`                           | bigint unsigned | PRIMARY KEY, AUTO_INCREMENT | Unique user identifier               |
| `name`                         | varchar(255)    | NOT NULL                    | User's full name                     |
| `phone`                        | varchar(20)     | NOT NULL, UNIQUE            | Phone number (format: +233XXXXXXXXX) |
| `email`                        | varchar(255)    | NULLABLE                    | Email address (optional)             |
| `phone_verified_at`            | timestamp       | NULLABLE                    | When phone was verified              |
| `verification_code`            | varchar(6)      | NULLABLE                    | 6-digit verification code            |
| `verification_code_expires_at` | timestamp       | NULLABLE                    | Code expiration time (15 minutes)    |
| `profile_image`                | varchar(255)    | NULLABLE                    | Path to profile image                |
| `is_active`                    | boolean         | DEFAULT true                | Account status                       |
| `last_login_at`                | timestamp       | NULLABLE                    | Last login timestamp                 |
| `created_at`                   | timestamp       | NULLABLE                    | Account creation time                |
| `updated_at`                   | timestamp       | NULLABLE                    | Last update time                     |

**Indexes:**

- `phone` (UNIQUE)
- `email` (if provided)

**Notes:**

- Users sign up with basic info (name, phone)
- 6-digit verification code sent via SMS
- Code expires after 15 minutes
- Phone verification required for login and registration
- Email is optional

---

## Category Management

### `user_categories` Table

Tracks which categories a user has access to and their payment status.

| Column       | Type            | Constraints                 | Description                                                                        |
| ------------ | --------------- | --------------------------- | ---------------------------------------------------------------------------------- |
| `id`         | bigint unsigned | PRIMARY KEY, AUTO_INCREMENT | Unique record identifier                                                           |
| `user_id`    | bigint unsigned | NOT NULL, FOREIGN KEY       | References `users.id`                                                              |
| `category`   | enum            | NOT NULL                    | Category type: 'artisans', 'hotels', 'transport', 'rentals', 'marketplace', 'jobs' |
| `is_paid`    | boolean         | DEFAULT false               | Payment status for this category                                                   |
| `payment_id` | bigint unsigned | NULLABLE, FOREIGN KEY       | References `payments.id`                                                           |
| `expires_at` | timestamp       | NULLABLE                    | Category access expiration (if time-limited)                                       |
| `is_active`  | boolean         | DEFAULT true                | Active status                                                                      |
| `created_at` | timestamp       | NULLABLE                    | Access granted time                                                                |
| `updated_at` | timestamp       | NULLABLE                    | Last update time                                                                   |

**Indexes:**

- `user_id`
- `category`
- `user_id` + `category` (UNIQUE composite)

**Notes:**

- One record per user per category
- User must pay to access each category dashboard
- During registration, user selects one category and pays
- User can switch categories later (requires payment for new category)
- User can work in only one category dashboard at a time

### `user_active_category` Table

Tracks which category dashboard the user is currently working in.

| Column            | Type            | Constraints                   | Description                                                                                  |
| ----------------- | --------------- | ----------------------------- | -------------------------------------------------------------------------------------------- |
| `id`              | bigint unsigned | PRIMARY KEY, AUTO_INCREMENT   | Unique record identifier                                                                     |
| `user_id`         | bigint unsigned | NOT NULL, UNIQUE, FOREIGN KEY | References `users.id`                                                                        |
| `active_category` | enum            | NOT NULL                      | Current active category: 'artisans', 'hotels', 'transport', 'rentals', 'marketplace', 'jobs' |
| `switched_at`     | timestamp       | NULLABLE                      | When user switched to this category                                                          |
| `updated_at`      | timestamp       | NULLABLE                      | Last update time                                                                             |

**Indexes:**

- `user_id` (UNIQUE)

**Notes:**

- One record per user (1:1 relationship)
- Updated when user switches categories
- UI will show category switcher in dashboard
- User can only access dashboard for categories they've paid for

---

## Payment System

### `payments` Table

Stores all payment transactions.

| Column              | Type            | Constraints                 | Description                                                                                  |
| ------------------- | --------------- | --------------------------- | -------------------------------------------------------------------------------------------- |
| `id`                | bigint unsigned | PRIMARY KEY, AUTO_INCREMENT | Unique payment identifier                                                                    |
| `user_id`           | bigint unsigned | NOT NULL, FOREIGN KEY       | References `users.id`                                                                        |
| `category`          | enum            | NOT NULL                    | Category being paid for: 'artisans', 'hotels', 'transport', 'rentals', 'marketplace', 'jobs' |
| `amount`            | decimal(10,2)   | NOT NULL                    | Payment amount in GHS                                                                        |
| `currency`          | varchar(3)      | DEFAULT 'GHS'               | Currency code                                                                                |
| `payment_method`    | enum            | NOT NULL                    | 'mobile_money', 'bank_transfer', 'card', 'cash'                                              |
| `transaction_id`    | varchar(255)    | NULLABLE                    | Internal transaction ID (from payment gateway)                                               |
| `payment_reference` | varchar(255)    | NULLABLE                    | External payment reference (e.g., mobile money reference)                                    |
| `status`            | enum            | DEFAULT 'pending'           | 'pending', 'completed', 'failed', 'refunded'                                                 |
| `paid_at`           | timestamp       | NULLABLE                    | When payment was completed                                                                   |
| `expires_at`        | timestamp       | NULLABLE                    | Payment validity period (if applicable)                                                      |
| `metadata`          | json            | NULLABLE                    | Additional payment data (provider response, etc.)                                            |
| `created_at`        | timestamp       | NULLABLE                    | Payment initiation time                                                                      |
| `updated_at`        | timestamp       | NULLABLE                    | Last update time                                                                             |

**Indexes:**

- `user_id`
- `category`
- `status`
- `transaction_id` (if provided)
- `payment_reference` (if provided)

**Notes:**

- Payment required for each category access
- Amount may vary by category (configured in settings)
- Payment status tracked for access control
- `transaction_id`: Internal ID from payment gateway/system
- `payment_reference`: External reference (e.g., mobile money transaction ID)

---

## Artisans

### `artisans` Table

Stores artisan profiles and listings.

| Column             | Type            | Constraints                 | Description                                                                                     |
| ------------------ | --------------- | --------------------------- | ----------------------------------------------------------------------------------------------- |
| `id`               | bigint unsigned | PRIMARY KEY, AUTO_INCREMENT | Unique artisan identifier                                                                       |
| `user_id`          | bigint unsigned | NOT NULL, FOREIGN KEY       | References `users.id` (provider)                                                                |
| `name`             | varchar(255)    | NOT NULL                    | Artisan's full name                                                                             |
| `skill`            | varchar(255)    | NOT NULL                    | Primary skill (e.g., 'Master Carpenter', 'Expert Electrician')                                  |
| `skill_type`       | enum            | NOT NULL                    | 'carpenter', 'mason', 'electrician', 'plumber', 'tiler', 'tailor', 'welder', 'painter', 'other' |
| `experience_years` | integer         | NULLABLE                    | Years of experience                                                                             |
| `experience_level` | enum            | NULLABLE                    | 'beginner', 'intermediate', 'expert'                                                            |
| `price_per_day`    | decimal(10,2)   | NOT NULL                    | Daily rate in GHS                                                                               |
| `rating`           | decimal(3,2)    | DEFAULT 0.00                | Average rating (0.00-5.00)                                                                      |
| `reviews_count`    | integer         | DEFAULT 0                   | Total number of reviews                                                                         |
| `location`         | varchar(255)    | NOT NULL                    | Location (e.g., 'Sefwi Bekwai', 'Bibiani')                                                      |
| `address`          | text            | NULLABLE                    | Full address                                                                                    |
| `latitude`         | decimal(10,8)   | NULLABLE                    | GPS latitude                                                                                    |
| `longitude`        | decimal(11,8)   | NULLABLE                    | GPS longitude                                                                                   |
| `phone`            | varchar(20)     | NOT NULL                    | Contact phone                                                                                   |
| `whatsapp`         | varchar(20)     | NULLABLE                    | WhatsApp number                                                                                 |
| `email`            | varchar(255)    | NULLABLE                    | Email address                                                                                   |
| `description`      | text            | NULLABLE                    | Detailed description                                                                            |
| `profile_image`    | varchar(255)    | NULLABLE                    | Profile photo path                                                                              |
| `is_verified`      | boolean         | DEFAULT false               | Verified status                                                                                 |
| `is_available`     | boolean         | DEFAULT true                | Current availability                                                                            |
| `working_hours`    | varchar(255)    | NULLABLE                    | Working hours (simple text, e.g., 'Mon-Sat: 7:00 AM - 6:00 PM')                                 |
| `is_active`        | boolean         | DEFAULT true                | Listing active status                                                                           |
| `views_count`      | integer         | DEFAULT 0                   | Total profile views                                                                             |
| `created_at`       | timestamp       | NULLABLE                    | Listing creation time                                                                           |
| `updated_at`       | timestamp       | NULLABLE                    | Last update time                                                                                |

**Indexes:**

- `user_id`
- `skill_type`
- `location`
- `is_verified`
- `is_available`
- `rating`
- `is_active`

### `artisan_specialties` Table

Stores artisan specialties/skills (many-to-many). Uses predefined list for filtering.

| Column       | Type            | Constraints                 | Description                                                                                                                                                                                                                                                                            |
| ------------ | --------------- | --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`         | bigint unsigned | PRIMARY KEY, AUTO_INCREMENT | Unique identifier                                                                                                                                                                                                                                                                      |
| `artisan_id` | bigint unsigned | NOT NULL, FOREIGN KEY       | References `artisans.id`                                                                                                                                                                                                                                                               |
| `specialty`  | enum            | NOT NULL                    | Predefined specialty: 'furniture', 'roofing', 'wiring', 'installation', 'pipe_fitting', 'drainage', 'floor_tiles', 'wall_tiles', 'clothing', 'alterations', 'metal_work', 'repairs', 'interior', 'exterior', 'doors_windows', 'plumbing', 'electrical', 'painting', 'welding', 'other' |
| `created_at` | timestamp       | NULLABLE                    | Creation time                                                                                                                                                                                                                                                                          |

**Indexes:**

- `artisan_id`
- `specialty`

**Notes:**

- Predefined list ensures consistent filtering and search
- 'other' option available for custom specialties (can be expanded later)

### `artisan_portfolio` Table

Stores artisan portfolio items.

| Column       | Type            | Constraints                 | Description                |
| ------------ | --------------- | --------------------------- | -------------------------- |
| `id`         | bigint unsigned | PRIMARY KEY, AUTO_INCREMENT | Unique identifier          |
| `artisan_id` | bigint unsigned | NOT NULL, FOREIGN KEY       | References `artisans.id`   |
| `item`       | varchar(255)    | NOT NULL                    | Portfolio item description |
| `created_at` | timestamp       | NULLABLE                    | Creation time              |

**Indexes:**

- `artisan_id`

**Note:** Profile images are stored directly in the `artisans.profile_image` field. Portfolio images are stored in the `artisan_portfolio.image_path` field.

---

## Hotels

### `hotels` Table

Stores hotel/guest house listings.

| Column            | Type            | Constraints                 | Description                                     |
| ----------------- | --------------- | --------------------------- | ----------------------------------------------- |
| `id`              | bigint unsigned | PRIMARY KEY, AUTO_INCREMENT | Unique hotel identifier                         |
| `user_id`         | bigint unsigned | NOT NULL, FOREIGN KEY       | References `users.id` (provider)                |
| `name`            | varchar(255)    | NOT NULL                    | Hotel/guest house name                          |
| `type`            | enum            | NOT NULL                    | 'hotel', 'guest_house', 'lodge', 'short_stay'   |
| `rating`          | decimal(3,2)    | DEFAULT 0.00                | Average rating (0.00-5.00)                      |
| `reviews_count`   | integer         | DEFAULT 0                   | Total number of reviews                         |
| `price_per_night` | decimal(10,2)   | NOT NULL                    | Price per night in GHS                          |
| `location`        | varchar(255)    | NOT NULL                    | Location (e.g., 'Bibiani Road', 'Sefwi Bekwai') |
| `address`         | text            | NULLABLE                    | Full address                                    |
| `latitude`        | decimal(10,8)   | NULLABLE                    | GPS latitude                                    |
| `longitude`       | decimal(11,8)   | NULLABLE                    | GPS longitude                                   |
| `phone`           | varchar(20)     | NOT NULL                    | Contact phone                                   |
| `whatsapp`        | varchar(20)     | NULLABLE                    | WhatsApp number                                 |
| `email`           | varchar(255)    | NULLABLE                    | Email address                                   |
| `description`     | text            | NULLABLE                    | Detailed description                            |
| `rooms_count`     | integer         | DEFAULT 1                   | Number of available rooms                       |
| `check_in_time`   | time            | NULLABLE                    | Check-in time (e.g., '14:00:00')                |
| `check_out_time`  | time            | NULLABLE                    | Check-out time (e.g., '11:00:00')               |
| `is_verified`     | boolean         | DEFAULT false               | Verified status                                 |
| `is_active`       | boolean         | DEFAULT true                | Listing active status                           |
| `views_count`     | integer         | DEFAULT 0                   | Total listing views                             |
| `created_at`      | timestamp       | NULLABLE                    | Listing creation time                           |
| `updated_at`      | timestamp       | NULLABLE                    | Last update time                                |

**Indexes:**

- `user_id`
- `type`
- `location`
- `is_verified`
- `is_active`
- `rating`
- `price_per_night`

### `hotel_amenities` Table

Stores hotel amenities (many-to-many).

| Column       | Type            | Constraints                 | Description                                                |
| ------------ | --------------- | --------------------------- | ---------------------------------------------------------- |
| `id`         | bigint unsigned | PRIMARY KEY, AUTO_INCREMENT | Unique identifier                                          |
| `hotel_id`   | bigint unsigned | NOT NULL, FOREIGN KEY       | References `hotels.id`                                     |
| `amenity`    | varchar(255)    | NOT NULL                    | Amenity name (e.g., 'WiFi', 'Parking', 'AC', 'Restaurant') |
| `created_at` | timestamp       | NULLABLE                    | Creation time                                              |

**Indexes:**

- `hotel_id`

### `hotel_features` Table

Stores hotel features/services.

| Column       | Type            | Constraints                 | Description                                           |
| ------------ | --------------- | --------------------------- | ----------------------------------------------------- |
| `id`         | bigint unsigned | PRIMARY KEY, AUTO_INCREMENT | Unique identifier                                     |
| `hotel_id`   | bigint unsigned | NOT NULL, FOREIGN KEY       | References `hotels.id`                                |
| `feature`    | varchar(255)    | NOT NULL                    | Feature name (e.g., '24/7 Reception', 'Room Service') |
| `created_at` | timestamp       | NULLABLE                    | Creation time                                         |

**Indexes:**

- `hotel_id`

### `hotel_images` Table

Stores multiple images for hotel listings.

| Column          | Type            | Constraints                 | Description            |
| --------------- | --------------- | --------------------------- | ---------------------- |
| `id`            | bigint unsigned | PRIMARY KEY, AUTO_INCREMENT | Unique identifier      |
| `hotel_id`      | bigint unsigned | NOT NULL, FOREIGN KEY       | References `hotels.id` |
| `image_path`    | varchar(255)    | NOT NULL                    | Image file path        |
| `is_primary`    | boolean         | DEFAULT false               | Primary image flag     |
| `display_order` | integer         | DEFAULT 0                   | Display order          |
| `created_at`    | timestamp       | NULLABLE                    | Creation time          |

**Indexes:**

- `hotel_id`
- `is_primary`

---

## Transport

### `transport_rides` Table

Stores transport/ride listings (Okada, Cars, Buses, etc.).

| Column            | Type            | Constraints                 | Description                                        |
| ----------------- | --------------- | --------------------------- | -------------------------------------------------- |
| `id`              | bigint unsigned | PRIMARY KEY, AUTO_INCREMENT | Unique ride identifier                             |
| `user_id`         | bigint unsigned | NOT NULL, FOREIGN KEY       | References `users.id` (provider)                   |
| `company_name`    | varchar(255)    | NOT NULL                    | Transport company/service name                     |
| `type`            | enum            | NOT NULL                    | 'taxi', 'bus', 'okada_car', 'cargo', 'other'       |
| `price_per_seat`  | decimal(10,2)   | NOT NULL                    | Price per seat in GHS                              |
| `seats_available` | integer         | NOT NULL                    | Number of available seats                          |
| `location`        | varchar(255)    | NOT NULL                    | Current location                                   |
| `address`         | text            | NULLABLE                    | Full address                                       |
| `latitude`        | decimal(10,8)   | NULLABLE                    | GPS latitude                                       |
| `longitude`       | decimal(11,8)   | NULLABLE                    | GPS longitude                                      |
| `distance_away`   | varchar(50)     | NULLABLE                    | Distance from user (e.g., '2.5 km away')           |
| `rating`          | decimal(3,2)    | DEFAULT 0.00                | Average rating (0.00-5.00)                         |
| `reviews_count`   | integer         | DEFAULT 0                   | Total number of reviews                            |
| `phone`           | varchar(20)     | NOT NULL                    | Contact phone                                      |
| `whatsapp`        | varchar(20)     | NULLABLE                    | WhatsApp number                                    |
| `email`           | varchar(255)    | NULLABLE                    | Email address                                      |
| `description`     | text            | NULLABLE                    | Detailed description                               |
| `operating_hours` | varchar(255)    | NULLABLE                    | Operating hours (e.g., 'Daily: 5:00 AM - 8:00 PM') |
| `payment_methods` | json            | NULLABLE                    | Accepted payment methods (array)                   |
| `is_verified`     | boolean         | DEFAULT false               | Verified status                                    |
| `is_active`       | boolean         | DEFAULT true                | Listing active status                              |
| `views_count`     | integer         | DEFAULT 0                   | Total listing views                                |
| `created_at`      | timestamp       | NULLABLE                    | Listing creation time                              |
| `updated_at`      | timestamp       | NULLABLE                    | Last update time                                   |

**Indexes:**

- `user_id`
- `type`
- `location`
- `is_verified`
- `is_active`
- `rating`
- `latitude`, `longitude` (for location-based search)

### `transport_routes` Table

Stores available routes for transport services.

| Column         | Type            | Constraints                 | Description                                 |
| -------------- | --------------- | --------------------------- | ------------------------------------------- |
| `id`           | bigint unsigned | PRIMARY KEY, AUTO_INCREMENT | Unique identifier                           |
| `transport_id` | bigint unsigned | NOT NULL, FOREIGN KEY       | References `transport_rides.id`             |
| `route`        | varchar(255)    | NOT NULL                    | Route description (e.g., 'Bekwai → Kumasi') |
| `created_at`   | timestamp       | NULLABLE                    | Creation time                               |

**Indexes:**

- `transport_id`

### `transport_images` Table

Stores multiple images for transport listings.

| Column          | Type            | Constraints                 | Description                     |
| --------------- | --------------- | --------------------------- | ------------------------------- |
| `id`            | bigint unsigned | PRIMARY KEY, AUTO_INCREMENT | Unique identifier               |
| `transport_id`  | bigint unsigned | NOT NULL, FOREIGN KEY       | References `transport_rides.id` |
| `image_path`    | varchar(255)    | NOT NULL                    | Image file path                 |
| `is_primary`    | boolean         | DEFAULT false               | Primary image flag              |
| `display_order` | integer         | DEFAULT 0                   | Display order                   |
| `created_at`    | timestamp       | NULLABLE                    | Creation time                   |

**Indexes:**

- `transport_id`
- `is_primary`

---

## Rentals

### `rentals` Table

Stores rental listings (Rooms, Equipment, Tools, Vehicles, Land, Stores).

| Column           | Type            | Constraints                 | Description                                                            |
| ---------------- | --------------- | --------------------------- | ---------------------------------------------------------------------- |
| `id`             | bigint unsigned | PRIMARY KEY, AUTO_INCREMENT | Unique rental identifier                                               |
| `user_id`        | bigint unsigned | NOT NULL, FOREIGN KEY       | References `users.id` (provider)                                       |
| `name`           | varchar(255)    | NOT NULL                    | Rental item name                                                       |
| `type`           | enum            | NOT NULL                    | 'room', 'equipment', 'tools', 'land', 'commercial', 'vehicle', 'store' |
| `price`          | decimal(10,2)   | NOT NULL                    | Rental price in GHS                                                    |
| `period`         | enum            | NOT NULL                    | 'day', 'week', 'month'                                                 |
| `location`       | varchar(255)    | NOT NULL                    | Location                                                               |
| `address`        | text            | NULLABLE                    | Full address                                                           |
| `latitude`       | decimal(10,8)   | NULLABLE                    | GPS latitude                                                           |
| `longitude`      | decimal(11,8)   | NULLABLE                    | GPS longitude                                                          |
| `phone`          | varchar(20)     | NOT NULL                    | Contact phone                                                          |
| `whatsapp`       | varchar(20)     | NULLABLE                    | WhatsApp number                                                        |
| `email`          | varchar(255)    | NULLABLE                    | Email address                                                          |
| `description`    | text            | NULLABLE                    | Detailed description                                                   |
| `bedrooms`       | integer         | NULLABLE                    | Number of bedrooms (for rooms)                                         |
| `bathrooms`      | integer         | NULLABLE                    | Number of bathrooms (for rooms)                                        |
| `area`           | varchar(50)     | NULLABLE                    | Area/size (e.g., '85 sqm')                                             |
| `furnished`      | varchar(100)    | NULLABLE                    | Furnishing status (e.g., 'Fully Furnished')                            |
| `available_from` | date            | NULLABLE                    | Availability start date                                                |
| `rental_terms`   | text            | NULLABLE                    | Rental terms and conditions                                            |
| `is_verified`    | boolean         | DEFAULT false               | Verified status                                                        |
| `is_active`      | boolean         | DEFAULT true                | Listing active status                                                  |
| `views_count`    | integer         | DEFAULT 0                   | Total listing views                                                    |
| `created_at`     | timestamp       | NULLABLE                    | Listing creation time                                                  |
| `updated_at`     | timestamp       | NULLABLE                    | Last update time                                                       |

**Indexes:**

- `user_id`
- `type`
- `location`
- `is_verified`
- `is_active`
- `price`
- `period`

### `rental_features` Table

Stores rental features/amenities.

| Column       | Type            | Constraints                 | Description                                                       |
| ------------ | --------------- | --------------------------- | ----------------------------------------------------------------- |
| `id`         | bigint unsigned | PRIMARY KEY, AUTO_INCREMENT | Unique identifier                                                 |
| `rental_id`  | bigint unsigned | NOT NULL, FOREIGN KEY       | References `rentals.id`                                           |
| `feature`    | varchar(255)    | NOT NULL                    | Feature name (e.g., '2 Bed', 'Parking', 'WiFi', 'Good Condition') |
| `created_at` | timestamp       | NULLABLE                    | Creation time                                                     |

**Indexes:**

- `rental_id`

### `rental_images` Table

Stores multiple images for rental listings.

| Column          | Type            | Constraints                 | Description             |
| --------------- | --------------- | --------------------------- | ----------------------- |
| `id`            | bigint unsigned | PRIMARY KEY, AUTO_INCREMENT | Unique identifier       |
| `rental_id`     | bigint unsigned | NOT NULL, FOREIGN KEY       | References `rentals.id` |
| `image_path`    | varchar(255)    | NOT NULL                    | Image file path         |
| `is_primary`    | boolean         | DEFAULT false               | Primary image flag      |
| `display_order` | integer         | DEFAULT 0                   | Display order           |
| `created_at`    | timestamp       | NULLABLE                    | Creation time           |

**Indexes:**

- `rental_id`
- `is_primary`

---

## Marketplace

### `marketplace_products` Table

Stores marketplace product listings.

| Column               | Type            | Constraints                 | Description                                                            |
| -------------------- | --------------- | --------------------------- | ---------------------------------------------------------------------- |
| `id`                 | bigint unsigned | PRIMARY KEY, AUTO_INCREMENT | Unique product identifier                                              |
| `user_id`            | bigint unsigned | NOT NULL, FOREIGN KEY       | References `users.id` (seller)                                         |
| `title`              | varchar(255)    | NOT NULL                    | Product title                                                          |
| `category`           | enum            | NOT NULL                    | 'electronics', 'furniture', 'food', 'agriculture', 'clothes', 'others' |
| `price`              | decimal(10,2)   | NOT NULL                    | Product price in GHS                                                   |
| `price_type`         | varchar(50)     | NULLABLE                    | Price qualifier (e.g., 'From', '/kg', '/bunch')                        |
| `condition`          | enum            | NULLABLE                    | 'new', 'like_new', 'used', 'refurbished'                               |
| `location`           | varchar(255)    | NOT NULL                    | Location                                                               |
| `address`            | text            | NULLABLE                    | Full address                                                           |
| `latitude`           | decimal(10,8)   | NULLABLE                    | GPS latitude                                                           |
| `longitude`          | decimal(11,8)   | NULLABLE                    | GPS longitude                                                          |
| `phone`              | varchar(20)     | NOT NULL                    | Contact phone                                                          |
| `whatsapp`           | varchar(20)     | NULLABLE                    | WhatsApp number                                                        |
| `email`              | varchar(255)    | NULLABLE                    | Email address                                                          |
| `description`        | text            | NULLABLE                    | Detailed description                                                   |
| `delivery_available` | boolean         | DEFAULT false               | Delivery option                                                        |
| `warranty`           | varchar(255)    | NULLABLE                    | Warranty information                                                   |
| `rating`             | decimal(3,2)    | DEFAULT 0.00                | Average rating (0.00-5.00)                                             |
| `reviews_count`      | integer         | DEFAULT 0                   | Total number of reviews                                                |
| `is_verified`        | boolean         | DEFAULT false               | Verified seller status                                                 |
| `is_active`          | boolean         | DEFAULT true                | Listing active status                                                  |
| `views_count`        | integer         | DEFAULT 0                   | Total listing views                                                    |
| `created_at`         | timestamp       | NULLABLE                    | Listing creation time                                                  |
| `updated_at`         | timestamp       | NULLABLE                    | Last update time                                                       |

**Indexes:**

- `user_id`
- `category`
- `location`
- `is_verified`
- `is_active`
- `rating`
- `price`

### `product_specifications` Table

Stores product specifications.

| Column          | Type            | Constraints                 | Description                                           |
| --------------- | --------------- | --------------------------- | ----------------------------------------------------- |
| `id`            | bigint unsigned | PRIMARY KEY, AUTO_INCREMENT | Unique identifier                                     |
| `product_id`    | bigint unsigned | NOT NULL, FOREIGN KEY       | References `marketplace_products.id`                  |
| `specification` | varchar(255)    | NOT NULL                    | Specification text (e.g., '128GB Storage', '8GB RAM') |
| `created_at`    | timestamp       | NULLABLE                    | Creation time                                         |

**Indexes:**

- `product_id`

### `product_images` Table

Stores multiple images for product listings.

| Column          | Type            | Constraints                 | Description                          |
| --------------- | --------------- | --------------------------- | ------------------------------------ |
| `id`            | bigint unsigned | PRIMARY KEY, AUTO_INCREMENT | Unique identifier                    |
| `product_id`    | bigint unsigned | NOT NULL, FOREIGN KEY       | References `marketplace_products.id` |
| `image_path`    | varchar(255)    | NOT NULL                    | Image file path                      |
| `is_primary`    | boolean         | DEFAULT false               | Primary image flag                   |
| `display_order` | integer         | DEFAULT 0                   | Display order                        |
| `created_at`    | timestamp       | NULLABLE                    | Creation time                        |

**Indexes:**

- `product_id`
- `is_primary`

---

## Jobs

### `jobs` Table

Stores job listings.

| Column                 | Type            | Constraints                 | Description                                                                                   |
| ---------------------- | --------------- | --------------------------- | --------------------------------------------------------------------------------------------- |
| `id`                   | bigint unsigned | PRIMARY KEY, AUTO_INCREMENT | Unique job identifier                                                                         |
| `user_id`              | bigint unsigned | NOT NULL, FOREIGN KEY       | References `users.id` (employer)                                                              |
| `title`                | varchar(255)    | NOT NULL                    | Job title                                                                                     |
| `company`              | varchar(255)    | NOT NULL                    | Company/employer name                                                                         |
| `type`                 | enum            | NOT NULL                    | 'full_time', 'part_time', 'daily_wage', 'apprenticeship'                                      |
| `category`             | enum            | NULLABLE                    | 'agriculture', 'construction', 'hospitality', 'transport', 'domestic_help', 'retail', 'other' |
| `salary_min`           | decimal(10,2)   | NULLABLE                    | Minimum salary in GHS                                                                         |
| `salary_max`           | decimal(10,2)   | NULLABLE                    | Maximum salary in GHS                                                                         |
| `salary_display`       | varchar(255)    | NULLABLE                    | Display format (e.g., '₵800 - ₵1,200')                                                        |
| `location`             | varchar(255)    | NOT NULL                    | Job location                                                                                  |
| `address`              | text            | NULLABLE                    | Full address                                                                                  |
| `latitude`             | decimal(10,8)   | NULLABLE                    | GPS latitude                                                                                  |
| `longitude`            | decimal(11,8)   | NULLABLE                    | GPS longitude                                                                                 |
| `phone`                | varchar(20)     | NOT NULL                    | Contact phone                                                                                 |
| `whatsapp`             | varchar(20)     | NULLABLE                    | WhatsApp number                                                                               |
| `email`                | varchar(255)    | NULLABLE                    | Email address                                                                                 |
| `description`          | text            | NOT NULL                    | Job description                                                                               |
| `is_urgent`            | boolean         | DEFAULT false               | Urgent job flag                                                                               |
| `is_verified_employer` | boolean         | DEFAULT false               | Verified employer status                                                                      |
| `posted_at`            | timestamp       | NULLABLE                    | Posting date                                                                                  |
| `expires_at`           | timestamp       | NULLABLE                    | Job expiration date                                                                           |
| `is_active`            | boolean         | DEFAULT true                | Listing active status                                                                         |
| `views_count`          | integer         | DEFAULT 0                   | Total listing views                                                                           |
| `applications_count`   | integer         | DEFAULT 0                   | Number of applications                                                                        |
| `created_at`           | timestamp       | NULLABLE                    | Listing creation time                                                                         |
| `updated_at`           | timestamp       | NULLABLE                    | Last update time                                                                              |

**Indexes:**

- `user_id`
- `type`
- `category`
- `location`
- `is_urgent`
- `is_verified_employer`
- `is_active`
- `posted_at`
- `salary_min`, `salary_max`

### `job_requirements` Table

Stores job requirements.

| Column        | Type            | Constraints                 | Description          |
| ------------- | --------------- | --------------------------- | -------------------- |
| `id`          | bigint unsigned | PRIMARY KEY, AUTO_INCREMENT | Unique identifier    |
| `job_id`      | bigint unsigned | NOT NULL, FOREIGN KEY       | References `jobs.id` |
| `requirement` | text            | NOT NULL                    | Requirement text     |
| `created_at`  | timestamp       | NULLABLE                    | Creation time        |

**Indexes:**

- `job_id`

### `job_responsibilities` Table

Stores job responsibilities.

| Column           | Type            | Constraints                 | Description          |
| ---------------- | --------------- | --------------------------- | -------------------- |
| `id`             | bigint unsigned | PRIMARY KEY, AUTO_INCREMENT | Unique identifier    |
| `job_id`         | bigint unsigned | NOT NULL, FOREIGN KEY       | References `jobs.id` |
| `responsibility` | text            | NOT NULL                    | Responsibility text  |
| `created_at`     | timestamp       | NULLABLE                    | Creation time        |

**Indexes:**

- `job_id`

### `job_benefits` Table

Stores job benefits.

| Column       | Type            | Constraints                 | Description                                           |
| ------------ | --------------- | --------------------------- | ----------------------------------------------------- |
| `id`         | bigint unsigned | PRIMARY KEY, AUTO_INCREMENT | Unique identifier                                     |
| `job_id`     | bigint unsigned | NOT NULL, FOREIGN KEY       | References `jobs.id`                                  |
| `benefit`    | varchar(255)    | NOT NULL                    | Benefit name (e.g., 'Health insurance', 'Paid leave') |
| `created_at` | timestamp       | NULLABLE                    | Creation time                                         |

**Indexes:**

- `job_id`

---

## Supporting Tables

### `reviews` Table

Stores reviews/ratings for all categories.

| Column            | Type            | Constraints                 | Description                                                    |
| ----------------- | --------------- | --------------------------- | -------------------------------------------------------------- |
| `id`              | bigint unsigned | PRIMARY KEY, AUTO_INCREMENT | Unique review identifier                                       |
| `user_id`         | bigint unsigned | NOT NULL, FOREIGN KEY       | References `users.id` (reviewer)                               |
| `reviewable_type` | varchar(255)    | NOT NULL                    | Model type: 'App\\Models\\Artisan', 'App\\Models\\Hotel', etc. |
| `reviewable_id`   | bigint unsigned | NOT NULL                    | ID of the reviewed item                                        |
| `rating`          | integer         | NOT NULL                    | Rating (1-5)                                                   |
| `comment`         | text            | NULLABLE                    | Review comment                                                 |
| `is_verified`     | boolean         | DEFAULT false               | Verified purchase/service flag                                 |
| `created_at`      | timestamp       | NULLABLE                    | Review creation time                                           |
| `updated_at`      | timestamp       | NULLABLE                    | Last update time                                               |

**Indexes:**

- `user_id`
- `reviewable_type`, `reviewable_id` (polymorphic)
- `rating`

### `favorites` Table

Stores user favorites/bookmarks.

| Column             | Type            | Constraints                 | Description              |
| ------------------ | --------------- | --------------------------- | ------------------------ |
| `id`               | bigint unsigned | PRIMARY KEY, AUTO_INCREMENT | Unique identifier        |
| `user_id`          | bigint unsigned | NOT NULL, FOREIGN KEY       | References `users.id`    |
| `favoritable_type` | varchar(255)    | NOT NULL                    | Model type               |
| `favoritable_id`   | bigint unsigned | NOT NULL                    | ID of the favorited item |
| `created_at`       | timestamp       | NULLABLE                    | Creation time            |

**Indexes:**

- `user_id`
- `favoritable_type`, `favoritable_id` (polymorphic)
- `user_id`, `favoritable_type`, `favoritable_id` (UNIQUE composite)

### `verification_codes` Table

Stores verification codes for phone authentication (optional, can use users table).

| Column        | Type            | Constraints                 | Description                  |
| ------------- | --------------- | --------------------------- | ---------------------------- |
| `id`          | bigint unsigned | PRIMARY KEY, AUTO_INCREMENT | Unique identifier            |
| `phone`       | varchar(20)     | NOT NULL                    | Phone number                 |
| `code`        | varchar(6)      | NOT NULL                    | 6-digit verification code    |
| `expires_at`  | timestamp       | NOT NULL                    | Code expiration (15 minutes) |
| `verified_at` | timestamp       | NULLABLE                    | When code was verified       |
| `attempts`    | integer         | DEFAULT 0                   | Verification attempts        |
| `created_at`  | timestamp       | NULLABLE                    | Creation time                |

**Indexes:**

- `phone`
- `code`
- `expires_at`

**Notes:**

- Can be merged into `users` table if preferred
- Code expires after 15 minutes
- Max 3 attempts before requiring new code

---

## Business Logic & Workflows

### User Registration & Authentication

1. **Registration Flow:**

    - User provides: `name`, `phone`
    - System generates 6-digit verification code
    - Code sent via SMS (expires in 15 minutes)
    - User enters code to verify phone
    - User selects one category during registration
    - User makes payment for selected category
    - Upon payment confirmation, `user_categories` record created with `is_paid = true`
    - `user_active_category` record created with selected category
    - User can now access dashboard for that category

2. **Login Flow:**

    - User enters phone number
    - System generates new 6-digit verification code
    - Code sent via SMS
    - User enters code to login
    - `last_login_at` updated
    - User redirected to their active category dashboard

3. **Phone Verification:**
    - 6-digit code generated randomly
    - Stored in `users.verification_code` or `verification_codes` table
    - Expires after 15 minutes
    - Max 3 verification attempts
    - After 3 failed attempts, new code required

### Category Management & Payment

1. **Category Selection:**

    - During registration: User selects one category
    - After registration: User can switch/add categories via dashboard

2. **Payment Process:**

    - User selects category to access
    - If not paid: Payment required
    - Payment amount configured per category (stored in config/settings)
    - Payment methods: Mobile Money, Bank Transfer, Card, Cash
    - Payment reference stored for verification
    - Upon successful payment:
        - `payments` record created with `status = 'completed'`
        - `user_categories` record created/updated with `is_paid = true`
        - User can now access that category dashboard

3. **Category Switching:**

    - User can switch active category in dashboard UI
    - System checks if user has paid for target category
    - If paid: `user_active_category.active_category` updated
    - If not paid: Redirect to payment page
    - User can only work in one category dashboard at a time
    - UI shows category switcher with:
        - Current active category (highlighted)
        - Other paid categories (clickable)
        - Unpaid categories (locked, shows payment button)

4. **Dashboard Access:**
    - User can only access dashboard for categories they've paid for
    - `user_active_category.active_category` determines current dashboard view
    - Switching categories updates `user_active_category` record
    - Each category has its own dashboard with:
        - Listings management (CRUD)
        - Analytics/statistics
        - Settings
        - Category-specific features

### Listing Management

1. **Creating Listings:**

    - User must be in the correct category dashboard
    - User must have paid access to that category
    - Form fields vary by category (see table schemas above)
    - Images uploaded and stored in respective `*_images` tables
    - Listing created with `is_active = true` by default

2. **Updating Listings:**

    - User can edit their own listings
    - Changes reflected immediately
    - `updated_at` timestamp updated

3. **Deleting/Deactivating:**
    - User can deactivate listings (`is_active = false`)
    - Soft delete preferred over hard delete
    - Deactivated listings not shown in public views

### Search & Filtering

1. **Search Fields:**

    - **Artisans:** name, skill, location, specialties
    - **Hotels:** name, location, type, amenities
    - **Transport:** company, type, location, routes
    - **Rentals:** name, type, location, features
    - **Marketplace:** title, category, location, specifications
    - **Jobs:** title, company, type, category, location

2. **Filter Options:**

    - Location (dropdown/autocomplete)
    - Category/Type
    - Price range
    - Rating
    - Verified status
    - Availability (where applicable)

3. **Sorting:**
    - Price (low to high, high to low)
    - Rating (highest first)
    - Distance (for location-based)
    - Newest first
    - Most reviewed

### Rating & Reviews

1. **Rating Calculation:**

    - Average rating calculated from `reviews` table
    - Stored in main table (e.g., `artisans.rating`)
    - Updated when new review added
    - `reviews_count` incremented

2. **Review Creation:**
    - User can review after service/product interaction
    - Rating: 1-5 stars
    - Optional comment
    - `is_verified` flag if purchase/service confirmed

---

## Database Relationships Summary

```
users (1) ──< (many) user_categories
users (1) ──< (1) user_active_category
users (1) ──< (many) payments
users (1) ──< (many) artisans
users (1) ──< (many) hotels
users (1) ──< (many) transport_rides
users (1) ──< (many) rentals
users (1) ──< (many) marketplace_products
users (1) ──< (many) jobs
users (1) ──< (many) reviews
users (1) ──< (many) favorites

artisans (1) ──< (many) artisan_specialties
artisans (1) ──< (many) artisan_portfolio
artisans (1) ──< (many) artisan_portfolio

hotels (1) ──< (many) hotel_amenities
hotels (1) ──< (many) hotel_features
hotels (1) ──< (many) hotel_images

transport_rides (1) ──< (many) transport_routes
transport_rides (1) ──< (many) transport_images

rentals (1) ──< (many) rental_features
rentals (1) ──< (many) rental_images

marketplace_products (1) ──< (many) product_specifications
marketplace_products (1) ──< (many) product_images

jobs (1) ──< (many) job_requirements
jobs (1) ──< (many) job_responsibilities
jobs (1) ──< (many) job_benefits

payments (1) ──> (1) user_categories
```

---

## Migration Notes

1. **Order of Migration:**

    - Create `users` table first
    - Create `payments` table
    - Create `user_categories` and `user_active_category` tables
    - Create category-specific tables (artisans, hotels, etc.)
    - Create supporting tables (reviews, favorites, images, etc.)

2. **Foreign Key Constraints:**

    - All foreign keys should have `ON DELETE CASCADE` or `ON DELETE SET NULL` as appropriate
    - Consider soft deletes for main tables (users, listings)

3. **Indexes:**

    - Index all foreign keys
    - Index frequently searched columns (location, category, type, etc.)
    - Index polymorphic relationships (reviewable_type, favoritable_type)

4. **Default Values:**

    - Set appropriate defaults for boolean fields
    - Set default timestamps
    - Set default ratings to 0.00

5. **Enums:**
    - Define enums consistently across tables
    - Consider creating enum types in database if supported

---

## Additional Considerations

1. **Image Storage:**

    - Store image paths in database
    - Images stored in `storage/app/public/images/{category}/`
    - Support multiple images per listing
    - Primary image flag for main display

2. **Location Data:**

    - Store location as text (human-readable)
    - Store GPS coordinates (latitude, longitude) for map features
    - Enable location-based search and distance calculation

3. **Search Functionality:**

    - Consider full-text search for descriptions
    - Use database indexes for performance
    - Consider Elasticsearch for advanced search

4. **Caching:**

    - Cache frequently accessed data (categories, locations)
    - Cache user active category
    - Cache payment status

5. **Notifications:**
    - SMS for verification codes
    - Email notifications (optional)
    - In-app notifications for dashboard

---

## Next Steps

1. Create Laravel migrations for all tables
2. Create Eloquent models with relationships
3. Implement authentication with phone verification
4. Implement payment gateway integration
5. Build category switching UI in dashboard
6. Implement CRUD operations for each category
7. Add search and filtering functionality
8. Implement rating and review system

---

**Document Version:** 1.0  
**Last Updated:** 2024  
**Author:** BUAME 2R Development Team

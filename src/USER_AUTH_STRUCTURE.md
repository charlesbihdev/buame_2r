# User Authentication Structure

## Overview

Separated authentication systems for different user types:

- **Super Admin**: Uses Laravel default auth (email/password) in `/auth` folder
- **Category Users** (Artisans, Hotel owners, etc.): Uses phone-based OTP auth in `/user/auth` folder

## Directory Structure

```
resources/js/pages/
├── auth/                           # Super Admin Authentication (Laravel Default)
│   ├── login.jsx                   # Email/password login for super admin
│   └── register.jsx                # Email/password registration for super admin
│
└── user/                           # Category Users (Phone-based Authentication)
    └── auth/
        ├── phone-login.jsx         # Phone number input for login
        ├── phone-register.jsx      # Registration with name, phone, email
        ├── verify-otp.jsx          # OTP verification (reusable for login & register)
        ├── select-category.jsx     # Category selection after phone verification
        └── payment.jsx             # Payment processing for category access
```

## Routes Files

### `routes/auth.php`

Reserved for super admin authentication (email/password). Currently empty, to be implemented later.

### `routes/user/auth.php`

Contains all phone-based authentication routes for category users. Automatically loaded in `bootstrap/app.php`.

## Route Structure

### Super Admin Routes (Future)

```
/login              → Super admin login (email/password)
/register           → Super admin registration (email/password)
```

### Category User Routes

```
/user/login                     → Phone login
/user/login/verify-otp          → OTP verification for login
/user/login/resend-otp          → Resend OTP for login

/user/register                  → Phone registration
/user/register/verify-otp       → OTP verification for registration
/user/register/category         → Category selection
/user/register/payment          → Payment processing
/user/register/resend-otp       → Resend OTP for registration
```

## Authentication Flow

### Category Users (Artisans, Hotel owners, etc.)

```
1. Visit /user/register
2. Enter name, phone, email (optional)
3. Receive OTP via SMS
4. Verify OTP at /user/register/verify-otp
5. Select category at /user/register/category
6. Complete payment at /user/register/payment
7. Account created → Auto-login → Redirect to dashboard
```

### Login Flow

```
1. Visit /user/login
2. Enter phone number
3. Receive OTP via SMS
4. Verify OTP at /user/login/verify-otp
5. Login → Redirect to active category dashboard
```

## Controllers

### AuthenticatedSessionController

- Handles phone-based login for category users
- Renders pages from `user/auth/` folder
- Uses `user.` route prefix

### RegisteredUserController

- Handles phone-based registration with category selection and payment
- Renders pages from `user/auth/` folder
- Uses `user.` route prefix

## Database Tables

### `admins` Table

- For super admin authentication
- Uses email/password
- Laravel default structure

### `users` Table

- For category users (artisans, hotel owners, etc.)
- Uses phone-based authentication
- No password field
- Fields: phone, phone_verified_at, verification_code, etc.

## Navigation Links

### Visitor Navbar

- "Join as Provider" → `/user/register`
- "Log In" → `/user/login`

## Benefits of This Structure

1. **Clear Separation**: Super admin and category users have completely separate auth flows
2. **Future-Proof**: Super admin auth can be implemented later without conflicts
3. **Organized**: Easy to find and maintain auth-related files
4. **Scalable**: Can add more user types (e.g., `/vendor/auth`, `/customer/auth`) if needed

## Notes

- The `/auth` folder is reserved for super admin authentication (Laravel default)
- The `/user/auth` folder is for category users (phone-based authentication)
- Both systems use the same `users` table but different authentication methods
- Super admin will use the `admins` table when implemented

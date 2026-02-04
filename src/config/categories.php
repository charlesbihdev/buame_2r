<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Category Configuration
    |--------------------------------------------------------------------------
    |
    | This file contains all category-related configuration for BUAME 2R.
    | All category prices, labels, and settings are centralized here.
    |
    */

    'list' => [
        'artisans' => [
            'label' => 'Artisans',
            'description' => 'Connect with skilled artisans in your area',
            'pricing' => [
                'monthly' => 50.00,
                'biannually' => 270.00,
                'annual' => 480.00,
            ],
            'price' => 50.00, // Backward compatibility
        ],
        'hotels' => [
            'label' => 'Hotel',
            'description' => 'Manage your hotel or lodging services',
            'pricing' => [
                'monthly' => 100.00,
                'biannually' => 540.00,
                'annual' => 960.00,
            ],
            'price' => 100.00,
        ],
        'transport' => [
            'label' => 'Okada',
            'description' => 'Offer motorcycle taxi services',
            'pricing' => [
                'monthly' => 30.00,
                'biannually' => 162.00,
                'annual' => 288.00,
            ],
            'price' => 30.00,
        ],
        'rentals' => [
            'label' => 'Rentals',
            'description' => 'List properties and equipment for rent',
            'pricing' => [
                'monthly' => 75.00,
                'biannually' => 405.00,
                'annual' => 720.00,
            ],
            'price' => 75.00,
        ],
        'marketplace' => [
            'label' => 'Marketplace',
            'description' => 'Sell products and goods online',
            'price' => 20.00, // Base price for backward compatibility
            'tiers' => [
                'starter' => [
                    'name' => 'Starter Store',
                    'product_limit' => 5,
                    'description' => 'Perfect for small sellers just getting started',
                    'pricing' => [
                        'monthly' => 20.00,
                        'biannually' => 108.00,
                        'annual' => 192.00,
                    ],
                    'price' => 20.00,
                ],
                'professional' => [
                    'name' => 'Professional Store',
                    'product_limit' => 10,
                    'description' => 'Ideal for growing businesses',
                    'pricing' => [
                        'monthly' => 35.00,
                        'biannually' => 189.00,
                        'annual' => 336.00,
                    ],
                    'price' => 35.00,
                ],
                'enterprise' => [
                    'name' => 'Enterprise Store',
                    'product_limit' => 20,
                    'description' => 'For established sellers with large catalogs',
                    'pricing' => [
                        'monthly' => 50.00,
                        'biannually' => 270.00,
                        'annual' => 480.00,
                    ],
                    'price' => 50.00,
                ],
            ],
        ],
        'jobs' => [
            'label' => 'Jobs',
            'description' => 'Post job listings and find talent',
            'pricing' => [
                'monthly' => 60.00,
                'biannually' => 324.00,
                'annual' => 576.00,
            ],
            'price' => 60.00,
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Subscription Configuration
    |--------------------------------------------------------------------------
    |
    | Settings for subscription billing cycles, grace periods, and reminders.
    |
    */

    'subscription' => [
        'grace_period_days' => 7,
        'reminder_days' => [7, 3, 1, 0, -3, -5], // Days before/after expiry to send reminders
        'billing_cycles' => [
            'monthly' => [
                'label' => 'Monthly',
                'duration_days' => 30,
                'discount_percent' => 0,
            ],
            'biannually' => [
                'label' => 'Biannually',
                'duration_days' => 180,
                'discount_percent' => 10,
            ],
            'annual' => [
                'label' => 'Annual',
                'duration_days' => 365,
                'discount_percent' => 20,
            ],
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Free Access Configuration
    |--------------------------------------------------------------------------
    |
    | Settings for temporary free access during Paystack verification.
    | Set FREE_ACCESS_ENABLED=true in .env to enable free trial mode.
    |
    */

    'free_access' => [
        'enabled' => env('FREE_ACCESS_ENABLED', false),
        'duration_days' => env('FREE_ACCESS_DAYS', 30),
    ],

    /*
    |--------------------------------------------------------------------------
    | Default Category Price
    |--------------------------------------------------------------------------
    |
    | This is the fallback price if a category is not found in the list above.
    |
    */

    'default_price' => 50.00,

    /*
    |--------------------------------------------------------------------------
    | Currency
    |--------------------------------------------------------------------------
    |
    | The currency used for all category payments.
    |
    */

    'currency' => 'GHS',

    /*
    |--------------------------------------------------------------------------
    | Valid Categories
    |--------------------------------------------------------------------------
    |
    | List of valid category keys used for validation.
    |
    */

    'valid' => ['artisans', 'hotels', 'transport', 'rentals', 'marketplace', 'jobs'],

];

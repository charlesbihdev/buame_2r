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
                    'product_limit' => 10,
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
                    'product_limit' => 15,
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
        'duration_days' => (int) env('FREE_ACCESS_DAYS', 30),
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

    /*
    |--------------------------------------------------------------------------
    | Marketplace Product Categories
    |--------------------------------------------------------------------------
    |
    | Categories available for marketplace products. This is the single
    | source of truth used across backend validation and frontend UI.
    | Sorted alphabetically.
    |
    */

    'marketplace_categories' => [
        'agriculture' => 'Agriculture & Farm Supplies',
        'automotive' => 'Automotive',
        'baby_kids' => 'Baby & Kids',
        'bags_luggage' => 'Bags & Luggage',
        'bedding_textiles' => 'Bedding & Home Textiles',
        'beekeeping_honey' => 'Beekeeping & Honey Products',
        'beverages_drinks' => 'Beverages & Drinks',
        'books_stationery' => 'Books & Stationery',
        'building_hardware' => 'Building & Hardware',
        'cleaning_laundry' => 'Cleaning & Laundry Supplies',
        'computers_gaming' => 'Computers & Gaming',
        'craft_art' => 'Craft & Art Supplies',
        'dairy_eggs' => 'Dairy Products & Eggs',
        'eco_sustainable' => 'Eco-friendly & Sustainable Products',
        'electronics' => 'Electronics & Appliances',
        'energy_backup' => 'Energy & Backup Solutions (Generators, Batteries, Solar)',
        'fashion' => 'Fashion & Apparel',
        'fertilizers_soil' => 'Fertilizers & Soil Enhancers',
        'food_groceries' => 'Food & Groceries',
        'footwear' => 'Footwear',
        'frozen_meals' => 'Frozen & Ready Meals',
        'furniture_decor' => 'Furniture & Home Decor',
        'gifts' => 'Gifts & Occasion Items',
        'health_beauty' => 'Health & Beauty',
        'herbs_spices' => 'Herbs, Spices & Medicinal Plants',
        'home_living' => 'Home & Living',
        'industrial_tools' => 'Industrial Tools & Machinery',
        'irrigation_pumps' => 'Irrigation & Water Pumps',
        'kitchen_appliances' => 'Kitchen Appliances & Cookware',
        'legumes_grains' => 'Legumes, Grains & Cereals',
        'local_farm_produce' => 'Local Ghanaian Farm Produce',
        'meat_seafood' => 'Meat, Poultry & Seafood',
        'mobile_phones' => 'Mobile Phones & Accessories',
        'musical_instruments' => 'Musical Instruments',
        'networking_security' => 'Networking & Security Devices',
        'office_equipment' => 'Office Equipment & Supplies',
        'party_events' => 'Party & Event Supplies',
        'pets_animals' => 'Pets & Animals',
        'poultry_livestock' => 'Poultry, Livestock & Animal Feed',
        'roots_tubers' => 'Roots, Tubers & Plantains',
        'seeds_plants' => 'Seeds, Seedlings & Plants',
        'smart_home' => 'Smart Home & Devices',
        'snacks_confectioneries' => 'Snacks & Confectioneries',
        'solar_power' => 'Solar & Power Equipment',
        'sports_outdoors' => 'Sports & Outdoors',
        'tractors_machinery' => 'Tractors & Farm Machinery',
        'traditional_cultural' => 'Traditional & Cultural Products',
        'traditional_food' => 'Traditional Food & Sauces',
        'travel_outdoor' => 'Travel & Outdoor Accessories',
        'watches_jewelry' => 'Watches & Jewelry',
    ],

];

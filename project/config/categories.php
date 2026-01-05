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
            'price' => 50.00,
            'description' => 'Connect with skilled artisans in your area',
        ],
        'hotels' => [
            'label' => 'Hotel',
            'price' => 100.00,
            'description' => 'Manage your hotel or lodging services',
        ],
        'transport' => [
            'label' => 'Okada',
            'price' => 30.00,
            'description' => 'Offer motorcycle taxi services',
        ],
        'rentals' => [
            'label' => 'Rentals',
            'price' => 75.00,
            'description' => 'List properties and equipment for rent',
        ],
        'marketplace' => [
            'label' => 'Marketplace',
            'price' => 40.00,
            'description' => 'Sell products and goods online',
        ],
        'jobs' => [
            'label' => 'Jobs',
            'price' => 60.00,
            'description' => 'Post job listings and find talent',
        ],
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

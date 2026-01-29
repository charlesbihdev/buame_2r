<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Platform Notices Configuration
    |--------------------------------------------------------------------------
    |
    | This file contains all platform-wide notices, warnings, and caution
    | messages displayed to users across the 2RBUAME platform.
    |
    */

    'transaction_caution' => [
        'title' => 'Safe Transaction Notice',

        'product' => [
            'heading' => 'Buying an Item?',
            'points' => [
                'Carefully inspect the item\'s condition, quantity, and specifications before making any payment',
                'Meet the seller in person at a safe, public location to verify the item',
                'Never pay in advance without physically inspecting the item first',
                'Use secure payment methods and request receipts for your records',
                'Report any suspicious activity or fraudulent listings immediately',
            ],
        ],

        'service' => [
            'heading' => 'Hiring a Service Provider?',
            'points' => [
                'Verify the service provider\'s credentials, experience, and reviews',
                'Meet in person to discuss project scope, timeline, and pricing',
                'Draft a written agreement or contract outlining deliverables and payment terms',
                'Consider milestone-based payments for larger projects',
                'Keep all communication and agreements documented',
            ],
        ],

        'general' => [
            'heading' => 'Transaction Safety Tips',
            'points' => [
                'Always verify seller/service provider identity and credentials',
                'Meet at safe, public locations for exchanges or initial consultations',
                'Never share sensitive personal or financial information unnecessarily',
                'Use 2RBUAME\'s approved communication channels when possible',
                'Trust your instincts - if something feels off, proceed with caution',
            ],
        ],

        'disclaimer' => '2RBUAME is a platform that connects buyers and sellers/service providers. While we strive to maintain a safe marketplace, all transactions are conducted directly between parties. 2RBUAME is not responsible for any disputes, losses, or issues arising from transactions. Always exercise caution and due diligence.',

        'footer' => 'Stay safe and transact responsibly on 2RBUAME',
    ],

];

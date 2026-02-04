<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <title inertia>{{ config('app.name', '2RBUAME') }}</title>

    <!-- Default SEO Meta Tags -->
    <meta name="description" content="2RBUAME - Your trusted platform for jobs, marketplace, artisans, hotels, transport, and rentals in Ghana. Find services, connect with professionals, and discover opportunities.">
    <meta name="keywords" content="2RBUAME, Ghana jobs, marketplace, artisans, hotels, transport, rentals, services, professionals, Ghana platform">
    <meta name="author" content="2RBUAME">
    <meta name="robots" content="index, follow">
    <meta name="theme-color" content="#10b981">

    <!-- Favicon -->
    <link rel="icon" type="image/png" href="/favicon.png">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="2RBUAME">
    <meta property="og:locale" content="en_GH">

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">

    <!-- Canonical URL -->
    <link rel="canonical" href="{{ url()->current() }}">

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap" rel="stylesheet" />

    @routes
    @viteReactRefresh
    @vite(['resources/js/app.jsx', "resources/js/pages/{$page['component']}.jsx"])
    @inertiaHead
</head>

<body class="font-sans antialiased">
    @inertia
</body>

</html>
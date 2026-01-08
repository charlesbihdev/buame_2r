import { router } from '@inertiajs/react';

/**
 * Dashboard Navigation Service
 * Handles all navigation within the user dashboard using query strings.
 * URL format: /user/dashboard?category=artisans&section=profile
 */

/**
 * Switch to a different category in the dashboard.
 * @param {string} category - The category to switch to (artisans, hotels, transport, rentals, marketplace, jobs)
 * @param {string|null} section - Optional section to navigate to
 */
export function switchCategory(category, section = null) {
    const params = { category };
    if (section) {
        params.section = section;
    }
    router.get(route('user.dashboard.index'), params, {
        preserveScroll: true,
        preserveState: false,
    });
}

/**
 * Navigate to a specific section within the current category.
 * Preserves the current category from the URL.
 * @param {string} section - The section to navigate to (profile, listings, portfolio, etc.)
 * @param {string|null} category - Optional category (if not provided, keeps current)
 */
export function navigateToSection(section, category = null) {
    const params = { section };

    // Get current category from URL if not provided
    if (category) {
        params.category = category;
    } else {
        const urlParams = new URLSearchParams(window.location.search);
        const currentCategory = urlParams.get('category');
        if (currentCategory) {
            params.category = currentCategory;
        }
    }

    router.get(route('user.dashboard.index'), params, {
        preserveScroll: true,
        preserveState: true,
    });
}

/**
 * Navigate to dashboard with both category and section.
 * @param {string} category - The category to switch to
 * @param {string} section - The section to navigate to
 */
export function navigateToCategorySection(category, section) {
    router.get(route('user.dashboard.index'), { category, section }, {
        preserveScroll: true,
        preserveState: false,
    });
}

/**
 * Get the dashboard URL with optional category and section query parameters.
 * @param {string|null} category - Optional category to include in URL
 * @param {string|null} section - Optional section to include in URL
 * @returns {string} The dashboard URL with query params
 */
export function getDashboardUrl(category = null, section = null) {
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    if (section) params.set('section', section);

    const queryString = params.toString();
    const baseUrl = route('user.dashboard.index');
    return queryString ? `${baseUrl}?${queryString}` : baseUrl;
}

/**
 * Reload the dashboard, optionally going to a specific category/section.
 * @param {string|null} category - Optional category to navigate to
 * @param {string|null} section - Optional section to navigate to
 */
export function reloadDashboard(category = null, section = null) {
    const params = {};
    if (category) params.category = category;
    if (section) params.section = section;

    router.get(route('user.dashboard.index'), params, {
        preserveScroll: true,
    });
}

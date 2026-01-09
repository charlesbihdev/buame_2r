/**
 * Format a Ghana phone number to international WhatsApp format (233XXXXXXXXX)
 *
 * Handles various input formats:
 * - 0548715098 -> 233548715098
 * - 233548715098 -> 233548715098
 * - +233548715098 -> 233548715098
 * - 548715098 -> 233548715098
 * - +233 54 871 5098 -> 233548715098
 *
 * @param {string} phone - The phone number to format
 * @returns {string|null} - Formatted phone number or null if invalid
 */
export function formatGhanaPhoneForWhatsApp(phone) {
    if (!phone) return null;

    // Remove all non-digit characters (spaces, dashes, parentheses, plus signs, etc.)
    let cleaned = phone.replace(/\D/g, '');

    // If the number starts with '0', remove it (local format)
    if (cleaned.startsWith('0')) {
        cleaned = cleaned.substring(1);
    }

    // If the number already starts with '233', use it as is
    if (cleaned.startsWith('233')) {
        return cleaned;
    }

    // If the number is 9 digits (local without leading 0), add 233
    if (cleaned.length === 9) {
        return '233' + cleaned;
    }

    // If the number is 10 digits (local with leading 0 that we removed), add 233
    // This case is already handled above, but keeping for clarity
    if (cleaned.length === 10) {
        return '233' + cleaned;
    }

    // If we get here and the number is 12 digits starting with 233, return it
    if (cleaned.length === 12 && cleaned.startsWith('233')) {
        return cleaned;
    }

    // Invalid number format
    return null;
}

/**
 * Build a WhatsApp URL with a pre-filled message
 *
 * @param {string} phone - The phone number (will be formatted)
 * @param {string} message - The pre-filled message (optional)
 * @returns {string|null} - WhatsApp URL or null if phone is invalid
 */
export function buildWhatsAppUrl(phone, message = '') {
    const formattedPhone = formatGhanaPhoneForWhatsApp(phone);

    if (!formattedPhone) return null;

    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${formattedPhone}${message ? `?text=${encodedMessage}` : ''}`;
}

/**
 * Format phone number for display (e.g., +233 54 871 5098)
 *
 * @param {string} phone - The phone number to format
 * @returns {string} - Formatted phone number for display
 */
export function formatPhoneForDisplay(phone) {
    const formatted = formatGhanaPhoneForWhatsApp(phone);

    if (!formatted) return phone; // Return original if formatting fails

    // Format as +233 XX XXX XXXX
    return `+${formatted.substring(0, 3)} ${formatted.substring(3, 5)} ${formatted.substring(5, 8)} ${formatted.substring(8)}`;
}

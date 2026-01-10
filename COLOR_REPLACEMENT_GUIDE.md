# Color Replacement Guide

This document maps hardcoded hex colors to CSS variables from `app.css`.

## Color Mapping

| Hardcoded Color | CSS Variable | Usage Context |
|----------------|--------------|---------------|
| `#13ec13` | `var(--primary)` | Primary brand green (buttons, accents, highlights) |
| `#0fdc0f` | `var(--buame-primary-dark)` | Hover states for primary green |
| `#0d1b0d` | `var(--foreground)` or `var(--buame-background-dark)` | Dark text/backgrounds |
| `#162816` | `var(--card)` | Card backgrounds in dark mode |
| `#f6f8f6` | `var(--background)` | Light background |
| `#102210` | `var(--buame-background-dark)` | Dark background |
| `#1a3a1a` | `var(--card)` | Dark card/surface |
| `#25D366` | Keep as-is | WhatsApp brand color (intentional) |
| `#20bd5a` | Keep as-is | WhatsApp hover color (intentional) |

## Replacement Patterns

### Background Colors
- `bg-[#13ec13]` → `bg-[var(--primary)]`
- `bg-[#0d1b0d]` → `bg-[var(--buame-background-dark)]`
- `bg-[#162816]` → `bg-[var(--card)]`
- `bg-[#f6f8f6]` → `bg-[var(--background)]`
- `bg-[#102210]` → `bg-[var(--buame-background-dark)]`

### Text Colors
- `text-[#13ec13]` → `text-[var(--primary)]`
- `text-[#0d1b0d]` → `text-[var(--foreground)]`

### Border Colors
- `border-[#13ec13]` → `border-[var(--primary)]`

### Hover States
- `hover:bg-[#0fdc0f]` → `hover:bg-[var(--buame-primary-dark)]`
- `hover:text-[#13ec13]` → `hover:text-[var(--primary)]`

### Opacity Variants
- `bg-[#13ec13]/10` → `bg-[var(--primary)]/10`
- `border-[#13ec13]/50` → `border-[var(--primary)]/50`

## Files Completed
- ✅ Store components (StoreHero, ProductCard, StoreFooter, StoreSearch, StoreHeader, StoreProductCard, StoreProductGrid, StoreEmptyState)
- ✅ Store pages (show.jsx)
- ✅ Marketplace hero
- ✅ Transport card

## Files Remaining
See grep output for remaining 83 files with hardcoded colors.


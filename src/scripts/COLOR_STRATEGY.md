# 2RBUAME Color Strategy Guide

## Brand Identity
- **Brand Name**: 2RBUAME (not BUAME 2R)
- **Primary Color**: Deep Green (#0F6B3F) - Growth, trust, local economy
- **Secondary Color**: Golden Yellow (#F4B400) - Opportunity, prosperity
- **Tertiary Color**: Dark Blue (#1F3A5F) - Technology & reliability

## Strategic Color Usage

### 🟢 Green (Primary) - Use for:
- **Primary actions**: Main CTAs, "Sign Up", "Get Started", "Buy Now"
- **Success states**: Confirmations, completed actions
- **Navigation**: Active links, selected items
- **Accents**: Icons, badges, highlights
- **Text on green**: Always white (`text-white` or `text-primary-foreground`)

### 🟡 Gold (Secondary) - Use for:
- **Premium features**: Highlighting special offers, featured content
- **Call-to-action alternatives**: Secondary buttons, "Learn More"
- **Achievements**: Badges, ratings, milestones
- **Warm accents**: Decorative elements, hover states
- **Text on gold**: Dark text (`text-secondary-foreground` = #1A2E23)

### 🔵 Blue (Tertiary) - Use for:
- **Information**: Info cards, tooltips, help sections
- **Trust elements**: Security badges, verification icons
- **Technology features**: Tech-related sections, integrations
- **Neutral actions**: "Learn More", "View Details" (non-primary)
- **Text on blue**: White (`text-accent-foreground` = white)

## Button Color Rules

### Green Buttons (Primary Actions)
```jsx
// ✅ CORRECT - Green bg with white text
<Button className="bg-[var(--primary)] text-white">
  Sign Up
</Button>

// ✅ CORRECT - Using button variant
<Button variant="default">  // Uses bg-primary text-primary-foreground
  Get Started
</Button>

// ❌ WRONG - Green bg with dark text
<Button className="bg-[var(--primary)] text-[var(--foreground)]">
  Sign Up
</Button>
```

### Gold Buttons (Secondary Actions)
```jsx
// ✅ CORRECT - Gold bg with dark text
<Button className="bg-[var(--secondary)] text-[var(--secondary-foreground)]">
  Learn More
</Button>

// ✅ CORRECT - Using button variant
<Button variant="secondary">  // Uses bg-secondary text-secondary-foreground
  View Details
</Button>
```

### Blue Buttons (Info/Trust Actions)
```jsx
// ✅ CORRECT - Blue bg with white text
<Button className="bg-[var(--accent)] text-white">
  Learn More
</Button>
```

## Component-Specific Guidelines

### Hero Sections
- **Background**: Use green for primary hero, gold for secondary hero
- **Text**: White on green/gold backgrounds
- **CTA**: Green button (primary action)

### Cards
- **Border accents**: Use green for primary cards, gold for featured cards
- **Badges**: Green for "New", Gold for "Featured", Blue for "Info"

### Navigation
- **Active state**: Green
- **Hover state**: Green with opacity
- **Background**: White/light

### Forms
- **Primary submit**: Green button with white text
- **Secondary actions**: Outline style
- **Focus states**: Green ring

### Status Indicators
- **Success**: Green
- **Warning**: Gold
- **Info**: Blue
- **Error**: Red (destructive)

## Examples

### Hero CTA Section
```jsx
// Primary CTA - Green
<Button className="bg-[var(--primary)] text-white">
  Get Started
</Button>

// Secondary CTA - Gold
<Button className="bg-[var(--secondary)] text-[var(--secondary-foreground)]">
  Learn More
</Button>
```

### Feature Cards
```jsx
// Primary feature - Green accent
<div className="border-l-4 border-[var(--primary)]">
  <h3>Main Feature</h3>
</div>

// Premium feature - Gold accent
<div className="border-l-4 border-[var(--secondary)]">
  <h3>Premium Feature</h3>
</div>

// Info feature - Blue accent
<div className="border-l-4 border-[var(--accent)]">
  <h3>Info Feature</h3>
</div>
```

### Badges
```jsx
// New badge - Green
<span className="bg-[var(--primary)] text-white">New</span>

// Featured badge - Gold
<span className="bg-[var(--secondary)] text-[var(--secondary-foreground)]">Featured</span>

// Info badge - Blue
<span className="bg-[var(--accent)] text-white">Info</span>
```

## Color Accessibility

### Contrast Ratios
- **Green (#0F6B3F) on White**: ✅ WCAG AA (4.5:1)
- **Green with White Text**: ✅ WCAG AA (4.5:1)
- **Gold (#F4B400) on Dark**: ✅ WCAG AA (4.5:1)
- **Blue (#1F3A5F) on White**: ✅ WCAG AA (4.5:1)

### Text Colors
- **On Green Background**: Always white
- **On Gold Background**: Dark text (#1A2E23)
- **On Blue Background**: Always white
- **On White Background**: Dark text (#1A2E23)

## Implementation Checklist

When updating components:
- [ ] Green buttons have white text
- [ ] Gold is used for premium/secondary features
- [ ] Blue is used for info/trust elements
- [ ] Colors are used strategically, not randomly
- [ ] Contrast ratios meet accessibility standards
- [ ] Brand name is "2RBUAME" not "BUAME 2R"


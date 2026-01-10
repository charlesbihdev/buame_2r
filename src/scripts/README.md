# Color Replacement Scripts for 2RBUAME

These scripts automatically replace hardcoded hex colors in your JSX/JS files with CSS variable references from `app.css`, ensuring consistent brand colors and proper contrast.

## Usage

### Preview changes (dry run)
```bash
npm run replace-colors:dry
```

### Apply changes
```bash
npm run replace-colors
```

### Fix button colors (ensure green buttons have white text)
```bash
npm run fix-buttons:dry    # Preview
npm run fix-buttons        # Apply
```

### Verbose output (see detailed changes)
```bash
npm run replace-colors:verbose
```

### Process specific file or directory
```bash
node scripts/replace-colors.js --path=resources/js/components/visitor
```

### Combine options
```bash
node scripts/replace-colors.js --dry-run --verbose --path=resources/js/pages
```

## Brand Identity
- **Brand Name**: 2RBUAME (not BUAME 2R)
- **Primary**: Deep Green (#0F6B3F) - Main actions, CTAs
- **Secondary**: Golden Yellow (#F4B400) - Premium features, secondary actions
- **Tertiary**: Dark Blue (#1F3A5F) - Info, trust elements

## Color Mappings

The script replaces the following hardcoded colors with CSS variables:

### Brand Colors
- `#0F6B3F` → `var(--primary)` (Deep Green)
- `#128A4F` → `var(--primary)` (Light Green)
- `#0A5230` → `var(--buame-primary-dark)` (Dark Green)
- `#F4B400` → `var(--secondary)` (Golden Yellow)
- `#FFCA28` → `var(--secondary)` (Light Gold)
- `#1F3A5F` → `var(--accent)` (Dark Blue)
- `#2E4A73` → `var(--accent)` (Light Blue)

### Text Colors
- `#0d1b0d` → `var(--foreground)`
- `#1A2E23` → `var(--foreground)`
- `#1b1b18` → `var(--foreground)`
- `#4A6B5A` → `var(--muted-foreground)`

### Background Colors
- `#F8FAF9` → `var(--background)`
- `#f8fcf8` → `var(--background)`
- `#FDFDFC` → `var(--background)`
- `#0A1F14` → `var(--buame-background-dark)`
- `#102210` → `var(--buame-background-dark)`
- `#162816` → `var(--card)`
- `#132920` → `var(--card)`

### Border Colors
- `#e7f3e7` → `var(--buame-border-light)`
- `#D4E5DC` → `var(--border)`
- `#1F3D2E` → `var(--border)`

### Legacy Colors
- `#13ec13` → `var(--primary)` (Bright green mapped to brand primary)
- `#0fdc0f` → `var(--primary)`

### Preserved Colors
- `#25D366` - WhatsApp green (kept as-is)
- `#20bd5a` - WhatsApp hover (kept as-is)

## Context-Aware Replacements

The script also handles Tailwind class patterns:
- `dark:bg-[#162816]` → `dark:bg-[var(--card)]`
- `dark:text-[#13ec13]` → `dark:text-[var(--primary)]`
- `border-[#e7f3e7]` → `border-[var(--buame-border-light)]`
- `bg-[#13ec13]` → `bg-[var(--primary)]`
- `text-[#0d1b0d]` → `text-[var(--foreground)]`

## Examples

### Before
```jsx
<div className="bg-[#0d1b0d] text-[#13ec13] dark:bg-[#162816]">
    <button className="border-[#e7f3e7] hover:bg-[#13ec13]">
        Click me
    </button>
</div>
```

### After
```jsx
<div className="bg-[var(--buame-background-dark)] text-[var(--primary)] dark:bg-[var(--card)]">
    <button className="border-[var(--buame-border-light)] hover:bg-[var(--primary)]">
        Click me
    </button>
</div>
```

## Safety Features

1. **Dry Run Mode**: Always test with `--dry-run` first
2. **Backup**: The script modifies files in place - commit your changes first
3. **File Filtering**: Automatically ignores:
   - `node_modules/`
   - Build directories
   - Config files
   - Non-JS/JSX files

## Troubleshooting

### Script doesn't find files
Make sure you're running from the `src` directory or adjust the path:
```bash
cd src
npm run replace-colors:dry
```

### Colors not being replaced
Some colors might need manual review. Check the verbose output:
```bash
npm run replace-colors:verbose
```

### Need to add new color mappings
Edit `src/scripts/replace-colors.js` and add to the `COLOR_MAPPINGS` object.

## Button Color Rules

### ✅ Green Buttons (Primary Actions)
- **Background**: `bg-[var(--primary)]` or `bg-primary`
- **Text**: **MUST be white** (`text-white` or `text-primary-foreground`)
- **Example**: `<Button className="bg-[var(--primary)] text-white">Sign Up</Button>`

### ✅ Gold Buttons (Secondary Actions)
- **Background**: `bg-[var(--secondary)]` or `bg-secondary`
- **Text**: Dark text (`text-[var(--secondary-foreground)]`)

### ✅ Blue Buttons (Info Actions)
- **Background**: `bg-[var(--accent)]` or `bg-accent`
- **Text**: White (`text-white` or `text-accent-foreground`)

## Strategic Color Usage

See `COLOR_STRATEGY.md` for detailed guidelines on when to use each color:
- 🟢 **Green**: Primary CTAs, success states, navigation
- 🟡 **Gold**: Premium features, secondary actions, achievements
- 🔵 **Blue**: Information, trust elements, tech features

## Best Practices

1. **Always run dry-run first**: `npm run replace-colors:dry`
2. **Fix button colors**: Run `npm run fix-buttons:dry` after color replacement
3. **Review changes**: Use `--verbose` to see what will be changed
4. **Commit before running**: Make sure your work is committed
5. **Test after**: Build and test your app after running the script
6. **Use colors strategically**: Don't just use green everywhere - use gold and blue appropriately
7. **Manual review**: Some edge cases may need manual fixes


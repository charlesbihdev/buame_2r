# Marketplace Feature Plan

## Overview

Transform the marketplace into a store-based system with tiered product limits and payment structure.

---

## 1. Database Changes

### New Table: `stores`

Create a new `stores` table to manage store information:

```php
Schema::create('stores', function (Blueprint $table) {
    $table->id();
    $table->foreignId('user_id')->constrained()->onDelete('cascade');
    $table->string('name'); // Store name
    $table->string('slug')->unique()->index(); // URL-friendly slug (e.g., "johns-electronics")
    $table->text('description')->nullable(); // Store description
    $table->enum('tier', ['starter', 'professional', 'enterprise'])->default('starter')->index();
    $table->date('tier_expires_at')->nullable(); // When tier expires (if applicable)
    $table->boolean('is_active')->default(true)->index();
    $table->timestamps();
});
```

**Fields:**

- `user_id`: One store per user
- `name`: Display name for the store
- `slug`: Unique URL slug (e.g., `/store/johns-electronics`)
- `description`: Optional store description/bio
- `tier`: Current subscription tier (`starter`, `professional`, `enterprise`)
- `tier_expires_at`: Optional expiration date for tier
- `is_active`: Enable/disable store visibility

### Modify `marketplace_products` Table

Add `store_id` foreign key to link products to stores:

```php
// Add to existing migration
$table->foreignId('store_id')->nullable()->constrained()->onDelete('cascade')->after('user_id');
$table->index('store_id');
```

**Note:** Products can exist without a store initially (for backward compatibility), but new products should require a store.

---

## 2. Configuration: Tier System

### Update `config/categories.php`

Add marketplace tiers configuration:

```php
'marketplace' => [
    'label' => 'Marketplace',
    'price' => 20.00, // Base price (deprecated, use tiers)
    'description' => 'Sell products and goods online',
    'tiers' => [
        'starter' => [
            'name' => 'Starter Store',
            'price' => 20.00,
            'product_limit' => 5,
            'description' => 'Perfect for small sellers just getting started',
        ],
        'professional' => [
            'name' => 'Professional Store',
            'price' => 35.00,
            'product_limit' => 10,
            'description' => 'Ideal for growing businesses',
        ],
        'enterprise' => [
            'name' => 'Enterprise Store',
            'price' => 50.00,
            'product_limit' => 20,
            'description' => 'For established sellers with large catalogs',
        ],
    ],
],
```

**Tier Names:**

- **Starter Store** (Tier 1): 5 products - GH₵ 20
- **Professional Store** (Tier 2): 10 products - GH₵ 35
- **Enterprise Store** (Tier 3): 20 products - GH₵ 50

---

## 3. Models & Relationships

### New Model: `Store.php`

```php
class Store extends Model
{
    protected $fillable = [
        'user_id',
        'name',
        'slug',
        'description',
        'tier',
        'tier_expires_at',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'tier_expires_at' => 'date',
            'is_active' => 'boolean',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function products()
    {
        return $this->hasMany(MarketplaceProduct::class);
    }

    public function getProductLimitAttribute()
    {
        return config("categories.list.marketplace.tiers.{$this->tier}.product_limit", 5);
    }

    public function getRemainingProductSlotsAttribute()
    {
        $used = $this->products()->count();
        return max(0, $this->product_limit - $used);
    }
}
```

### Update `MarketplaceProduct.php`

Add store relationship:

```php
public function store()
{
    return $this->belongsTo(Store::class);
}
```

### Update `User.php`

Add store relationship:

```php
public function store()
{
    return $this->hasOne(Store::class);
}
```

---

## 4. Payment Flow

### Store Payment Process

1. User selects marketplace category during registration or from dashboard
2. User chooses a tier (Starter/Professional/Enterprise)
3. Payment is processed via Paystack
4. After successful payment:
    - Create/store is activated
    - User is redirected to store setup (name, slug, description)
    - Store is linked to user

### Payment Controller Updates

- Check if user already has a store
- If upgrading tier, handle upgrade payment
- Store tier selection in session during payment flow

---

## 5. Frontend Changes

### Dashboard Components

#### A. Store Settings Tab (`StoreSettings.jsx`)

**Update to include:**

- Store name input
- Slug input (auto-generated from name, editable)
- Store description textarea
- Current tier display with upgrade option
- Product limit indicator (e.g., "5/5 products used")
- Store URL display (`/store/{slug}`)
- Store activation toggle

#### B. Products Tab (`MyProducts.jsx`)

**Update to:**

- Show product count vs limit (e.g., "3/5 products")
- Disable "Add Product" button if limit reached
- Show upgrade prompt if limit reached
- Display products in grid/list view
- Link products to store

#### C. Add Product Modal (`ProductFormModal.jsx`) - NEW

**Create modal component for quick product addition:**

- Triggered from dashboard top-right button
- Form fields: title, category, price, condition, description, images
- Submit via Inertia POST
- Close modal on success

#### D. Dashboard Top-Right Button

**Add floating/header button:**

- "+ Add Product" button in dashboard header
- Opens `ProductFormModal`
- Only visible when store is active and has remaining slots

#### E. Sidebar Navigation

**Add "Products" tab:**

- Add "Products" to sidebar navigation
- Links to products management section
- Shows product count badge

---

## 6. Store UI (Visitor-Facing)

### Store Page Route

- Route: `/store/{slug}`
- Controller: `Visitor\StoreController@show`
- View: `visitor/stores/show.jsx`

### Store Page Features

- Store header (name, description)
- Product catalog grid
- Filter by category
- Search products
- Pagination
- Store contact info (optional)

### Components Needed

- `StoreHeader.jsx`: Store name, description, contact
- `StoreCatalog.jsx`: Product grid with filters
- `ProductCard.jsx`: Individual product display

---

## 7. Migration Strategy

### Step 1: Create `stores` Migration

```bash
php artisan make:migration create_stores_table
```

### Step 2: Modify `marketplace_products` Migration

Edit existing migration file directly (development mode):

- Add `store_id` column
- Add foreign key constraint

### Step 3: Create Store for Existing Users

Create a migration to:

- Generate stores for users with existing products
- Auto-generate slugs from user names
- Set default tier to 'starter'

---

## 8. Controllers

### New: `User\Dashboard\StoreController.php`

- `show()`: Display store settings
- `update()`: Update store name, slug, description
- `upgrade()`: Handle tier upgrade payment

### Update: `User\Dashboard\MarketplaceController.php`

- `index()`: Load store, products, tier info
- `createProduct()`: Create new product (check limit)
- `updateProduct()`: Update existing product
- `deleteProduct()`: Delete product

### New: `Visitor\StoreController.php`

- `show($slug)`: Display store page with products
- `index()`: List all stores (optional)

---

## 9. Validation & Business Logic

### Product Limit Enforcement

- Before creating product: Check `store->remaining_product_slots > 0`
- Show error message if limit reached
- Offer upgrade option in error message

### Slug Generation

- Auto-generate from store name: `str()->slug($name)`
- Ensure uniqueness: Append number if exists
- Validate: Only lowercase letters, numbers, hyphens

### Store Activation

- Store must be active to display products publicly
- Products can be created even if store is inactive (for setup)

---

## 10. Routes

### User Dashboard Routes

```php
Route::prefix('user/dashboard/marketplace')->name('user.dashboard.marketplace.')->group(function () {
    Route::get('/', [MarketplaceController::class, 'index']);
    Route::post('/products', [MarketplaceController::class, 'storeProduct']);
    Route::put('/products/{id}', [MarketplaceController::class, 'updateProduct']);
    Route::delete('/products/{id}', [MarketplaceController::class, 'deleteProduct']);
    Route::put('/store', [StoreController::class, 'update']);
    Route::post('/store/upgrade', [StoreController::class, 'upgrade']);
});
```

### Visitor Routes

```php
Route::get('/store/{slug}', [Visitor\StoreController::class, 'show'])->name('store.show');
```

---

## 11. Questions for Discussion

1. **Product Limit Enforcement:**

    - Should we prevent product creation if limit is reached, or allow creation but hide from public?
    - Should we allow downgrading tiers if user has more products than new limit?

2. **Store Slug:**

    - Should slug be editable after creation?
    - What happens if user changes slug? (301 redirect?)

3. **Tier Expiration:**

    - Should tiers expire, or are they lifetime after payment?
    - If expiring, what happens to products when tier expires?

4. **Existing Products:**

    - How do we handle products created before store system?
    - Auto-assign to store, or require manual assignment?

5. **Store Description:**

    - Should this be required or optional?
    - Character limit?

6. **Store Visibility:**

    - Should inactive stores still be accessible via direct URL?
    - Or completely hidden?

7. **Product Form Modal:**

    - Should it be a full-page form or a modal?
    - What fields are essential for quick add?

8. **Upgrade Flow:**
    - Can users upgrade directly from dashboard?
    - Or do they need to go through payment page again?

---

## 12. Implementation Order

1. ✅ Create `stores` migration
2. ✅ Modify `marketplace_products` migration (add `store_id`)
3. ✅ Update `config/categories.php` with tiers
4. ✅ Create `Store` model with relationships
5. ✅ Update `MarketplaceProduct` and `User` models
6. ✅ Create `StoreController` for dashboard
7. ✅ Update `MarketplaceController` with product limit checks
8. ✅ Update `StoreSettings.jsx` component
9. ✅ Update `MyProducts.jsx` with limit indicators
10. ✅ Create `ProductFormModal.jsx`
11. ✅ Add dashboard top-right button
12. ✅ Add "Products" to sidebar
13. ✅ Create `Visitor\StoreController`
14. ✅ Create visitor store page (`/store/{slug}`)
15. ✅ Create store catalog components
16. ✅ Update payment flow to handle tier selection
17. ✅ Create migration to generate stores for existing users

---

## Next Steps

Please review this plan and let me know:

1. Any changes or additions needed
2. Answers to the discussion questions
3. Which tier names you prefer (or suggest alternatives)
4. Any other considerations

Once approved, we'll proceed with implementation! 🚀

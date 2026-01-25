# Review & Rating System Implementation Plan

## Overview
Add review/rating functionality to all category view pages using Inertia.js (no API). Visitors can review without accounts. Rating calculated from reviews table.

---

## Phase 1: Database Migration Edits

### 1.1 Edit artisans migration - REMOVE rating columns
**File:** `src/database/migrations/2025_12_31_145917_create_artisans_table.php`
```php
// DELETE THESE LINES:
$table->decimal('rating', 3, 2)->default(0.00)->index();
$table->integer('reviews_count')->default(0);
```

### 1.2 Edit hotels migration - REMOVE rating columns
**File:** `src/database/migrations/2025_12_31_145935_create_hotels_table.php`
```php
// DELETE THESE LINES:
$table->decimal('rating', 3, 2)->default(0.00)->index();
$table->integer('reviews_count')->default(0);
```

### 1.3 Edit transport_rides migration - REMOVE rating columns
**File:** `src/database/migrations/2025_12_31_150049_create_transport_rides_table.php`
```php
// DELETE THESE LINES:
$table->decimal('rating', 3, 2)->default(0.00)->index();
$table->integer('reviews_count')->default(0);
```

### 1.4 Edit marketplace_products migration - REMOVE rating columns
**File:** `src/database/migrations/2025_12_31_150226_create_marketplace_products_table.php`
```php
// DELETE THESE LINES:
$table->decimal('rating', 3, 2)->default(0.00)->index();
$table->integer('reviews_count')->default(0);
```

### 1.5 Edit reviews migration - NEW STRUCTURE
**File:** `src/database/migrations/2025_12_31_150316_create_reviews_table.php`
**Replace entire content with:**
```php
Schema::create('reviews', function (Blueprint $table) {
    $table->id();

    // Reviewer info (visitors, no account required)
    $table->string('reviewer_name');
    $table->string('reviewer_phone');

    // Review content
    $table->integer('rating')->index(); // 1-5
    $table->text('comment')->nullable();

    // Moderation - admin must approve before visible
    $table->boolean('is_approved')->default(false)->index();

    // Optional foreign keys for each category (only one will be set)
    $table->foreignId('artisan_id')->nullable()->constrained()->onDelete('cascade');
    $table->foreignId('hotel_id')->nullable()->constrained()->onDelete('cascade');
    $table->foreignId('transport_ride_id')->nullable()->constrained()->onDelete('cascade');
    $table->foreignId('marketplace_product_id')->nullable()->constrained()->onDelete('cascade');
    $table->foreignId('rental_id')->nullable()->constrained()->onDelete('cascade');
    $table->foreignId('job_id')->nullable()->constrained('job_listings')->onDelete('cascade');
    $table->foreignId('store_id')->nullable()->constrained()->onDelete('cascade');

    $table->timestamps();
});

// Review images table
Schema::create('review_images', function (Blueprint $table) {
    $table->id();
    $table->foreignId('review_id')->constrained()->onDelete('cascade');
    $table->string('image_path');
    $table->timestamps();
});
```

---

## Phase 2: Model Updates

### 2.1 Create ReviewImage Model (NEW)
**File:** `src/app/Models/ReviewImage.php`
```php
class ReviewImage extends Model
{
    protected $fillable = ['review_id', 'image_path'];

    public function review(): BelongsTo
    {
        return $this->belongsTo(Review::class);
    }
}
```

### 2.2 Edit Review Model - NEW STRUCTURE
**File:** `src/app/Models/Review.php`
**Replace with:**
```php
class Review extends Model
{
    protected $fillable = [
        'reviewer_name',
        'reviewer_phone',
        'rating',
        'comment',
        'is_approved',
        'artisan_id',
        'hotel_id',
        'transport_ride_id',
        'marketplace_product_id',
        'rental_id',
        'job_id',
        'store_id',
    ];

    protected function casts(): array
    {
        return [
            'is_approved' => 'boolean',
        ];
    }

    // Scope for approved reviews only
    public function scopeApproved(Builder $query): Builder
    {
        return $query->where('is_approved', true);
    }

    public function images(): HasMany
    {
        return $this->hasMany(ReviewImage::class);
    }

    // Relationships to each category
    public function artisan(): BelongsTo { return $this->belongsTo(Artisan::class); }
    public function hotel(): BelongsTo { return $this->belongsTo(Hotel::class); }
    public function transportRide(): BelongsTo { return $this->belongsTo(TransportRide::class); }
    public function marketplaceProduct(): BelongsTo { return $this->belongsTo(MarketplaceProduct::class); }
    public function rental(): BelongsTo { return $this->belongsTo(Rental::class); }
    public function job(): BelongsTo { return $this->belongsTo(Job::class, 'job_id'); }
    public function store(): BelongsTo { return $this->belongsTo(Store::class); }
}
```

### 2.3 Edit Artisan Model
**File:** `src/app/Models/Artisan.php`
**Changes:**
- Remove `rating`, `reviews_count` from `$fillable`
- Add relationship and cached accessors (only count APPROVED reviews):
```php
public function reviews(): HasMany
{
    return $this->hasMany(Review::class);
}

public function getAverageRatingAttribute(): float
{
    return Cache::remember("artisan.{$this->id}.rating", 300, fn() =>
        round($this->reviews()->approved()->avg('rating') ?? 0, 1)
    );
}

public function getReviewsCountAttribute(): int
{
    return Cache::remember("artisan.{$this->id}.reviews_count", 300, fn() =>
        $this->reviews()->approved()->count()
    );
}
```

### 2.4-2.9 Same pattern for (only count APPROVED reviews):
- `src/app/Models/Hotel.php` - reviews() + cached accessors with ->approved()
- `src/app/Models/TransportRide.php` - reviews() + cached accessors with ->approved()
- `src/app/Models/MarketplaceProduct.php` - reviews() + cached accessors with ->approved()
- `src/app/Models/Rental.php` - reviews() + cached accessors with ->approved()
- `src/app/Models/Job.php` - reviews() + cached accessors with ->approved()
- `src/app/Models/Store.php` - reviews() + cached accessors with ->approved()

---

## Phase 3: Backend (Inertia Controllers)

### 3.1 Create StoreReviewRequest (NEW)
**File:** `src/app/Http/Requests/StoreReviewRequest.php`
```php
class StoreReviewRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // Visitors can submit reviews
    }

    public function rules(): array
    {
        return [
            'reviewer_name' => 'required|string|max:100',
            'reviewer_phone' => 'required|string|max:20',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string|max:1000',
            'images' => 'nullable|array|max:3',
            'images.*' => 'image|mimes:jpeg,png,jpg,webp|max:2048',
        ];
    }
}
```

### 3.2 Create ReviewController (NEW) - For Inertia
**File:** `src/app/Http/Controllers/Visitor/ReviewController.php`
```php
class ReviewController extends Controller
{
    public function store(StoreReviewRequest $request, string $type, int $id): RedirectResponse
    {
        // Map type to foreign key column
        $foreignKeyMap = [
            'artisan' => 'artisan_id',
            'hotel' => 'hotel_id',
            'transport' => 'transport_ride_id',
            'marketplace' => 'marketplace_product_id',
            'rental' => 'rental_id',
            'job' => 'job_id',
            'store' => 'store_id',
        ];

        // Create review with foreign key
        $review = Review::create([
            'reviewer_name' => $request->reviewer_name,
            'reviewer_phone' => $request->reviewer_phone,
            'rating' => $request->rating,
            'comment' => $request->comment,
            $foreignKeyMap[$type] => $id,
        ]);

        // Upload images if provided
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('reviews', 'public');
                $review->images()->create(['image_path' => $path]);
            }
        }

        // Clear rating cache
        Cache::forget("{$type}.{$id}.rating");
        Cache::forget("{$type}.{$id}.reviews_count");

        return back()->with('success', 'Review submitted successfully!');
    }
}
```

### 3.3 Add Web Routes
**File:** `src/routes/web.php`
**Add:**
```php
Route::post('/reviews/{type}/{id}', [ReviewController::class, 'store'])->name('reviews.store');
```

---

## Phase 4: Frontend Components (NEW FILES)

### 4.1 StarRating Component
**File:** `src/resources/js/components/ui/star-rating.jsx`
- Props: `value`, `onChange`, `readonly`, `size` (sm/md/lg)
- Interactive hover states when editable
- Yellow filled stars, gray empty stars

### 4.2 ReviewCard Component
**File:** `src/resources/js/components/ui/review-card.jsx`
- Props: `review` object
- Reviewer initials avatar
- Star rating display (readonly)
- Comment text
- Image thumbnails grid

### 4.3 ReviewForm Component
**File:** `src/resources/js/components/ui/review-form.jsx`
- Props: `reviewableType`, `reviewableId`, `onSuccess`, `onCancel`
- Inertia useForm for submission
- Fields: reviewer_name, reviewer_phone, rating (star selector with hover), comment
- Image upload: drag & drop zone, max 3 images, 2MB each, preview thumbnails with remove
- Rating labels: Poor, Fair, Good, Very Good, Excellent
- Submit to `/reviews/{type}/{id}`

### 4.4 ReviewList Component
**File:** `src/resources/js/components/ui/review-list.jsx`
- Props: `reviews`, `onLoadMore`, `hasMore`
- List of ReviewCard components
- Load more / show more functionality
- Empty state

### 4.5 ReviewSection Component
**File:** `src/resources/js/components/ui/review-section.jsx`
- Props: `reviewableType`, `reviewableId`, `reviews`, `averageRating`, `reviewsCount`
- Rating summary with breakdown bars
- Collapsible ReviewForm
- ReviewList

---

## Phase 5: Category Page Integration (EDIT FILES)

### 5.1 Marketplace View
**File:** `src/resources/js/pages/visitor/marketplace/view.jsx`
- Import ReviewSection
- Add below product details
- Pass: `reviewableType="marketplace"`, product.reviews, product.average_rating, product.reviews_count

### 5.2-5.7 Same pattern for:
- `src/resources/js/pages/visitor/artisans/view.jsx` - type="artisan"
- `src/resources/js/pages/visitor/hotels/view.jsx` - type="hotel"
- `src/resources/js/pages/visitor/transport/view.jsx` - type="transport"
- `src/resources/js/pages/visitor/rentals/view.jsx` - type="rental"
- `src/resources/js/pages/visitor/jobs/view.jsx` - type="job"
- `src/resources/js/pages/visitor/stores/show.jsx` - type="store"

---

## Phase 6: Controller Updates (Pass reviews via Inertia)

### 6.1-6.7 Update Visitor Controllers show() methods
**Files:**
- `src/app/Http/Controllers/Visitor/MarketplaceController.php`
- `src/app/Http/Controllers/Visitor/ArtisansController.php`
- `src/app/Http/Controllers/Visitor/HotelsController.php`
- `src/app/Http/Controllers/Visitor/TransportController.php`
- `src/app/Http/Controllers/Visitor/RentalsController.php`
- `src/app/Http/Controllers/Visitor/JobsController.php`
- `src/app/Http/Controllers/Visitor/StoreController.php`

**Changes:**
- Eager load `reviews.images`
- Pass to Inertia: `reviews`, `average_rating`, `reviews_count`, `rating_breakdown`

Example:
```php
return Inertia::render('visitor/marketplace/view', [
    'product' => $product,
    'reviews' => $product->reviews()->approved()->with('images')->latest()->take(10)->get(),
    'average_rating' => $product->average_rating,
    'reviews_count' => $product->reviews_count,
    'rating_breakdown' => $this->getRatingBreakdown($product), // Only approved reviews
]);
```

---

## Files Summary

### NEW FILES (7):
```
src/app/Models/ReviewImage.php
src/app/Http/Requests/StoreReviewRequest.php
src/app/Http/Controllers/Visitor/ReviewController.php
src/resources/js/components/ui/star-rating.jsx
src/resources/js/components/ui/review-card.jsx
src/resources/js/components/ui/review-form.jsx
src/resources/js/components/ui/review-list.jsx
src/resources/js/components/ui/review-section.jsx
```

### EDIT FILES (19):
```
Database Migrations:
├── src/database/migrations/2025_12_31_145917_create_artisans_table.php
├── src/database/migrations/2025_12_31_145935_create_hotels_table.php
├── src/database/migrations/2025_12_31_150049_create_transport_rides_table.php
├── src/database/migrations/2025_12_31_150226_create_marketplace_products_table.php
└── src/database/migrations/2025_12_31_150316_create_reviews_table.php

Models:
├── src/app/Models/Review.php
├── src/app/Models/Artisan.php
├── src/app/Models/Hotel.php
├── src/app/Models/MarketplaceProduct.php
├── src/app/Models/TransportRide.php
├── src/app/Models/Rental.php
├── src/app/Models/Job.php
└── src/app/Models/Store.php

Routes:
└── src/routes/web.php

Controllers:
├── src/app/Http/Controllers/Visitor/MarketplaceController.php
├── src/app/Http/Controllers/Visitor/ArtisansController.php
├── src/app/Http/Controllers/Visitor/HotelsController.php
├── src/app/Http/Controllers/Visitor/TransportController.php
├── src/app/Http/Controllers/Visitor/RentalsController.php
├── src/app/Http/Controllers/Visitor/JobsController.php
└── src/app/Http/Controllers/Visitor/StoreController.php

Frontend Pages:
├── src/resources/js/pages/visitor/marketplace/view.jsx
├── src/resources/js/pages/visitor/artisans/view.jsx
├── src/resources/js/pages/visitor/hotels/view.jsx
├── src/resources/js/pages/visitor/transport/view.jsx
├── src/resources/js/pages/visitor/rentals/view.jsx
├── src/resources/js/pages/visitor/jobs/view.jsx
└── src/resources/js/pages/visitor/stores/show.jsx
```

---

## UI Design (Consistent with existing design patterns)

### Design Tokens (from existing components)
- Card: `rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-[var(--card)]`
- Primary button: `bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90`
- Outline button: `border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white`
- Input: Uses existing `<Input />` component
- Stars: Lucide `Star` icon - filled: `fill-yellow-400 text-yellow-400`, empty: `text-gray-300 dark:text-gray-600`
- Avatar: Uses existing `<Avatar />` with `<AvatarFallback />` for initials
- Icons: Lucide React (Star, Camera, X, ChevronDown, User, Phone, MessageSquare)

### Review Section Layout
```jsx
{/* Full-width card below product/item details */}
<div className="mt-8 rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-[var(--card)]">
  {/* Header with gradient accent */}
  <div className="border-b border-gray-200 bg-gradient-to-r from-[var(--primary)]/5 to-transparent p-6 dark:border-gray-800">
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-xl font-bold text-[var(--foreground)] dark:text-white">
          Customer Reviews
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          See what others are saying
        </p>
      </div>
      <Button onClick={toggleForm}>
        <MessageSquare className="mr-2 h-4 w-4" />
        Write a Review
      </Button>
    </div>
  </div>

  {/* Rating Summary - Two Column Layout */}
  <div className="grid gap-6 p-6 md:grid-cols-2">
    {/* Left: Big Rating Display */}
    <div className="flex flex-col items-center justify-center rounded-xl bg-gray-50 p-6 dark:bg-gray-800/50">
      <div className="text-5xl font-black text-[var(--foreground)] dark:text-white">
        4.5
      </div>
      <div className="mt-2 flex items-center gap-1">
        {/* 5 Stars */}
        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
        <Star className="h-5 w-5 fill-yellow-400/50 text-yellow-400" />
      </div>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        Based on 128 reviews
      </p>
    </div>

    {/* Right: Rating Breakdown Bars */}
    <div className="space-y-3">
      {[5, 4, 3, 2, 1].map((stars) => (
        <div key={stars} className="flex items-center gap-3">
          <span className="w-3 text-sm font-semibold text-gray-600 dark:text-gray-400">
            {stars}
          </span>
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              className="h-full rounded-full bg-yellow-400 transition-all"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <span className="w-8 text-right text-sm text-gray-500 dark:text-gray-400">
            {count}
          </span>
        </div>
      ))}
    </div>
  </div>

  {/* Review Form (Collapsible) */}
  {showForm && (
    <div className="border-t border-gray-200 p-6 dark:border-gray-800">
      {/* Form content */}
    </div>
  )}

  {/* Reviews List */}
  <div className="divide-y divide-gray-200 dark:divide-gray-800">
    {reviews.map((review) => (
      <ReviewCard key={review.id} review={review} />
    ))}
  </div>

  {/* Load More */}
  {hasMore && (
    <div className="border-t border-gray-200 p-4 text-center dark:border-gray-800">
      <Button variant="ghost" onClick={loadMore}>
        Load More Reviews
        <ChevronDown className="ml-2 h-4 w-4" />
      </Button>
    </div>
  )}
</div>
```

### Review Card Design
```jsx
<div className="p-6">
  <div className="flex gap-4">
    {/* Avatar */}
    <Avatar className="h-12 w-12 shrink-0">
      <AvatarFallback className="bg-[var(--primary)]/10 text-[var(--primary)] font-semibold">
        KM
      </AvatarFallback>
    </Avatar>

    {/* Content */}
    <div className="flex-1 min-w-0">
      {/* Header Row */}
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <span className="font-semibold text-[var(--foreground)] dark:text-white">
          Kwame Mensah
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">•</span>
        <div className="flex items-center gap-0.5">
          {[1,2,3,4,5].map((i) => (
            <Star
              key={i}
              className={cn(
                "h-4 w-4",
                i <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300 dark:text-gray-600"
              )}
            />
          ))}
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400">•</span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          2 days ago
        </span>
      </div>

      {/* Comment */}
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Great product! Fast delivery and excellent quality.
        Would definitely recommend to anyone looking for value.
      </p>

      {/* Images Grid (if any) */}
      {images.length > 0 && (
        <div className="mt-4 flex gap-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => openLightbox(img)}
              className="group relative h-20 w-20 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800"
            >
              <img src={img} className="h-full w-full object-cover transition-transform group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            </button>
          ))}
        </div>
      )}
    </div>
  </div>
</div>
```

### Review Form Design
```jsx
<div className="border-t border-gray-200 p-6 dark:border-gray-800">
  <div className="mx-auto max-w-2xl">
    <h3 className="mb-6 text-lg font-bold text-[var(--foreground)] dark:text-white">
      Share Your Experience
    </h3>

    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Two Column for Name & Phone */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="name" className="mb-2 block text-sm font-medium">
            Your Name *
          </Label>
          <Input
            id="name"
            placeholder="Enter your name"
            value={data.reviewer_name}
            onChange={(e) => setData('reviewer_name', e.target.value)}
          />
          {errors.reviewer_name && <FormError message={errors.reviewer_name} />}
        </div>
        <div>
          <Label htmlFor="phone" className="mb-2 block text-sm font-medium">
            Phone Number *
          </Label>
          <Input
            id="phone"
            placeholder="+233 XX XXX XXXX"
            value={data.reviewer_phone}
            onChange={(e) => setData('reviewer_phone', e.target.value)}
          />
          {errors.reviewer_phone && <FormError message={errors.reviewer_phone} />}
        </div>
      </div>

      {/* Star Rating Selector */}
      <div>
        <Label className="mb-2 block text-sm font-medium">
          Your Rating *
        </Label>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setData('rating', star)}
              onMouseEnter={() => setHoveredStar(star)}
              onMouseLeave={() => setHoveredStar(0)}
              className="p-1 transition-transform hover:scale-110"
            >
              <Star
                className={cn(
                  "h-8 w-8 transition-colors",
                  (hoveredStar || data.rating) >= star
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300 dark:text-gray-600 hover:text-yellow-300"
                )}
              />
            </button>
          ))}
          {data.rating > 0 && (
            <span className="ml-3 text-sm font-medium text-gray-600 dark:text-gray-400">
              {['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][data.rating]}
            </span>
          )}
        </div>
        {errors.rating && <FormError message={errors.rating} />}
      </div>

      {/* Comment */}
      <div>
        <Label htmlFor="comment" className="mb-2 block text-sm font-medium">
          Your Review (Optional)
        </Label>
        <Textarea
          id="comment"
          placeholder="Share your experience with this product..."
          rows={4}
          value={data.comment}
          onChange={(e) => setData('comment', e.target.value)}
          className="resize-none"
        />
      </div>

      {/* Image Upload */}
      <div>
        <Label className="mb-2 block text-sm font-medium">
          Add Photos (Optional)
        </Label>
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className={cn(
            "cursor-pointer rounded-xl border-2 border-dashed p-6 text-center transition-colors",
            isDragging
              ? "border-[var(--primary)] bg-[var(--primary)]/5"
              : "border-gray-300 hover:border-[var(--primary)] dark:border-gray-700"
          )}
        >
          <Camera className="mx-auto h-10 w-10 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            <span className="font-semibold text-[var(--primary)]">Click to upload</span> or drag and drop
          </p>
          <p className="mt-1 text-xs text-gray-500">
            Max 3 images, 2MB each (JPEG, PNG, WebP)
          </p>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleFileSelect}
          />
        </div>

        {/* Image Previews */}
        {previewImages.length > 0 && (
          <div className="mt-4 flex gap-3">
            {previewImages.map((preview, i) => (
              <div key={i} className="group relative">
                <img
                  src={preview}
                  className="h-20 w-20 rounded-lg object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Submit Buttons */}
      <div className="flex items-center justify-end gap-3 pt-4">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={processing}>
          {processing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <MessageSquare className="mr-2 h-4 w-4" />
              Submit Review
            </>
          )}
        </Button>
      </div>
    </form>
  </div>
</div>
```

### Empty State Design
```jsx
<div className="p-12 text-center">
  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
    <MessageSquare className="h-8 w-8 text-gray-400" />
  </div>
  <h3 className="mb-2 font-semibold text-[var(--foreground)] dark:text-white">
    No Reviews Yet
  </h3>
  <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
    Be the first to share your experience!
  </p>
  <Button onClick={openForm}>
    <Star className="mr-2 h-4 w-4" />
    Write the First Review
  </Button>
</div>
```

---

## Implementation Order

1. **Migrations** - Edit existing files
2. **Run** `php artisan migrate:fresh --seed`
3. **Models** - Create ReviewImage, update Review and all category models
4. **Backend** - StoreReviewRequest, ReviewController, web routes
5. **Components** - StarRating → ReviewCard → ReviewForm → ReviewList → ReviewSection
6. **Integration** - Add to marketplace/view.jsx first, test
7. **Controllers** - Update show() to pass reviews via Inertia
8. **Roll out** - Add ReviewSection to all other category pages
9. **Run** `vendor/bin/pint --dirty`

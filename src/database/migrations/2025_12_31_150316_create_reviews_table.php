<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();

            // Reviewer info (visitors, no account required)
            $table->string('reviewer_name');
            $table->string('reviewer_phone', 20);

            // Review content
            $table->integer('rating')->index(); // 1-5
            $table->text('comment')->nullable();

            // Moderation - admin must approve before visible
            $table->string('status', 20)->default('pending')->index();


            // Optional foreign keys for each category (only one will be set)
            $table->foreignId('artisan_id')->nullable()->constrained()->onDelete('cascade');
            $table->foreignId('hotel_id')->nullable()->constrained()->onDelete('cascade');
            $table->foreignId('transport_ride_id')->nullable()->constrained()->onDelete('cascade');
            $table->foreignId('marketplace_product_id')->nullable()->constrained()->onDelete('cascade');
            $table->foreignId('rental_id')->nullable()->constrained()->onDelete('cascade');
            $table->foreignId('job_id')->nullable()->constrained('job_listings')->onDelete('cascade');
            $table->foreignId('store_id')->nullable()->constrained()->onDelete('cascade');
            $table->foreignId('job_poster_id')->nullable()->constrained('job_posters')->onDelete('cascade');

            $table->timestamps();
        });

        // Review images table
        Schema::create('review_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('review_id')->constrained()->onDelete('cascade');
            $table->string('image_path');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('review_images');
        Schema::dropIfExists('reviews');
    }
};

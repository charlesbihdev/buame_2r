<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('marketplace_products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->enum('category', ['electronics', 'furniture', 'food', 'agriculture', 'clothes', 'others'])->index();
            $table->decimal('price', 10, 2)->index();
            $table->string('price_type', 50)->nullable();
            $table->enum('condition', ['new', 'like_new', 'used', 'refurbished'])->nullable();
            $table->string('location')->index();
            $table->text('address')->nullable();
            $table->decimal('latitude', 10, 8)->nullable();
            $table->decimal('longitude', 11, 8)->nullable();
            $table->string('phone', 20);
            $table->string('whatsapp', 20)->nullable();
            $table->string('email')->nullable();
            $table->text('description')->nullable();
            $table->boolean('delivery_available')->default(false);
            $table->string('warranty')->nullable();
            $table->decimal('rating', 3, 2)->default(0.00)->index();
            $table->integer('reviews_count')->default(0);
            $table->boolean('is_verified')->default(false)->index();
            $table->boolean('is_active')->default(true)->index();
            $table->integer('views_count')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('marketplace_products');
    }
};

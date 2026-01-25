<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('transport_rides', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('driver_name');
            $table->enum('type', ['okada', 'car', 'taxi', 'bus', 'cargo', 'other'])->index();
            $table->decimal('price_per_seat', 10, 2);
            $table->integer('seats_available');
            $table->string('location')->index();
            $table->text('address')->nullable();
            $table->decimal('latitude', 10, 8)->nullable();
            $table->decimal('longitude', 11, 8)->nullable();
            $table->text('operating_locations')->nullable(); // Replaces routes table per discussion
            $table->string('phone', 20);
            $table->string('whatsapp', 20)->nullable();
            $table->string('email')->nullable();
            $table->text('description')->nullable();
            $table->string('operating_hours')->nullable();
            $table->json('payment_methods')->nullable();
            $table->boolean('is_verified')->default(false)->index();
            $table->boolean('is_active')->default(true)->index();
            $table->integer('views_count')->default(0);
            $table->timestamps();

            $table->index(['latitude', 'longitude']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('transport_rides');
    }
};

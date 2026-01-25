<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('artisans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->string('company_name')->nullable();
            $table->enum('skill_type', [
                'carpenter', 'mason', 'electrician', 'plumber', 'tiler', 'tailor', 'welder', 'painter',
                'hairdressing', 'mechanic', 'bakery', 'decoration', 'makeup_artistry',
                'bead_making', 'shoe_making', 'event_mc', 'event_planners', 'other',
            ])->index();
            $table->integer('experience_years')->nullable();
            $table->enum('experience_level', ['beginner', 'intermediate', 'expert'])->default('expert');
            $table->decimal('price_per_day', 10, 2)->nullable();
            $table->boolean('show_price')->default(false);
            $table->string('location')->index();
            $table->text('address')->nullable();
            $table->decimal('latitude', 10, 8)->nullable();
            $table->decimal('longitude', 11, 8)->nullable();
            $table->string('phone', 20);
            $table->string('whatsapp', 20)->nullable();
            $table->string('email')->nullable();
            $table->text('description')->nullable();
            $table->string('profile_image')->nullable();
            $table->boolean('is_verified')->default(false)->index();
            $table->boolean('is_available')->default(true)->index();
            $table->string('working_hours')->nullable();
            $table->boolean('is_active')->default(true)->index();
            $table->integer('views_count')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('artisans');
    }
};

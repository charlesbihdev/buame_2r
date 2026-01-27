<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Create job_posters table first (employer profiles)
        Schema::create('job_posters', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->string('slug')->unique()->index();
            $table->text('description')->nullable();
            $table->string('logo')->nullable();
            $table->string('location')->nullable();
            $table->string('phone', 20)->nullable();
            $table->string('whatsapp', 20)->nullable();
            $table->string('email')->nullable();
            $table->string('website')->nullable();
            $table->boolean('is_verified')->default(false)->index();
            $table->boolean('is_active')->default(false)->index();
            $table->timestamps();
        });

        // Create job_listings table (individual job postings)
        Schema::create('job_listings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('job_poster_id')->constrained()->onDelete('cascade');
            $table->string('company')->nullable(); // Company name for this specific job
            $table->string('phone', 20)->nullable(); // Contact phone for this job
            $table->string('whatsapp', 20)->nullable(); // WhatsApp for this job
            $table->string('email')->nullable(); // Contact email for this job
            $table->string('title');
            $table->enum('type', ['full_time', 'part_time', 'daily_wage', 'apprenticeship'])->index();
            $table->enum('category', ['construction_trades', 'home_services', 'auto_mechanical', 'transport_equipment', 'electrical_electronics', 'ict_digital', 'business_office', 'education_training', 'health_care', 'hospitality_events', 'fashion_beauty', 'agriculture', 'security', 'media_creative', 'general_jobs'])->nullable()->index();
            $table->string('salary')->nullable();
            $table->string('location')->index();
            $table->text('address')->nullable();
            $table->decimal('latitude', 10, 8)->nullable();
            $table->decimal('longitude', 11, 8)->nullable();
            $table->text('description');
            $table->text('requirements')->nullable();
            $table->text('responsibilities')->nullable();
            $table->text('benefits')->nullable();
            $table->string('application_link')->nullable();
            $table->text('application_instructions')->nullable();
            $table->boolean('is_urgent')->default(false)->index();
            $table->timestamp('posted_at')->nullable()->index();
            $table->timestamp('expires_at')->nullable();
            $table->boolean('is_active')->default(false)->index();
            $table->integer('views_count')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('job_listings');
        Schema::dropIfExists('job_posters');
    }
};

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        // Drop old index if it exists (from previous migration with salary_min/salary_max)
        // This fixes the error when the index exists but columns don't
        try {
            DB::statement('DROP INDEX IF EXISTS job_listings_salary_min_salary_max_index');
        } catch (\Exception $e) {
            // Index might not exist or already dropped, ignore
        }

        if (!Schema::hasTable('job_listings')) {
            Schema::create('job_listings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->string('company');
            $table->enum('type', ['full_time', 'part_time', 'daily_wage', 'apprenticeship'])->index();
            $table->enum('category', ['construction_trades', 'home_services', 'auto_mechanical', 'transport_equipment', 'electrical_electronics', 'ict_digital', 'business_office', 'education_training', 'health_care', 'hospitality_events', 'fashion_beauty', 'agriculture', 'security', 'media_creative', 'general_jobs'])->nullable()->index();
            $table->string('salary')->nullable();
            $table->string('location')->index();
            $table->text('address')->nullable();
            $table->decimal('latitude', 10, 8)->nullable();
            $table->decimal('longitude', 11, 8)->nullable();
            $table->string('phone', 20);
            $table->string('whatsapp', 20)->nullable();
            $table->string('email')->nullable();
            $table->text('description');
            $table->text('requirements')->nullable();
            $table->text('responsibilities')->nullable();
            $table->text('benefits')->nullable();
            $table->string('application_link')->nullable();
            $table->text('application_instructions')->nullable();
            $table->boolean('is_urgent')->default(false)->index();
            $table->boolean('is_verified_employer')->default(false)->index();
            $table->timestamp('posted_at')->nullable()->index();
            $table->timestamp('expires_at')->nullable();
            $table->boolean('is_active')->default(true)->index();
            $table->integer('views_count')->default(0);
            $table->integer('applications_count')->default(0);
            $table->timestamps();
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('job_listings');
    }
};

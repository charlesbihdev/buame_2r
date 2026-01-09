<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('job_listings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->string('company');
            $table->enum('type', ['full_time', 'part_time', 'daily_wage', 'apprenticeship'])->index();
            $table->enum('category', ['agriculture', 'construction', 'hospitality', 'transport', 'domestic_help', 'retail', 'other'])->nullable()->index();
            $table->decimal('salary_min', 10, 2)->nullable();
            $table->decimal('salary_max', 10, 2)->nullable();
            $table->string('salary_display')->nullable();
            $table->string('location')->index();
            $table->text('address')->nullable();
            $table->decimal('latitude', 10, 8)->nullable();
            $table->decimal('longitude', 11, 8)->nullable();
            $table->string('phone', 20);
            $table->string('whatsapp', 20)->nullable();
            $table->string('email')->nullable();
            $table->text('description');
            $table->boolean('is_urgent')->default(false)->index();
            $table->boolean('is_verified_employer')->default(false)->index();
            $table->timestamp('posted_at')->nullable()->index();
            $table->timestamp('expires_at')->nullable();
            $table->boolean('is_active')->default(true)->index();
            $table->integer('views_count')->default(0);
            $table->integer('applications_count')->default(0);
            $table->timestamps();

            $table->index(['salary_min', 'salary_max']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('job_listings');
    }
};

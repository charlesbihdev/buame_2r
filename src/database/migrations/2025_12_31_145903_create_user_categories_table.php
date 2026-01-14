<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('user_categories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->enum('category', ['artisans', 'hotels', 'transport', 'rentals', 'marketplace', 'jobs'])->index();
            $table->foreignId('payment_id')->nullable()->constrained('payments')->onDelete('set null');
            $table->enum('billing_cycle', ['monthly', 'biannually', 'annual'])->default('monthly');
            $table->enum('subscription_status', ['active', 'grace_period', 'expired', 'cancelled'])->default('active');
            $table->timestamp('expires_at')->nullable();
            $table->timestamp('grace_period_ends_at')->nullable();
            $table->timestamp('last_reminder_sent_at')->nullable();
            $table->unsignedTinyInteger('reminder_count')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->unique(['user_id', 'category']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('user_categories');
    }
};

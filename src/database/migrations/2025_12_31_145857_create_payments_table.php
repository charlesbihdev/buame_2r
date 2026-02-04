<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->enum('category', ['artisans', 'hotels', 'transport', 'rentals', 'marketplace', 'jobs'])->index();
            $table->enum('billing_cycle', ['monthly', 'biannually', 'annual'])->default('monthly');
            $table->enum('payment_type', ['initial', 'renewal'])->default('initial');
            $table->foreignId('previous_payment_id')->nullable()->constrained('payments')->onDelete('set null');
            $table->decimal('amount', 10, 2);
            $table->string('currency', 3)->default('GHS');
            $table->enum('payment_method', ['paystack', 'free_trial'])->default('paystack');
            $table->string('transaction_id')->nullable()->index();
            $table->string('payment_reference')->nullable()->index();
            $table->enum('status', ['pending', 'completed', 'failed', 'refunded'])->default('pending')->index();
            $table->timestamp('paid_at')->nullable();
            $table->timestamp('expires_at')->nullable();
            $table->json('metadata')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};

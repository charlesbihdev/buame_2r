<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('subscription_reminders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_category_id')->constrained()->onDelete('cascade');
            $table->enum('channel', ['sms', 'email', 'both'])->default('sms');
            $table->enum('type', ['expiry_warning', 'grace_period', 'final_warning']);
            $table->integer('days_before_expiry')->nullable();
            $table->boolean('was_sent')->default(false);
            $table->timestamp('sent_at')->nullable();
            $table->text('error_message')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('subscription_reminders');
    }
};

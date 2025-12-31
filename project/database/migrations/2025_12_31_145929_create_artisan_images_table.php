<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('artisan_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('artisan_id')->constrained()->onDelete('cascade');
            $table->string('image_path');
            $table->boolean('is_primary')->default(false)->index();
            $table->integer('display_order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('artisan_images');
    }
};

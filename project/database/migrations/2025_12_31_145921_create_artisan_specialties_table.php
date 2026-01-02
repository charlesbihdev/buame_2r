<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('artisan_specialties', function (Blueprint $table) {
            $table->id();
            $table->foreignId('artisan_id')->constrained()->onDelete('cascade');
            $table->string('specialty', 255)->index();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('artisan_specialties');
    }
};

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
            $table->enum('specialty', [
                'furniture', 'roofing', 'wiring', 'installation', 'pipe_fitting', 
                'drainage', 'floor_tiles', 'wall_tiles', 'clothing', 'alterations', 
                'metal_work', 'repairs', 'interior', 'exterior', 'doors_windows', 
                'plumbing', 'electrical', 'painting', 'welding', 'other'
            ])->index();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('artisan_specialties');
    }
};

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('artisan_portfolio', function (Blueprint $table) {
            $table->id();
            $table->foreignId('artisan_id')->constrained()->onDelete('cascade');
            $table->string('item');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('artisan_portfolio');
    }
};

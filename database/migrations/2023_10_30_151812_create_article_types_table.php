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
        Schema::create('article_types', function (Blueprint $table) {
            $table->id();
            $table->foreignId('book_id')->constrained();
            $table->string('name')->unique();
            $table->integer('depth')->default(0);
            $table->foreignId('template_id')->nullable()->constrained();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('article_types');
    }
};

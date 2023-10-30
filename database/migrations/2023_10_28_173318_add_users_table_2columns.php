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
        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('role_id')->constrained()->after('remember_token');
            $table->string('reading_name')->after('name');
            $table->string('affiliation_name')->after('reading_name');
            $table->string('affiliation_reading_name')->after('affiliation_name');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['role_id']);
            $table->dropColumn('role_id');
            $table->dropColumn('name');
            $table->dropColumn('reading_name');
            $table->dropColumn('affiliation_name');
            $table->dropColumn('affiliation_reading_name');
        });
    }
};

<?php

declare(strict_types=1);

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

final class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        $this->call(RolesTableSeeder::class);
        $this->call(UsersTableSeeder::class);

        $this->call(BookStateTypesTableSeeder::class);
        $this->call(ArticleStateTypesTableSeeder::class);

        $this->call(BooksTableSeeder::class);
        $this->call(BookUserTableSeeder::class);

        // $this->call(ArticleTypesSeeder::class);
    }
}

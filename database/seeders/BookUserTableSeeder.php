<?php

declare(strict_types=1);

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\BookUser;

final class BookUserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($bookId = 1; $bookId < 3; $bookId++) {
            for ($userId = 4; $userId < 10; $userId++) {
                BookUser::create([
                    'book_id' => $bookId,
                    'user_id' => $userId,
                ]);
            }
        }
    }
}

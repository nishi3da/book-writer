<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Book;
use Illuminate\Database\Seeder;

final class BooksTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Book::create([
            'id' => 1,
            'title' => 'Book 1',
            'sub_title' => 'Book 1 Subtitle',
            'number_of_articles' => 20,
        ]);
        Book::create([
            'id' => 2,
            'title' => 'Book 2',
            'sub_title' => 'Book 2 Subtitle',
            'number_of_articles' => 40,
        ]);
    }
}

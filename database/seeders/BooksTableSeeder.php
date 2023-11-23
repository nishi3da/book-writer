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
            'title' => 'Book 1',
            'sub_title' => 'Book 1 Subtitle',
            'number_of_contents' => 3,
            'number_of_sections' => 3,
        ]);
        Book::create([
            'title' => 'Book 2',
            'sub_title' => 'Book 2 Subtitle',
            'number_of_contents' => 3,
            'number_of_sections' => 3,
        ]);
        Book::create([
            'title' => 'Book 3',
            'sub_title' => 'Book 3 Subtitle',
            'number_of_contents' => 3,
            'number_of_sections' => 3,
        ]);
    }
}

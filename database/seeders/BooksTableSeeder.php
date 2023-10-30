<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Book;

class BooksTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Book::create([
            'title' => 'Book 1',
            'sub_title' => 'Book 1 Subtitle',
            'user_id' => 2,
            'number_of_contents' => 3,
            'number_of_sections' => 3
        ]);
    }
}

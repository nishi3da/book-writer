<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BookUserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $editors = \App\Models\User::where('role', 'editor')->get();
        $authors = \App\Models\User::where('role', 'author')->get();
        $books = \App\Models\Book::all();

        for ($i = 0; $i <= 100; $i++) {
            $editor = $editors->random();
            $author = $authors->random();
            $book = $books->random();

            $editor->books()->attach($book);
            $author->books()->attach($book);
        }
    }
}

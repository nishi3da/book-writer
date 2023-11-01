<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Book;
use App\Models\User;

class BookUserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::where('role_id', '>', '1')->get();
        $books = Book::all();

        for ($i = 0; $i < 100; $i++) {
            $user = $users->random();
            $book = $books->random();

            $user->books()->attach($book);
        }
    }
}

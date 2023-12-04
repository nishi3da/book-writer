<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\ArticleType;

class ArticleTypesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ArticleType::create([
            'book_id' => 1,
            'name' => '本文',
            'depth' => 1,
            'template_id' => null,
        ]);
        ArticleType::create([
            'book_id' => 2,
            'name' => '本文',
            'depth' => 1,
            'template_id' => null,
        ]);
    }
}

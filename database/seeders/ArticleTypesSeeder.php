<?php

namespace Database\Seeders;

use App\Models\ArticleType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ArticleTypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ArticleType::create([
            'name' => '本扉',
        ]);
        ArticleType::create([
            'name' => 'はじめに',
        ]);
        ArticleType::create([
            'name' => '目次',
        ]);
        ArticleType::create([
            'name' => '中扉',
        ]);
        ArticleType::create([
            'name' => '本文',
        ]);
        ArticleType::create([
            'name' => 'あとがき',
        ]);
        ArticleType::create([
            'name' => '索引',
        ]);
        ArticleType::create([
            'name' => '奥付',
        ]);
    }
}

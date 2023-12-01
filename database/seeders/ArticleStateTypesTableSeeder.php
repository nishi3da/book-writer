<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\ArticleStateType;

class ArticleStateTypesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ArticleStateType::create([
            'name' => '新規作成',
            'code' => 0
        ]);
        ArticleStateType::create([
            'name' => '初校前',
            'code' => 10
        ]);
        ArticleStateType::create([
            'name' => '初校',
            'code' => 20
        ]);
        ArticleStateType::create([
            'name' => '再校',
            'code' => 30
        ]);
        ArticleStateType::create([
            'name' => '三校',
            'code' => 40
        ]);
        ArticleStateType::create([
            'name' => '四校',
            'code' => 50
        ]);
        ArticleStateType::create([
            'name' => '五校',
            'code' => 60
        ]);
        ArticleStateType::create([
            'name' => '念校',
            'code' => 70
        ]);
        ArticleStateType::create([
            'name' => '校了',
            'code' => 80
        ]);
    }
}

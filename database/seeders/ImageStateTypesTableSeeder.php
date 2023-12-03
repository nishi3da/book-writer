<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\ImageStateType;

class ImageStateTypesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ImageStateType::create([
            'name' => '印刷データなし',
            'code' => 0
        ]);
        ImageStateType::create([
            'name' => '印刷データあり（未校了）',
            'code' => 1
        ]);
        ImageStateType::create([
            'name' => '印刷データあり（校了）',
            'code' => 999
        ]);
    }
}

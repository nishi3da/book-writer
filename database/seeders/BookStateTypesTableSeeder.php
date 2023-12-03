<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\BookStateType;

class BookStateTypesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        BookStateType::create([
            'id' => 1,
            'name' => '進行中',
            'code' => 10,
        ]);
        BookStateType::create([
            'id' => 2,
            'name' => '校了',
            'code' => 999,
        ]);
    }
}

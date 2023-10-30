<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\Role;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::create([
            'name' => '管理者',
            'level' => 0
        ]);

        Role::create([
            'name' => '編集者',
            'level' => 100
        ]);

        Role::create([
            'name' => '執筆者',
            'level' => 200
        ]);

    }
}

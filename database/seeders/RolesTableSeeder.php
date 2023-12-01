<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::create([
            'id' => 1,
            'name' => '管理者',
            'level' => '0',
        ]);
        Role::create([
            'id' => 2,
            'name' => '編集者',
            'level' => '100',
        ]);
        Role::create([
            'id' => 3,
            'name' => '執筆者',
            'level' => '200',
        ]);
        Role::create([
            'id' => 4,
            'name' => '作業者',
            'level' => '300',
        ]);
    }
}

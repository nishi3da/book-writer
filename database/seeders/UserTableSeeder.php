<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use App\Models\User;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'test管理者',
            'reading_name' => 'testかんりしゃ',
            'affiliation_name' => 'test管理者所属',
            'affiliation_reading_name' => 'testかんりしゃしょぞく',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('password'),
            // role_id = 1 (管理者)
            'role_id' => 1
        ]);
        User::create([
            'name' => 'test編集者',
            'reading_name' => 'testへんしゅうしゃ',
            'affiliation_name' => 'test編集者所属',
            'affiliation_reading_name' => 'testへんしゅうしゃしょぞく',
            'email' => 'editor@gmail.com',
            'password' => bcrypt('password'),
            // role_id = 1 (管理者)
            'role_id' => 2
        ]);
        User::create([
            'name' => 'test執筆者',
            'reading_name' => 'testしっぴつしゃ',
            'affiliation_name' => 'test執筆者所属',
            'affiliation_reading_name' => 'testしっぴつしゃしょぞく',
            'email' => 'author@gmail.com',
            'password' => bcrypt('password'),
            // role_id = 1 (管理者)
            'role_id' => 3
        ]);
    }
}

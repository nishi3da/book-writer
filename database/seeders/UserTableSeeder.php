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
        // 管理者レベル ----------------------------------------------------------------------------------------
        $role = "admin";
        User::create([
            'name' => 'test管理者',
            'reading_name' => 'testかんりしゃ',
            'affiliation_name' => 'test管理者所属',
            'affiliation_reading_name' => 'testかんりしゃしょぞく',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('password'),
            'role' => $role
        ]);
        User::create([
            'name' => 'test管理者2',
            'reading_name' => 'testかんりしゃ2',
            'affiliation_name' => 'test管理者所属2',
            'affiliation_reading_name' => 'testかんりしゃしょぞく2',
            'email' => 'admin2@gmail.com',
            'password' => bcrypt('password'),
            'role' => $role
        ]);
        User::create([
            'name' => 'test管理者3',
            'reading_name' => 'testかんりしゃ3',
            'affiliation_name' => 'test管理者所属3',
            'affiliation_reading_name' => 'testかんりしゃしょぞく3',
            'email' => 'admin1@gmail.com',
            'password' => bcrypt('password'),
            'role' => $role
        ]);

        // 編集者レベル ----------------------------------------------------------------------------------------
        $role = "editor";
        User::create([
            'name' => 'test編集者',
            'reading_name' => 'testへんしゅうしゃ',
            'affiliation_name' => 'test編集者所属',
            'affiliation_reading_name' => 'testへんしゅうしゃしょぞく',
            'email' => 'editor@gmail.com',
            'password' => bcrypt('password'),
            'role' => $role
        ]);
        User::create([
            'name' => 'test編集者2',
            'reading_name' => 'testへんしゅうしゃ2',
            'affiliation_name' => 'test編集者所属2',
            'affiliation_reading_name' => 'testへんしゅうしゃしょぞく2',
            'email' => 'editor2@gmail.com',
            'password' => bcrypt('password'),
            'role' => $role
        ]);
        User::create([
            'name' => 'test編集者3',
            'reading_name' => 'testへんしゅうしゃ3',
            'affiliation_name' => 'test編集者所属3',
            'affiliation_reading_name' => 'testへんしゅうしゃしょぞく3',
            'email' => 'editor3@gmail.com',
            'password' => bcrypt('password'),
            'role' => $role
        ]);


        // 執筆者レベル ----------------------------------------------------------------------------------------
        $role = "author";
        User::create([
            'name' => 'test執筆者',
            'reading_name' => 'testしっぴつしゃ',
            'affiliation_name' => 'test執筆者所属',
            'affiliation_reading_name' => 'testしっぴつしゃしょぞく',
            'email' => 'author@gmail.com',
            'password' => bcrypt('password'),
            'role' => $role
        ]);
        User::create([
            'name' => 'test執筆者2',
            'reading_name' => 'testしっぴつしゃ2',
            'affiliation_name' => 'test執筆者所属2',
            'affiliation_reading_name' => 'testしっぴつしゃしょぞく2',
            'email' => 'author2@gmail.com',
            'password' => bcrypt('password'),
            'role' => $role
        ]);
        User::create([
            'name' => 'test執筆者3',
            'reading_name' => 'testしっぴつしゃ3',
            'affiliation_name' => 'test執筆者所属3',
            'affiliation_reading_name' => 'testしっぴつしゃしょぞく3',
            'email' => 'author3@gmail.com',
            'password' => bcrypt('password'),
            'role' => $role
        ]);

        // // 執筆者レベル ----------------------------------------------------------------------------------------
        // $role = "operator";
        // User::create([
        //     'name' => 'test作業者',
        //     'reading_name' => 'testさぎょうしゃ',
        //     'affiliation_name' => 'test作業者所属',
        //     'affiliation_reading_name' => 'testさぎょうしゃしょぞく',
        //     'email' => 'operator@gmail.com',
        //     'password' => bcrypt('password'),
        //     'role' => $role
        // ]);
        // User::create([
        //     'name' => 'test作業者2',
        //     'reading_name' => 'testさぎょうしゃ2',
        //     'affiliation_name' => 'test作業者所属2',
        //     'affiliation_reading_name' => 'testさぎょうしゃしょぞく1',
        //     'email' => 'operator2@gmail.com',
        //     'password' => bcrypt('password'),
        //     'role' => $role
        // ]);
        // User::create([
        //     'name' => 'test作業者3',
        //     'reading_name' => 'testさぎょうしゃ3',
        //     'affiliation_name' => 'test作業者所属3',
        //     'affiliation_reading_name' => 'testさぎょうしゃしょぞく3',
        //     'email' => 'operator3@gmail.com',
        //     'password' => bcrypt('password'),
        //     'role' => $role
        // ]);
    }
}

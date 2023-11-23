<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

final class Book extends Model
{
    use HasFactory;

    // protected $appends = ["editors","authors"];

    public function users()
    {
        return $this->belongsToMany(User::class)->withTimestamps();
    }

    // public function book_users() {
    //     return $this->hasMany(BookUser::class, "book_id", "id");
    // }

    // public function articles() {
    //     return $this->belongsToMany(Article::class)->withPivot('role')->as('role')->withTimestamps();
    // }

    // public function getBookUsersWithRole($role){
    //     $users = $this->users;
    //     return $users->filter(function($user) use($role){
    //         return $user->role == $role;
    //     });
    // }

    // public function getEditorsAttribute(){
    //     return $this->getBookUsersWithRole("editor")->pluck("id");
    // }

    // public function getAuthorsAttribute(){
    //     return $this->getBookUsersWithRole("author")->pluck("id");
    // }

    public function authors()
    {
        return $this->belongsToMany(User::class)->where('role', 'author')->withTimestamps();
    }

    public function editors()
    {
        return $this->belongsToMany(User::class)->where('role', 'editor')->withTimestamps();
    }
}

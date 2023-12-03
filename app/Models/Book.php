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

    public function editors()
    {
        return $this->belongsToMany(User::class)->with('role')->whereHas('role', function ($query) {
            $query->whereBetween('level', ["100","199"]);
        })->withTimestamps();
    }

    public function authors()
    {
        return $this->belongsToMany(User::class)->with('role')->whereHas('role', function ($query) {
            $query->whereBetween('level', ["200","299"]);
        })->withTimestamps();
    }

    public function article() {
        return $this->hasMany(Article::class)->order("number", "asc")->withTimestamps();
    }

    public function bookStateType() {
        return $this->belongsTo(BookStateType::class);
    }

}

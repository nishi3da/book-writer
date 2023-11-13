<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

class Book extends Model
{
    use HasFactory;

    public function users() {
        return $this->belongsToMany(User::class)->withPivot('role')->as('role')->withTimestamps();
    }

    public function articles() {
        return $this->belongsToMany(Article::class)->withPivot('role')->as('role')->withTimestamps();
    }

}

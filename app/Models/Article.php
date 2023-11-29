<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Book;

final class Article extends Model
{
    use HasFactory;

    public function editors() {
        return $this->belongsToMany(User::class)->where('role', 'editor')->withTimestamps();
    }

    public function authors() {
        return $this->belongsToMany(User::class)->where('role', 'author')->withTimestamps();
    }

    public function users()
    {
        return $this->belongsToMany(User::class)->withTimestamps();
    }

    public function book() {
        return $this->belongsTo(Book::class);
    }
}

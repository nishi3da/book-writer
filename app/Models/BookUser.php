<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

final class BookUser extends Model
{
    use HasFactory;

    protected $table = 'book_user';

    protected $fillable = [
        'book_id',
        'user_id',
    ];

    // public function user() {
    //     return $this->belongsTo(User::class, "user_id", "id");
    // }

}

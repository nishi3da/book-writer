<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\User;

final class Role extends Model
{
    use HasFactory;

    public function users() {
        return $this->hasMany(User::class);
    }

    public function admins() {
        return $this->hasMany(User::class)->whereBetween('level', [0,99])->withTimestamps();
    }

    public function editors() {
        return $this->hasMany(User::class)->whereBetween('level', [100,199])->withTimestamps();
    }

    public function authors() {
        return $this->hasMany(User::class)->whereBetween('level', [200,299])->withTimestamps();
    }

    public function operators() {
        return $this->hasMany(User::class)->whereBetween('level', [300,399])->withTimestamps();
    }

}

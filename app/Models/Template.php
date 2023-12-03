<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Template extends Model
{
    use HasFactory;

    public function libraries() {
        return $this->hasMany(TemplateLibrary::class);
    }
}

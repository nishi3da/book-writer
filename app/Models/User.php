<?php

declare(strict_types=1);

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

final class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'reading_name',
        'affiliation_name',
        'affiliation_reading_name',
        'role',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function books()
    {
        return $this->belongsToMany(Book::class)->withTimestamps();
    }

    public function articles()
    {
        return $this->belongsToMany(Article::class)->withTimestamps();
    }

    public function editors()
    {
        return $this->belongsToMany(Book::class)->where('role', 'editor')->withTimestamps();
    }

    public function authors()
    {
        return $this->belongsToMany(Book::class)->where('role', 'author')->withTimestamps();
    }

    public function role() {
        return $this->belongsTo(Role::class);
    }

}

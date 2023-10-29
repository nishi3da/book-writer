<?php

namespace App\Providers;

use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;


class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        //
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        $this->registerPolicies();

        // 「管理者」以上に適用
        Gate::define('admin_role', function ($user) {
            return ($user->role()->level < 100);
        });

        // 「編集者」以上に適用
        Gate::define('editor_role', function ($user) {
            return (100 <= $user->role()->level && $user->role()->level < 200);
        });

        // 「執筆者」以上に適用
        Gate::define('author_role', function ($user) {
            return ($user->role()->level >= 200);
        });
    }
}

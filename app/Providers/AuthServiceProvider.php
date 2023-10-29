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

        // 「管理者」のみ許可
        Gate::define('admin_level', function ($user) {
            return ($user->role()->level < 100);
        });

        // 「管理者」「編集者」に適用
        Gate::define('editor_level', function ($user) {
            return ($user->role()->level < 200);
        });

        // 執筆者が閲覧可能なレベルは、全ての役割で閲覧可能
        // // 「執筆者」に適用
        // Gate::define('author_level', function ($user) {
        //     return ($user->role()->level >= 200);
        // });
    }
}

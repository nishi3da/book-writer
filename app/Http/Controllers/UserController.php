<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Role;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{

    public function admins_list()
    {
        Log::debug('--- user admins_list ---');
        // 管理者一覧を取得
        $admins = User::with('role')->whereHas('role', function ($query) {
            $query->whereBetween('level', ["0","99"]);
        })->get();
        // レスポンス
        return response()->json($admins);
    }

    public function editorsList()
    {
        Log::debug('--- user editors_list ---');
        $id = Auth::id();
        // ログインユーザー
        $loginUser = User::where('id', $id)->with('role')->first();
        // 編集者一覧を取得（ログインユーザーは除く）
        $editors = User::where('id', '!=', $id)->with('role')->whereHas('role', function ($query) {
            $query->whereBetween('level', ["100","199"]);
        })->get();
        // ログインユーザーを先頭にする
        $editors->prepend($loginUser);

        Log::debug($editors);
        // レスポンス
        return response()->json($editors);
    }

    public function authorsList()
    {
        Log::debug('--- user authors_list ---');
        // 執筆者一覧を取得
        $authors = User::with('role')->whereHas('role', function ($query) {
            $query->whereBetween('level', ["200","299"]);
        })->get();

        // レスポンス
        return response()->json($authors);
    }

    public function operators_list()
    {
        Log::debug('--- user operators_list ---');
        // 作業者一覧を取得
        $operators = User::with('role')->whereHas('role', function ($query) {
            $query->whereBetween('level', ["300","399"]);
        })->get();
    }
}

<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    /**
     * Retrieves a list of editors.
     *
     * This function fetches a list of editors, excluding the currently logged-in user,
     * and returns it as a JSON response.
     *
     * @return Some_Return_Value
     * @throws Some_Exception_Class description of exception
     */
    public function editors_list()
    {
        $id = Auth::id();
        // ログインユーザー
        $loginUser = User::Where('id', '=', $id)->first();
        // 編集者一覧を取得（ログインユーザーは除く）
        $editors = User::where('role', '=', 'editor')->where('id', '!=', $id)->get();
        // ログインユーザーを先頭にする
        $editors->prepend($loginUser);

        // レスポンス
        return response()->json($editors);
    }

    /**
     * Get the list of authors.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function authors_list()
    {
        // 執筆者一覧を取得
        $editors = User::where('role', '=', 'author')->get();

        // レスポンス
        return response()->json($editors);
    }
}

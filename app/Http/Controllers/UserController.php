<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use App\Models\User;

class UserController extends Controller
{
    /**
     * Retrieves a list of editors.
     *
     * This function fetches a list of editors, excluding the currently logged-in user,
     * and returns it as a JSON response.
     *
     * @throws Some_Exception_Class description of exception
     * @return Some_Return_Value
     */
    public function editors() {
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
    public function authors() {
        // 執筆者一覧を取得
        $editors = User::where('role', '=', 'author')->get();
        // レスポンス
        return response()->json($editors);
    }
}

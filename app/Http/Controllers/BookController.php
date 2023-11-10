<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use Illuminate\Support\Facades\Log;

use App\Models\Book;
use App\Models\User;


class BookController extends Controller
{
    /**
     * 書籍一覧画面の表示
     * ログインユーザーIDは登録時に必要
     */
    public function index()
    {
        $id = Auth::id();
        return view('book', ['id' => $id]);
    }

    /**
     * 書籍登録用
     */
    public function store(Request $request)
    {
        $bookData = $request->input("bookData");
        $title = $bookData["title"];
        $subTitle = $bookData["sub_title"];
        $numberOfArticles = intval($bookData["number_of_articles"]);
        $numberOfSections = intval($bookData["number_of_sections"]);
        $editorIds = explode(",", $bookData["editors"]);
        $authorIds = explode(",", $bookData["authors"]);

        $book = new Book();
        $book->title = $title;
        $book->sub_title = $subTitle;
        $book->number_of_articles = $numberOfArticles;
        $book->number_of_sections = $numberOfSections;

        $book->save();

        $editors = User::whereIn('id', $editorIds)->get();
        $book->users()->attach($editors, ['role' => 'editor']);

        $authors = User::whereIn('id', $authorIds)->get();
        $book->users()->attach($authors, ['role' => 'author']);
    }

    public function edit(string $bookId) {
        // 書籍1件取得
        $book = Book::find($bookId);
        // 中間テーブルの編集者のみ取得
        $editors = $book->users()->withPivot('role')->where('users.role', '=', 'editor')->pluck('user_id');
        // 中間テーブルの執筆者のみ取得
        $authors = $book->users()->withPivot('role')->where('users.role', '=', 'author')->pluck('user_id');
        // 配列を,区切りで文字列化
        $editorIds = $editors->implode(",");
        $authorIds = $authors->implode(",");

        // JSON化
        $result = json_decode($book->toJson(), true);
        // 配列に追加
        $result = array_merge($result, ["editors" => $editorIds]);
        $result = array_merge($result, ["authors" => $authorIds]);
        // レスポンス
        return response($result, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function book_list() {
        $id = Auth::id();
        $query = Book::whereHas('users', function ($query) use ($id) {
            $query->where('user_id', $id);
        });
        $books = $query->get();

        return response()->json($books);
    }

}

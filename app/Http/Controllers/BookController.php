<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class BookController extends Controller
{
    /**
     * 書籍一覧画面の表示
     * ログインユーザーIDは登録時に必要
     */
    public function index()
    {
        Log::debug('--- book index ---');
        $id = Auth::id();

        return view('book', ['id' => $id]);
    }

    /**
     * 書籍登録用
     */
    public function store(Request $request)
    {
        Log::debug('--- book store ---');
        $bookData = $request->input('bookData');
        $title = $bookData['title'];
        $subTitle = $bookData['sub_title'];
        $numberOfArticles = intval($bookData['number_of_articles']);
        $numberOfSections = intval($bookData['number_of_sections']);
        $editorIds = explode(',', $bookData['editors']);
        $authorIds = explode(',', $bookData['authors']);

        $book = new Book();
        $book->title = $title;
        $book->sub_title = $subTitle;
        $book->number_of_articles = $numberOfArticles;
        $book->number_of_sections = $numberOfSections;

        $book->save();

        $editors = User::whereIn('id', $editorIds)->get();
        $book->users()->attach($editors);

        $authors = User::whereIn('id', $authorIds)->get();
        $book->users()->attach($authors);
    }

    public function edit(string $bookId)
    {
        /*
            {
                id: integer,
                title: string,
                sub_title: string,
                number_of_articles: integer,
                number_of_sections: integer,

                userId: integer,
                book_editors: string[],
                book_authors: string[],
            }
        */

        // 書籍1件取得
        $book = Book::find($bookId);

        $editorIds = $book->editors()->get()->pluck('id')->implode(',');
        $authorIds = $book->authors()->get()->pluck('id')->implode(',');

        // JSON化
        $results = json_decode($book->toJson(), true);
        // 配列に追加
        $results = array_merge($results, ['editorIds' => $editorIds]);
        $results = array_merge($results, ['authorIds' => $authorIds]);
        $results = array_merge($results, ['userId' => Auth::id()]);
        $results = array_merge($results, ['userRole' => Auth::user()->role]);

        // レスポンス
        return view('editbook', ["edit_book_props" =>$results]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $bookId)
    {
        Log::debug('update');
        $bookData = $request->input('bookData');

        $title = $bookData['title'];
        $subTitle = $bookData['sub_title'];
        $numberOfArticles = intval($bookData['number_of_articles']);
        $numberOfSections = intval($bookData['number_of_sections']);
        $editorIds = explode(',', $bookData['editors']);
        $authorIds = explode(',', $bookData['authors']);

        $book = Book::find($bookId);

        $book->title = $title;
        $book->sub_title = $subTitle;
        $book->number_of_articles = $numberOfArticles;
        $book->number_of_sections = $numberOfSections;
        $book->save();

        // 書籍に紐づいたユーザーは一旦削除
        $book->users()->detach();
        // 編集者・執筆者の取得
        $editors = User::whereIn('id', $editorIds)->get();
        $authors = User::whereIn('id', $authorIds)->get();
        // 今回のリクエストの内容で再登録
        $book->users()->attach($editors);
        $book->users()->attach($authors);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Log::debug('--- book destroy ---');
        $book = Book::find($id);
        // 書籍に紐づいたユーザーは削除
        $book->users()->detach();
        $book->delete();
    }

    public function books_list()
    {
        Log::debug('--- books_list ---');
        // ユーザーが担当する書籍一覧を表示する
        $id = Auth::id();
        Log::debug($id);
        $user = User::find($id);
        $books = $user->books()->get();
        Log::debug($books);

        return response()->json($books);
    }

    public function editors(string $bookId)
    {
        $book = Book::find($bookId);
        $editorIds = $book->editors()->get()->pluck('id')->implode(',');

        return response()->json($editorIds);
    }

    public function authors(string $bookId)
    {
        $book = Book::find($bookId);
        $authorIds = $book->authors()->get()->pluck('id')->implode(',');

        return resupons()->json($authorIds);
    }
}

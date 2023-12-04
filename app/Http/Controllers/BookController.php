<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\User;
use App\Models\ArticleType;
use App\Models\BookStateType;
use App\Models\ArticleStateType;
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
        $userId = Auth::id();

        // 書籍の進行状態の取得
        $bookStateTypesAll = BookStateType::all();
        $bookStateTypes = [];
        foreach ($bookStateTypesAll as $bookStateType) {
            $bookStateTypes[$bookStateType->id] = $bookStateType->name;
        }

        return view('book', ['userId' => $userId, 'bookStateTypes' => $bookStateTypes]);
    }

    /**
     * 書籍登録用
     */
    public function store(Request $request)
    {
        Log::debug('--- book store ---', $request->all());
        $bookData = $request->input('bookData');
        $title = $bookData['title'];
        $subTitle = $bookData['sub_title'];
        $bookStateTypeId = $bookData['book_state_type_id'];
        $editorIds = $bookData['editorIds'];
        $authorIds = $bookData['authorIds'];

        // 新規登録
        $book = new Book();
        $book->title = $title;
        $book->sub_title = $subTitle;
        $book->book_state_type_id = $bookStateTypeId;
        $book->save();

        // 書籍に紐づく編集者の登録
        $editors = User::whereIn('id', $editorIds)->get();
        $book->users()->attach($editors);
        // 書籍に紐づく執筆者の登録
        $authors = User::whereIn('id', $authorIds)->get();
        $book->users()->attach($authors);

        // 決め打ちで「本文」の書籍種別を登録する
        $articleType = new ArticleType();
        $articleType->book_id = $book->id;
        $articleType->name = '本文';
        $articleType->depth = 1;
        $articleType->template_id = null;
        $articleType->save();
        Log::debug('--- book store end ---');
    }

    public function edit(string $bookId)
    {
        Log::debug('--- book edit ---');
        /*
            {
                id: integer,
                title: string,
                sub_title: string,
                userId: integer,
                editorIds: string[],
                authorIds: string[],
                article_types: {}
            }
        */

        // 書籍1件取得
        $book = Book::find($bookId);

        $editorIds = $book->editors()->get()->pluck('id');
        $authorIds = $book->authors()->get()->pluck('id');

        // articleTypes取得
        $articleTypesAll = ArticleType::where('book_id', $bookId)->get();
        $articleTypes = [];
        foreach ($articleTypesAll as $articleType) {
            $articleTypes[$articleType->id] = $articleType->name;
        }

        $articleStateTypesAll = ArticleStateType::all();
        $articleStateTypes = [];
        foreach ($articleStateTypesAll as $articleStateType) {
            $articleStateTypes[$articleStateType->id] = $articleStateType->name;
        }

        // JSON化
        $results = json_decode($book->toJson(), true);
        // 配列に追加
        $results = array_merge($results, ['editorIds' => $editorIds]);
        $results = array_merge($results, ['authorIds' => $authorIds]);
        $results = array_merge($results, ['userId' => Auth::id()]);
        $results = array_merge($results, ['userRole' => Auth::user()->role]);
        $results = array_merge($results, ['articleTypes' => $articleTypes]);
        $results = array_merge($results, ['articleStateTypes' => $articleStateTypes]);

        // レスポンス
        return view('editbook', ["edit_book_props" =>$results]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $bookId)
    {
        Log::debug('--- book update ---');
        $bookData = $request->input('bookData');

        $title = $bookData['title'];
        $subTitle = $bookData['sub_title'];
        $bookStateTypeId = $bookData['book_state_type_id'];
        $editorIds = $bookData['editorIds'];
        $authorIds = $bookData['authorIds'];

        $book = Book::find($bookId);

        $book->title = $title;
        $book->sub_title = $subTitle;
        $book->book_state_type_id = $bookStateTypeId;
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

    public function bulkUpdate(Request $request) {
        Log::debug('--- book buldUpdate ---');

        $datas = $request->all();

        foreach ($datas as $data) {
            $book = Book::find($data['id']);

            $book->id = $data['id'];
            $book->title = $data['title'];
            $book->sub_title = $data['sub_title'];
            $book->book_state_type_id = $data['book_state_type_id'];
            $book->save();
        }
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

    public function booksList()
    {
        Log::debug('--- book books_list ---');
        // ユーザーが担当する書籍一覧を表示する
        $id = Auth::id();
        $user = User::find($id);
        $books = $user->books()->get();

        return response()->json($books);
    }

    public function editors(string $bookId)
    {
        Log::debug('--- book editors ---');
        $book = Book::find($bookId);
        $editorIds = $book->editors()->get()->pluck('id')->implode(',');

        return response()->json($editorIds);
    }

    public function authors(string $bookId)
    {
        Log::debug('--- book authors ---');
        $book = Book::find($bookId);
        $authorIds = $book->authors()->get()->pluck('id')->implode(',');

        return resupons()->json($authorIds);
    }

    public function bookEditors(string $bookId) {
        Log::debug('--- book book_editors ---');
        $book = Book::find($bookId);
        $editors = $book->editors()->get();

        return response()->json($editors);
    }

    public function bookAuthors(string $bookId) {
        Log::debug('--- book book_authors ---');
        $book = Book::find($bookId);
        $authors = $book->authors()->get();

        return response()->json($authors);
    }
}

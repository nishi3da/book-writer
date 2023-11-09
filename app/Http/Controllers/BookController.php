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

        // foreach ($authors as $author) {
        //     $book->users()->syncWithoutDetaching([$authors => ['role' => 'author']]);
        // }
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

<?php

declare(strict_types=1);

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ArticleController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// ルートへのアクセスはログイン画面へ
Route::get('/', [LoginController::class, 'showLoginForm']);

// 認証ルートの一括設定
Auth::routes();

// 権限別に登録URLを設定
Route::get('admin_register', [RegisterController::class, 'showRegistrationForm'])->name('admin_register');
Route::get('editor_register', [RegisterController::class, 'showRegistrationForm'])->name('editor_register');
// 作業者権限は検討中
//Route::get('operator_register', [RegisterController::class, 'showRegistrationForm'])->name('operator_register');

// 書籍一覧のルート
Route::resource('/books', BookController::class)->only('index', 'store', 'edit', 'update', 'destroy')->middleware('auth');

// API用
// 書籍一覧（ログインユーザーが担当している書籍一覧）
Route::get('/books_list', [BookController::class, 'books_list'])->middleware('auth');

// 編集者一覧（担当書籍ではなく、単純に編集者一覧）
Route::get('/editors_list', [UserController::class, 'editors_list'])->middleware('auth');
// 執筆者一覧（担当書籍ではなく、短銃に執筆者一覧）
Route::get('/authors_list', [UserController::class, 'authors_list'])->middleware('auth');

// 書籍の担当編集者一覧
Route::get('/book_editors', [BookController::class, 'editors'])->middleware('auth');
// 書籍の担当執筆者一覧
Route::get('/book_authors', [BookController::class, 'authors'])->middleware('auth');

// 記事の一覧の取得
Route::get('/articles_list/{bookId}', [ArticleController::class, 'articles_list'])->middleware('auth');
// 記事種別一覧の取得
Route::get('/article_types_list', [ArticleController::class, 'article_types_list'])->middleware('auth');

// ギャラリーサンプル
Route::get("/gallery", [GalleryController::class, "index"]);
Route::post("/gallery", [GalleryController::class, "store"]);
Route::get("/gallery/preview/{id}", [GalleryController::class, "preview"]);


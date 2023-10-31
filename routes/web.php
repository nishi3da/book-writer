<?php

use App\Http\Controllers\Auth\LoginController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\BookController;

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

// 書籍一覧のルート
Route::resource('/books', BookController::class)->only('index', 'create', 'store', 'show', 'edit', 'update', 'destroy')->middleware('auth');

// Reactの動作確認
// Route::get('/', function () {
//     return view('index');
// });

// API用
Route::get('/book_list', [BookController::class, 'book_list'])->middleware('auth');

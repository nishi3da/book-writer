<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

use App\Http\Controllers\Auth\RegisterController;

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

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('admin_register', [RegisterController::class, 'showRegistrationForm'])->name('admin_register');
Route::get('editor_register', [RegisterController::class, 'showRegistrationForm'])->name('editor_register');

// $this->post('register', 'Auth\RegisterController@register');

// $this->get('register', 'Auth\RegisterController@showRegistrationForm')->name('register');
// $this->post('register', 'Auth\RegisterController@register');


//
// Route::group(['middleware' => ['auth', 'can:admin_level']], function () {
// });
// Route::group(['middleware' => ['auth', 'can:editor_level']], function () {
// });



Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

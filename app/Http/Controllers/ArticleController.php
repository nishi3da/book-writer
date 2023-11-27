<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use App\Models\Article;

class ArticleController extends Controller
{
    public function articles_list(string $bookId) {
        Log::debug('--- articles_list ---');
        $articles = Article::where('book_id', '=', $bookId)->orderBy('number', 'asc')->get();
        return response()->json($articles);
    }

    public function article_types_list() {
        Log::debug('--- article_types_list ---');
        $articleTypes = ArticleType::all();
        return response()->json($articleTypes);
    }
}

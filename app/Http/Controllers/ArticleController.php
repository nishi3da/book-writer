<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use App\Models\Article;
use App\Models\ArticleType;

class ArticleController extends Controller
{

    public function store(Request $request) {
        Log::debug('--- article store ---', $request->all());
        $data = $request->input('articleData');
        // データ分解
        $bookId = $data['book_id'];
        $articleTypeId = $data['article_type_id'];
        $articleNumber = $data['article_number'];
        $label = $data['label'];
        $articleData = $data['article_data'];
        $articleStateTypeId = $data['article_state_type_id'];
        $editorIds = $data['editorIds'];
        $authorIds = $data['authorIds'];

        // DB登録
        $article = new Article();

        $article->book_id = $bookId;
        $article->article_number = $articleNumber;
        $article->article_type_id = $articleTypeId;
        $article->label = $label;
        $article->article_data = $articleData;
        $article->article_state_type_id = $articleStateTypeId;

        $article->save();

        // 中間テーブルへ登録
        $article->authors()->attach($authorIds);
        $article->editors()->attach($editorIds);

    }

    public function update(Request $request) {
        Log::debug('--- articles update ---');

        $datas = $request->all();

        Log::debug("articles update request datas");

        foreach ($datas as $data) {
            $article = Article::find($data['id']);

            $article->article_number = $data['article_number'];
            $article->article_type_id = $data['article_type_id'];
            $article->label = $data['label'];
            $article->article_data = $data['article_data'];
            $article->article_state_type_id = $data['article_state_type_id'];
            $article->save();
        }
    }

    public function articlesList(string $bookId) {
        Log::debug('--- articles_list ---');
        $articles = Article::where('book_id', '=', $bookId)->orderBy('article_number', 'asc')->get();
        return response()->json($articles);
    }

    public function articleTypesList() {
        Log::debug('--- article_types_list ---');
        $articleTypes = ArticleType::all();
        return response()->json($articleTypes);
    }
}

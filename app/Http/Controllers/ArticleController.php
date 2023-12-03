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
        $articleNumber = $data['article_number'];
        $articleTypeId = $data['article_type_id'];
        $title = $data['title'];
        $subTitle = $data['sub_title'];
        $leadSentence = $data['lead_sentence'];
        $articleData = $data['article_data'];
        $editorIds = $data['editorIds'];
        $authorIds = $data['authorIds'];

        // DB登録
        $article = new Article();

        $article->book_id = $bookId;
        $article->article_number = $articleNumber;
        $article->article_type_id = $articleTypeId;
        $article->title = $title;
        $article->sub_title = $subTitle;
        $article->lead_sentence = $leadSentence;
        $article->article_data = $articleData;

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
            $article->title = $data['title'];
            $article->sub_title = $data['sub_title'];
            $article->lead_sentence = $data['lead_sentence'];
            $article->article_data = $data['article_data'];
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

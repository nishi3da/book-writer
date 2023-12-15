@extends('layouts.app')

@viteReactRefresh
@vite(['resources/ts/articleEditorMount.tsx'])

@section('content')
    <div>
        <h1 class="article-editor-title">{{ __('ArticleEdit') }}</h1>
        <button id="article_editor_save_button">{{ __('ArticleDataSave') }}</button>

        <div id="gjs" style="height: 80vh;">
            <h1>aaaa</h1>
        </div>
        <script type="application/ld+json" id="article_editor_props">
          {!! json_encode($article_editor_props) !!}
        </script>
    </div>
@endsection

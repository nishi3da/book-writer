@extends('layouts.app')

@viteReactRefresh
@vite(['resources/sass/app.scss', 'resources/ts/book.tsx'])

@section('content')
    <div>
        <h1>{{ __('Books') }}</h1>

        <div id="book_root"></div>
    </div>
@endsection

@extends('layouts.app')

@viteReactRefresh
@vite(['resources/ts/bookGridMount.tsx'])

@section('content')
    <div>
        <h1 class="book-grid-title">{{ __('Books') }}</h1>

        <div id="book_root" style="height: 80vh;"></div>
    </div>
@endsection

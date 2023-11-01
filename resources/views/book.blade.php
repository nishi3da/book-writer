@extends('layouts.app')

@viteReactRefresh
@vite(['resources/ts/bookGridMount.tsx'])

@section('content')
    <div>
        <h1>{{ __('Books') }}</h1>

        <div id="book_root"></div>
    </div>
@endsection

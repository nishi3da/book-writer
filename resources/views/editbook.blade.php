@extends('layouts.app')

@viteReactRefresh
@vite(['resources/ts/editBookMount.tsx'])

@section('content')
    <div>
        <h1 class="edit-book-title">{{ __('BookEdit') }}</h1>

        <div id="edit_book_root" style="height: 80vh;" data-user-id={{ $userId }} data-book-id={{ $bookId }}></div>
    </div>
@endsection

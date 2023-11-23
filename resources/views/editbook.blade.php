@extends('layouts.app')

@viteReactRefresh
@vite(['resources/ts/editBookMount.tsx'])

@section('content')
    <div>
        <h1 class="edit-book-title">{{ __('BookEdit') }}</h1>

        <div id="edit_book_root" style="height: 80vh;"></div>
        <script type="application/ld+json" id="edit_book_props">
            {!! json_encode($edit_book_props) !!}
        </script>
    </div>
@endsection

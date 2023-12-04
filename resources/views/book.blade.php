@extends('layouts.app')

@viteReactRefresh
@vite(['resources/ts/bookGridMount.tsx'])

@section('content')
    <div>
        <h1 class="book-grid-title">{{ __('Books') }}</h1>

        <div id="book_root" style="height: 80vh;" data-user-id={{ $userId }}></div>
        <script type="application/ld+json" id="book_grid_props">
          {!! json_encode($bookStateTypes) !!}
      </script>
    </div>
@endsection

@extends('layouts.app')

@push('scripts')
    <script src="https://cdn.jsdelivr.net/npm/ag-grid-community/dist/ag-grid-community.min.noStyle.js"></script>
@endpush

@push('styles')
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ag-grid-community/styles/ag-grid.css" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ag-grid-community/styles/ag-theme-alpine.css" />
@endpush

@section('content')
    <div>
        <h1>{{ __('Books') }}</h1>
        <button onclick="deselect()">Deselect Rows</button>

        <div id="booksGrid" class="ag-theme-alpine" style="height: 500px"></div>
        <script type="text/javascript">
            // Function to demonstrate calling grid's API
            function deselect() {
                gridOptions.api.deselectAll()
            }

            // Grid Options are properties passed to the grid
            const gridOptions = {

                // each entry here represents one column
                columnDefs: [{
                        field: "id"
                    },
                    {
                        field: "title"
                    },
                    {
                        field: "sub_title"
                    },
                    {
                        field: "editors"
                    }
                ],

                // default col def properties get applied to all columns
                defaultColDef: {
                    sortable: false,
                    filter: false
                },

                //rowSelection: 'multiple', // allow rows to be selected
                animateRows: true, // have rows animate to new positions when sorted

            };

            // get div to host the grid
            const eGridDiv = document.getElementById("booksGrid");
            // new grid instance, passing in the hosting DIV and Grid Options
            new agGrid.Grid(eGridDiv, gridOptions);

            const data = JSON.parse('{!! $books_json !!}');

            gridOptions.api.setRowData(data);

            // // Fetch data from server
            // fetch("https://www.ag-grid.com/example-assets/row-data.json")
            //     .then(response => response.json())
            //     .then(data => {
            //         // load fetched data into grid
            //         gridOptions.api.setRowData(data);
            //     });
        </script>
    </div>
@endsection

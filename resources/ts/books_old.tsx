import React, { useState } from "react";
import { render } from "react-dom";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { createRoot } from "react-dom/client";

const Books = () => {
    const [rowData] = useState<any>([
        { make: "Toyota", model: "Celica", price: 35000 },
        { make: "Ford", model: "Mondeo", price: 32000 },
        { make: "Porsche", model: "Boxter", price: 72000 },
    ]);

    const [columnDefs] = useState([
        { field: "make" },
        { field: "model" },
        { field: "price" },
    ]);

    return (
        <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
            ></AgGridReact>
        </div>
    );
};

export default Books;

const container = document.getElementById("book");
const root = createRoot(container!);
root.render(<Books />);

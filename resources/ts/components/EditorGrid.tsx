"use strict";

import { L } from "../labels";

import React, { useMemo, useRef, useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-alpine.css";
//import "./styles.css";
import { ColDef } from "ag-grid-community";
import { Button } from "@mui/material";

const EditorGrid = (): JSX.Element => {
    // DOM参照
    const gridRef = useRef<AgGridReact<any>>(null);
    // 格納する要素（親）のスタイル
    const containerStyle = useMemo(
        () => ({ width: "100%", height: "450px" }),
        []
    );

    // 格納される要素（子）のスタイル
    const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

    // 行データ
    const [rowData, setRowData] = useState<any[]>([]);

    useEffect(() => {
        fetch("/editors")
            .then((response: Response) => response.json())
            .then((data: string) => {
                setRowData(data);
            });
    }, []);

    // カラムの設定（列毎）
    const [columnDefs, setColumnDefs] = useState<ColDef[]>([
        { headerName: L.EditorGrid.Header.ID, field: "id" },
        { headerName: L.EditorGrid.Header.Name, field: "name" },
        { headerName: L.EditorGrid.Header.ReadingName, field: "reading_name" },
        {
            headerName: L.EditorGrid.Header.AffiliationName,
            field: "affiliation_name",
        },
        {
            headerName: L.EditorGrid.Header.AffiliationReadingName,
            field: "affiliation_reading_name",
        },
        { headerName: L.EditorGrid.Header.Email, field: "email" },
    ]);

    return (
        <div style={containerStyle}>
            <div className="container">
                <div style={gridStyle} className="ag-theme-alpine">
                    <AgGridReact<any>
                        ref={gridRef}
                        rowData={rowData}
                        columnDefs={columnDefs}
                    />
                </div>
            </div>
        </div>
    );
};
export default EditorGrid;

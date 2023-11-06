"use strict";

import { L } from "../labels";

import React, { useMemo, useRef, useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-alpine.css";
//import "./styles.css";
import { ColDef, GridOptions, ITextFilterParams } from "ag-grid-community";

const EditorGrid = (): JSX.Element => {
    // DOM参照
    const gridRef = useRef<AgGridReact<any>>(null);
    // 格納する要素（親）のスタイル
    const containerStyle = useMemo(
        () => ({ width: "100%", height: "600px" }),
        []
    );

    // 格納される要素（子）のスタイル
    const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

    // 行データ
    const [rowData, setRowData] = useState<any[]>([]);

    useEffect(() => {
        fetch("/authors")
            .then((response: Response) => response.json())
            .then((data: string) => {
                setRowData(data);
            });
    }, []);

    // カラムの共通設定（全体）
    const defaultColDef = useMemo<ColDef>(() => {
        return {
            editable: false,
            sortable: true,
            filter: true,
        };
    }, []);

    const gridOptions = useMemo<AgGridReact<GridOptions>>(() => {
        return {
            filterHeaderFilterBuilder: (params) => {
                return {
                    contains: "含む",
                    startWith: "始まる",
                    endWith: "終わる",
                };
            },
        };
    }, []);

    // カラムの設定（列毎）
    const [columnDefs, setColumnDefs] = useState<ColDef[]>([
        {
            headerName: L.EditorGrid.Header.ID,
            field: "id",
            filter: false,
            checkboxSelection: true,
        },
        {
            headerName: L.EditorGrid.Header.Name,
            field: "name",
        },
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
                        defaultColDef={defaultColDef}
                        gridOptions={gridOptions}
                        rowSelection="multiple"
                        // 行クリックでの行選択は無効にする（trueが無効）
                        suppressRowClickSelection={true}
                    />
                </div>
            </div>
        </div>
    );
};
export default EditorGrid;

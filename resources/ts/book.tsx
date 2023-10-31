"use strict";

import React, {
    useCallback,
    useMemo,
    useRef,
    useState,
    StrictMode,
    useEffect,
} from "react";
import { createRoot } from "react-dom/client";
import { AgGridReact } from "ag-grid-react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-alpine.css";
//import "./styles.css";
import {
    ColDef,
    ColGroupDef,
    GetRowIdFunc,
    GetRowIdParams,
    Grid,
    GridOptions,
    RowSelectedEvent,
    ValueFormatterParams,
} from "ag-grid-community";

interface ICar {
    make: string;
    model: string;
    price: number;
}
interface IDiscountRate {
    discount: number;
}

const BookList = (): JSX.Element => {
    // DOM参照
    const gridRef = useRef<AgGridReact<ICar>>(null);
    // 格納する要素（親）のスタイル
    const containerStyle = useMemo(
        () => ({ width: "100%", height: "100%" }),
        []
    );

    // 格納される要素（子）のスタイル
    const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

    // 行データ
    const [rowData, setRowData] = useState<any[]>([]);

    useEffect(() => {
        fetch("/book_list")
            .then((response: Response) => response.json())
            .then((data: string) => {
                console.log(data);
                setRowData(JSON.parse(data));
            });
    }, []);

    // カラムの設定（列毎）
    const [columnDefs, setColumnDefs] = useState<ColDef[]>([
        { headerName: "ID", field: "id" },
        { headerName: "タイトル", field: "title" },
        { headerName: "サブタイトル", field: "sub_title" },
        { headerName: "編集" },
        { headerName: "削除" },
    ]);

    return (
        <div style={containerStyle}>
            <div className="test-container">
                <div style={gridStyle} className="ag-theme-alpine">
                    <AgGridReact<ICar>
                        ref={gridRef}
                        rowData={rowData}
                        columnDefs={columnDefs}
                    />
                </div>
            </div>
        </div>
    );
};

const root = createRoot(document.getElementById("book_root")!);
root.render(
    <StrictMode>
        <BookList />
    </StrictMode>
);

"use strict";

import React, {
    useCallback,
    useMemo,
    useRef,
    useState,
    StrictMode,
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

const GridExample = (): JSX.Element => {
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
    const [rowData, setRowData] = useState<ICar[]>([
        { make: "Toyota", model: "Celica", price: 35000 },
        { make: "Ford", model: "Mondeo", price: 32000 },
        { make: "Porsche", model: "Boxster", price: 72000 },
    ]);
    // カラムの設定（列毎）
    const [columnDefs, setColumnDefs] = useState<ColDef[]>([
        { headerName: "Make", field: "make" },
        { headerName: "Model", field: "model" },
        {
            headerName: "Price",
            field: "price",
            valueFormatter: (params: ValueFormatterParams<ICar, number>) => {
                // params.value: number
                return "£" + params.value;
            },
        },
    ]);

    // 状況？
    const context = useMemo(() => {
        return {
            discount: 0.9,
        } as IDiscountRate;
    }, []);

    //
    const getRowId = useMemo<GetRowIdFunc>(() => {
        return (params: GetRowIdParams<ICar>) => {
            // params.data : ICar
            return params.data.make + params.data.model;
        };
    }, []);

    // 行選択時のイベント
    const onRowSelected = useCallback(
        (event: RowSelectedEvent<ICar, IDiscountRate>) => {
            // event.data: ICar | undefined
            if (event.data && event.node.isSelected()) {
                const price = event.data.price;
                // event.context: IContext
                const discountRate = event.context.discount;
                console.log("Price with 10% discount:", price * discountRate);
            }
        },
        []
    );

    // ボタンクリック時のイベント
    const onShowSelection = useCallback(() => {
        // api.getSelectedRows() : ICar[]
        const cars: ICar[] = gridRef.current!.api.getSelectedRows();
        console.log(
            "Selected cars are",
            cars.map((c) => `${c.make} ${c.model}`)
        );
    }, []);

    return (
        <div style={containerStyle}>
            <div className="test-container">
                <div className="test-header">
                    <button onClick={onShowSelection}>Log Selected Cars</button>
                </div>

                <div style={gridStyle} className="ag-theme-alpine">
                    <AgGridReact<ICar>
                        ref={gridRef}
                        rowData={rowData}
                        columnDefs={columnDefs}
                        rowSelection={"multiple"}
                        context={context}
                        getRowId={getRowId}
                        onRowSelected={onRowSelected}
                    />
                </div>
            </div>
        </div>
    );
};

const root = createRoot(document.getElementById("book_root")!);
root.render(
    <StrictMode>
        <GridExample />
    </StrictMode>
);

"use strict";

import { L } from "../../labels";

import React, {
    useMemo,
    useRef,
    useState,
    useEffect,
    useCallback,
} from "react";
import { AgGridReact } from "ag-grid-react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-alpine.css";
//import "./styles.css";
import { ColDef, FirstDataRenderedEvent, GridOptions } from "ag-grid-community";

type Props = {
    rowData: IUser[];
    setRowData: (rowData: IUser[]) => void;
    columnDefs: ColDef[];
    gridRef: React.RefObject<AgGridReact<IUser>>;
};

const EditorGrid = (props: Props): JSX.Element => {
    // データの展開
    const { rowData, setRowData, columnDefs, gridRef } = props;

    // 格納する要素（親）のスタイル
    const containerStyle = useMemo(
        () => ({ width: "100%", height: "600px" }),
        []
    );

    // 格納される要素（子）のスタイル
    const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

    // カラムの共通設定（全体）
    const defaultColDef = useMemo<ColDef>(() => {
        return {
            editable: false,
            sortable: true,
            filter: true,
            resizable: true,
        };
    }, []);

    // カラム幅の調整
    const handleFirstDataRendered = useCallback(
        (event: FirstDataRenderedEvent) => {
            gridRef.current!.columnApi.autoSizeAllColumns();
        },
        []
    );

    const gridOptions = useMemo<AgGridReact<GridOptions>>((): any => {
        return {};
    }, []);

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
                        onFirstDataRendered={handleFirstDataRendered}
                    />
                </div>
            </div>
        </div>
    );
};
export default EditorGrid;

"use strict";

import { L } from "../../labels";

import React, { useMemo, useRef, useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-alpine.css";
//import "./styles.css";
import { ColDef } from "ag-grid-community";
import { Button } from "@mui/material";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBookDialog from "./AddBookDialog";

const BookGrid = (): JSX.Element => {
    // DOM参照
    const gridRef = useRef<AgGridReact<any>>(null);
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
        console.log("mounted");
        fetch("/book_list")
            .then((response: Response) => response.json())
            .then((data: string) => {
                setRowData(data);
            });
    }, []);

    // カラムの設定（列毎）
    const [columnDefs, setColumnDefs] = useState<ColDef[]>([
        { headerName: L.BookGrid.Header.ID, field: "id" },
        { headerName: L.BookGrid.Header.Title, field: "title" },
        { headerName: L.BookGrid.Header.SubTitle, field: "sub_title" },
        {
            headerName: L.BookGrid.Header.Edit,
            cellRenderer: (params: any) => {
                return (
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<ModeEditOutlineIcon />}
                        onClick={() => console.log(params)}
                        size="small"
                        sx={{ marginTop: "5px" }}
                    >
                        {L.BookGrid.Header.Edit}
                    </Button>
                );
            },
        },
        {
            headerName: L.BookGrid.Header.Delete,
            cellRenderer: (params: any) => {
                return (
                    <Button
                        variant="contained"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => console.log(params)}
                        size="small"
                        sx={{ marginTop: "5px" }}
                    >
                        {L.BookGrid.Header.Delete}
                    </Button>
                );
            },
        },
    ]);

    const handleAddBookClick = useEffect(() => {
        console.log();
    }, []);

    return (
        <div style={containerStyle}>
            <div className="container">
                <div style={{ marginBottom: "8px" }}>
                    <AddBookDialog />
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => console.log("Delete book")}
                        sx={{ marginLeft: "8px" }}
                    >
                        {L.BookGrid.DeleteBook.ButtonLabel}
                    </Button>
                </div>
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
export default BookGrid;

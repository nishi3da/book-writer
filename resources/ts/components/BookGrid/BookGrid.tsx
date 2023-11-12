'use strict';

import { L } from '../../labels';

import { useMemo, useRef, useState, useCallback, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-alpine.css';
//import "./styles.css";
import { ColDef, FirstDataRenderedEvent, GridReadyEvent } from 'ag-grid-community';
import { Button } from '@mui/material';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import BookEditDialog from './BookEditDialog';
import BookDeleteDialog from './BookDeleteDialog';
import axios, { Axios } from 'axios';

type BookGridProps = {
  userId: number;
};

const BookGrid = (props: BookGridProps): JSX.Element => {
  // DOM参照
  const gridRef = useRef<AgGridReact<IBook>>(null);
  // 格納する要素（親）のスタイル
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  // ユーザーID
  const userId = props.userId;
  // 格納される要素（子）のスタイル
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  // 行データ
  const [rowData, setRowData] = useState<IBook[]>([]);
  // 書籍登録・更新ダイアログの開閉フラグ、初期値は閉じている
  const [editDialogOpen, setEditDialogOpen] = useState<boolean>(false);
  // 書籍削除確認ダイアログの開閉フラグ、初期値は閉じている
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);

  // 書籍ID、データ
  const [bookId, setBookId] = useState<number | null>(null);

  // カラムの設定（列毎）
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    {
      headerName: '',
      field: 'id',
      checkboxSelection: true,
    },
    { headerName: L.BookGrid.Header.Title, field: 'title' },
    { headerName: L.BookGrid.Header.SubTitle, field: 'sub_title' },
    {
      headerName: L.BookGrid.Header.Edit,
      cellRenderer: (params: any) => {
        return (
          <Button
            variant='contained'
            color='primary'
            startIcon={<ModeEditOutlineIcon />}
            onClick={() => handleEditBookClickOpen(params.data.id)}
            size='small'
            sx={{ marginTop: '5px' }}
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
          <Button variant='contained' color='error' startIcon={<DeleteIcon />} onClick={() => handleDeleteDialogOpen(params.data.id)} size='small' sx={{ marginTop: '5px' }}>
            {L.BookGrid.Header.Delete}
          </Button>
        );
      },
    },
  ]);

  // 各種のAPIが使用可能になったタイミングで書籍一覧を取得する
  const handleGridReady = useCallback((params: GridReadyEvent) => {
    axios
      .get('/book_list')
      .then((response) => {
        setRowData(response.data);
      })
      .catch((error) => {
        console.log('get - error', error);
      });
  }, []);

  // データが読み込まれレンダリングされたタイミングで実行される関数
  const handleFirstDataRendered = useCallback((event: FirstDataRenderedEvent) => {
    // カラム幅の調整
    gridRef.current!.columnApi.autoSizeAllColumns();
  }, []);

  // 新規登録/更新ボタンクリック時の関数
  const handleEditDialogOpen = useCallback(() => {
    console.log('AddBook');
    setBookId(null);
    setEditDialogOpen(true);
  }, []);

  // 編集ボタンクリック時の関数
  const handleEditBookClickOpen = useCallback((id: number) => {
    console.log('EditBook', id);
    setBookId(id);
    setEditDialogOpen(true);
  }, []);

  // 書籍削除ボタンクリック時の関数
  const handleDeleteDialogOpen = useCallback((id: number) => {
    console.log('DeleteBook', id);
    setBookId(id);
    setDeleteDialogOpen(true);
  }, []);

  return (
    <div style={containerStyle}>
      <div className='container'>
        <div style={{ marginBottom: '8px' }}>
          <Button variant='contained' onClick={handleEditDialogOpen}>
            {L.BookGrid.EditBook.ButtonLabel}
          </Button>
          {/* 書籍の登録・編集用ダイアログ（共通） */}
          <BookEditDialog userId={userId} editDialogOpen={editDialogOpen} setEditDialogOpen={setEditDialogOpen} bookId={bookId} />
          <BookDeleteDialog deleteDialogOpen={deleteDialogOpen} setDeleteDialogOpen={setDeleteDialogOpen} bookId={bookId} rowData={rowData} />
        </div>
        <div style={gridStyle} className='ag-theme-alpine'>
          <AgGridReact<any> ref={gridRef} rowData={rowData} columnDefs={columnDefs} onFirstDataRendered={handleFirstDataRendered} onGridReady={handleGridReady} />
        </div>
      </div>
    </div>
  );
};
export default BookGrid;

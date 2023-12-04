'use strict';

import { L } from '../../labels';

import { useMemo, useRef, useState, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-alpine.css';
//import "./styles.css";
import { ColDef, FirstDataRenderedEvent, GridReadyEvent } from 'ag-grid-community';
import { Button, IconButton, TextField, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddBookDialog from './AddBookDialog';
import DeleteBookDialog from './DeleteBookDialog';
import axios from 'axios';
import KeyValueRenderer from './CellRenderer.tsx/KeyValueRenderer';
import KeyValueEditor from './CellEditor/KeyValueEditor';

type BookGridProps = {
  userId: number;
  bookStateTypes: { [key: number]: string };
};

const BookGrid = (props: BookGridProps): JSX.Element => {
  console.log('BookGrid - props', props);
  // props展開
  const { userId, bookStateTypes } = props;
  // DOM参照
  const gridRef = useRef<AgGridReact<IBook>>(null);
  // 格納する要素（親）のスタイル
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  // 格納される要素（子）のスタイル
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  // 行データ
  const [rowData, setRowData] = useState<IBook[]>([]);
  // 書籍登録・更新ダイアログの開閉フラグ、初期値は閉じている
  const [addBookDialogOpen, setAddBookDialogOpen] = useState<boolean>(false);
  // 書籍削除確認ダイアログの開閉フラグ、初期値は閉じている
  const [deleteBookDialogOpen, setDeleteBookDialogOpen] = useState<boolean>(false);
  // 書籍ID、データ
  const [bookId, setBookId] = useState<number | null>(null);

  // カラムの設定（列毎）
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    {
      headerName: L.BookGrid.Header.Action,
      cellRenderer: (params: any) => {
        return (
          <>
            <IconButton aria-label='edit' color='primary' onClick={() => handleEditButtonClick(params.data.id)}>
              <EditIcon />
            </IconButton>
            <IconButton aria-label='edit' color='error' onClick={() => handleDeleteBookDialogOpen(params.data.id)}>
              <DeleteIcon />
            </IconButton>
          </>
        );
      },
    },
    { headerName: L.BookGrid.Header.Title, field: 'title' },
    { headerName: L.BookGrid.Header.SubTitle, field: 'sub_title' },
    {
      headerName: L.BookGrid.Header.BookState,
      field: 'book_state_type_id',
      editable: true,
      cellRenderer: KeyValueRenderer,
      cellRendererParams: { keyValueObject: bookStateTypes },
      cellEditor: KeyValueEditor,
      cellEditorParams: {
        url: '/books',
        fieldName: 'book_state_type_id',
        keyValueObject: bookStateTypes,
        gridRef: gridRef,
        setRowData: setRowData,
      },
      cellEditorPopup: true,
    },
  ]);

  // 各種のAPIが使用可能になったタイミングで書籍一覧を取得する
  const handleGridReady = useCallback((params: GridReadyEvent) => {
    console.log('gete');
    axios
      .get('/books_list')
      .then((response) => {
        setRowData(response.data);
      })
      .catch((error) => {
        console.log('get book list - error', error);
      });
  }, []);

  // データが読み込まれレンダリングされたタイミングで実行される関数
  const handleFirstDataRendered = useCallback((event: FirstDataRenderedEvent) => {
    // カラム幅の調整
    gridRef.current!.columnApi.autoSizeAllColumns();
  }, []);

  // 編集ボタンのクリック時に呼び出される関数
  const handleEditButtonClick = useCallback((bookId: number) => {
    console.log(`/books/${bookId}/edit`);
    location.href = `/books/${bookId}/edit`;
  }, []);

  // 新規登録ボタンクリック時に呼び出される関数
  const handleAddBookDialogOpen = useCallback(() => {
    console.log('AddBook');
    setBookId(null);
    setAddBookDialogOpen(true);
  }, []);

  // 書籍削除ボタンクリック時の関数
  const handleDeleteBookDialogOpen = useCallback((bookId: number) => {
    console.log('DeleteBook', bookId);
    setBookId(bookId);
    setDeleteBookDialogOpen(true);
  }, []);

  // 入力時のクイックフィルタ
  const handleFilterTextBoxChanged = useCallback((event: React.FormEvent<HTMLDivElement>, gridRef: React.RefObject<AgGridReact<IBook>>) => {
    const element = document.getElementById('book-filter-text-box') as HTMLInputElement;
    gridRef.current!.api.setQuickFilter(element.value);
  }, []);

  // クイックフィルタのマッチ判定を行う関数
  const quickFilterMatcher = useCallback((quickFilterParts: string[], rowQuickFilterAggregateText: string) => {
    return quickFilterParts.every((part) => rowQuickFilterAggregateText.match(part));
  }, []);

  return (
    <div style={containerStyle}>
      <div className='container'>
        <div style={{ marginBottom: '8px' }}>
          <Button variant='contained' onClick={handleAddBookDialogOpen} sx={{ marginRight: '10px' }}>
            {L.BookGrid.AddBook.ButtonLabel}
          </Button>
          <Tooltip title={L.UsersGrid.QuickFilterTooltip}>
            <TextField
              id={'book-filter-text-box'}
              label={L.BookGrid.QuickFilterPlaceHolder}
              variant='outlined'
              sx={{ width: '40%', marginBottom: '5px' }}
              size='small'
              onInput={(event) => handleFilterTextBoxChanged(event, gridRef)}
            />
          </Tooltip>
          {/* 書籍の登録・編集用ダイアログ（共通） */}
          <AddBookDialog userId={userId} addBookDialogOpen={addBookDialogOpen} setAddBookDialogOpen={setAddBookDialogOpen} />
          <DeleteBookDialog deleteBookDialogOpen={deleteBookDialogOpen} setDeleteBookDialogOpen={setDeleteBookDialogOpen} bookId={bookId} rowData={rowData} />
        </div>
        <div style={gridStyle} className='ag-theme-alpine'>
          <AgGridReact<any>
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            onFirstDataRendered={handleFirstDataRendered}
            onGridReady={handleGridReady}
            quickFilterMatcher={quickFilterMatcher}
          />
        </div>
      </div>
    </div>
  );
};
export default BookGrid;

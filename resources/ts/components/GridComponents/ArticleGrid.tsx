'use strict';

import { L } from '../../labels';

import { useMemo, useState, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-alpine.css';
import { ColDef, FirstDataRenderedEvent, GridReadyEvent, RowDragEndEvent } from 'ag-grid-community';
import axios from 'axios';
import ArticleTypeRenderer from './CellRenderer.tsx/ArticleTypeRenderer';
import ArticleTypeEditor from './CellEditor/ArticleTypeEditor';
import { Button, IconButton, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

type ArticleGridProps = {
  userId: number;
  bookId: number;
  articleGridRef: React.RefObject<AgGridReact<IArticle>>;
  articleTypes: { [key: number]: string };
};

const ArticleGrid = (props: ArticleGridProps): JSX.Element => {
  // props展開
  const { bookId, articleGridRef, articleTypes } = props;
  // 格納する要素（親）のスタイル
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  // 格納される要素（子）のスタイル
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  // 行データ
  const [rowData, setRowData] = useState<IArticle[]>([]);

  // カラムの設定（共通）
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      sortable: false,
      filter: false,
      resizable: false,
      editable: true,
    };
  }, []);

  // カラムの設定（列毎）
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    {
      field: 'article_number',
      headerName: L.ArticleGrid.Header.Number,
      rowDrag: true,
      editable: false,
      checkboxSelection: true,
    },
    {
      headerName: L.ArticleGrid.Header.Edit,
      editable: false,
      cellRenderer: (params) => {
        return (
          <IconButton aria-label='edit' color='primary'>
            <EditIcon />
          </IconButton>
        );
      },
    },
    {
      headerName: L.ArticleGrid.Header.Delete,
      editable: false,
      cellRenderer: (params) => {
        return (
          <IconButton aria-label='delete' color='error'>
            <DeleteIcon />
          </IconButton>
        );
      },
    },
    {
      field: 'article_type_id',
      headerName: L.ArticleGrid.Header.Type,
      cellRenderer: ArticleTypeRenderer,
      cellRendererParams: { articleTypes: articleTypes },
      cellEditor: ArticleTypeEditor,
      cellEditorParams: {
        articleTypes: articleTypes,
        articleGridRef: articleGridRef,
        setRowData: setRowData,
      },
      cellEditorPopup: true,
    },
    {
      field: 'title',
      headerName: L.ArticleGrid.Header.Title,
    },
    {
      field: 'sub_title',
      headerName: L.ArticleGrid.Header.SubTitle,
    },
    {
      field: 'lead_sentence',
      headerName: L.ArticleGrid.Header.LeadSentence,
    },
    {
      field: 'article_data',
      headerName: L.ArticleGrid.Header.ArticleData,
    },
    {
      field: 'created_at',
      headerName: L.ArticleGrid.Header.CreatedAt,
      editable: false,
    },
    {
      field: 'updated_at',
      headerName: L.ArticleGrid.Header.UpdatedAt,
      editable: false,
    },
  ]);

  // 各種のAPIが使用可能になったタイミングで書籍一覧を取得する
  const handleGridReady = useCallback((params: GridReadyEvent) => {
    console.log('get - articles -');
    // 記事一覧の取得
    axios
      .get(`/articles_list/${bookId}`)
      .then((response) => {
        setRowData(response.data);
      })
      .catch((error) => {
        console.log('get - articles - error', error);
      });
  }, []);

  // データが読み込まれレンダリングされたタイミングで実行される関数
  const handleFirstDataRendered = useCallback((event: FirstDataRenderedEvent) => {
    // カラム幅の調整
    articleGridRef.current!.columnApi.autoSizeAllColumns();
  }, []);

  // ドラッグアンドドロップの終了時のイベント処理
  const handleRowDragEnd = useCallback((event: RowDragEndEvent) => {
    console.log('DD', event);
    let newRowData: IArticle[] = [];
    let cnt = 1;
    event.api.forEachNodeAfterFilterAndSort((node) => {
      if (node && node.data) {
        let newRow: IArticle = { ...node.data };
        newRow.article_number = cnt++;
        newRowData.push(newRow);
      }
    });
    setRowData([...newRowData]);
  }, []);

  const handleAddArticleClick = useCallback(() => {
    console.log('add article');
  }, []);

  const handleDeleteArticleClick = useCallback(() => {
    console.log('delete article');
  }, []);

  return (
    <div style={containerStyle}>
      <div className='container'>
        <Stack direction='row' spacing={2} sx={{ marginBottom: '10px' }}>
          <Button variant='contained' color='primary' onClick={handleAddArticleClick}>
            {L.ArticleGrid.AddArticle}
          </Button>
          <Button variant='contained' color='error' onClick={handleDeleteArticleClick}>
            {L.ArticleGrid.DeleteArticle}
          </Button>
        </Stack>
        <div style={gridStyle} className='ag-theme-alpine'>
          <AgGridReact<any>
            ref={articleGridRef}
            defaultColDef={defaultColDef}
            rowData={rowData}
            columnDefs={columnDefs}
            onFirstDataRendered={handleFirstDataRendered}
            onGridReady={handleGridReady}
            rowDragManaged={true}
            animateRows={true}
            onRowDragEnd={handleRowDragEnd}
          />
        </div>
      </div>
    </div>
  );
};
export default ArticleGrid;

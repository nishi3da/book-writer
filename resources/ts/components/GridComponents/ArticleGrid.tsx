'use strict';

import { L } from '../../labels';

import { useMemo, useState, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-alpine.css';
import { CellValueChangedEvent, ColDef, FirstDataRenderedEvent, GridReadyEvent, RowDragEndEvent } from 'ag-grid-community';
import axios from 'axios';
import KeyValueRenderer from './CellRenderer.tsx/KeyValueRenderer';
import KeyValueEditor from './CellEditor/KeyValueEditor';
import { Button, IconButton, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

type ArticleGridProps = {
  userId: number;
  bookId: number;
  articleGridRef: React.RefObject<AgGridReact<IArticle>>;
  articleTypes: { [key: number]: string };
  articleStateTypes: { [key: number]: string };
};

let baseArticleTypeId: number;

const ArticleGrid = (props: ArticleGridProps): JSX.Element => {
  // props展開
  const { userId, bookId, articleGridRef, articleTypes, articleStateTypes } = props;
  // 格納する要素（親）のスタイル
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  // 格納される要素（子）のスタイル
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  // 行データ
  const [rowData, setRowData] = useState<IArticle[]>([]);

  // 基本の記事種別
  Object.entries(articleTypes).forEach(([key, value]) => {
    if (value.includes('本文')) {
      baseArticleTypeId = Number(key);
    }
  });

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
      field: 'article_state_type_id',
      headerName: L.ArticleGrid.Header.State,
      cellRenderer: KeyValueRenderer,
      cellRendererParams: { keyValueObject: articleStateTypes },
      cellEditor: KeyValueEditor,
      cellEditorParams: {
        url: '/articles',
        fieldName: 'article_state_type_id',
        keyValueObject: articleStateTypes,
        gridRef: articleGridRef,
        setRowData: setRowData,
      },
      cellEditorPopup: true,
    },
    {
      field: 'article_type_id',
      headerName: L.ArticleGrid.Header.Type,
      cellRenderer: KeyValueRenderer,
      cellRendererParams: { keyValueObject: articleTypes },
      cellEditor: KeyValueEditor,
      cellEditorParams: {
        url: '/articles',
        fieldName: 'article_type_id',
        keyValueObject: articleTypes,
        gridRef: articleGridRef,
        setRowData: setRowData,
      },
      cellEditorPopup: true,
    },
    {
      field: 'label',
      headerName: L.ArticleGrid.Header.Label,
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
  const handleGridReady = useCallback((params: GridReadyEvent, rowData: IArticle[]) => {
    console.log('handleGridReady -', rowData.length);
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
    const newRowData: IArticle[] = [];
    articleGridRef.current!.api.forEachNode((node) => {
      if (node && node.data) {
        newRowData.push(node.data);
      }
    });
    setRowData([...newRowData]);
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
    // 表示データの更新
    setRowData([...newRowData]);
    // DBの更新
    axios.put('/articles', newRowData).catch((error) => {
      console.log('put - articles - error', error);
    });
  }, []);

  const handleAddArticleClick = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>, rowData: IArticle[], baseArticleTypeId: number) => {
    console.log('add article');
    // setAddArticleDialogOpen(true);
    // 登録の場合
    console.log('handleAddArticleClick - baseArticoleTypeId -', baseArticleTypeId);
    axios
      .post('/articles', {
        articleData: {
          book_id: bookId,
          article_type_id: baseArticleTypeId,
          article_number: rowData.length + 1,
          label: '',
          article_data: '',
          article_state_type_id: 1,
          editorIds: [],
          authorIds: [],
        },
      })
      .then((res) => {
        // location.href = `/books/${bookId}/edit`;
        // 記事一覧の再取得
        axios
          .get(`/articles_list/${bookId}`)
          .then((response) => {
            setRowData(response.data);
          })
          .catch((error) => {
            console.log('get re- articles - error', error);
          });
      })
      .catch((error) => {
        console.log('post re- error', error);
      });
  }, []);

  // 内容変更時のイベント処理
  const handleCellValueChanged = useCallback((event: CellValueChangedEvent) => {
    console.log('handleCellValueChanged -', event);
    let newRow: IArticle;
    if (event.data) {
      newRow = { ...event.data };
    } else {
      return;
    }
    // DBの更新
    axios.put('/articles', [newRow]).catch((error) => {
      console.log('put - articles - error', error);
    });
  }, []);

  // 記事の削除処理
  const handleDeleteArticleClick = useCallback(() => {
    console.log('delete article');
  }, []);

  return (
    <div style={containerStyle}>
      <div className='container'>
        <Stack direction='row' spacing={2} sx={{ marginBottom: '10px' }}>
          <Button variant='contained' color='primary' onClick={(e) => handleAddArticleClick(e, rowData, baseArticleTypeId)}>
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
            onGridReady={(e) => handleGridReady(e, rowData)}
            rowDragManaged={true}
            animateRows={true}
            onRowDragEnd={handleRowDragEnd}
            onCellValueChanged={handleCellValueChanged}
          />
        </div>
      </div>
      {/* <AddArticleDialog userId={userId} bookId={bookId} addArticleDialogOpen={addArticleDialogOpen} setAddArticleDialogOpen={setAddArticleDialogOpen} articleTypes={articleTypes} articleCount={articleCount}/> */}
    </div>
  );
};
export default ArticleGrid;

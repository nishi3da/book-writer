'use strict';

import { L } from '../../labels';

import { useMemo, useRef, useState, useCallback, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-alpine.css';
import { ColDef, FirstDataRenderedEvent, GridReadyEvent } from 'ag-grid-community';
import axios from 'axios';

type ArticleGridProps = {
  userId: number;
  bookId: number;
  numberOfArticles: number;
  articleGridRef: React.RefObject<AgGridReact<IArticle>>;
};

const ArticleGrid = (props: ArticleGridProps): JSX.Element => {
  // props展開
  const { userId, bookId, numberOfArticles, articleGridRef } = props;
  // DOM参照
  const gridRef = useRef<AgGridReact<IArticle>>(null);
  // 格納する要素（親）のスタイル
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  // 格納される要素（子）のスタイル
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  // 行データ
  const [rowData, setRowData] = useState<IArticle[]>([]);

  // カラムの設定（列毎）
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([
    {
      field: 'article_number',
      headerName: L.ArticleGrid.Header.Number,
    },
    {
      field: 'article_type',
      headerName: L.ArticleGrid.Header.Type,
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
    },
    {
      field: 'updated_at',
      headerName: L.ArticleGrid.Header.UpdatedAt,
    },
  ]);

  // 各種のAPIが使用可能になったタイミングで書籍一覧を取得する
  const handleGridReady = useCallback((params: GridReadyEvent) => {
    console.log('get - articles -');
    // 記事一覧の取得
    axios
      .get(`/articles_list/${bookId}`)
      .then((response) => {
        if (response.data.length === 0) {
          console.log('no articles');
          const initArticles: IArticle[] = [];
          for (let i = 0; i < numberOfArticles; i++) {
            initArticles.push({
              id: 0,
              book_id: bookId,
              article_number: i + 1,
              article_type: '本文',
              title: '',
              sub_title: '',
              lead_sentence: '',
              article_data: '',
              created_at: '',
              updated_at: '',
            });
          }
          setRowData(initArticles);
        } else {
          setRowData(response.data);
        }
      })
      .catch((error) => {
        console.log('get - articles - error', error);
      });
  }, []);

  // データが読み込まれレンダリングされたタイミングで実行される関数
  const handleFirstDataRendered = useCallback((event: FirstDataRenderedEvent) => {
    // カラム幅の調整
    gridRef.current!.columnApi.autoSizeAllColumns();
  }, []);

  return (
    <div style={containerStyle}>
      <div className='container'>
        <div style={gridStyle} className='ag-theme-alpine'>
          <AgGridReact<any> ref={articleGridRef} rowData={rowData} columnDefs={columnDefs} onFirstDataRendered={handleFirstDataRendered} onGridReady={handleGridReady} />
        </div>
      </div>
    </div>
  );
};
export default ArticleGrid;

'use strict';

import { L } from '../../labels';

import React, { useMemo, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-alpine.css';
//import "./styles.css";
import { CheckboxSelectionCallbackParams, ColDef, FirstDataRenderedEvent, GridOptions } from 'ag-grid-community';
import { TextField } from '@mui/material';

type Props = {
  type: 'editors' | 'authors';
  userId: number;
  rowData: IUser[];
  setRowData: (rowData: IUser[]) => void;
  gridRef: React.RefObject<AgGridReact<IUser>>;
};

const EditorGrid = (props: Props): JSX.Element => {
  // データの展開
  const { type, userId, rowData, setRowData, gridRef } = props;

  const prefix = useMemo(() => {
    if (type === 'editors') {
      return L.UsersGrid.EditorsPrefix;
    } else {
      return L.UsersGrid.AuthorsPrefix;
    }
  }, []);

  // 格納する要素（親）のスタイル
  const containerStyle = useMemo(() => ({ width: '100%', height: '500px' }), []);

  // 格納される要素（子）のスタイル
  const gridStyle = useMemo(() => ({ height: '440px', width: '100%' }), []);

  // カラムの共通設定（全体）
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      editable: false,
      //sortable: true,
      filter: 'agMultiColumnFilter',
      resizable: true,
    };
  }, []);

  // 一覧表示のヘッダ設定
  const columnDefs: ColDef[] = useMemo(() => {
    return [
      {
        //headerName: L.EditorGrid.Header.ID,
        //field: "id",
        filter: false,
        checkboxSelection: true,
      },
      {
        headerName: L.UsersGrid.Header.Name,
        field: 'name',
      },
      {
        headerName: L.UsersGrid.Header.ReadingName,
        field: 'reading_name',
      },
      {
        headerName: L.UsersGrid.Header.AffiliationName,
        field: 'affiliation_name',
      },
      {
        headerName: L.UsersGrid.Header.AffiliationReadingName,
        field: 'affiliation_reading_name',
      },
      { headerName: L.UsersGrid.Header.Email, field: 'email' },
    ];
  }, []);

  // カラム幅の調整
  const handleFirstDataRendered = useCallback((event: FirstDataRenderedEvent) => {
    gridRef.current!.columnApi.autoSizeAllColumns();
  }, []);

  const handleFilterTextBoxChanged = useCallback((event: React.FormEvent<HTMLDivElement>, gridRef: React.RefObject<AgGridReact<IUser>>, type: string) => {
    console.log('type', type);
    const element = document.getElementById(type + '-filter-text-box') as HTMLInputElement;
    console.log(element);
    gridRef.current!.api.setQuickFilter(element.value);
  }, []);

  return (
    <>
      <div style={containerStyle}>
        <TextField
          id={type + '-filter-text-box'}
          label={prefix + L.UsersGrid.QuickFilterPlaceHolder}
          variant='outlined'
          sx={{ width: '50%', marginBottom: '5px' }}
          size='small'
          onInput={(event) => handleFilterTextBoxChanged(event, gridRef, type)}
        />
        <div style={gridStyle} className='ag-theme-alpine'>
          <AgGridReact<any>
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            rowSelection='multiple'
            // 行クリックでの行選択は無効にする（trueが無効）
            suppressRowClickSelection={true}
            onFirstDataRendered={handleFirstDataRendered}
            // データ自体は１万件を超えることはほぼないので、クイックフィルタのキャッシュ設定はオフ
            cacheQuickFilter={false}
          />
        </div>
      </div>
    </>
  );
};
export default EditorGrid;

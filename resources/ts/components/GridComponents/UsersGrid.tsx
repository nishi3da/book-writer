'use strict';

import { L } from '../../labels';

import React, { useMemo, useCallback, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-alpine.css';
//import "./styles.css";
import { CheckboxSelectionCallbackParams, ColDef, FirstDataRenderedEvent, IRowNode, SelectionChangedEvent } from 'ag-grid-community';
import { TextField, Tooltip } from '@mui/material';
import { UseFormSetValue } from 'react-hook-form';

type UsersGridProps = {
  type: 'editors' | 'authors';
  userId: number;
  rowData: IUser[];
  gridRef: React.RefObject<AgGridReact<IUser>>;
  setValue: UseFormSetValue<BookFormValues>;
  selectedUserIds: number[];
  setSelectedUserIds: (selectedUserIds: number[]) => void;
};

const UsersGrid = (props: UsersGridProps): JSX.Element => {
  // データの展開
  const { type, gridRef, rowData, userId, setValue, selectedUserIds, setSelectedUserIds } = props;

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
        checkboxSelection: (params: CheckboxSelectionCallbackParams<IUser>) => {
          return !!params.data && params.data.id !== userId;
        },
        showDisabledCheckboxes: true,
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

  // レンダリングにデータが間に合わなかった時の処理
  useEffect(() => {
    // ログインユーザーのIDと一致する行のチェックボックスをONにする
    const userIds: number[] = [];
    if (gridRef && gridRef.current && gridRef.current.api) {
      gridRef.current!.api.forEachNode((node: IRowNode<IUser>) => {
        if (node.data && selectedUserIds.includes(node.data.id)) {
          node.setSelected(true);
          userIds.push(node.data.id);
        }
      });
      type === 'editors' ? setValue('editorIds', userIds) : setValue('authorIds', userIds);
    }
  }, [selectedUserIds]);

  // データの初回読み込み後に行う処理
  const handleFirstDataRendered = useCallback((event: FirstDataRenderedEvent, props: UsersGridProps) => {
    const { gridRef, setValue, type, selectedUserIds, setSelectedUserIds } = props;
    const userIds: number[] = [];
    // ログインユーザーのIDと一致する行のチェックボックスをONにする
    gridRef.current!.api.forEachNode((node: IRowNode<IUser>) => {
      if (node.data && selectedUserIds.includes(node.data.id)) {
        node.setSelected(true);
        userIds.push(node.data.id);
      }
    });
    type === 'editors' ? setValue('editorIds', userIds) : setValue('authorIds', userIds);
    setSelectedUserIds(userIds);
    // カラム幅の調整
    gridRef.current!.columnApi.autoSizeAllColumns();
  }, []);

  // 入力時のクイックフィルタ
  const handleFilterTextBoxChanged = useCallback((event: React.FormEvent<HTMLDivElement>, gridRef: React.RefObject<AgGridReact<IUser>>, type: string) => {
    const element = document.getElementById(type + '-filter-text-box') as HTMLInputElement;
    gridRef.current!.api.setQuickFilter(element.value);
  }, []);

  // クイックフィルタのマッチ判定を行う関数
  const quickFilterMatcher = useCallback((quickFilterParts: string[], rowQuickFilterAggregateText: string) => {
    return quickFilterParts.every((part) => rowQuickFilterAggregateText.match(part));
  }, []);

  //   チェックボックスの変更時のイベント関数
  const handleSelectionChanged = useCallback((event: SelectionChangedEvent, props: UsersGridProps) => {
    const { gridRef, setValue, type, setSelectedUserIds } = props;
    const userIds: number[] = [];
    gridRef.current!.api.forEachNode((node: IRowNode<IUser>) => {
      if (node.data && node.isSelected()) {
        userIds.push(node.data.id);
      }
    });
    type === 'editors' ? setValue('editorIds', userIds) : setValue('authorIds', userIds);
    setSelectedUserIds(userIds);
  }, []);

  return (
    <>
      <div style={containerStyle}>
        <Tooltip title={L.UsersGrid.QuickFilterTooltip}>
          <TextField
            id={type + '-filter-text-box'}
            label={prefix + L.UsersGrid.QuickFilterPlaceHolder}
            variant='outlined'
            sx={{ width: '40%', marginBottom: '5px', '& .MuiInputBase-input': { backgroundColor: 'white', borderRadius: '5px' } }}
            size='small'
            onInput={(event) => handleFilterTextBoxChanged(event, gridRef, type)}
          />
        </Tooltip>
        <div style={gridStyle} className='ag-theme-alpine'>
          <AgGridReact<any>
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            rowSelection='multiple'
            // 行クリックでの行選択は無効にする（trueが無効）
            suppressRowClickSelection={true}
            onFirstDataRendered={(event: FirstDataRenderedEvent<any, any>) => handleFirstDataRendered(event, props)}
            // データ自体は１万件を超えることはほぼないので、クイックフィルタのキャッシュ設定はオフ
            cacheQuickFilter={false}
            // クイックフィルタのマッチ判定を行う関数登録
            quickFilterMatcher={quickFilterMatcher}
            // チェックボックスの変更時のイベント関数登録
            onSelectionChanged={(event) => handleSelectionChanged(event, props)}
          />
        </div>
      </div>
    </>
  );
};
export default UsersGrid;

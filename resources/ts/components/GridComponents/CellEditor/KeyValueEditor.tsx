import { forwardRef, memo, useEffect, useImperativeHandle, useRef, useState } from 'react';

import { ICellEditorParams, RowAnimationCssClasses } from 'ag-grid-community';
import ReactDOM from 'react-dom';
import { List, ListItem, ListItemButton } from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import axios from 'axios';

interface KeyValueEditorProps extends ICellEditorParams<any, any, any> {
  fieldName: string;
  keyValueObject: { [key: number]: string };
  gridRef: React.RefObject<AgGridReact<IArticle>>;
  setRowData: (rowData: IArticle[]) => void;
}

const KeyValueEditor = memo(
  forwardRef((props: KeyValueEditorProps, ref) => {
    console.log('KeyValueEditor - props', props);

    // props展開
    const { keyValueObject } = props;

    // 選択した値
    const [selected, setSelected] = useState<number>(props.value);

    // 状態監視
    const [ready, setReady] = useState<boolean>(false);
    const [done, setDone] = useState<boolean>(false);
    // DOM参照
    const refContainer = useRef(null);

    useEffect(() => {
      if (done) props.stopEditing();
    }, [done]);

    useEffect(() => {
      (ReactDOM.findDOMNode(refContainer.current) as any).focus();
      setReady(true);
    }, []);

    useImperativeHandle(ref, () => {
      return {
        getValue: () => {
          console.log('getValue', selected, '=', keyValueObject[selected]);
          return selected;
        },
        isCancelBeforeStart: () => {
          return false;
        },
        isCancelAfterEnd: () => {
          return false;
        },
      };
    });

    const handleListItemClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, selection: number, props: KeyValueEditorProps, setSelected: (selection: number) => void) => {
      console.log('handleListItemClick', selection, '=', keyValueObject[selection], props);
      const { gridRef, setRowData, data, fieldName } = props;

      const newRowData: IArticle[] = [];

      gridRef.current!.api.forEachNodeAfterFilterAndSort((node) => {
        if (node && node.data) {
          let newRow: IArticle = { ...node.data };
          if (newRow[fieldName] === props.data[fieldName]) {
            newRow[fieldName] = selection;
          }
          newRowData.push(newRow);
        }
      });

      setRowData([...newRowData]);
      setSelected(selection);

      // カスタムセルエディタで記事種別の選択が行われたら、DBも更新する
      const newData: IArticle = { ...data };
      newData[fieldName] = selection;

      console.log('DB', newData);

      axios.put('/articles', [newData]).catch((error) => {
        console.log('put - articles - error', error);
      });

      props.stopEditing();
      setDone(true);
      setReady(true);
    };

    return (
      <div ref={refContainer} style={{ minWidth: 500, maxHeight: 445, backgroundColor: 'white' }}>
        <List>
          {keyValueObject &&
            Object.entries(keyValueObject).map(([key, value]) => (
              <ListItem sx={{ padding: 0 }} key={key}>
                <ListItemButton onClick={(event) => handleListItemClick(event, Number(key), props, setSelected)}>{value}</ListItemButton>
              </ListItem>
            ))}
        </List>
      </div>
    );
  }),
);

// export default forwardRef(ArticleEditor);
export default KeyValueEditor;

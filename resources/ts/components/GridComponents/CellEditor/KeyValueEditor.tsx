import { forwardRef, memo, useEffect, useImperativeHandle, useRef, useState } from 'react';

import { ICellEditorParams, IRowNode, RowAnimationCssClasses } from 'ag-grid-community';
import ReactDOM from 'react-dom';
import { List, ListItem, ListItemButton } from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import axios from 'axios';

interface KeyValueEditorProps<T> extends ICellEditorParams<any, any, any> {
  url: string;
  fieldName: string;
  keyValueObject: { [key: number]: string };
  gridRef: React.RefObject<AgGridReact<IArticle | IBook>>;
  setRowData: (rowData: (IArticle | IBook)[]) => void;
}

const KeyValueEditor = memo(
  forwardRef((props: KeyValueEditorProps<IArticle | IBook>, ref): JSX.Element => {
    console.log('KeyValueEditor - props', props);
    console.log('KeyValueEditor - ', typeof props.gridRef);

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

    const handleListItemClick = (
      event: React.MouseEvent<HTMLDivElement, MouseEvent>,
      selection: number,
      props: KeyValueEditorProps<IArticle | IBook>,
      setSelected: (selection: number) => void,
    ) => {
      console.log('handleListItemClick', selection, '=', keyValueObject[selection], props);
      const { gridRef, setRowData, data, fieldName, url } = props;

      const newRowData: (IArticle | IBook)[] = [];

      gridRef.current!.api.forEachNodeAfterFilterAndSort((node: IRowNode<IArticle | IBook>) => {
        if (node && node.data) {
          let newRow: IArticle | IBook = { ...node.data };
          if (newRow.id === props.data.id) {
            newRow[fieldName] = selection;
          }
          newRowData.push(newRow);
        }
      });

      setRowData([...newRowData]);
      setSelected(selection);

      // カスタムセルエディタで記事種別の選択が行われたら、DBも更新する

      const newData = { ...data } as IArticle | IBook;
      console.log('newData - ', newData);
      newData[fieldName] = selection;
      console.log('DB', newData);
      axios.put(url, [newData]).catch((error) => {
        console.log('put - KeyValueEditor - error', error);
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

export default KeyValueEditor;

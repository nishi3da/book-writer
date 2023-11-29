import { forwardRef, memo, useEffect, useImperativeHandle, useRef, useState } from 'react';

import { ICellEditorParams, RowAnimationCssClasses } from 'ag-grid-community';
import ReactDOM from 'react-dom';
import { List, ListItem, ListItemButton } from '@mui/material';
import { AgGridReact } from 'ag-grid-react';

interface ArticleEditorProps extends ICellEditorParams<any, any, any> {
  articleTypes: { [key: number]: string };
  articleGridRef: React.RefObject<AgGridReact<IArticle>>;
  setRowData: (rowData: IArticle[]) => void;
}

const ArticleEditor = memo(
  forwardRef((props: ArticleEditorProps, ref) => {
    console.log('ArticleEditor - props', props);

    // props展開
    const { articleTypes } = props;
    // 選択した値
    const [selectionArticleType, setSelectionArticleType] = useState(props.value);

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
          console.log('getValue', selectionArticleType, '=', articleTypes[selectionArticleType]);
          return selectionArticleType;
        },
        isCancelBeforeStart: () => {
          return false;
        },
        isCancelAfterEnd: () => {
          return false;
        },
      };
    });

    const handleListItemClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, selection: number, props: ArticleEditorProps) => {
      console.log('handleListItemClick', selection, '=', articleTypes[selection], props);
      const { articleGridRef, setRowData } = props;

      const newRowData: IArticle[] = [];

      articleGridRef.current!.api.forEachNodeAfterFilterAndSort((node) => {
        if (node && node.data) {
          let newRow: IArticle = { ...node.data };
          if (newRow.article_number === props.data.article_number) {
            newRow.article_type_id = selection;
          }
          newRowData.push(newRow);
        }
      });

      setRowData([...newRowData]);
      setSelectionArticleType(selection);
      props.stopEditing();
      setDone(true);
      setReady(true);
    };

    return (
      <div ref={refContainer} style={{ minWidth: 500, maxHeight: 445, backgroundColor: 'white' }}>
        <List>
          {Object.entries(articleTypes).map(([key, value]) => (
            <ListItem sx={{ padding: 0 }} key={key}>
              <ListItemButton onClick={(event) => handleListItemClick(event, Number(key), props)}>{value}</ListItemButton>
            </ListItem>
          ))}
        </List>
      </div>
    );
  }),
);

// export default forwardRef(ArticleEditor);
export default ArticleEditor;

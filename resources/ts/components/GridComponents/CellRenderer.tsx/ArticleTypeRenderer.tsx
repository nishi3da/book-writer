import { ICellRendererParams } from 'ag-grid-community';

export default (props: ICellRendererParams & { articleTypes: { [key: number]: string } }) => {
  const articleId = props.value;
  const articleTypes = props.articleTypes;

  return <>{articleTypes[articleId]}</>;
};

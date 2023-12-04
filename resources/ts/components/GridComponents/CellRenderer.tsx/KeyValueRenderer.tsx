import { ICellRendererParams } from 'ag-grid-community';

export default (props: ICellRendererParams & { keyValueObject: { [key: number]: string } }) => {
  const key = props.value;
  const keyValueObject = props.keyValueObject;

  return <>{keyValueObject[key]}</>;
};

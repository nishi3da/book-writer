import * as React from 'react';
import { useEffect, useMemo, useRef } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { L } from '../../labels';
import { InputBase, InputLabel, alpha, styled } from '@mui/material';
import UsersGrid from './UsersGrid';
import { AgGridReact } from 'ag-grid-react';

type AddBookDialogProps = {
  userId: number;
};

export default function AddBookDialog(props: AddBookDialogProps) {
  const [open, setOpen] = React.useState(false);
  const userId = props.userId;

  const [editors, setEditors] = React.useState<IUser[]>([]);
  const [authors, setAuthors] = React.useState<IUser[]>([]);

  // DOM参照
  const editorsGridRef = useRef<AgGridReact<IUser>>(null);
  const authorsGridRef = useRef<AgGridReact<IUser>>(null);

  // データの取得
  useEffect(() => {
    fetch('/editors')
      .then((response: Response) => response.json())
      .then((data: IUser[]) => {
        console.log(data);
        setEditors(data);
      });
  }, []);
  useEffect(() => {
    fetch('/authors')
      .then((response: Response) => response.json())
      .then((data: IUser[]) => {
        console.log(data);
        setAuthors(data);
      });
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // スタイル適用済みの入力コンポーネント
  const CustomInput = styled(InputBase)(({ theme }) => ({
    '&': {
      width: '100%',
      maxWidth: '100%',
    },
    '& .MuiInputBase-input': {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
      border: '1px solid #ced4da',
      fontSize: 12,
      width: '100%',
      padding: '10px 12px',
      marginBottom: '10px',
      transition: theme.transitions.create(['border-color', 'background-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"'].join(','),
      '&S:focus': {
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main,
      },
    },
  }));

  // スタイル適用済みのラベルコンポーネント
  const CustomInputLable = styled(InputLabel)(({ theme }) => ({
    '&': {
      fontSize: '16px',
      marginTop: '20px',
      color: 'black',
    },
  }));

  return (
    <React.Fragment>
      <Button variant='contained' onClick={handleClickOpen}>
        {L.BookGrid.AddBook.ButtonLabel}
      </Button>
      <Dialog open={open} onClose={handleClose} fullScreen sx={{ marginLeft: '10%', marginRight: '10%' }}>
        <DialogTitle>{L.BookGrid.AddBook.Dialog.Title}</DialogTitle>
        <DialogContent>
          {/* <DialogContentText></DialogContentText> */}
          <CustomInputLable shrink htmlFor='custom-input'>
            {L.BookGrid.AddBook.Dialog.BookTitle}
          </CustomInputLable>
          <CustomInput placeholder={L.BookGrid.AddBook.Dialog.BookTitle} />

          <CustomInputLable shrink htmlFor='custom-input'>
            {L.BookGrid.AddBook.Dialog.BookSubTitle}
          </CustomInputLable>
          <CustomInput placeholder={L.BookGrid.AddBook.Dialog.BookSubTitle} />

          <CustomInputLable shrink htmlFor='custom-input'>
            {L.BookGrid.AddBook.Dialog.BookNumberOfArticles}
          </CustomInputLable>
          <CustomInput
            type='number'
            inputProps={{
              min: 1,
              max: 500,
            }}
            placeholder={L.BookGrid.AddBook.Dialog.BookNumberOfArticles}
          />

          <CustomInputLable shrink htmlFor='custom-input'>
            {L.BookGrid.AddBook.Dialog.BookNumberOfSections}
          </CustomInputLable>
          <CustomInput
            type='number'
            inputProps={{
              min: 1,
              max: 500,
            }}
            placeholder={L.BookGrid.AddBook.Dialog.BookNumberOfSections}
          />

          <CustomInputLable shrink htmlFor='custom-input'>
            編集者
          </CustomInputLable>
          <UsersGrid type='editors' userId={userId} rowData={editors} setRowData={setEditors} gridRef={editorsGridRef} />

          <CustomInputLable shrink htmlFor='custom-input'>
            執筆者者
          </CustomInputLable>
          <UsersGrid type='authors' userId={userId} rowData={authors} setRowData={setAuthors} gridRef={authorsGridRef} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{L.BookGrid.AddBook.Dialog.Cancel}</Button>
          <Button onClick={handleClose}>{L.BookGrid.AddBook.Dialog.Ok}</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

import * as React from 'react';
import { useEffect, useRef } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { L } from '../../labels';
import { InputBase, InputLabel, Slide, alpha, styled } from '@mui/material';
import UsersGrid from './UsersGrid';
import { AgGridReact } from 'ag-grid-react';
import { TransitionProps } from '@mui/material/transitions';
import { SubmitHandler, useForm } from 'react-hook-form';

type AddBookDialogProps = {
  userId: number;
};

// 送信データ型
type FormValues = {
  title: string;
  sub_title: string;
  number_of_articles: number;
  number_of_sections: number;
  editors: IUser[];
  authors: IUser[];
};

// 処理待ち
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// アニメーション
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function AddBookDialog(props: AddBookDialogProps) {
  const [open, setOpen] = React.useState(false);
  const userId = props.userId;

  const [editors, setEditors] = React.useState<IUser[]>([]);
  const [authors, setAuthors] = React.useState<IUser[]>([]);

  // DOM参照
  const editorsGridRef = useRef<AgGridReact<IUser>>(null);
  const authorsGridRef = useRef<AgGridReact<IUser>>(null);

  // フォーム関係
  const { register, handleSubmit } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) => console.log(data);

  // データの取得
  useEffect(() => {
    fetch('/editors')
      .then((response: Response) => response.json())
      .then((data: IUser[]) => {
        setEditors(data);
      });
  }, []);
  useEffect(() => {
    fetch('/authors')
      .then((response: Response) => response.json())
      .then((data: IUser[]) => {
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
  const StyledInput = styled(InputBase)(({ theme }) => ({
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
  const StyledInputLable = styled(InputLabel)(({ theme }) => ({
    '&': {
      fontSize: '20px',
      marginTop: '20px',
      color: 'black',
    },
  }));

  return (
    <React.Fragment>
      <Button variant='contained' onClick={handleClickOpen}>
        {L.BookGrid.AddBook.ButtonLabel}
      </Button>
      <Dialog open={open} onClose={handleClose} fullScreen sx={{ marginLeft: '0%', marginRight: '0%' }} TransitionComponent={Transition}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle sx={{ backgroundColor: '#ccc' }}>{L.BookGrid.AddBook.Dialog.Title}</DialogTitle>
          <DialogContent>
            {/* <DialogContentText></DialogContentText> */}
            {/* タイトル */}
            <StyledInputLable shrink htmlFor='title'>
              {L.BookGrid.AddBook.Dialog.BookTitle}
            </StyledInputLable>
            <StyledInput id='title' placeholder={L.BookGrid.AddBook.Dialog.BookTitle} {...register('title')} />

            {/* サブタイトル */}
            <StyledInputLable shrink htmlFor='sub_title'>
              {L.BookGrid.AddBook.Dialog.BookSubTitle}
            </StyledInputLable>
            <StyledInput id='sub_title' placeholder={L.BookGrid.AddBook.Dialog.BookSubTitle} {...register('sub_title')} />

            {/* 記事数 */}
            <StyledInputLable shrink htmlFor='number_of_articles'>
              {L.BookGrid.AddBook.Dialog.BookNumberOfArticles}
            </StyledInputLable>
            <StyledInput
              id='number_of_articles'
              type='number'
              inputProps={{
                min: 1,
                max: 500,
                pattern: '[0-9]*',
              }}
              placeholder={L.BookGrid.AddBook.Dialog.BookNumberOfArticles}
              {...register('number_of_articles')}
            />

            {/* セクション数 */}
            <StyledInputLable shrink htmlFor='number_of_sections'>
              {L.BookGrid.AddBook.Dialog.BookNumberOfSections}
            </StyledInputLable>
            <StyledInput
              id='number_of_sections'
              type='number'
              inputProps={{
                min: 1,
                max: 500,
              }}
              placeholder={L.BookGrid.AddBook.Dialog.BookNumberOfSections}
              {...register('number_of_sections')}
            />

            {/* 編集者 */}
            <StyledInputLable shrink>{L.BookGrid.AddBook.Dialog.Editors}</StyledInputLable>
            <UsersGrid type='editors' userId={userId} rowData={editors} setRowData={setEditors} gridRef={editorsGridRef} />

            {/* 執筆者 */}
            <StyledInputLable shrink>{L.BookGrid.AddBook.Dialog.Authors}</StyledInputLable>
            <UsersGrid type='authors' userId={userId} rowData={authors} setRowData={setAuthors} gridRef={authorsGridRef} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>{L.BookGrid.AddBook.Dialog.Cancel}</Button>
            <Button type='submit' onClick={handleClose}>
              {L.BookGrid.AddBook.Dialog.Ok}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}
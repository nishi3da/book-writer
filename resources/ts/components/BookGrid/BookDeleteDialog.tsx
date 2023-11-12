import { Fragment, useCallback, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { alpha, styled, useTheme } from '@mui/material/styles';
import { L } from '../../labels';
import { InputBase, InputLabel } from '@mui/material';
import { RowDragFeature } from 'ag-grid-community/dist/lib/gridBodyComp/rowDragFeature';
import axios from 'axios';

type BookDeleteDialogProps = {
  bookId: number | null;
  rowData: IBook[];
  deleteDialogOpen: boolean;
  setDeleteDialogOpen: (open: boolean) => void;
};

const BookDeleteDialog = (propr: BookDeleteDialogProps) => {
  const { bookId, deleteDialogOpen, setDeleteDialogOpen, rowData } = propr;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [bookData, setBookData] = useState<IBook | null>(null);

  const handleClose = () => {
    setDeleteDialogOpen(false);
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

  // 書籍データの更新
  useEffect(() => {
    if (rowData) {
      rowData.find((row) => {
        if (row.id === bookId) {
          setBookData(row);
        }
      });
    }
  }, [bookId]);

  // 書籍のデータの削除リクエスト
  const handleBookDeleteClick = useCallback((bookId: number | null) => {
    console.log('handleBookDeleteClick');
    if (bookId) {
      axios
        .delete(`/books/${bookId}`)
        .then((response) => {
          location.href = '/books';
          setDeleteDialogOpen(false);
        })
        .catch((error) => {
          console.log('delete book - error', error);
        });
    }
  }, []);

  return (
    <Fragment>
      <Dialog fullScreen={fullScreen} open={deleteDialogOpen} onClose={handleClose} aria-labelledby='responsive-dialog-title'>
        <DialogTitle id='responsive-dialog-title'>{L.BookGrid.DeleteBook.DeleteTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{L.BookGrid.DeleteBook.DeleteMessage}</DialogContentText>
          <StyledInputLable shrink htmlFor='title'>
            {L.BookGrid.EditBook.Dialog.BookTitle}
          </StyledInputLable>
          <StyledInput id='title' value={bookData?.title} disabled />

          {/* サブタイトル */}
          <StyledInputLable shrink htmlFor='sub_title'>
            {L.BookGrid.EditBook.Dialog.BookSubTitle}
          </StyledInputLable>
          <StyledInput id='sub_title' value={bookData?.sub_title} disabled />

          {/* 記事数 */}
          <StyledInputLable shrink htmlFor='number_of_articles'>
            {L.BookGrid.EditBook.Dialog.BookNumberOfArticles}
          </StyledInputLable>
          <StyledInput id='number_of_articles' type='number' value={bookData?.number_of_articles} disabled />

          {/* セクション数 */}
          <StyledInputLable shrink htmlFor='number_of_sections'>
            {L.BookGrid.EditBook.Dialog.BookNumberOfSections}
          </StyledInputLable>
          <StyledInput id='number_of_sections' type='number' value={bookData?.number_of_sections} disabled />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            {L.BookGrid.DeleteBook.Cancel}
          </Button>
          <Button onClick={() => handleBookDeleteClick(bookId)} autoFocus>
            {L.BookGrid.DeleteBook.Ok}
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};
export default BookDeleteDialog;

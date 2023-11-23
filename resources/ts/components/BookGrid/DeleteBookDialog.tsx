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
import StyledInput from '../StyledComponents/StyledInput';
import StyledInputLabel from '../StyledComponents/StyledInputLabel';
import axios from 'axios';

type DeleteBookDialogProps = {
  bookId: number | null;
  rowData: IBook[];
  deleteBookDialogOpen: boolean;
  setDeleteBookDialogOpen: (open: boolean) => void;
};

const DeleteBookDialog = (propr: DeleteBookDialogProps) => {
  const { bookId, deleteBookDialogOpen: deleteDialogOpen, setDeleteBookDialogOpen: setDeleteDialogOpen, rowData } = propr;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [bookData, setBookData] = useState<IBook | null>(null);

  const handleClose = () => {
    setDeleteDialogOpen(false);
  };

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
          <StyledInputLabel shrink htmlFor='title' theme={theme}>
            {L.BookGrid.AddBook.Dialog.BookTitle}
          </StyledInputLabel>
          <StyledInput id='title' value={bookData?.title} disabled theme={theme} />

          {/* サブタイトル */}
          <StyledInputLabel shrink htmlFor='sub_title' theme={theme}>
            {L.BookGrid.AddBook.Dialog.BookSubTitle}
          </StyledInputLabel>
          <StyledInput id='sub_title' value={bookData?.sub_title} disabled theme={theme} />

          {/* 記事数 */}
          <StyledInputLabel shrink htmlFor='number_of_articles' theme={theme}>
            {L.BookGrid.AddBook.Dialog.BookNumberOfArticles}
          </StyledInputLabel>
          <StyledInput id='number_of_articles' type='number' value={bookData?.number_of_articles} disabled theme={theme} />

          {/* セクション数 */}
          <StyledInputLabel shrink htmlFor='number_of_sections' theme={theme}>
            {L.BookGrid.AddBook.Dialog.BookNumberOfSections}
          </StyledInputLabel>
          <StyledInput id='number_of_sections' type='number' value={bookData?.number_of_sections} disabled theme={theme} />
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
export default DeleteBookDialog;

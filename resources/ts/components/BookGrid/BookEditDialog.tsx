import { Fragment, forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
//import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { L } from '../../labels';
import { Alert, InputBase, InputLabel, Slide, alpha, styled } from '@mui/material';
import UsersGrid from './UsersGrid';
import { AgGridReact } from 'ag-grid-react';
import { TransitionProps } from '@mui/material/transitions';
import { SubmitHandler, useForm } from 'react-hook-form';

type BookEditDialogProps = {
  userId: number;
  bookId: number | null;
  editDialogOpen: boolean;
  setEditDialogOpen: (open: boolean) => void;
};

// 送信データ型
export type FormValues = {
  title: string;
  sub_title: string;
  number_of_articles: number;
  number_of_sections: number;
  editors: string;
  authors: string;
};

// 処理待ち
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// アニメーション
const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const BookEditDialog = (props: BookEditDialogProps): JSX.Element => {
  const { userId, editDialogOpen, setEditDialogOpen, bookId } = props;

  // 編集者・執筆者一覧データ
  const [editors, setEditors] = useState<IUser[]>([]);
  const [authors, setAuthors] = useState<IUser[]>([]);

  // 編集者・執筆者の選択状態データ
  const [selectedEditorIds, setSelectedEditorIds] = useState<number[]>([userId]);
  const [selectedAuthorIds, setSelectedAuthorIds] = useState<number[]>([]);

  // DOM参照
  const editorsGridRef = useRef<AgGridReact<IUser>>(null);
  const authorsGridRef = useRef<AgGridReact<IUser>>(null);

  // フォーム関係
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    console.log('send - userId', userId);
    console.log('send - bookId', bookId);
    console.log('send - data', data);
    if (bookId) {
      // 更新の場合
      console.log('patch', '/books/${bookId}');
      axios
        .patch(`/books/${bookId}`, { bookData: data })
        .then((res) => {
          location.href = '/books';
        })
        .catch((error) => {
          console.log('patch - error', error);
        });
    } else {
      console.log('store');
      // 登録の場合
      axios
        .post('/books', { bookData: data })
        .then((res) => {
          location.href = '/books';
        })
        .catch((error) => {
          console.log('post - error', error);
        });
    }
  };

  // 書籍の編集をしたいときのデータ取得
  useEffect(() => {
    if (bookId !== null) {
      axios
        .get(`/books/${bookId}/edit`)
        .then((response: any) => {
          const data = response.data;
          console.log(data);
          // フォームデータのセット
          setValue('title', data.title);
          setValue('sub_title', data.sub_title);
          setValue('number_of_articles', data.number_of_articles);
          setValue('number_of_sections', data.number_of_sections);
          setValue('editors', data.editors);
          setValue('authors', data.authors);
          // UserGrid側でチェックを入れるためのデータをセット
          setSelectedEditorIds(data.editors.split(',').map((id: string) => Number(id)));
          setSelectedAuthorIds(data.authors.split(',').map((id: string) => Number(id)));
        })
        .catch((error: any) => {
          console.log(error);
        });
    } else {
      setValue('title', '');
      setValue('sub_title', '');
      setValue('number_of_articles', '');
      setValue('number_of_sections', '');
      setValue('editors', String(userId));
      setValue('authors', '');
      setSelectedEditorIds([userId]);
      setSelectedAuthorIds([]);
    }
  }, [editDialogOpen]);

  // データの取得
  // 編集者・執筆者の一覧は、初回のみでOK（別窓で登録したとしても）
  useEffect(() => {
    // 編集者
    axios
      .get('/editors')
      .then((response) => {
        setEditors(response.data);
      })
      .catch((error) => {
        console.log('get editors - error', error);
      });
    // 執筆者
    axios
      .get('/authors')
      .then((response) => {
        setAuthors(response.data);
      })
      .catch((error) => {
        console.log('get authors - error', error);
      });
  }, []);

  // ダイアログを閉じる
  const handleEditDialogClose = useCallback(() => {
    setEditDialogOpen(false);
  }, []);

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
    <Fragment>
      <Dialog open={editDialogOpen} onClose={handleEditDialogClose} fullScreen sx={{ marginLeft: '0%', marginRight: '0%' }} TransitionComponent={Transition}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle sx={{ backgroundColor: '#ddd', position: 'fixed', top: 0, zIndex: 10000, height: '100px', width: '100%' }}>
            {bookId ? L.BookGrid.EditBook.Dialog.EditTitle : L.BookGrid.EditBook.Dialog.AddTitle}
            <DialogActions>
              {/* キャンセル */}
              <Button onClick={handleEditDialogClose}>{L.BookGrid.EditBook.Dialog.Cancel}</Button>
              {/* 書籍の追加 */}
              <Button type='submit'>{L.BookGrid.EditBook.Dialog.Ok}</Button>
            </DialogActions>
          </DialogTitle>
          <DialogContent sx={{ marginTop: '100px' }}>
            {/* <DialogContentText></DialogContentText> */}
            {/* タイトル */}
            <StyledInputLable shrink htmlFor='title'>
              {L.BookGrid.EditBook.Dialog.BookTitle}
            </StyledInputLable>
            <StyledInput
              id='title'
              placeholder={L.BookGrid.EditBook.Dialog.BookTitle}
              {...register('title', {
                required: L.BookGrid.Validation.Required,
                maxLength: {
                  value: 255,
                  message: L.BookGrid.Validation.MaxLength,
                },
              })}
            />
            {errors.title?.type === 'required' && <Alert severity='error'>{L.BookGrid.Validation.Required}</Alert>}
            {errors.title?.type === 'maxLength' && <Alert severity='error'>{L.BookGrid.Validation.MaxLength}</Alert>}

            {/* サブタイトル */}
            <StyledInputLable shrink htmlFor='sub_title'>
              {L.BookGrid.EditBook.Dialog.BookSubTitle}
            </StyledInputLable>
            <StyledInput
              id='sub_title'
              placeholder={L.BookGrid.EditBook.Dialog.BookSubTitle}
              {...register('sub_title', {
                maxLength: {
                  value: 255,
                  message: L.BookGrid.Validation.MaxLength,
                },
              })}
            />
            {errors.sub_title?.type === 'maxLength' && <Alert severity='error'>{L.BookGrid.Validation.MaxLength}</Alert>}

            {/* 記事数 */}
            <StyledInputLable shrink htmlFor='number_of_articles'>
              {L.BookGrid.EditBook.Dialog.BookNumberOfArticles}
            </StyledInputLable>
            <StyledInput
              id='number_of_articles'
              type='number'
              inputProps={{
                min: 1,
                max: 500,
                pattern: '[0-9]*',
              }}
              placeholder={L.BookGrid.EditBook.Dialog.BookNumberOfArticles}
              {...register('number_of_articles', {
                required: L.BookGrid.Validation.Required,
                min: 1,
                max: 500,
                pattern: /^[0-9]+$/,
              })}
            />
            {errors.number_of_articles?.type === 'required' && <Alert severity='error'>{L.BookGrid.Validation.Required}</Alert>}
            {errors.number_of_articles?.type === 'pattern' && <Alert severity='error'>{L.BookGrid.Validation.InvalideCharacter}</Alert>}

            {/* セクション数 */}
            <StyledInputLable shrink htmlFor='number_of_sections'>
              {L.BookGrid.EditBook.Dialog.BookNumberOfSections}
            </StyledInputLable>
            <StyledInput
              id='number_of_sections'
              type='number'
              inputProps={{
                min: 1,
                max: 500,
              }}
              placeholder={L.BookGrid.EditBook.Dialog.BookNumberOfSections}
              {...register('number_of_sections', {
                required: L.BookGrid.Validation.Required,
                min: 1,
                max: 500,
                pattern: /^[0-9]+$/,
                validate: (value: number) => {
                  const number_of_articles = Number(getValues('number_of_articles'));
                  if (number_of_articles < value) {
                    return L.BookGrid.Validation.OverNumberOfArticles;
                  }
                  return true;
                },
              })}
            />
            {errors.number_of_sections?.type === 'required' && <Alert severity='error'>{L.BookGrid.Validation.Required}</Alert>}
            {errors.number_of_sections?.type === 'pattern' && <Alert severity='error'>{L.BookGrid.Validation.InvalideCharacter}</Alert>}
            {errors.number_of_sections?.type === 'validate' && <Alert severity='error'>{L.BookGrid.Validation.OverNumberOfArticles}</Alert>}

            {/* 編集者 */}
            <StyledInputLable shrink>{L.BookGrid.EditBook.Dialog.Editors}</StyledInputLable>
            <UsersGrid type='editors' userId={userId} rowData={editors} setRowData={setEditors} gridRef={editorsGridRef} setValue={setValue} selectedUserIds={selectedEditorIds} />

            {/* 執筆者 */}
            <StyledInputLable shrink>{L.BookGrid.EditBook.Dialog.Authors}</StyledInputLable>
            <UsersGrid type='authors' userId={userId} rowData={authors} setRowData={setAuthors} gridRef={authorsGridRef} setValue={setValue} selectedUserIds={selectedAuthorIds} />
          </DialogContent>
        </form>
      </Dialog>
    </Fragment>
  );
};
export default BookEditDialog;

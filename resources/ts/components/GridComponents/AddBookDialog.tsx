import { Fragment, forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
//import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { L } from '../../labels';
import { Alert, InputBase, InputLabel, Slide, alpha, styled, useTheme } from '@mui/material';
import UsersGrid from './UsersGrid';
import { AgGridReact } from 'ag-grid-react';
import { TransitionProps } from '@mui/material/transitions';
import { SubmitHandler, useForm } from 'react-hook-form';
import StyledInput from '../StyledComponents/StyledInput';
import StyledInputLabel from '../StyledComponents/StyledInputLabel';

type AddBookDialogProps = {
  userId: number;
  addBookDialogOpen: boolean;
  setAddBookDialogOpen: (open: boolean) => void;
};

// 送信データ型
export type FormValues = {
  title: string;
  sub_title: string;
  number_of_articles: number;
  number_of_sections: number;
  editorsIds: string;
  authorsIds: string;
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

const AddBookDialog = (props: AddBookDialogProps): JSX.Element => {
  const { userId, addBookDialogOpen, setAddBookDialogOpen } = props;

  // テーマ
  const theme = useTheme();

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
    // 登録の場合
    axios
      .post('/books', { bookData: data })
      .then((res) => {
        location.href = '/books';
      })
      .catch((error) => {
        console.log('post - error', error);
      });
  };

  // データの取得
  // 編集者・執筆者の一覧は、初回のみでOK（別窓で登録したとしても）
  useEffect(() => {
    // 編集者
    axios
      .get('/editors_list')
      .then((response) => {
        setEditors(response.data);
      })
      .catch((error) => {
        console.log('get editors - error', error);
      });
    // 執筆者
    axios
      .get('/authors_list')
      .then((response) => {
        setAuthors(response.data);
      })
      .catch((error) => {
        console.log('get authors - error', error);
      });
  }, []);

  // ダイアログを閉じる
  const handleAddBookDialogClose = useCallback(() => {
    setAddBookDialogOpen(false);
  }, []);

  return (
    <Fragment>
      <Dialog open={addBookDialogOpen} onClose={handleAddBookDialogClose} fullScreen sx={{ marginLeft: '0%', marginRight: '0%' }} TransitionComponent={Transition}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle sx={{ backgroundColor: '#ddd', position: 'fixed', top: 0, zIndex: 10000, height: '100px', width: '100%' }}>
            {L.BookGrid.AddBook.Dialog.Title}
            <DialogActions>
              {/* キャンセル */}
              <Button onClick={handleAddBookDialogClose}>{L.BookGrid.AddBook.Dialog.Cancel}</Button>
              {/* 書籍の追加 */}
              <Button type='submit'>{L.BookGrid.AddBook.Dialog.Ok}</Button>
            </DialogActions>
          </DialogTitle>
          <DialogContent sx={{ marginTop: '100px' }}>
            {/* <DialogContentText></DialogContentText> */}
            {/* タイトル */}
            <StyledInputLabel shrink htmlFor='title' theme={theme}>
              {L.BookGrid.AddBook.Dialog.BookTitle}
            </StyledInputLabel>
            <StyledInput
              id='title'
              placeholder={L.BookGrid.AddBook.Dialog.BookTitle}
              theme={theme}
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
            <StyledInputLabel shrink htmlFor='sub_title' theme={theme}>
              {L.BookGrid.AddBook.Dialog.BookSubTitle}
            </StyledInputLabel>
            <StyledInput
              id='sub_title'
              placeholder={L.BookGrid.AddBook.Dialog.BookSubTitle}
              theme={theme}
              {...register('sub_title', {
                maxLength: {
                  value: 255,
                  message: L.BookGrid.Validation.MaxLength,
                },
              })}
            />
            {errors.sub_title?.type === 'maxLength' && <Alert severity='error'>{L.BookGrid.Validation.MaxLength}</Alert>}

            {/* 記事数 */}
            <StyledInputLabel shrink htmlFor='number_of_articles' theme={theme}>
              {L.BookGrid.AddBook.Dialog.BookNumberOfArticles}
            </StyledInputLabel>
            <StyledInput
              id='number_of_articles'
              type='number'
              inputProps={{
                min: 1,
                max: 500,
                pattern: '[0-9]*',
              }}
              placeholder={L.BookGrid.AddBook.Dialog.BookNumberOfArticles}
              theme={theme}
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
            <StyledInputLabel shrink htmlFor='number_of_sections' theme={theme}>
              {L.BookGrid.AddBook.Dialog.BookNumberOfSections}
            </StyledInputLabel>
            <StyledInput
              id='number_of_sections'
              type='number'
              theme={theme}
              inputProps={{
                min: 1,
                max: 500,
              }}
              placeholder={L.BookGrid.AddBook.Dialog.BookNumberOfSections}
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
            <StyledInputLabel shrink theme={theme}>
              {L.BookGrid.AddBook.Dialog.Editors}
            </StyledInputLabel>
            <UsersGrid type='editors' userId={userId} rowData={editors} setRowData={setEditors} gridRef={editorsGridRef} setValue={setValue} selectedUserIds={selectedEditorIds} />

            {/* 執筆者 */}
            <StyledInputLabel shrink theme={theme}>
              {L.BookGrid.AddBook.Dialog.Authors}
            </StyledInputLabel>
            <UsersGrid type='authors' userId={userId} rowData={authors} setRowData={setAuthors} gridRef={authorsGridRef} setValue={setValue} selectedUserIds={selectedAuthorIds} />
          </DialogContent>
        </form>
      </Dialog>
    </Fragment>
  );
};
export default AddBookDialog;

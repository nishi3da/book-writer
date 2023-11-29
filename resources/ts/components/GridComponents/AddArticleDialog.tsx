import { Fragment, forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { L } from '../../labels';
import DialogTitle from '@mui/material/DialogTitle';
import { Alert, Grid, MenuItem, Select, SelectChangeEvent, Slide, useTheme } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import UsersGrid from './UsersGrid';
import { AgGridReact } from 'ag-grid-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import StyledInput from '../StyledComponents/StyledInput';
import StyledInputLabel from '../StyledComponents/StyledInputLabel';

type AddArticleDialogProps = {
  userId: number;
  bookId: number;
  addArticleDialogOpen: boolean;
  setAddArticleDialogOpen: (open: boolean) => void;
  articleTypes: { [key: number]: string };
  articleCount: number;
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

const AddArticleDialog = (props: AddArticleDialogProps): JSX.Element => {
  const { userId, bookId, addArticleDialogOpen, setAddArticleDialogOpen, articleTypes, articleCount } = props;

  // テーマ
  const theme = useTheme();

  // 編集者・執筆者一覧データ
  const [editors, setEditors] = useState<IUser[]>([]);
  const [authors, setAuthors] = useState<IUser[]>([]);

  // 編集者・執筆者の選択状態データ
  const [selectedEditorIds, setSelectedEditorIds] = useState<number[]>([]);
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
  } = useForm<ArticleFormValues>();

  const onSubmit: SubmitHandler<ArticleFormValues> = (data: ArticleFormValues) => {
    console.log('articleData', data);
    // 登録の場合
    axios
      .post('/articles', { articleData: data })
      .then((res) => {
        location.href = `/books/${bookId}/edit`;
      })
      .catch((error) => {
        console.log('post - error', error);
      });
  };

  // データの取得
  // 編集者・執筆者の一覧は、初回のみでOK（別窓で登録したとしても）
  // また、書籍の担当者以外は表示しない
  useEffect(() => {
    // 編集者
    axios
      .get(`/book_editors/${bookId}`)
      .then((response) => {
        setEditors(response.data);
      })
      .catch((error) => {
        console.log('get editors - error', error);
      });
    // 執筆者
    axios
      .get(`/book_authors/${bookId}`)
      .then((response) => {
        setAuthors(response.data);
      })
      .catch((error) => {
        console.log('get authors - error', error);
      });
    // フォームデータの初期化
    setValue('book_id', bookId);
    setValue('article_number', articleCount + 1);
    setValue('title', '');
    setValue('sub_title', '');
    setValue('lead_sentence', '');
    setValue('article_data', '');
    setValue('editorIds', []);
    setValue('authorIds', []);
  }, []);

  // 記事数が代わった場合
  useEffect(() => {
    setValue('article_number', articleCount + 1);
  }, [articleCount]);

  // ダイアログを閉じる
  const handleEditArticleDialogClose = useCallback(() => {
    setAddArticleDialogOpen(false);
  }, []);

  return (
    <Fragment>
      <Dialog open={addArticleDialogOpen} onClose={handleEditArticleDialogClose} fullScreen sx={{ marginLeft: '0%', marginRight: '0%' }} TransitionComponent={Transition}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle sx={{ backgroundColor: '#ddd', position: 'fixed', top: 0, zIndex: 10000, height: '80px', width: '100%' }}>
            <Grid container alignItems='center' justifyContent='space-between'>
              <Grid item>{L.ArticleDialog.Title}</Grid>
              <Grid item>
                <DialogActions>
                  {/* キャンセル */}
                  <Button onClick={handleEditArticleDialogClose}>{L.ArticleDialog.Cancel}</Button>
                  {/* 書籍の追加 */}
                  <Button type='submit'>{L.ArticleDialog.Ok}</Button>
                </DialogActions>
              </Grid>
            </Grid>
          </DialogTitle>
          <DialogContent sx={{ marginTop: '100px' }}>
            {/* 記事種別 */}
            <StyledInputLabel shrink htmlFor='title' theme={theme}>
              {L.ArticleDialog.ArticleType}
            </StyledInputLabel>
            <Select
              labelId='article-type-label'
              id='article-type'
              label={L.ArticleDialog.ArticleType}
              size='small'
              {...register('article_type_id', {
                required: L.ArticleDialog.Validation.Required,
              })}
              sx={{ width: '100%' }}
            >
              {Object.entries(articleTypes).map(([key, value]) => {
                return <MenuItem value={key}>{value}</MenuItem>;
              })}
            </Select>
            {errors.article_type_id?.type === 'required' && <Alert severity='error'>{L.ArticleDialog.Validation.Required}</Alert>}

            {/* タイトル */}
            <StyledInputLabel shrink htmlFor='title' theme={theme}>
              {L.ArticleDialog.Title}
            </StyledInputLabel>
            <StyledInput
              id='title'
              placeholder={L.ArticleDialog.Title}
              theme={theme}
              {...register('title', {
                required: L.ArticleDialog.Validation.Required,
                maxLength: {
                  value: 255,
                  message: L.ArticleDialog.Validation.MaxLength,
                },
              })}
            />
            {errors.title?.type === 'required' && <Alert severity='error'>{L.ArticleDialog.Validation.Required}</Alert>}
            {errors.title?.type === 'maxLength' && <Alert severity='error'>{L.ArticleDialog.Validation.MaxLength}</Alert>}

            {/* サブタイトル */}
            <StyledInputLabel shrink htmlFor='sub_title' theme={theme}>
              {L.ArticleDialog.SubTitle}
            </StyledInputLabel>
            <StyledInput
              id='sub_title'
              placeholder={L.ArticleDialog.SubTitle}
              theme={theme}
              {...register('sub_title', {
                maxLength: {
                  value: 255,
                  message: L.ArticleDialog.Validation.MaxLength,
                },
              })}
            />
            {errors.sub_title?.type === 'maxLength' && <Alert severity='error'>{L.ArticleDialog.Validation.MaxLength}</Alert>}

            {/* リード文 */}
            <StyledInputLabel shrink htmlFor='lead_sentence' theme={theme}>
              {L.ArticleDialog.LeadSentence}
            </StyledInputLabel>
            <StyledInput
              id='lead_sentence'
              placeholder={L.ArticleDialog.LeadSentence}
              theme={theme}
              {...register('lead_sentence', {
                maxLength: {
                  value: 1024,
                  message: L.ArticleDialog.Validation.MaxLength1024,
                },
              })}
            />
            {errors.sub_title?.type === 'maxLength' && <Alert severity='error'>{L.ArticleDialog.Validation.MaxLength1024}</Alert>}

            {/* 編集者 */}
            <StyledInputLabel shrink theme={theme}>
              {L.BookGrid.AddBook.Dialog.Editors}
            </StyledInputLabel>
            <UsersGrid
              type='editors'
              userId={userId}
              rowData={editors}
              gridRef={editorsGridRef}
              setValue={setValue as (key: string, value: number[]) => void}
              selectedUserIds={selectedEditorIds}
              setSelectedUserIds={setSelectedEditorIds}
              enforcement={false}
            />

            {/* 執筆者 */}
            <StyledInputLabel shrink theme={theme}>
              {L.BookGrid.AddBook.Dialog.Authors}
            </StyledInputLabel>
            <UsersGrid
              type='authors'
              userId={userId}
              rowData={authors}
              gridRef={authorsGridRef}
              setValue={setValue as (key: string, value: number[]) => void}
              selectedUserIds={selectedAuthorIds}
              setSelectedUserIds={setSelectedAuthorIds}
              enforcement={false}
            />
          </DialogContent>
        </form>
      </Dialog>
    </Fragment>
  );
};
export default AddArticleDialog;

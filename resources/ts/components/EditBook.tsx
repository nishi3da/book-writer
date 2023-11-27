import { L } from '../labels';
import { useEffect, useRef, useState } from 'react';
import StyledInput from './StyledComponents/StyledInput';
import StyledInputLabel from './StyledComponents/StyledInputLabel';
import axios from 'axios';
import { Accordion, AccordionDetails, AccordionSummary, Alert, Button, useTheme } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AgGridReact } from 'ag-grid-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import UsersGrid from './GridComponents/UsersGrid';
import ArticleGrid from './GridComponents/ArticleGrid';

export type EditBookProps = {
  userId: number;
  userRole: Roles;
  id: number;
  title: string;
  sub_title: string;
  number_of_articles: number;
  editorIds: number[];
  authorIds: number[];
};

export const EditBook = (props: EditBookProps) => {
  // Props展開
  const { userId, userRole, id, title, sub_title, number_of_articles, editorIds, authorIds } = props;
  // 名前の付け替え
  const bookId = id;

  // テーマ
  const theme = useTheme();

  // 編集者・執筆者一覧データ
  const [editors, setEditors] = useState<IUser[]>([]);
  const [authors, setAuthors] = useState<IUser[]>([]);

  // 編集者・執筆者の選択状態データ
  const [selectedEditorIds, setSelectedEditorIds] = useState<number[]>(editorIds);
  const [selectedAuthorIds, setSelectedAuthorIds] = useState<number[]>(authorIds);

  // DOM参照
  const editorsGridRef = useRef<AgGridReact<IUser>>(null);
  const authorsGridRef = useRef<AgGridReact<IUser>>(null);
  const articlesGridRef = useRef<AgGridReact<IArticle>>(null);

  // フォーム関係
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<BookFormValues>();
  const onSubmit: SubmitHandler<BookFormValues> = (data: BookFormValues) => {
    console.log('patch');
    // 登録の場合
    axios
      .patch(`/books/${bookId}`, { bookData: data })
      .then((res) => {
        location.href = `/books/${bookId}/edit`;
      })
      .catch((error) => {
        console.log('post - error', error);
      });
  };

  // データの取得
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
    // 記事一覧
    axios
      .get(`/articles/${bookId}`)
      .then((response) => {
        console.log('response.data', response.data);
      })
      .catch((error) => {
        console.log('get articles - error', error);
      });

    // フォームデータの初期化
    setValue('title', title);
    setValue('sub_title', sub_title);
    setValue('number_of_articles', number_of_articles);
    setValue('editorIds', selectedEditorIds);
    setValue('authorIds', selectedAuthorIds);
  }, []);

  return (
    <div style={{ paddingLeft: '5%', paddingRight: '5%' }}>
      <Accordion sx={{ backgroundColor: '#CCCCCC', marginBottom: '30px' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id='panel1a-header'>
          {L.EditBook.Accordion.Summary}
        </AccordionSummary>
        <AccordionDetails sx={{ borderTop: '2px solid #AAAAAA' }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Button type='submit' variant='contained' color='primary'>
              {L.EditBook.Accordion.Ok}
            </Button>
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

            {/* 編集者 */}
            <StyledInputLabel shrink theme={theme}>
              {L.BookGrid.AddBook.Dialog.Editors}
            </StyledInputLabel>
            <UsersGrid
              type='editors'
              userId={userId}
              rowData={editors}
              gridRef={editorsGridRef}
              setValue={setValue}
              selectedUserIds={selectedEditorIds}
              setSelectedUserIds={setSelectedEditorIds}
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
              setValue={setValue}
              selectedUserIds={selectedAuthorIds}
              setSelectedUserIds={setSelectedAuthorIds}
            />
          </form>
        </AccordionDetails>
      </Accordion>
      <h2 style={{ textAlign: 'center' }}>{L.ArticleGrid.Title}</h2>
      <ArticleGrid userId={userId} bookId={bookId} numberOfArticles={number_of_articles} articleGridRef={articlesGridRef} />
    </div>
  );
};

export default EditBook;

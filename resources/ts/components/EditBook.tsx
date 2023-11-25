import { L } from '../labels';
import React, { useEffect, useRef, useState } from 'react';
import StyledInput from './StyledComponents/StyledInput';
import StyledInputLabel from './StyledComponents/StyledInputLabel';
import axios from 'axios';
import { Alert, Grid, useTheme } from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import { SubmitHandler, useForm } from 'react-hook-form';
import UsersGrid from './GridComponents/UsersGrid';

export type EditBookProps = {
  userId: number;
  userRole: Roles;
  id: number;
  title: string;
  sub_title: string;
  number_of_articles: number;
  number_of_sections: number;
  editorIds: number[];
  authorIds: number[];
};

export const EditBook = (props: EditBookProps) => {
  // Props展開
  const { userId, userRole, id, title, sub_title, number_of_articles, number_of_sections, editorIds, authorIds } = props;

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

  // フォーム関係
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<BookFormValues>();
  const onSubmit: SubmitHandler<BookFormValues> = (data: BookFormValues) => {
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

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            {/* タイトル */}
            <StyledInputLabel shrink htmlFor='title' theme={theme}>
              {L.BookGrid.AddBook.Dialog.BookTitle}
            </StyledInputLabel>
            <StyledInput
              id='title'
              placeholder={L.BookGrid.AddBook.Dialog.BookTitle}
              value={title}
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
              value={sub_title}
              theme={theme}
              {...register('sub_title', {
                maxLength: {
                  value: 255,
                  message: L.BookGrid.Validation.MaxLength,
                },
              })}
            />
            {errors.sub_title?.type === 'maxLength' && <Alert severity='error'>{L.BookGrid.Validation.MaxLength}</Alert>}
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={4}>
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
              value={number_of_articles}
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
              value={number_of_sections}
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
          </Grid>
        </Grid>

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
      </form>
    </div>
  );
};

export default EditBook;

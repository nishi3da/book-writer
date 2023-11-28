export const L: LableType = {
  BookGrid: {
    Header: {
      ID: 'ID',
      Title: 'タイトル',
      SubTitle: 'サブタイトル',
      Edit: '編集',
      Delete: '削除',
    },
    QuickFilterPlaceHolder: '書籍 簡易検索',
    AddBook: {
      ButtonLabel: '新規書籍',
      Dialog: {
        Title: '書籍の新規作成',
        BookTitle: '書籍タイトル',
        BookSubTitle: '書籍サブタイトル',
        Editors: '編集者',
        Authors: '執筆者',
        Ok: '書籍の保存',
        Cancel: 'キャンセル',
      },
    },
    DeleteBook: {
      ButtonLabel: '書籍を削除',
      DeleteTitle: '書籍の削除確認',
      DeleteMessage: 'この操作は元に戻せません、本当に削除しますか？',
      Ok: '削除',
      Cancel: 'キャンセル',
    },
    Validation: {
      Required: '入力必須項目です。',
      MaxLength: '最大文字数は255文字です。',
      InvalideCharacter: '半角数字を入力して下さい。',
    },
  },
  EditBook: {
    Accordion: {
      Summary: '書籍情報変更',
      BookTitle: '書籍タイトル',
      BookSubTitle: '書籍サブタイトル',
      BookNumberOfArticles: '記事数',
      Editors: '編集者',
      Authors: '執筆者',
      Ok: '書籍の保存',
      Cancel: 'キャンセル',
    },
  },
  UsersGrid: {
    Header: {
      ID: 'ID',
      Name: '氏名',
      ReadingName: '氏名読み',
      AffiliationName: '所属',
      AffiliationReadingName: '所属読み',
      Email: 'メールアドレス',
    },
    QuickFilterPlaceHolder: ' 簡易検索',
    QuickFilterTooltip: '正規表現に対応しています。「|」（半角パイプ）で区切ることで、OR検索ができます。',
    EditorsPrefix: '編集者',
    AuthorsPrefix: '執筆者',
  },
  ArticleGrid: {
    Title: '掲載記事一覧',
    AddArticle: '記事の新規作成',
    DeleteArticle: '記事の削除',
    Header: {
      Number: '掲載番号',
      Edit: '記事編集',
      Delete: '記事削除',
      Type: '記事種別',
      Title: '記事タイトル',
      SubTitle: '記事サブタイトル',
      LeadSentence: '記事リード文',
      ArticleData: '記事テキスト',
      CreatedAt: '作成日',
      UpdatedAt: '更新日',
    },
  },
  ArticleDialog: {
    DialogTitle: "記事の新規作成",
    Title: '記事タイトル',
    SubTitle: '記事サブタイトル',
    LeadSentence: '記事リード文',
    Ok: '記事を作成',
    Cancel: 'キャンセル',
  },
};

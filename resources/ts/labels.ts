export const L: LableType = {
  BookGrid: {
    Header: {
      ID: 'ID',
      Title: 'タイトル',
      SubTitle: 'サブタイトル',
      Edit: '編集',
      Delete: '削除',
    },
    EditBook: {
      ButtonLabel: '新規書籍',
      Dialog: {
        AddTitle: '書籍の新規作成',
        EditTitle: '書籍の編集',
        BookTitle: '書籍タイトル',
        BookSubTitle: '書籍サブタイトル',
        BookNumberOfArticles: '記事数',
        BookNumberOfSections: 'セクション数',
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
      OverNumberOfArticles: '記事数以上のセクションは設定できません。',
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
};

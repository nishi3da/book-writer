declare type LableType = {
  BookGrid: {
    Header: {
      ID: string;
      Title: string;
      SubTitle: string;
      Edit: string;
      Delete: string;
    };
    QuickFilterPlaceHolder: string;
    AddBook: {
      ButtonLabel: string;
      Dialog: {
        Title: string;
        BookTitle: string;
        BookSubTitle: string;
        BookNumberOfArticles: string;
        Editors: string;
        Authors: string;
        Ok: string;
        Cancel: string;
      };
    };
    DeleteBook: {
      ButtonLabel: string;
      DeleteTitle: string;
      DeleteMessage: string;
      Ok: string;
      Cancel: string;
    };
    Validation: {
      Required: string;
      MaxLength: string;
      InvalideCharacter: string;
    };
  };
  EditBook: {
    Accordion: {
      Summary: string;
      BookTitle: string;
      BookSubTitle: string;
      BookNumberOfArticles: string;
      Editors: string;
      Authors: string;
      Ok: string;
      Cancel: string;
    };
  };
  UsersGrid: {
    Header: {
      ID: string;
      Name: string;
      ReadingName: string;
      AffiliationName: string;
      AffiliationReadingName: string;
      Email: string;
    };
    QuickFilterPlaceHolder: string;
    QuickFilterTooltip: string;
    EditorsPrefix: string;
    AuthorsPrefix: string;
  };
  ArticleGrid: {
    Title: string;
      Header: {
        Number: string;
        Type: string;
        Title: string;
        SubTitle: string;
        LeadSentence: string;
        ArticleData: string;
        CreatedAt: string;
        UpdatedAt: string;
      }
  }
};

declare type Roles = 'editor' | 'author' | 'admin';

declare type IUser = {
  id: number;
  name: string;
  reading_name: string;
  email: string;
  email_verified_at: string;
  password: string;
  affiliation_name: string;
  affiliation_reading_name: string;
  remember_token: string;
  created_at: string;
  updated_at: string;
};

declare type IBook = {
  id: number;
  title: string;
  sub_title: string;
  number_of_articles: number;
  created_at: string;
  updated_at: string;
};

declare type IBookUser = IBook & {
  user: IUser;
};

// 書籍の送信データ型
declare type BookFormValues = {
  title: string;
  sub_title: string;
  number_of_articles: number;
  editorIds: number[];
  authorIds: number[];
};

declare type IArticle = {
    id: number;
    book_id: number;
    article_number: number;
    article_type: string;
    title: string;
    sub_title: string;
    lead_sentence: string;
    article_data: string;
    created_at: string;
    updated_at: string;
}

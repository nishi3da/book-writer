declare type LableType = {
  BookGrid: {
    Header: {
      ID: string;
      Title: string;
      SubTitle: string;
      Edit: string;
      Delete: string;
    };
    AddBook: {
      ButtonLabel: string;
      Dialog: {
        Title: string;
        BookTitle: string;
        BookSubTitle: string;
        BookNumberOfArticles: string;
        BookNumberOfSections: string;
        Ok: string;
        Cancel: string;
      };
    };
    DeleteBook: {
      ButtonLabel: string;
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
    EditorsPrefix: string;
    AuthorsPrefix: string;
  };
};

declare interface IUser {
  id: number;
  name: string;
  reading_name: string;
  email: string;
  email_verified_at: string;
  password: string;
  role: string;
  affiliation_name: string;
  affiliation_reading_name: string;
  remember_token: string;
  created_at: string;
  updated_at: string;
}

declare interface IBook {
  id: number;
  title: string;
  sub_title: string;
  number_of_articles: number;
  number_of_sections: number;
  created_at: string;
  updated_at: string;
}

declare interface IBookUser extends IBook {
  user: IUser;
}

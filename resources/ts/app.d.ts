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
    EditorGrid: {
        Header: {
            ID: string;
            Name: string;
            ReadingName: string;
            AffiliationName: string;
            AffiliationReadingName: string;
            Email: string;
        };
    };
};

import React, { StrictMode } from 'react';
import EditBook, { EditBookProps } from './components/EditBook';
import { createRoot } from 'react-dom/client';

const rootElement = document.getElementById('edit_book_root');
const root = createRoot(rootElement!);

const scriptData = document.getElementById('edit_book_props');
let props: EditBookProps = {
    userId: 0,
    id: 0,
    title: '',
    sub_title: '',
    number_of_articles: 0,
    number_of_sections: 0,
    editorIds: [],
    authorIds: [],
};

if (scriptData) {
  props = JSON.parse(scriptData.innerHTML);
}

root.render(
  <StrictMode>
    <EditBook {...props} />
  </StrictMode>,
);

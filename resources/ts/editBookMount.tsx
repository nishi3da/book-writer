import React, { StrictMode } from 'react';
import EditBook, { EditBookProps } from './components/EditBook';
import { createRoot } from 'react-dom/client';

const rootElement = document.getElementById('edit_book_root');
const root = createRoot(rootElement!);

const scriptData = document.getElementById('edit_book_props');
let props: EditBookProps = {
  userId: 0,
  userRole: 'author',
  id: 0,
  title: '',
  sub_title: '',
  editorIds: [],
  authorIds: [],
  articleTypes: {},
  articleStateTypes: {},
};

if (scriptData) {
  props = JSON.parse(scriptData.innerHTML);
}

root.render(
  <StrictMode>
    <EditBook {...props} />
  </StrictMode>,
);

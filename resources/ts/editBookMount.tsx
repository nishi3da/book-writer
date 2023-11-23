import React, { StrictMode } from 'react';
import EditBook from './components/EditBook';
import { createRoot } from 'react-dom/client';

const rootElement = document.getElementById('edit_book_root');
const root = createRoot(rootElement!);

const scriptData = document.getElementById('edit_book_props');
let props = {};
if (scriptData) {
  props = JSON.parse(scriptData.innerHTML);
}

root.render(
  <StrictMode>
    <EditBook {...props} />
  </StrictMode>,
);

import React, { StrictMode } from 'react';
import BookGrid from './components/GridComponents/BookGrid';
import { createRoot } from 'react-dom/client';

const rootElement = document.getElementById('book_root');
const scriptElement = document.getElementById('book_grid_props');

let userId = 0;
if (rootElement && rootElement.dataset.userId) {
  console.log('user id', rootElement.dataset.userId);
  userId = Number(rootElement.dataset.userId);
}

let bookStateTypes: { [key: number]: string } = {};
if (scriptElement) {
  bookStateTypes = JSON.parse(scriptElement.innerHTML);
}

const root = createRoot(rootElement!);
root.render(
  <StrictMode>
    <BookGrid userId={userId} bookStateTypes={bookStateTypes} />
  </StrictMode>,
);

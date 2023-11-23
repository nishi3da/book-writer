import React, { StrictMode } from 'react';
import BookGrid from './components/BookGrid/BookGrid';
import { createRoot } from 'react-dom/client';

const rootElement = document.getElementById('book_root');
let userId = 0;
if (rootElement && rootElement.dataset.userId) {
  console.log('user id', rootElement.dataset.userId);
  userId = Number(rootElement.dataset.userId);
}
const root = createRoot(rootElement!);

root.render(
  <StrictMode>
    <BookGrid userId={userId} />
  </StrictMode>,
);

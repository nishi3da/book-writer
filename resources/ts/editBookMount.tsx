import React, { StrictMode } from 'react';
import EditBook from './components/EditBook/EditBook';
import { createRoot } from 'react-dom/client';

const rootElement = document.getElementById('edit_book_root');
let userId = 0;
let bookId = 0;
if (rootElement) {
  if (rootElement.dataset.userId) {
    userId = Number(rootElement.dataset.userId);
  }
  if (rootElement.dataset.bookId) {
    bookId = Number(rootElement.dataset.bookId);
  }
}
const root = createRoot(rootElement!);

console.log('userId', userId);
console.log('bookId', bookId);

root.render(
  <StrictMode>
    <EditBook userId={userId} bookId={bookId} />
  </StrictMode>,
);

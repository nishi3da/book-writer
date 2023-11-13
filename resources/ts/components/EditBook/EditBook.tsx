import React from 'react';

type EditBookProps = {
  userId: number;
  bookId: number;
};

export const EditBook = (props) => {
  return (
    <div>
      <p>EditBook</p>
      <p>props.userId: {props.userId}</p>
      <p>props.bookId: {props.bookId}</p>
    </div>
  );
};

export default EditBook;

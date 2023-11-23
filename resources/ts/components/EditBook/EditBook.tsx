import React, { useEffect } from 'react';
import axios from 'axios'

type EditBookProps = {
  userId: number;
  bookId: number;
};

export const EditBook = (props) => {

  useEffect(() => {
    axios.get(`/book_info`)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
  })


  return (
    <div>
      <p>EditBook</p>
      <p>props.userId: {props.userId}</p>
      <p>props.bookId: {props.bookId}</p>
    </div>
  );
};

export default EditBook;

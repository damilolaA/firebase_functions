import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const DisplayBooks = props => {

	const removeBook = (name, i) => {
	    props.removeBook(name, i);

	    let id = name._id;

	    deleteBook(id);
	};

	const deleteBook = id => {
	    if (id) {
	      axios({
	        method: 'delete',
	        url: `https://bookstoreappapi.herokuapp.com/api/v1/books/${id}`,
	        data: null
	      })
	        .then(response => {
	          console.log(response);
	        })
	        .catch(err => {
	          console.log(err);
	        });
	    }
    };

	let booksTable = [];

	if(props.data) {
		props.data.forEach((book, i) => {
	      booksTable.push(
	        <tr key={book._id}>
	          <td>{book.title}</td>
	          <td>{book.author}</td>
	          <td>{book.price}</td>
	          <td>{book.categoryId}</td>
	          <td>{book.publicationDate}</td>
	          <td><img alt="" src={book.imagePath} height="50" width="50"/></td>
	          <td>
	            <Link to={`/editBook/${book._id}`}>edit</Link>
	          </td>
	          <td>
	            <a
	              onClick={() => {
	                removeBook(book, i);
	              }}
	              key={i}
	            >
	              delete
	            </a>
	          </td>
	        </tr>
	      );
	    });
	}

	return <tbody>{booksTable}</tbody>;
}

export default DisplayBooks;
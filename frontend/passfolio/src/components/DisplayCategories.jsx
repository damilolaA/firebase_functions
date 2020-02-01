import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const DisplayCategories = props => {
  const removeCat = (name, i) => {
    props.removeCategory(name, i);

    let id = name._id;

    deleteCat(id);
  };

  const deleteCat = id => {
    if (id) {
      axios({
        method: 'delete',
        url: `https://bookstoreappapi.herokuapp.com/api/v1/category/${id}`,
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

  let categoryTable = [];

  if (props.data) {
    props.data.forEach((category, i) => {
      categoryTable.push(
        <tr key={category._id}>
          <td>{category._id}</td>
          <td>{category.categoryName}</td>
          <td>
            <Link to={`/editCategory/${category._id}`}>edit</Link>
          </td>
          <td>
            <a
              onClick={() => {
                removeCat(category, i);
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

  return <tbody>{categoryTable}</tbody>;
};

export default DisplayCategories;

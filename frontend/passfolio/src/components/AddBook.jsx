import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import LoadingGif from './LoadingGif';
import IsLoggedIn from './IsLoggedIn';

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchedCategories: '',
      redirect: false,
      errorMessages: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    let categories = [];

    axios
      .get('https://bookstoreappapi.herokuapp.com/api/v1/category')
      .then(response => {
        if (response) {
          let data = response.data;
          data.forEach((category, i) => {
            categories.push(
              <option key={i} value={category._id}>
                {category.categoryName}
              </option>
            );
          });
        }

        this.setState({ fetchedCategories: categories });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({loading: true});

    this.postData(e.target);
  }

  postData(formVal) {
    let url = 'https://bookstoreappapi.herokuapp.com/api/v1/books',
      config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      },
      formData = new FormData(formVal);

    axios
      .post(url, formData, config)
      .then(response => {
        console.log(response);
        this.setState({redirect: true});
        this.setState({loading: false});
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const redirect = this.state.redirect,
          pageName = this.props.location.pathname,
          token = localStorage.getItem('adminToken');

    if(!token) {
      return <IsLoggedIn/>
    }

    if(redirect) {
      return <Redirect to="/viewBooks"/>
    }

    return (
      <div>
        <Header nav path={pageName}/>

        <div className="wrapper">
          <h1 id="register-label">Add Book</h1>
          <hr />
          <form id="register" action="" formEncType="multipart/form-data" onSubmit={this.handleSubmit}>
            <div>
              <label>title:</label>
              <input type="text" name="title" placeholder="title" />
            </div>

            <div>
              <label>author:</label>
              <input type="text" name="author" placeholder="author" />
            </div>

            <div>
              <label>price:</label>
              <input type="text" name="price" placeholder="price" />
            </div>

            <div>
              <label>publication date:</label>
              <input type="text" name="publicationDate" placeholder="publication date" />
            </div>

            <div>
              <label>category:</label>
              <select name="categoryId">
                <option>Select Category</option>
                {this.state.fetchedCategories}
              </select>
            </div>

            <div>
              <label>type:</label>
              <select name="type">
                <option>Select Type</option>
                <option value="topSelling">Top-Selling</option>
                <option value="trending">Trending</option>
              </select>
            </div>

            <div>
              <label>Image:</label>
              <input type="file" name="imagePath" />
            </div>

            <input type="submit" name="category" value="Add" />
            { this.state.loading ? < LoadingGif /> : null }
          </form>
        </div>
        
        <Footer />
      </div>
    );
  }
}

export default AddBook;

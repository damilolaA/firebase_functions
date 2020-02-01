import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import LoadingGif from './LoadingGif';
import IsLoggedIn from './IsLoggedIn';

class AdminDashboard extends Component {
  constructor() {
    super();
    this.state = {
      categoryData: {},
      redirect: false,
      errorMessages: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    let data = this.state.categoryData,
      inputName = e.target.name;

    data[inputName] = e.target.value;

    this.setState(data);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.postCategory();
  }

  postCategory() {
    let categoryInfo = this.state.categoryData;

    if (categoryInfo.hasOwnProperty('categoryName')) {
      this.setState({loading: true});
      axios({
        method: 'post',
        url: 'https://bookstoreappapi.herokuapp.com/api/v1/category',
        data: categoryInfo
      })
        .then(response => {
          console.log(response);
          if (response) {
            this.setState({ redirect: true });
            this.setState({loading: false});
          }
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      this.setState({errorMessages: "Please enter a category name"});
    }
  }

  render() {
    console.log(this.state.errorMessages);
    let token = localStorage.getItem('adminToken');

    if(!token) {
      return <IsLoggedIn/>;
    }

    if (this.state.redirect) {
      return <Redirect to="/categories" />;
    }

    let pageName = this.props.location.pathname;

    return (
      <div>
        <div className="wrapper">
          <h1 id="register-label">Transfer</h1>
          <hr />
          <form id="register" onSubmit={this.handleSubmit}>
            <div>
              <p className="err">{this.state.errorMessages ? this.state.errorMessages : ''}</p>
              <label>Email:</label>
              <input onChange={this.handleChange} type="text" name="categoryName" placeholder="database" />
              <input type="submit" name="category" value="Add" />

              <input onChange={this.handleChange} type="text" name="categoryName" placeholder="firestore" />
              <input type="submit" name="category" value="Add" />
            </div>
            {/* <input type="submit" name="category" value="Add" /> */}
            {this.state.loading ? <LoadingGif/> : null}
          </form>
        </div>
        <Footer />
      </div>
    );
  }
}

export default AdminDashboard;

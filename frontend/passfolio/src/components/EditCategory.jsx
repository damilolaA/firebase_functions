import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import LoadingGif from './LoadingGif';
import IsLoggedIn from './IsLoggedIn';

class EditCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryName: {},
      redirect: false,
      oldCategory: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({loading: true});

    this.postEditedCategory();
  }

  postEditedCategory() {
    let editedName = this.state,
      id = this.props.match.params.id;

    id = id.charAt(0);

    if (editedName.hasOwnProperty('categoryName')) {
      axios({
        method: 'put',
        url: `https://bookstoreappapi.herokuapp.com/api/v1/category/${id}`,
        data: editedName
      })
        .then(response => {
          console.log(response);
          this.setState({ redirect: true });
          this.setState({loading: false});
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      console.log('could not edit category');
    }
  }

  componentDidMount() {

    let id = this.props.match.params.id;

    if(id) {
      axios
        .get(`https://bookstoreappapi.herokuapp.com/api/v1/category/${id}`)
        .then(response => {
          this.setState({oldCategory: response.data.categoryName});
        })
        .catch(err => {
          console.log(err);
      });
    }
  }


  handleChange(e) {
    let data = this.state,
      inputName = e.target.name;

    data[inputName] = e.target.value;

    this.setState(data);
  }

  render() {

    let token = localStorage.getItem('adminToken'),
        oldCategory;

    if(!token) {
      return <IsLoggedIn/>;
    }
 
    if (this.state.redirect) {
      return <Redirect to="/categories" />;
    }

    if(this.state.oldCategory) {
      oldCategory = <input onChange={this.handleChange} type="text" name="categoryName" defaultValue={this.state.oldCategory} />
    }
    
    return (
      <div>
        <Header nav />
        <div className="wrapper">
          <h1 id="register-label">Edit Category</h1>
          <hr />
          <form id="register" onSubmit={this.handleSubmit}>
            <div>
              <label>category name:</label>
              {oldCategory}
            </div>
            <input type="submit" name="category" value="Edit" />
            { this.state.loading ? < LoadingGif /> : null }
          </form>
        </div>
        <Footer />
      </div>
    );
  }
}

export default EditCategory;

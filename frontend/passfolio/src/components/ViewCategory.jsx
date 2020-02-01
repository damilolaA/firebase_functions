import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import DisplayCategories from './DisplayCategories';
import LoadingGif from './LoadingGif';
import IsLoggedIn from './IsLoggedIn';

class ViewCategory extends Component {
  constructor() {
    super();
    this.state = {
      categoryData: {},
      loading: true
    };

    this.removeCategory = this.removeCategory.bind(this);
  }

  componentDidMount() {
    axios
      .get('https://bookstoreappapi.herokuapp.com/api/v1/category')
      .then(response => {
        this.setState({ categoryData: { data: response.data } });
        this.setState({loading: false});
      })
      .catch(err => {
        console.log(err);
      });
  }

  removeCategory(name, i) {
    let category = this.state.categoryData.data;

    category.splice(i, 1);

    this.setState({
      category
    });
  }

  render() {

    const loading = this.state.loading,
          token = localStorage.getItem('adminToken');

    if(!token) {
      return <IsLoggedIn/>
    }

    const styles = {
     width: '15%',
     height: '15%',
     position: 'fixed',
     display: 'block',
     backgroundRepeat: 'no-repeat',
     backgroundPosition: 'center',
     left : 0,
     bottom : 0,
     right : 0,
     top : 0
    };

    let pageName = this.props.location.pathname;

    return (
      <div>
        <Header nav path={pageName}/>
        <div className="wrapper">
          <div id="stream">
            <table id="tab">
              <thead>
                <tr>
                  <th>category id</th>
                  <th>category name</th>
                  <th>edit</th>
                  <th>delete</th>
                </tr>
              </thead>
          
              <DisplayCategories removeCategory={this.removeCategory} data={this.state.categoryData.data} />
            
            </table>
            {loading ? <LoadingGif style={styles}/> : null}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default ViewCategory;

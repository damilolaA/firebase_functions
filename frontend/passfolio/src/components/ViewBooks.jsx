import React, { Component } from 'react';
import axios from 'axios';
import DisplayBooks from './DisplayBooks';
import Header from './Header';
import Footer from './Footer';
import LoadingGif from './LoadingGif';
import IsLoggedIn from './IsLoggedIn';

class ViewBooks extends Component {

	constructor() {
		super()
		this.state = {
			bookData: {},
			loading: true
		}

		this.removeBook = this.removeBook.bind(this);
	}

	componentDidMount() {
		let token = localStorage.getItem('adminToken');

		let config = {
			headers: {
				'Authorization': `Bearer ${token}`
			}
		};
	    axios
	      .get('https://bookstoreappapi.herokuapp.com/api/v1/books', config)
	      .then(response => {
	        this.setState({ bookData: { data: response.data } });
	        this.setState({loading: false});
	      })
	      .catch(err => {
	        console.log(err);
	      });
	}

	removeBook(name, i) {
	    let book = this.state.bookData.data;

	    book.splice(i, 1);

	    this.setState({
	      book
	    });
	}

	render() {

		const loading = this.state.loading,
		      token = localStorage.getItem('adminToken');

		if(!token) {
			return <IsLoggedIn/>;
		}

		const styles = {
	     width: '15%',
	     height: '15%',
	     display: 'block',
	     backgroundRepeat: 'no-repeat',
	     backgroundPosition: 'center',
	     marginRight: 500
	    };

		let pageName = this.props.location.pathname;

		return (
			<div>
				<Header nav path={pageName} />
				<div className="wrapper">
		          <div id="stream">
		            <table id="tab">
		              <thead>
		                <tr>
		                  	<th>title</th>
							<th>author</th>
							<th>price</th>
							<th>category</th>
							<th>publication date</th>
							<th>image</th>
							<th>edit</th>
							<th>delete</th>
		                </tr>
		              </thead>
		              <DisplayBooks removeBook={this.removeBook} data={this.state.bookData.data}/>
		            </table>
		            {loading ? <LoadingGif style={styles}/> : null}
		          </div>
		        </div>
				<Footer />
			</div>
		);
	}
}

export default ViewBooks
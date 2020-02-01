import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import IsLoggedIn from './IsLoggedIn';
import LoadingGif from './LoadingGif';

class EditBook extends Component {

	constructor() {
		super()
		this.state = {
			bookData: "",
			categoryData: "",
			redirect: false
		}

		this.fetchedCategories = this.fetchedCategories.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		let id = this.props.match.params.id;

		if(id) {
			axios.all([
				axios.get(`https://bookstoreappapi.herokuapp.com/api/v1/books/${id}`),
				axios.get(`https://bookstoreappapi.herokuapp.com/api/v1/category`)
			])
			.then(axios.spread((book, category) => {
				this.setState({
					bookData: book.data,
					categoryData: category.data
				})
			}))
			.catch(err => {
				console.log(err)
			})
		}
	}

	handleSubmit(e) {
		e.preventDefault();

		this.setState({loading: true});

		this.postEditedBook(e.target);
	}

	postEditedBook(formValue) {
		let id = this.props.match.params.id;
		let formData = new FormData(formValue),
	    config = {
	    	url: `https://bookstoreappapi.herokuapp.com/api/v1/books/${id}`,
	        headers: {
	          'content-type': 'multipart/form-data'
	        },
	        method: 'put',
	        data: formData
	    }

	    axios(config)
	      .then(response => {
	        this.setState({
	        	loading: false,
	        	redirect: true
	        });
	      })
	      .catch(err => {
	        console.log(err);
	      });
	}

	fetchedCategories() {
		let fetchedCategories = [];

		if(this.state.categoryData) {
			let data = this.state.categoryData;

			data.forEach((category, i) => {
				fetchedCategories.push(
					<option key={i} value={category._id}>
	                {category.categoryName}
	              	</option>
              	)
			});
		}

		return fetchedCategories;
	}

	render() {

		let token = localStorage.getItem('adminToken');

	    if(!token) {
	      return <IsLoggedIn/>;
    	}

    	if(this.state.redirect) {
    		return <Redirect to="/viewBooks" />
    	}

    	let editForm;

	    if(this.state.bookData) {
	    	let data = this.state.bookData;

	    	editForm = (
	    		<div>
		    		<div>
		              <label>title:</label>
		              <input type="text" name="title" defaultValue={data.title}/>
		            </div>

		            <div>
		              <label>author:</label>
		              <input type="text" name="author" defaultValue={data.author}/>
		            </div>

		            <div>
		              <label>price:</label>
		              <input type="text" name="price" defaultValue={data.price}/>
		            </div>

		            <div>
		              <label>publication date:</label>
		              <input type="text" name="publicationDate" defaultValue={data.publicationDate}/>
		            </div>

		            <div>
		              <label>category:</label>
		              <select name="categoryId">
		                {this.fetchedCategories()}
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
	            </div>
	    	)
	    }

		return (
			<div>
				<Header nav/>
				<div className="wrapper">
			      <h1 id="register-label">Edit Book</h1>
			      <hr />
			      <form id="register" action="" formEncType="multipart/form-data" onSubmit={this.handleSubmit}>
		            
			      	{editForm}

		            <input type="submit" name="category" value="Edit" />
            		{ this.state.loading ? < LoadingGif /> : null }
		          </form>
			    </div>
				<Footer />
			</div>
		)
    }
}

export default EditBook;
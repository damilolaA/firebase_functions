/*import React, { Component } from 'react';
import axios from "axios";
import Register from "./register";

class PostData extends Component{

	const postAdminData = () => {
		let data = this.inputValues(),
			err = this.state.errorMessages;
			
		let err = props.error,
			data = props.data;

		if(Object.keys(err).length < 0) {
			axios({
				method: 'post',
				url: 'https://bookstoreappapi.herokuapp.com/api/v1/admin',
				data: data
			})
			.then(response => {
				console.log(response);
			})
			.catch(err => {
				console.log(err);
			})
		} else {
			console.log('request not successful');
		}
	}

	render() {
		return(
			<div>
				<Register postAdminData={this.postAdminData.bind(this)}/>
			</div>
		)
	}
	
}

export default PostData;*/

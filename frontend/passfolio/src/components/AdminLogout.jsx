import React from 'react';
import { Redirect } from 'react-router-dom';

const Logout = () => {

	let token = localStorage.getItem('adminToken');

	if(token) {
		localStorage.removeItem('adminToken');
	}

	return (
		<Redirect to="/login"/>
	)
}

export default Logout;
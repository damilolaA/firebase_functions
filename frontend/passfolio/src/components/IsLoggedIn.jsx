import React from 'react';
import { Redirect } from 'react-router-dom';

const IsLoggedIn = () => {

	return (
		<Redirect to='/login'/>
	)
	
}

export default IsLoggedIn;
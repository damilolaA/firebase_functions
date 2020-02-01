import React from 'react';

const Landing = () => {

	return (
		<div>
			<nav className="navbar navbar-light bg-light static-top">
		      <div className="container">
		        <a className="btn btn-primary" href="/login">Login</a>
		        <a className="btn btn-primary" href="/register">Sign Up</a>
		      </div>
		    </nav>

		    <header className="masthead text-white text-center">
		      <div className="overlay"></div>
		      <div className="container">
		        <div className="row">
		          <div className="col-xl-9 mx-auto">
		            <h1 className="mb-5">React Bookstore</h1>
		            <h3 className="mb-5">Login or Register</h3>
		          </div>
		        </div>
		      </div>
    		</header>
		</div>
	)
}

export default Landing;

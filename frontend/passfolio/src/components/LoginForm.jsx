import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Gif from "../spinner.gif";

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      loginDetails: {
        email: '',
        password: ''
      },
      errorMessages: {},
      responseData: {},
      redirect: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    let loginData = this.state.loginDetails,
      inputName = e.target.name;

    loginData[inputName] = e.target.value;

    this.setState(loginData);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.validateLoginDetails();

    this.postLoginData();
  }

  validateLoginDetails() {
    let data = this.state.loginDetails,
      errors = { errorMessages: {} };

    for (let value in data) {
      if (data[value] === '') {
        errors.errorMessages[value] = 'Please enter your ' + value;
        this.setState(errors);
      }
    }

    return;
  }

  postLoginData() {
    let loginData = this.state.loginDetails;

    if (loginData['email'] !== '' && loginData['password'] !== '') {
      this.setState({ loading: true });
      axios({
        method: 'post',
        url: 'http://localhost:5000/passfolio-test-daf9c/us-central1/passfolio/api/v1/login',
        data: loginData
      })
        .then(response => {
          console.log("response", response);
          let responseData = response.data,
              token = response.data._token;

          localStorage.setItem("adminToken", token);
          
          this.setState({ responseData: responseData });
          this.setState({ redirect: true });
          this.setState({ loading: false });
        })
        .catch(err => {
          console.log(err);
          alert(err && err.message);
          this.setState({loading: false});
        });
    } else {
      console.log('no data to post');
    }
  }

  render() {
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to="/dashboard" />;
    }

    return (
      <div className="wrapper">
        <h1 id="register-label">Admin Login</h1>
        <hr />
        <form id="register" onSubmit={this.handleSubmit}>
          <div>
            <p className="err">{this.state.errorMessages.email ? this.state.errorMessages.email : ''}</p>
            <label>email:</label>
            <input onChange={this.handleChange} type="text" name="email" placeholder="email" />
          </div>

          <div>
            <p className="err">{this.state.errorMessages.password ? this.state.errorMessages.password : ''}</p>
            <label>password:</label>
            <input onChange={this.handleChange} type="password" name="password" placeholder="password" />
          </div>

         <p><input type="submit" name="register" value="login"/>
         {this.state.loading ? <img alt="Loading..." src={Gif} width="100" /> : null}</p>
            
        </form>

        <h4 className="jumpto">
          Don't have an account? <a href="/register">register</a>
        </h4>
        
      </div>
    );
  }
}

export default LoginForm;

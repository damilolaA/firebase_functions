import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Gif from "../spinner.gif";

class Form extends Component {
  constructor() {
    super();
    this.state = {
      errorMessages: {},
      adminData: {
        email: '',
        password: ''
      },
      id: '',
      redirect: false,
    };

    this.submitForm = this.submitForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  submitForm(e) {
    e.preventDefault();

    this.validateForm();

    this.postAdminData();

    this.clearForm();
  }

  handleChange(e) {
    let dummy = this.state.adminData,
      input = e.target.name;

    dummy[input] = e.target.value;

    this.setState(dummy);
  }

  clearForm() {
    let id = this.state.id;

    if (id) {
      this.setState({ adminData: '' });
    }
  }

  validateForm() {
    let data = this.state.adminData,
      errors = { errorMessages: {} };

    for (let value in data) {
      if (data[value] === '') {
        errors.errorMessages[value] = 'Please enter your ' + value;
        this.setState(errors);
      }
    }

    return;
  }

  postAdminData() {
    let data = this.state.adminData;

    console.log("data", data);
    this.setState({ loading: true });

    if (data['email'] !== '' && data['password'] !== '') {
      axios({
        method: 'post',
        url: 'http://localhost:5000/passfolio-test-daf9c/us-central1/passfolio/api/v1/signup',
        data: data
      })
        .then(response => {
          
          this.setState({ id: response.data._id });
          this.setState({loading: false});
          this.setState({ redirect: true });
        })
        .catch(err => {
          this.setState({ loading: false });
          alert(err && err.message);
          console.log("errror", err);
        });
    } else {
      this.setState({ loading: false });
      console.log('request not successful');
    }
  }

  render() {
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to="/login" />;
    }

    return (
      <div>
        <div className="wrapper">
          <h1 id="register-label">Register</h1>
          <hr />
          <form id="register" onSubmit={this.submitForm}>

            <div>
              <p className="err">{this.state.errorMessages.email ? this.state.errorMessages.email : ''}</p>
              <label>email:</label>
              <input onChange={this.handleChange} type="text" name="email" placeholder="email" />
            </div>

            <div>
              <p className="err">{this.state.errorMessages.hash ? this.state.errorMessages.hash : ''}</p>
              <label>password:</label>
              <input onChange={this.handleChange} type="password" name="password" placeholder="password" />
            </div>

            <p>
              <input type="submit" name="register" value="register" />
              {this.state.loading ? <img alt="Loading..." src={Gif} width="100" /> : null}
            </p>
          </form>

          <h4 className="jumpto">
            Have an account? <a href="/login">login</a>
          </h4>
        </div>
      </div>
    );
  }
}

export default Form;

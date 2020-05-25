import React, { Component } from "react";
import { withAuth } from './../lib/Auth';
import './Auth.css';

class Login extends Component {
  state = { username: "", password: "" };

  handleFormSubmit = event => {
    event.preventDefault();
    const { username, password } = this.state;

    this.props.login(username, password);
    // this.props.login method is coming from the AuthProvider
    // injected by the withAuth() HOC
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { username, password } = this.state;

    return (
      <div className='green-container'>
        <div className='auth-container'>
          <div className='form-container'>
            
          <div className= 'logo-container-two'>
                <div className='img-container-two'>
                  <img className='BeGreen' src="https://res.cloudinary.com/dywatr6gy/image/upload/v1590218353/BeGreen/Icon_iynxyu.jpg" 
                  alt="Be Green"/>
                </div>
                <h3>Healthy life,<br/>healthy heart</h3>
              </div>

            <form onSubmit={this.handleFormSubmit}>
              <h1>Welcome back!</h1>
              <p>To log in, please enter your username and password</p>
              <label>Username:</label>
              <input type="text" name="username" value={username} onChange={this.handleChange} />

              <label>Password:</label>
              <input type="password" name="password" value={password} onChange={this.handleChange} />

              <input className='create-account'  type="submit" value="Log in now" />
            </form>
          </div>
          
        </div>
        
      </div>
    );
  }
}

export default withAuth(Login);

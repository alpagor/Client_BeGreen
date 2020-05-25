import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from './../lib/Auth';
import Form from "react-bootstrap/Form";
import './Auth.css';

class Signup extends Component {
  state = { username: "", password: "" };

  handleFormSubmit = event => {
    event.preventDefault();
    const { username, password } = this.state;

    this.props.signup(username, password);
    // this.props.signup method is coming from the AuthProvider
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
              <div className= 'logo-container'>
                <div className='img-container-two'>
                  <img className='BeGreen' src="https://res.cloudinary.com/dywatr6gy/image/upload/v1590218353/BeGreen/Icon_iynxyu.jpg" 
                  alt="Be Green"/>
                </div>
                <h3>Healthy life,<br/>healthy heart</h3>
              </div>

            <form onSubmit={this.handleFormSubmit}>
                <h1>Sign up today!</h1>
              <div className='username'>
                <label>*Full Name:</label>
                <input className='name' type="text" name="full-name"/>
                <label>*Username:</label>
                <input type="text" name="username" value={username} onChange={this.handleChange} />
              </div>

              <label>*Password:</label>
              <input className='big-input' type="password" name="password" value={password} onChange={this.handleChange} />

              <label>*Email::</label>
              <input className='big-input' type="text" name="email" />

              <Form.File 
                id="custom-file"
                label="Upload Image"
                custom
                className='custom-file'
              />

              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Accept Terms and Services" />
              </Form.Group>

              <input className='create-account' type="submit" value="Create account" />

                <p>Already have an account?</p>
                <Link to={"/login"}> Login</Link>

            </form>
            
          </div>
          </div>       
        
      </div>
    );
  }
}

export default withAuth(Signup);


import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "./../lib/Auth";
import Form from "react-bootstrap/Form";
import "./Auth.css";

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    // if we have an error string set valid to false
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}

class Signup extends Component {
  // Our state will contain a property for each input
  // as well as have an object (error) which will hold the text for our error messages.
  state = {
    username: null,
    password: null,
    fullName: null,
    email: null,
    errors: {
      username: "",
      password: "",
      fullName: "",
      email: "",
    },
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    if(validateForm(this.state.errors)){
          const { username, password, fullName, email } = this.state;
      console.log(this.state)
    this.props.signup(username, password, fullName, email);
    // this.props.signup method is coming from the AuthProvider
    // injected by the withAuth() HOC
    } else {
      console.log("Invalid Form")
    }

  };

  handleChange = (event) => {
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case "username":
        errors.fullName =
          value.length < 5 ? "'Username must be 5 characters long!'" : "";
        break;
      case "fullName":
        errors.fullName =
          value.length < 3 ? "'Full Name must be 3 characters long!'" : "";
        break;
      case "password":
        errors.password =
          value.length < 8 ? "Password must be 8 characters long!" : "";
        break;
      case "email":
        errors.email = validEmailRegex.test(value) ? "" : "Email is not valid!";
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value });
  };

  render() {
    const { username, password, fullName, email, errors } = this.state;
     

    return (
      <div className="green-container">
        <div className="auth-container">
          <div className="form-container">
            <div className="logo-container">
              <div className="img-container-two">
                <img
                  className="BeGreen"
                  src="https://res.cloudinary.com/dywatr6gy/image/upload/v1590218353/BeGreen/Icon_iynxyu.jpg"
                  alt="Be Green"
                />
              </div>
              <h3>
                Healthy life,
                <br />
                healthy heart
              </h3>
            </div>

            <form onSubmit={this.handleFormSubmit}>
              <h1>Sign up today!</h1>
              <div className="username">
                <label>*Full Name:</label>
                <input
                  className="name"
                  type="text"
                  name="fullName"
                  value={fullName}
                  onChange={this.handleChange}
                />
                {errors.fullName.length > 0 && <span className="error">{errors.fullName}</span>}
                <label>*Username:</label>
                <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={this.handleChange}
                />
                {errors.username.length > 0 && <span className="error">{errors.username}</span>}
              </div>

              <label>*Password:</label>
              <input
                className="big-input"
                type="password"
                name="password"
                value={password}
                onChange={this.handleChange}
              />
              {errors.password.length > 0 && <span className="error">{errors.password}</span>}
              <label>*Email:</label>
              <input
                className="big-input"
                type="email"
                name="email"
                value={email}
                onChange={this.handleChange}
              />
              {errors.email.length > 0 && <span className="error">{errors.email}</span>}
              <Form.File
                id="custom-file"
                label="Upload Image"
                custom
                className="custom-file"
              />

              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Accept Terms and Services" />
              </Form.Group>

              <input
                className="create-account"
                type="submit"
                value="Create account"
              />

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

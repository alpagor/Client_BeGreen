import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "./../lib/Auth";
import Form from "react-bootstrap/Form";
import axios from "axios";
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
};

class Signup extends Component {
  // Our state will contain a property for each input
  // as well as have an object (error) which will hold the text for our error messages.
  state = {
    username: null,
    password: null,
    fullName: null,
    email: null,
    picture: "",
    errors: {
      username: "",
      password: "",
      fullName: "",
      email: "",
    },
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    if (validateForm(this.state.errors)) {
      const { username, password, fullName, email, picture } = this.state;
      
      this.props.signup(username, password, fullName, email, picture);
      // this.props.signup method is coming from the AuthProvider
      // injected by the withAuth() HOC
    } else {
      console.log("Invalid Form");
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case "username":
        errors.username =
          value.length < 5 ? "Username must be 5 characters long!" : "";
        break;
      case "fullName":
        errors.fullName =
          value.length < 3 ? "Full Name must be 3 characters long!" : "";
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

  handlePicture = (e) => {

    const file = e.target.files[0];
    const imgFile = new FormData(); //convert uploading file into Cloudinary format

    imgFile.append("picture", file);

    axios
      .post(process.env.REACT_APP_API_URL + "/api/picture", imgFile, {
        withCredentials: true,
      })
      .then((response) => {
        let imgURL = response.data;

        this.setState({ picture: imgURL });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { username, password, fullName, email, errors, picture } = this.state;

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

            <form
              onSubmit={this.handleFormSubmit}
              encType="multipart/form-data"
            >
              <h1>Sign up today!</h1>
              <div className="username">
                <div className="full-name">
                  <label>*Full Name:</label>
                  <input
                    className="name"
                    type="text"
                    name="fullName"
                    value={fullName}
                    onChange={this.handleChange}
                  />
                  <br />
                  {errors.fullName.length > 0 && (
                    <span className="error">{errors.fullName}</span>
                  )}
                </div>
                <div className="user-name">
                  <label>*Username:</label>
                  <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={this.handleChange}
                  />
                  <br />
                  {errors.username.length > 0 && (
                    <span className="error">{errors.username}</span>
                  )}
                </div>
              </div>

              <label>*Password:</label>
              <input
                className="big-input"
                type="password"
                name="password"
                value={password}
                onChange={this.handleChange}
              />
              {errors.password.length > 0 && (
                <span className="error">{errors.password}</span>
              )}
              <label>*Email:</label>
              <input
                className="big-input"
                type="email"
                name="email"
                value={email}
                onChange={this.handleChange}
              />
              {errors.email.length > 0 && (
                <span className="error">{errors.email}</span>
              )}
              <Form.File
                id="custom-file"
                label="Upload Image"
                custom
                className="custom-file"
                name="picture"
                onChange={this.handlePicture}
                type="file"
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

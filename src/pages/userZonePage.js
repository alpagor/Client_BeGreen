import React, { Component } from "react";
import axios from "axios";
import './userZone.css'
import {
  Container,
  Card,
  Image,
  Button,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import Navbar from "../components/Navbar";

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

export class UserZone extends Component {
  state = {
    user: {},
    fullName: null,
    email: null,
    errors: {
      //password: "",
      fullName: "",
      email: "",
    },
  };

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo = () => {
    axios
      .get(process.env.REACT_APP_API_URL + "/api/user", {
        withCredentials: true,
      })
      .then((response) => {
        const user = response.data;
        console.log(user);
        this.setState({
          user: user,
          fullName: user.fullName,
          email: user.email,
        });
      })
      .catch((err) => console.log(err));
  };

  editUserInfo = (e) => {
    e.preventDefault();
    const { fullName, email } = this.state;
    console.log(fullName, email);
    axios
      .put(
        process.env.REACT_APP_API_URL + "/api/user",
        { fullName: fullName, email: email },
        { withCredentials: true }
      )
      .then((response) => {
        const user = response.data;
        this.setState({ fullName: user.fullName, email: user.email });
      })
      .catch((err) => console.log(err));
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    let errors = this.state.errors;

    switch (name) {
      case "fullName":
        errors.fullName =
          value.length < 3 ? "'Full Name must be 3 characters long!'" : "";
        break;
      // case "password":
      //     errors.password =
      //     value.length < 8 ? "Password must be 8 characters long!" : "";
      //     break;
      case "email":
        errors.email = validEmailRegex.test(value) ? "" : "Email is not valid!";
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value });
  };

  render() {
    const { user, fullName, email, errors } = this.state;
    //const user = this.state.user

    return (
      <div className='userZone'>
        <Navbar />
        <Container>
          <Card text="dark" border="success" md={{ span: 6, offset: 4 }}>
            <Card.Header>
              <Image
                roundedCircle
                fluid
                src="https://img.icons8.com/officel/2x/user.png"
              />
              <Card.Title>HELLO, {user.username}!</Card.Title>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                <p style={{ textAlign: "center" }}>
                  Here you can see your personal info
                </p>
                <br />
                <Form onSubmit={this.editUserInfo}>
                  <Form.Group as={Row}>
                    <Form.Label column sm={2}>
                      Full name: 
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        type="text"
                        name="fullName"
                        value={this.state.fullName}
                        onChange={this.handleChange}
                      />
                    </Col>
                    {errors.fullName.length > 0 && (
                      <span className="error">{errors.fullName}</span>
                    )}
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Form.Label column sm={2}>
                      Email: 
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        type="email"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                      />
                    </Col>
                    {errors.email.length > 0 && (
                      <span className="error">{errors.email}</span>
                    )}
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Col sm={{ span: 10, offset: 2 }}>
                      <Button type="submit" variant="success">
                        Edit your profile
                      </Button>
                    </Col>
                  </Form.Group>
                </Form>
              </Card.Text>
            </Card.Body>
          </Card>
        </Container>
      </div>
    );
  }
}

export default UserZone;

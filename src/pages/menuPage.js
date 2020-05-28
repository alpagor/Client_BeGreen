import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Row,
  ListGroup,
  Col,
  Card,
  ListGroupItem,
  Button,
} from "react-bootstrap";
import Navbar from "../components/Navbar";
import MenuRecipeList from "../components/MenuRecipeList";
import "./menuPage.css";

export class MenuPage extends Component {
  state = {
    menuList: [],
    show: false,
    name: "",
    recipes: [],
  };

  componentDidMount() {
    this.getAllMenus();
  }

  getAllMenus = () => {
    axios
      .get(process.env.REACT_APP_API_URL + "/api/menu", {
        withCredentials: true,
      })
      .then((response) => {
        const menu = response.data.menus;
        this.setState({ menuList: menu });
      })
      .catch((err) => console.log(err));
  };

  getMenuDetails = (menuId) => {
    axios
      .get(process.env.REACT_APP_API_URL + `/api/menu/${menuId}`)
      .then((response) => {
        const menuName = response.data.name;
        const recipesArr = response.data.recipes;
        this.setState({ name: menuName, recipes: recipesArr });
      })
      .catch((err) => console.log(err));
  };

  handleDelete = (menuId, index) => {
    axios
      .post(process.env.REACT_APP_API_URL + `/api/menu/${menuId}/delete`)
      .then(() => {
        const menusArr = [...this.state.menuList];
        menusArr.splice(index, 1);
        this.setState({ menuList: menusArr });
      })
      .catch((err) => console.log(err));
  };

  handleClick = (e) => {
    const menuId = e;
    this.getMenuDetails(menuId);
  };

  render() {
    const handleShow = (value) => {
      this.setState({ show: true });
      this.handleClick(value);
    };

    return (
      <div className='menu-Page'>
        <Navbar />
        <p className="menu-page">
          Here you can look at the menus you saved. <br /> If you want more
          details click on a menu to see the recipes
        </p>
        <Row className="menuPage">
          <Col sm={4}>
            <ListGroup className="menuList">
              {this.state.menuList &&
                this.state.menuList.map((oneMenu, index) => {
                  return (
                    <Card className="menu-name">
                      <Link
                        onClick={function() {
                          handleShow(oneMenu._id);
                        }}
                        key={oneMenu._id}
                      >
                        <Card.Title>{oneMenu.name}</Card.Title>
                      </Link>
                      <Button
                        onClick={() => this.handleDelete(oneMenu._id, index)}
                        size="sm"
                        type="submit"
                        variant="danger"
                      >
                        Remove
                      </Button>
                    </Card>
                  );
                })}
            </ListGroup>
          </Col>
          <Col sm={8} className="hide-div">
            {this.state.show && (
              <MenuRecipeList
                name={this.state.name}
                recipes={this.state.recipes}
              />
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

export default MenuPage;

import React, { Component } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";

//User tiene el array the menus

export class MenuPage extends Component {
  state = {
    menuList: [],
  };

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

  render() {
    return (
      <div>
        <Navbar />
        <div className="menuList">
          {this.state.menuList &&
            this.state.menuList.map((oneMenu) => {
              return (
                <div key={oneMenu._id}>
                  <p>{oneMenu.name}</p>
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}

export default MenuPage;

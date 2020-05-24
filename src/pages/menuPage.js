import React, { Component } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";

//User tiene el array the menus

export class MenuPage extends Component {
    getAllMenus = () => {
        axios
        .get(`http://localhost:5000/api/menu`)
        .then((response) => {
        const menuList = response.data;
        this.setState({ menuList });
        })
        .catch((err) => console.log(err));
    };


    handleOnClick = (e) => {
        const menuId = e.target.value;
        this.props.removeFromMenu(menuId);
      };



    render() {
        return (
                <div>
                    <Navbar />
                    <h1>MENUs</h1>
                    {this.props.menu.map((oneMenu) => {
                        return (
                            <div key={oneMenu._id}>
                                {" "}
                                {oneMenu.name}
                                <button value={oneMenu._id} onClick={this.handleOnClick}>
                                DELETE
                                </button>
                            </div>
                            );
                        })}
                </div>
            );
        }
}
export default MenuPage;

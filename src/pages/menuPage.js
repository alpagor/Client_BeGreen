import React, { Component } from "react";
import axios from "axios";

import Navbar from '../components/Navbar'


export class MenuPage extends Component {
    render() {
        return (
            <div>
            <Navbar/>
                <h1>THIS IS MENU</h1>
            </div>
        )
    }
}

export default MenuPage

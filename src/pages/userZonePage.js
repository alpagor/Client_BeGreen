import React, { Component } from "react";
import axios from "axios";

import Navbar from '../components/Navbar'


export class UserZone extends Component {
    render() {
        return (
            <div>
            <Navbar/>
                <h1>THIS IS USER PAGE</h1>
            </div>
        )
    }
}

export default UserZone
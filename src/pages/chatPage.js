import React, { Component } from "react";
import axios from "axios";

import Navbar from '../components/Navbar'


export class ChatPage extends Component {
    render() {
        return (
            <div>
            <Navbar/>
                <h1>THIS IS CHAT</h1>
            </div>
        )
    }
}

export default ChatPage
import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class HomeNavbar extends Component {
  render() {
    
    return (
      <nav className="homeNavbar">
        <Link to={"/signup"}>SIGN UP</Link>
        <Link to={"/login"}>LOG IN</Link>
      </nav>
    );
  }
}

export default HomeNavbar;
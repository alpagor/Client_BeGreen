import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Navbar extends Component {
  render() {
    
    return (
      <nav className="navbar">
        <Link to={'/generator'}>Generator</Link>
        <Link to={'/menu'}>Menu</Link>
        <Link to={'/chat'}>Chat</Link>
        <Link to={'/user-zone'}>User Zone</Link>
      </nav>
    );
  }
}

export default Navbar;

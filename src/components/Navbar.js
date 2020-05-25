import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';


class Navbar extends Component {

  
  render() {
    
    return (
      <nav className="navbar">
        <img 
          className='logo' 
          src="https://res.cloudinary.com/dywatr6gy/image/upload/v1590218353/BeGreen/Icon_iynxyu.jpg" 
          alt="Be Green"/>
        <NavLink to={'/generator'} activeStyle={{color:'#38B735', textDecoration: 'underline'}} >Generator</NavLink>
        <NavLink to={'/menu'} activeStyle={{color:'#38B735', textDecoration: 'underline'}} >Menu</NavLink>
        <NavLink to={'/chat'} activeStyle={{color:'#38B735', textDecoration: 'underline'}} >Chat</NavLink>
        <NavLink to={'/user-zone'} activeStyle={{color:'#38B735', textDecoration: 'underline'}} >User Zone</NavLink>
      </nav>
    );
  }
}

export default Navbar;

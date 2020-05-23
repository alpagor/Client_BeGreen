import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class HomeNavbar extends Component {
  render() {
    
    return (
      <nav className='navHome' >
      <img className='BeGreen' src="https://res.cloudinary.com/dywatr6gy/image/upload/v1590218353/BeGreen/Icon_iynxyu.jpg" 
    alt="Be Green"/>
      <div className="homeNavbar">
        <Link className='signup' to={"/signup"}>SIGN UP</Link>
        <Link className='login' to={"/login"}>LOG IN</Link>
      </div>
        
      </nav>
    );
  }
}

export default HomeNavbar;
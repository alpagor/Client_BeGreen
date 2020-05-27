import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import "./Navbar.css";
import { withAuth } from "./../lib/Auth";

class Navbar extends Component {
  render() {
    // `logout` is coming from the AuthProvider
    // and is injected by the withAuth HOC
    const { logout } = this.props;

    return (
      <nav className="navbar">
        <img
          className="logo"
          src="https://res.cloudinary.com/dywatr6gy/image/upload/v1590218353/BeGreen/Icon_iynxyu.jpg"
          alt="Be Green"
        />
        <NavLink
          to={"/generator"}
          activeStyle={{ color: "#38B735", textDecoration: "underline" }}
        >
          Generator
        </NavLink>
        <NavLink
          to={"/menu"}
          activeStyle={{ color: "#38B735", textDecoration: "underline" }}
        >
          Menu
        </NavLink>

        <NavLink
          to={"/user-zone"}
          activeStyle={{ color: "#38B735", textDecoration: "underline" }}
        >
          User Zone
        </NavLink>
        <Link onClick={logout}>
          <img src="https://res.cloudinary.com/dxex3vutt/image/upload/v1590515417/BeGreen%20project%20M3/logout-32_pc4rwf.png" />
        </Link>
      </nav>
    );
  }
}

export default withAuth(Navbar);

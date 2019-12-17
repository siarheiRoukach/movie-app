import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Button from "@material-ui/core/Button";
import "./Header.scss";

const Header = () => {
  return (
    <header>
      <h2>Movie-App</h2>
      <Button variant="contained" color="primary">
        <Link to="/account">My Account</Link>
      </Button>
      <Button variant="contained" color="primary">
        <Link to="/login">Log in</Link>
      </Button>
      <Button variant="contained" color="primary">
        <Link to="/signup">Sign up</Link>
      </Button>
      <Button variant="contained" color="primary">
        Log out
      </Button>
    </header>
  );
};

export default Header;

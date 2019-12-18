import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import ButtonNav from "../../common/buttonNav/ButtonNav";
import ButtonGeneric from "../../common/buttonGeneric/ButtonGeneric";

import FadeMenuNav from "../../common/fadeMenuNav/FadeMenuNav";
import { logOut } from "../../redux/modules/auth";
import "./Header.scss";

const Header = () => {
  const dispatch = useDispatch();
  const loggedStatus = useSelector(state => {
    console.log(state);
    return state.auth.isAuthenticated;
  }, shallowEqual);
  return (
    <header className="header">
      <h2>
        <Link to="/" className="header__title">
          Movie-App
        </Link>
      </h2>
      <div className="header__controls">
        {loggedStatus ? (
          <>
            <ButtonNav to="/profile">My Profile</ButtonNav>
            <ButtonGeneric
              event="logOut"
              onClick={() => {
                dispatch(logOut());
              }}
            >
              Log Out
            </ButtonGeneric>
            <FadeMenuNav />
          </>
        ) : (
          <>
            <ButtonNav to="/login">Log In</ButtonNav>
            <ButtonNav to="/signup">Sign Up</ButtonNav>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;

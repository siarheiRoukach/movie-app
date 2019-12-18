import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { ViewContext } from "../../utils/ViewsContextProvider";
import ButtonNav from "../../common/buttonNav/ButtonNav";
import ButtonGeneric from "../../common/buttonGeneric/ButtonGeneric";
import FadeMenuNav from "../fadeMenuNav/FadeMenuNav";
import { logOut } from "../../redux/modules/auth";
import "./Header.scss";

const Header = () => {
  const dispatch = useDispatch();
  const loggedStatus = useSelector(
    state => state.auth.isAuthenticated,
    shallowEqual
  );
  const viewsContext = useContext(ViewContext);

  const mobileControlsView = (
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
    </>
  );

  const desktopControlsDisplay = <FadeMenuNav />;

  const profileControlsDisplay = viewsContext
    ? mobileControlsView
    : desktopControlsDisplay;

  return (
    <header className="header">
      <h2>
        <Link to="/" className="header__title">
          Movie-App
        </Link>
      </h2>
      <div className="header__controls">
        {loggedStatus ? (
          <> {profileControlsDisplay}</>
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

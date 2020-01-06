import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import GoogleLogOut from "../../common/googleLogIn/GoogleLogIn";
import { ViewContext } from "../../utils/ViewsContextProvider";
import ButtonNav from "../../common/buttonNav/ButtonNav";
import ButtonGeneric from "../../common/buttonGeneric/ButtonGeneric";
import FadeMenuNav from "../fadeMenuNav/FadeMenuNav";
import { logOut } from "../../redux/modules/auth";
import "./Header.scss";

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const userStatus = useSelector(state => {
    return {
      isAuthenticated: state.auth.isAuthenticated,
      userToken: state.auth.currentUser.token
    };
  }, shallowEqual);
  const viewsContext = useContext(ViewContext);

  const handleLogOut = response => {
    dispatch(logOut());
  };

  const mobileControlsView = (
    <>
      <ButtonNav to="/profile">My Profile</ButtonNav>
      {userStatus.token ? (
        <GoogleLogOut
          render={renderProps => (
            <ButtonGeneric
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              event="logOut"
            >
              Logout
            </ButtonGeneric>
          )}
        />
      ) : (
        <ButtonGeneric event="logOut" onClick={handleLogOut}>
          Log Out
        </ButtonGeneric>
      )}
    </>
  );

  const desktopControlsView = <FadeMenuNav />;

  const profileControlsViewy = viewsContext
    ? mobileControlsView
    : desktopControlsView;

  return (
    <header className="header">
      <h2 className="header__title">
        <Link to="/">Movie-App</Link>
      </h2>
      <div className="header__controls">
        {userStatus.isAuthenticated ? (
          <> {profileControlsViewy}</>
        ) : (
          <>
            <ButtonNav to={{ pathname: "/login", state: { from: location } }}>
              Log In
            </ButtonNav>
            <ButtonNav to={{ pathname: "/signup", state: { from: location } }}>
              Sign Up
            </ButtonNav>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;

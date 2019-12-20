import React from "react";
import { useDispatch } from "react-redux";
import { logOut } from "../../redux/modules/auth";
import { GoogleLogout } from "react-google-login";

const GoogleLogOut = props => {
  const dispatch = useDispatch();

  const handleLogOut = response => {
    dispatch(logOut());
  };

  return (
    <GoogleLogout
      {...props}
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      onLogoutSuccess={handleLogOut}
    />
  );
};
export default GoogleLogOut;

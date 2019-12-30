import React from "react";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/modules/auth";
import { GoogleLogin } from "react-google-login";
import { useLocation, useHistory } from "react-router-dom";

const syncUserWithStorage = userObj => {
  let currUser;
  let usersDb = JSON.parse(localStorage.getItem("usersDb"));
  if (!Array.isArray(usersDb)) usersDb = [];
  currUser = usersDb.find(user => user.id === userObj.id);
  if (currUser) return currUser;
  else {
    usersDb.push(userObj);
    localStorage.setItem("usersDb", JSON.stringify(usersDb));
    return userObj;
  }
};

const GoogleLogIn = props => {
  const dispatch = useDispatch();
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  const googleAuthSuccess = response => {
    const newUserObj = {
      id: response.profileObj.googleId,
      firstName: response.profileObj.givenName,
      lastName: response.profileObj.familyName,
      email: response.profileObj.email,
      password: "",
      role: "user",
      token: response.getAuthResponse().id_token
    };
    dispatch(logIn(syncUserWithStorage(newUserObj)));
    history.push(from);
  };

  const googleAuthFailure = response => {
    console.log(response);
  };

  return (
    <GoogleLogin
      {...props}
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      onSuccess={googleAuthSuccess}
      onFailure={googleAuthFailure}
      cookiePolicy={"single_host_origin"}
    />
  );
};
export default GoogleLogIn;

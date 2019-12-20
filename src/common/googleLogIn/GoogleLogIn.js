import React from "react";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/modules/auth";
import { GoogleLogin } from "react-google-login";

const GoogleLogIn = props => {
  const dispatch = useDispatch();
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
    dispatch(logIn(newUserObj));
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

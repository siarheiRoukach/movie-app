import React from "react";
import { useDispatch, shallowEqual, useSelector } from "react-redux";
import { useLocation, Redirect } from "react-router-dom";
import { logIn } from "../redux/modules/auth";

const LogInSignUp = () => {
  let location = useLocation();

  const loggedStatus = useSelector(
    state => state.auth.isAuthenticated,
    shallowEqual
  );

  const dispatch = useDispatch();

  const mockAuth = () => {
    dispatch(logIn());
  };

  return (
    <div>
      {loggedStatus && (
        <Redirect
          to={{
            pathname: "/",
            state: { from: location }
          }}
        />
      )}

      {location.pathname === "/login" && (
        <>
          <p>This is redirected LogIn Page</p>
          <button onClick={mockAuth}>LogIn</button>
        </>
      )}

      {location.pathname === "/signup" && (
        <>
          <p>This is redirected Sign Up Page</p>
          <button onClick={mockAuth}>Sign Up</button>
        </>
      )}
    </div>
  );
};

export default LogInSignUp;

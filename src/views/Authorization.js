import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useLocation, Redirect } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

import SignUpForm from "../components/signUpForm/SignUpForm";
import LogInForm from "../components/logInForm/LogInForm";

const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh",
    position: "relative"
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "dark"
        ? theme.palette.grey[900]
        : theme.palette.grey[50],
    backgroundSize: "cover",
    backgroundPosition: "center"
  }
}));

const Authorization = () => {
  const classes = useStyles();
  let location = useLocation();

  const loggedStatus = useSelector(
    state => state.auth.isAuthenticated,
    shallowEqual
  );

  return (
    <>
      {loggedStatus && (
        <Redirect
          to={{
            pathname: "/",
            state: { from: location }
          }}
        />
      )}
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          {location.pathname === "/signup" && <SignUpForm />}
          {location.pathname === "/login" && <LogInForm />}
        </Grid>
      </Grid>
    </>
  );
};

export default Authorization;
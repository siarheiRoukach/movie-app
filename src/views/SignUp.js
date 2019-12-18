import React from "react";
import { useDispatch, shallowEqual, useSelector } from "react-redux";
import { Link as RouterLink, useLocation, Redirect } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import { logIn } from "../redux/modules/auth";
import ButtonGeneric from "../common/buttonGeneric/ButtonGeneric";

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {`Copyright © Movie-App ${new Date().getFullYear()}`}
    </Typography>
  );
};

const Link = React.forwardRef((props, ref) => (
  <RouterLink ref={ref} {...props} />
));

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
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#2196F3"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  navLink: {
    textDecoration: "none",
    color: "#3f51b5"
  },
  submit: {
    margin: theme.spacing(2, 0, 2)
  },
  copyright: {
    [theme.breakpoints.down("sm")]: {
      position: "absolute",
      top: "90vh",
      marginLeft: "auto",
      marginRight: "auto",
      left: 0,
      right: 0
    }
  }
}));

const LogIn = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  let location = useLocation();

  const loggedStatus = useSelector(
    state => state.auth.isAuthenticated,
    shallowEqual
  );

  const mockAuth = e => {
    e.preventDefault();
    dispatch(logIn());
  };

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
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <form className={classes.form} onSubmit={mockAuth}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="firstName"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lname"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    placeholder="email@example.com"
                    type="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    inputProps={{ minLength: 8 }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid>
              </Grid>
              <ButtonGeneric
                type="submit"
                fullWidth
                variant="contained"
                className={classes.submit}
              >
                Sign Up
              </ButtonGeneric>
              <Grid container justify="center">
                <Grid>
                  <Link to="/login" className={classes.navLink}>
                    {"Already have an account? Log In"}
                  </Link>
                </Grid>
              </Grid>
              <Box mt={1} className={classes.copyright}>
                <Copyright />
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default LogIn;

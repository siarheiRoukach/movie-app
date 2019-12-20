import React, { useState, useReducer } from "react";
import { useDispatch } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import { logIn } from "../../redux/modules/auth";
import ButtonGeneric from "../../common/buttonGeneric/ButtonGeneric";
import GoogleLogIn from "../../common/googleLogIn/GoogleLogIn";
import Copyright from "../../common/copyright/Copyright";

const Link = React.forwardRef((props, ref) => (
  <RouterLink ref={ref} {...props} />
));

const initialState = {
  id: 0,
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  role: "",
  token: ""
};

const reducer = (state, { field, value }) => {
  return { ...state, [field]: value };
};

const useStyles = makeStyles(theme => ({
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
  },
  googleBtn: {
    width: "100%",
    justifyContent: "center"
  }
}));

const SignUpForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [validationError, setValidationError] = useState(false);

  const [state, reactDispatch] = useReducer(reducer, initialState);

  const onChange = e => {
    reactDispatch({ field: e.target.name, value: e.target.value });
  };

  const addNewUserToStorage = userObj => {
    let usersDb = JSON.parse(localStorage.getItem("usersDb"));
    if (!Array.isArray(usersDb)) usersDb = [];
    if (userObj.id === 0) {
      userObj.id = usersDb.length + 1;
    }
    usersDb.push(userObj);
    localStorage.setItem("usersDb", JSON.stringify(usersDb));
  };

  const validateNewUser = userObj => {
    const usersDb = JSON.parse(localStorage.getItem("usersDb"));
    let answer = true;
    if (Array.isArray(usersDb)) {
      usersDb.forEach(user => {
        if (user.email === userObj.email) answer = false;
      });
    }
    return answer;
  };

  const formSubmit = e => {
    e.preventDefault();
    const newUser = { ...state };
    if (newUser.email.split("@")[0] === "admin") {
      newUser.role = "admin";
    } else if (newUser.email.split("@")[0] === "moderator") {
      newUser.role = "moderator";
    } else {
      newUser.role = "user";
    }
    if (validateNewUser(newUser)) {
      addNewUserToStorage(newUser);
      setValidationError(false);
      dispatch(logIn(newUser));
    } else setValidationError(true);
  };

  return (
    <>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form className={classes.form} onSubmit={formSubmit}>
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
                onChange={onChange}
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
                onChange={onChange}
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
                onChange={onChange}
                error={validationError}
                helperText={
                  validationError ? "Current Email is already exist" : ""
                }
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
                onChange={onChange}
              />
            </Grid>
          </Grid>
          <Box justify="center" mb={2}>
            <ButtonGeneric
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
            >
              Sign Up
            </ButtonGeneric>
            <Box my={2}>
              <Typography variant="body2" color="textSecondary" align="center">
                OR
              </Typography>
            </Box>
            <Grid container>
              <GoogleLogIn className={classes.googleBtn}>
                Join with Google
              </GoogleLogIn>
            </Grid>
          </Box>
          <Grid container justify="center">
            <Grid>
              <Link to="/login" className={classes.navLink}>
                {"Already have an account? Log In"}
              </Link>
            </Grid>
          </Grid>
          <Box mt={2} className={classes.copyright}>
            <Copyright />
          </Box>
        </form>
      </div>
    </>
  );
};

export default SignUpForm;

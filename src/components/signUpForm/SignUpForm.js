import React, { useState, useReducer } from "react";
import { useDispatch } from "react-redux";
import { Link as RouterLink, useLocation, useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

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

const SignUpForm = props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  let location = useLocation();
  let history = useHistory();
  let { from } = location.state || { from: { pathname: "/" } };

  const [validationError, setValidationError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [state, reactDispatch] = useReducer(reducer, initialState);

  const onChange = e => {
    reactDispatch({ field: e.target.name, value: e.target.value });
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
      dispatch(logIn(newUser));
      history.push(from);
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
              <FormControl variant="outlined" required fullWidth>
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  onChange={onChange}
                  name="password"
                  autoComplete="current-password"
                  inputProps={{ minLength: 8 }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        onMouseDown={e => e.preventDefault()}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  labelWidth={70}
                />
              </FormControl>
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

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link as RouterLink, useLocation, useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import FormHelperText from "@material-ui/core/FormHelperText";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import { logIn } from "../../redux/modules/auth";
import ButtonGeneric from "../../common/buttonGeneric/ButtonGeneric";
import GoogleLogIn from "../../common/googleLogIn/GoogleLogIn";
import Copyright from "../../common/copyright/Copyright";

const Link = React.forwardRef((props, ref) => (
  <RouterLink ref={ref} {...props} />
));

const getUser = (mail, password) => {
  let currentUser;
  const usersDb = JSON.parse(localStorage.getItem("usersDb"));
  if (Array.isArray(usersDb)) {
    currentUser = usersDb.find(
      user => user.email === mail && user.password === password
    );
  }
  return currentUser ? currentUser : {};
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
  margin: {
    margin: theme.spacing(1, 0)
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

const LogInForm = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  let location = useLocation();
  let history = useHistory();
  let { from } = location.state || { from: { pathname: "/" } };
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const onChange = e => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const [validationError, setValidationError] = useState(false);

  const formSubmit = e => {
    e.preventDefault();
    const currentUser = getUser(userData.email, userData.password);
    if (Object.entries(currentUser).length) {
      dispatch(logIn(currentUser));
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
          Log In
        </Typography>
        <form className={classes.form} onSubmit={formSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            placeholder="email@example.com"
            type="email"
            onChange={onChange}
          />
          <FormControl
            variant="outlined"
            required
            fullWidth
            className={classes.margin}
            error={validationError}
          >
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
            {validationError && (
              <FormHelperText htmlFor="outlined-adornment-password">
                Current Email or Password is invalid
              </FormHelperText>
            )}
          </FormControl>
          <Box justify="center" mb={2}>
            <ButtonGeneric
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
            >
              Log In
            </ButtonGeneric>
            <Box my={2}>
              <Typography variant="body2" color="textSecondary" align="center">
                OR
              </Typography>
            </Box>
            <Grid container>
              <GoogleLogIn className={classes.googleBtn}>
                Log In with Google
              </GoogleLogIn>
            </Grid>
          </Box>
          <Grid container justify="center">
            <Grid>
              <Link to="/signup" className={classes.navLink}>
                {"Don't have an account? Sign Up"}
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

export default LogInForm;

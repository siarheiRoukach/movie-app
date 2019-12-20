import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import MenuIcon from "@material-ui/icons/Menu";

import GoogleLogOut from "../../common/googleLogOut/GoogleLogOut";
import { logOut } from "../../redux/modules/auth";

const Link = React.forwardRef((props, ref) => (
  <RouterLink ref={ref} {...props} />
));

const stylesUtils = {
  mainColor: "#2196F3"
};

const FadeMenuNavigation = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();

  const userToken = useSelector(state => {
    return state.auth.currentUser.token;
  }, shallowEqual);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = response => {
    handleClose();
    dispatch(logOut());
  };

  return (
    <>
      <Button
        aria-controls="fade-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MenuIcon style={{ color: stylesUtils.mainColor }} fontSize="large" />
      </Button>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem
          style={{ color: stylesUtils.mainColor }}
          onClick={handleClose}
          component={Link}
          to="/profile"
        >
          My profile
        </MenuItem>
        {userToken ? (
          <GoogleLogOut
            onLogoutSuccess={handleLogOut}
            render={renderProps => (
              <MenuItem
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                Logout
              </MenuItem>
            )}
          />
        ) : (
          <MenuItem onClick={handleLogOut}>Logout</MenuItem>
        )}
      </Menu>
    </>
  );
};

export default FadeMenuNavigation;

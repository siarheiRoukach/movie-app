import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import MenuIcon from "@material-ui/icons/Menu";

import { logOut } from "../../home/duck/actions";

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

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
        <MenuItem
          onClick={() => {
            handleClose();
            dispatch(logOut());
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default FadeMenuNavigation;

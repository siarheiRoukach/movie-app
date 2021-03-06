import React from "react";
import Chip from "@material-ui/core/Chip";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const getTimeDisplayValue = (
  time,
  format = localStorage.getItem("i18nextLng")
) => {
  return time
    ? time.toLocaleString(format, {
        hour: "numeric",
        minute: "numeric"
      })
    : null;
};

const stylesUtils = {
  mainColor: "#2196F3"
};

const useStyles = makeStyles(theme => ({
  time: {
    borderColor: stylesUtils.mainColor,
    color: stylesUtils.mainColor,
    width: "85px",
    margin: "0.5rem 0.5rem",
    "&:hover, &:focus": {
      backgroundColor: `${stylesUtils.mainColor} !important`,
      color: "#fff"
    }
  },
  active: {
    backgroundColor: `${stylesUtils.mainColor} !important`,
    color: "#fff"
  }
}));

const ListCinemaSessions = ({ movieSessions, bookSession, selected }) => {
  const classes = useStyles();

  const handleClick = e => {
    bookSession(Object.keys(movieSessions)[0], e.currentTarget.id);
  };

  const chipItems =
    movieSessions &&
    Object.keys(movieSessions)[0] &&
    movieSessions[Object.keys(movieSessions)[0]].map((session, index) => {
      const localTime = getTimeDisplayValue(new Date("1970-01-01T" + session));
      const isActive =
        selected.cinema === Object.keys(movieSessions)[0] &&
        selected.time === session;
      return (
        <Chip
          id={session}
          label={localTime}
          color="primary"
          onClick={handleClick}
          variant="outlined"
          key={index}
          className={`${classes.time} ${isActive ? classes.active : ""}`}
        />
      );
    });

  return (
    <>
      <Grid container alignItems="center">
        <Typography component="span" variant="h6">
          {Object.keys(movieSessions)[0]}
        </Typography>
        <Grid container item xs={12} sm={10} md={10} alignItems="center">
          {chipItems}
        </Grid>
      </Grid>
    </>
  );
};

export default ListCinemaSessions;

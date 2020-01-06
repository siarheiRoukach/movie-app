import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import ReactPlayer from "react-player";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

import MovieRatings from "../../common/movieRatings/MovieRatings";
import ButtonNav from "../../common/buttonNav/ButtonNav";
import { setActiveMovie } from "../../redux/modules/movie";
import moviesDb from "../../utils/movieData";

const formatCurrency = (value, currency = "USD") => {
  return value.toLocaleString("en-US", {
    useGrouping: true,
    style: "currency",
    currency: currency
  });
};

const getDateName = (date, format = "en-US") => {
  return date
    ? date.toLocaleString(format, {
        year: "numeric",
        month: "long",
        day: "numeric"
      })
    : null;
};

const stylesUtils = {
  mainColor: "#2196F3",
  lightMainColor: "#21CBF3",
  captionColor: "#878787",
  disabledColor: "#FE6B8B"
};

const useStyles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(4, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  media: {
    minHeight: "375px",
    paddingTop: "56.25%" // 16:9
  },
  sectionHeading: {
    fontWeight: "900"
  },
  buttonNav: {
    "&:hover": {
      backgroundColor: stylesUtils.lightMainColor
    },
    "&$disabled": {
      color: "white",
      backgroundColor: stylesUtils.disabledColor
    }
  },
  disabled: {},
  buttonBack: {
    height: 0,
    margin: "3rem 4rem 0",
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  }
}));

const MovieCard = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  let location = useLocation();
  let { id } = useParams();
  let { from } = location.state || { from: { pathname: "/" } };
  const [currentMovie, setCurrentMovie] = useState({});

  const isAuthenticated = useSelector(
    state => state.auth.isAuthenticated,
    shallowEqual
  );

  const userMoviesRatings = useSelector(
    state => state.auth.currentUser.movieRatings,
    shallowEqual
  );

  useEffect(() => {
    setCurrentMovie(moviesDb.filter(movie => movie.id === Number(id))[0]);
  }, [id]);

  useEffect(() => {
    dispatch(setActiveMovie(currentMovie));

    return function cleanup() {
      dispatch(setActiveMovie(currentMovie));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMovie]);

  return (
    <main>
      <ButtonNav className={classes.buttonBack} to={from}>
        <ArrowBackIosIcon style={{ color: "#2196F3", fontSize: "2.5rem" }} />
      </ButtonNav>
      <div className={classes.paper}>
        <Container maxWidth="lg" disableGutters>
          <Grid container alignItems="center">
            <Grid item xs={12} sm={6} md={6}>
              <Typography component="h1" variant="h4">
                {currentMovie.title}
              </Typography>
            </Grid>
            <Grid
              container
              item
              xs={12}
              sm={6}
              md={6}
              justify="flex-end"
              alignItems="center"
            >
              <Typography
                component="span"
                variant="h6"
                style={{ color: stylesUtils.mainColor }}
              >
                {currentMovie.vote_average}
              </Typography>
              <Typography
                component="span"
                variant="h6"
                style={{ color: stylesUtils.captionColor }}
              >
                /10
              </Typography>

              {userMoviesRatings && userMoviesRatings[currentMovie.title] && (
                <Typography
                  component="span"
                  variant="h6"
                  style={{ color: stylesUtils.captionColor }}
                >
                  &nbsp;(Your previous vote is:&nbsp;
                  {userMoviesRatings[currentMovie.title]})
                </Typography>
              )}

              <Grid container justify="flex-end" alignItems="center">
                <MovieRatings
                  moviename={currentMovie.title}
                  rating={currentMovie.vote_average}
                  maxrating={10}
                  style={{ fontSize: "2rem" }}
                  disabled={!isAuthenticated}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12} sm={12} md={10}>
              <Typography
                component="span"
                variant="subtitle1"
                style={{ color: stylesUtils.captionColor }}
              >
                {currentMovie.tagline}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Typography
              component="span"
              variant="subtitle2"
              style={{ color: stylesUtils.lightMainColor }}
            >
              {currentMovie.genres && currentMovie.genres.join(", ")}
            </Typography>
          </Grid>
          <Grid container spacing={5} style={{ marginTop: "1rem" }}>
            <Grid item xs={12} sm={6} md={5}>
              <Card>
                {currentMovie.poster_path && (
                  <CardMedia
                    className={classes.media}
                    image={currentMovie.poster_path}
                    title={currentMovie.title}
                  />
                )}
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={7}>
              <Typography
                component="div"
                variant="h5"
                className={classes.sectionHeading}
              >
                About the movie
              </Typography>
              <Typography paragraph>{currentMovie.overview}</Typography>

              <Grid container jusify="center" style={{ marginBottom: "1rem" }}>
                {ReactPlayer.canPlay(currentMovie.trailerUrl) && (
                  <ReactPlayer
                    url={currentMovie.trailerUrl}
                    controls
                    width="100%"
                  />
                )}
              </Grid>
              <Grid container wrap="wrap" justify="space-between">
                <Grid item>
                  <Typography
                    component="h4"
                    variant="h5"
                    className={classes.sectionHeading}
                  >
                    Release Date
                  </Typography>
                  {currentMovie.release_date && (
                    <Typography paragraph>
                      {getDateName(new Date(currentMovie.release_date))}
                    </Typography>
                  )}
                </Grid>

                <Grid item>
                  <Typography
                    component="h4"
                    variant="h5"
                    className={classes.sectionHeading}
                  >
                    Runtime
                  </Typography>
                  <Typography paragraph>{currentMovie.runtime} mins</Typography>
                </Grid>

                {currentMovie.budget ? (
                  <Grid item>
                    <Typography
                      component="h4"
                      variant="h5"
                      className={classes.sectionHeading}
                    >
                      Budget
                    </Typography>
                    <Typography paragraph>
                      {" "}
                      {formatCurrency(currentMovie.budget)}
                    </Typography>
                  </Grid>
                ) : null}

                {currentMovie.revenue ? (
                  <Grid item>
                    <Typography
                      component="h4"
                      variant="h5"
                      className={classes.sectionHeading}
                    >
                      Revenue
                    </Typography>
                    <Typography paragraph>
                      {formatCurrency(currentMovie.revenue)}
                    </Typography>
                  </Grid>
                ) : null}
              </Grid>
              <Grid container justify="space-between">
                {currentMovie.price ? (
                  <Typography
                    component="h4"
                    variant="h5"
                    className={classes.sectionHeading}
                  >
                    {formatCurrency(currentMovie.price)}
                  </Typography>
                ) : null}
                <ButtonNav
                  to={`${location.pathname}/seats`}
                  disabled={!isAuthenticated}
                  classes={{
                    root: classes.buttonNav,
                    disabled: classes.disabled
                  }}
                >
                  Buy Ticket
                </ButtonNav>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </div>
    </main>
  );
};

export default MovieCard;

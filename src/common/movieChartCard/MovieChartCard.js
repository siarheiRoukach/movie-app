import React from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import ButtonNav from "../buttonNav/ButtonNav";
import MovieRatings from "../../common/movieRatings/MovieRatings";

const getDateDisplayValue = (date, format = "en-US") => {
  return date
    ? date.toLocaleString(format, {
        year: "numeric"
      })
    : null;
};

const useStyles = makeStyles(theme => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
    backgroundSize: "cover",
    minHeight: "175px"
  },
  cardContent: {
    display: "flex",
    flexGrow: 1,
    flexDirection: "column"
  },
  cardTitle: {
    flexGrow: 2
  },
  cardGenres: {
    color: "#a3a0a0"
  },
  cardDate: {
    color: "#a3a0a0",
    fontSize: "0.9rem"
  },
  buttonNav: {
    margin: 0,
    "&:hover": {
      backgroundColor: "#21CBF3"
    }
  }
}));

const MovieChartCard = ({ movieData }) => {
  const classes = useStyles();
  const { t } = useTranslation(["translaitons", "movieCommon", "movieContent"]);
  let location = useLocation();

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.cardMedia}
        image={movieData.poster_path}
        title={t(`movieContent|title.${movieData.title}`, {
          nsSeparator: "|"
        })}
      />
      <CardContent className={classes.cardContent}>
        <Typography
          gutterBottom
          variant="h5"
          component="h2"
          className={classes.cardTitle}
        >
          {t(`movieContent|title.${movieData.title}`, {
            nsSeparator: "|"
          })}
        </Typography>
        <Typography gutterBottom className={classes.cardGenres}>
          {movieData.genres
            .map(genre => t(`movieCommon:genres.${genre}`))
            .join(", ")}
        </Typography>
        <MovieRatings
          rating={movieData.vote_average}
          moviename={movieData.title}
          maxrating={10}
          readOnly
          style={{ fontSize: "1.3rem", marginBottom: "0.5rem" }}
        />
        <Typography className={classes.cardDate}>
          {getDateDisplayValue(new Date(movieData.release_date))}
        </Typography>
      </CardContent>
      <CardActions>
        <ButtonNav
          className={classes.buttonNav}
          fullWidth
          to={{ pathname: `/movie/${movieData.id}`, state: { from: location } }}
        >
          {t("translations:common.view")}
        </ButtonNav>
      </CardActions>
    </Card>
  );
};

MovieChartCard.propTypes = {
  movieData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    poster_path: PropTypes.string,
    genres: PropTypes.arrayOf(PropTypes.string).isRequired,
    release_date: PropTypes.string.isRequired
  }).isRequired
};

export default MovieChartCard;

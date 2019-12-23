import React from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import ButtonNav from "../buttonNav/ButtonNav";

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
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.cardMedia}
        image={movieData.poster_path}
        title="Image title"
      />
      <CardContent className={classes.cardContent}>
        <Typography
          gutterBottom
          variant="h5"
          component="h2"
          className={classes.cardTitle}
        >
          {movieData.title}
        </Typography>
        <Typography gutterBottom className={classes.cardGenres}>
          {movieData.genres.join(", ")}
        </Typography>
        <Typography className={classes.cardDate}>
          {movieData.release_date.split("-")[0]}
        </Typography>
      </CardContent>
      <CardActions>
        <ButtonNav
          className={classes.buttonNav}
          fullWidth
          to={`/movie/${movieData.id}`}
        >
          View
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

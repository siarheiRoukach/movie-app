import React from "react";
import Rating from "@material-ui/lab/Rating";
import { useDispatch } from "react-redux";

import { setNewMovieRating } from "../../redux/modules/auth";
import { updateUsersDb } from "../../redux/modules/auth";

const MovieRatings = props => {
  const dispatch = useDispatch();

  const setNewRating = e => {
    dispatch(setNewMovieRating({ [props.movieid]: e.target.value }));
    dispatch(updateUsersDb());
  };

  return (
    <>
      <Rating
        {...props}
        name="movieRating"
        value={props.rating}
        max={props.maxrating}
        precision={0.5}
        onChange={setNewRating}
      />
    </>
  );
};

export default MovieRatings;

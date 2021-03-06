import React, { useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import MovieSort from "../movieSort/MovieSort";
import MoviesChart from "../moviesChart/MoviesChart";
import movieData from "../../utils/movieData";
import { setMoviesDb } from "../../redux/modules/movie";

const DefaultMain = () => {
  const dispatch = useDispatch();
  const moviesStorage = useSelector(
    state => state.movie.moviesStorage,
    shallowEqual
  );

  useEffect(() => {
    if (moviesStorage && moviesStorage.length) return;
    const currentMoviesDb = JSON.parse(localStorage.getItem("moviesDb"));
    if (!currentMoviesDb || !currentMoviesDb.length) {
      localStorage.setItem("moviesDb", JSON.stringify(movieData));
      dispatch(setMoviesDb(movieData));
    } else dispatch(setMoviesDb(currentMoviesDb));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main>
      <MovieSort />
      {moviesStorage ? (
        <MoviesChart moviesStorage={moviesStorage} />
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
};

export default DefaultMain;

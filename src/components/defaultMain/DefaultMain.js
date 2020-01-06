import React, { useEffect } from "react";
import MoviesChart from "../moviesChart/MoviesChart";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import movieData from "../../utils/movieData";
import { setMoviesDb } from "../../redux/modules/movie";

const DefaultMain = () => {
  const dispatch = useDispatch();
  const moviesStorage = useSelector(
    state => state.movie.moviesStorage,
    shallowEqual
  );

  useEffect(() => {
    const currentMoviesDb = JSON.parse(localStorage.getItem("moviesDb"));
    if (!currentMoviesDb || !currentMoviesDb.length) {
      localStorage.setItem("moviesDb", JSON.stringify(movieData));
      dispatch(setMoviesDb(movieData));
    } else dispatch(setMoviesDb(currentMoviesDb));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main>
      <div>Filter bar</div>
      {moviesStorage ? (
        <MoviesChart moviesStorage={moviesStorage} />
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
};

export default DefaultMain;

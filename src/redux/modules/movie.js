export const SETACTIVEMOVIE = "movie/setActive";
export const SETMOVIESDB = "movie/setMoviesDb";
export const ADDCOMMENT = "movie/addComment";

export const setActiveMovie = value => ({
  type: SETACTIVEMOVIE,
  payload: value
});

export const setMoviesDb = value => ({
  type: SETMOVIESDB,
  payload: value
});

export const addComment = value => ({
  type: ADDCOMMENT,
  payload: value
});

const initialState = {
  activeMovie: {},
  moviesStorage: JSON.parse(localStorage.getItem("moviesDb")) || {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SETACTIVEMOVIE: {
      return { ...state, activeMovie: action.payload };
    }
    case SETMOVIESDB: {
      return { ...state, moviesStorage: action.payload };
    }
    case ADDCOMMENT: {
      const movieDb = JSON.parse(localStorage.getItem("moviesDb"));
      const movieToUpdate = movieDb.find(
        movie => Number(action.payload.movieId) === movie.id
      );
      movieToUpdate.comments.unshift(action.payload);
      const updatedMoviesStorage = movieDb.map(movie =>
        movieToUpdate.id === movie.id ? { ...movieToUpdate } : movie
      );
      localStorage.setItem("moviesDb", JSON.stringify(updatedMoviesStorage));
      return {
        ...state,
        activeMovie: movieToUpdate,
        moviesStorage: updatedMoviesStorage
      };
    }
    default:
      return state;
  }
};

export default reducer;

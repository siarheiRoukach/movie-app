export const SETACTIVEMOVIE = "movie/setActive";
export const SETMOVIESDB = "movie/setMoviesDb";
export const ADDCOMMENT = "movie/addComment";
export const SORTBYRATING = "movie/sortByRating";
export const SORTBYDATE = "movie/sortByDate";

export const setActiveMovie = value => ({
  type: SETACTIVEMOVIE,
  payload: value
});

export const setMoviesDb = value => ({
  type: SETMOVIESDB,
  payload: value
});

export const addComment = comment => ({
  type: ADDCOMMENT,
  payload: comment
});

export const sortByRating = type => ({
  type: SORTBYRATING,
  payload: type
});

export const sortByDate = type => ({
  type: SORTBYDATE,
  payload: type
});

const initialState = {
  activeMovie: {},
  moviesStorage: JSON.parse(localStorage.getItem("moviesDb")) || []
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
    case SORTBYRATING: {
      const sortedMoviesStorage = [...state.moviesStorage];
      sortedMoviesStorage.sort((a, b) =>
        action.payload === "asc"
          ? a.vote_average - b.vote_average
          : b.vote_average - a.vote_average
      );
      return { ...state, moviesStorage: sortedMoviesStorage };
    }
    case SORTBYDATE: {
      const sortedMoviesStorage = [...state.moviesStorage];
      sortedMoviesStorage.sort((a, b) => {
        let dateA = new Date(a.release_date),
          dateB = new Date(b.release_date);
        return action.payload === "asc" ? dateA - dateB : dateB - dateA;
      });
      return { ...state, moviesStorage: sortedMoviesStorage };
    }
    default:
      return state;
  }
};

export default reducer;

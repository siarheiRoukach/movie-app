export const SETACTIVEMOVIE = "movie/setActive";

export const setActiveMovie = value => ({
  type: SETACTIVEMOVIE,
  payload: value
});

const initialState = {
  activeMovie: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SETACTIVEMOVIE: {
      return { ...state, activeMovie: action.payload };
    }
    default:
      return state;
  }
};

export default reducer;

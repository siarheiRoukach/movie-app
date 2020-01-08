export const BOOKMOVIESESSION = "purchase/bookMovieSession";
export const SETMOVIEPRICE = "purchase/setMoviePrice";

export const bookMovieSession = session => ({
  type: BOOKMOVIESESSION,
  payload: session
});

export const setMoviePrice = price => ({
  type: SETMOVIEPRICE,
  payload: price
});

const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case BOOKMOVIESESSION: {
      localStorage.setItem(
        "purchaseData",
        JSON.stringify({ ...state, session: action.payload })
      );
      return { ...state, session: action.payload };
    }
    case SETMOVIEPRICE: {
      localStorage.setItem(
        "purchaseData",
        JSON.stringify({ ...state, price: action.payload })
      );
      return { ...state, price: action.payload };
    }
    default:
      return state;
  }
};

export default reducer;

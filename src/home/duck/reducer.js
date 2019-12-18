//import types from "./types";

const initialState = {
  isAuthenticated: false
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "users/userLogOut": {
      return { ...state, isAuthenticated: false };
    }
    default:
      return state;
  }
};

export default homeReducer;

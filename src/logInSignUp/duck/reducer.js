//import types from "./types";

const initialState = {
  isAuthenticated: false
};

const logInSignUpReducer = (state = initialState, action) => {
  switch (action.type) {
    case "users/userLogIn": {
      return { ...state, isAuthenticated: true };
    }
    default:
      return state;
  }
};

export default logInSignUpReducer;

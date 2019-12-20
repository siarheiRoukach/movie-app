export const USERLOGIN = "auth/users/userLogIn";
export const USERLOGOUT = "auth/users/userLogOut";

export const logIn = value => ({
  type: USERLOGIN,
  payload: value
});

export const logOut = value => ({
  type: USERLOGOUT
});

export const setCurrentUser = value => ({
  type: USERLOGIN
});

const initialState = {
  isAuthenticated: false,
  currentUser: {}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USERLOGIN: {
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
      return { ...state, isAuthenticated: true, currentUser: action.payload };
    }
    case USERLOGOUT: {
      localStorage.setItem("currentUser", JSON.stringify({}));
      return { ...state, isAuthenticated: false, currentUser: {} };
    }
    default:
      return state;
  }
};

export default reducer;

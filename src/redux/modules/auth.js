export const USERLOGIN = "auth/users/userLogIn";
export const USERLOGOUT = "auth/users/userLogOut";

export const logIn = value => ({
  type: USERLOGIN
});

export const logOut = value => ({
  type: USERLOGOUT
});

const initialState = {
  isAuthenticated: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USERLOGIN: {
      return { ...state, isAuthenticated: true };
    }
    case USERLOGOUT: {
      return { ...state, isAuthenticated: false };
    }
    default:
      return state;
  }
};

export default reducer;

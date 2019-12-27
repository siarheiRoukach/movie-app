export const USERLOGIN = "auth/users/userLogIn";
export const USERLOGOUT = "auth/users/userLogOut";
export const UPDATEUSERSDB = "auth/users/updateUsersDb";
export const SETNEWRATING = "auth/movie/setNewRating";

export const logIn = value => ({
  type: USERLOGIN,
  payload: value
});

export const logOut = () => ({
  type: USERLOGOUT
});

export const setCurrentUser = () => ({
  type: USERLOGIN
});

export const updateUsersDb = () => ({
  type: UPDATEUSERSDB
});

export const setNewMovieRating = value => ({
  type: SETNEWRATING,
  payload: value
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
    case UPDATEUSERSDB: {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (currentUser.token) return state;

      const usersDb = JSON.parse(localStorage.getItem("usersDb"));
      const newUsersDb = usersDb.map(userObj =>
        currentUser.id === userObj.id ? { ...currentUser } : userObj
      );
      localStorage.setItem("usersDb", JSON.stringify(newUsersDb));
      return state;
    }
    case SETNEWRATING: {
      const user = JSON.parse(localStorage.getItem("currentUser"));
      user.movieRatings = {
        ...user.movieRatings,
        ...action.payload
      };
      localStorage.setItem("currentUser", JSON.stringify(user));
      return { ...state, currentUser: user };
    }
    default:
      return state;
  }
};

export default reducer;

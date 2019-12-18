import { combineReducers } from "redux";
import homeReducer from "../home/duck/reducer";
import logInSignUpReducer from "../logInSignUp/duck/reducer";

const rootReducer = combineReducers({
  home: homeReducer,
  logInSignUp: logInSignUpReducer
});

export default rootReducer;

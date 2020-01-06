import { combineReducers } from "redux";
import auth from "./auth";
import movie from "./movie";

const rootReducer = combineReducers({
  auth,
  movie
});

export default rootReducer;

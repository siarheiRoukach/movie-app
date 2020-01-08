import { combineReducers } from "redux";
import auth from "./auth";
import movie from "./movie";
import purchaseData from "./purchaseData";

const rootReducer = combineReducers({
  auth,
  movie,
  purchaseData
});

export default rootReducer;

import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./modules/rootReducer.js";
import { composeWithDevTools } from "redux-devtools-extension";
const middlewares = [thunk];

if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`);

  middlewares.push(logger);
}

const configureStore = compose(
  composeWithDevTools(applyMiddleware(...middlewares))(createStore)(rootReducer)
);

export default configureStore;

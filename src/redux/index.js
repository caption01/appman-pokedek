import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";

import { cardReducer } from "./card";

const rootReducer = combineReducers({
  card: cardReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk, promise));

export { store };

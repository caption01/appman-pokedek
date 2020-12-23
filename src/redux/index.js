import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { cardReducer } from "./card";

const rootReducer = combineReducers({
  card: cardReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export { store };

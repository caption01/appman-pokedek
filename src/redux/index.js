import { createStore, combineReducers } from "redux";

import { cardReducer } from "./card";

const rootReducer = combineReducers({
  card: cardReducer,
});

const store = createStore(rootReducer);

export { store };

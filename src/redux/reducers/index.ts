import { combineReducers } from "redux";

import paginationReducer from "./pagination.js";
import restaurantsReducer from "./restaurants";

const rootReducer = combineReducers({
  restaurants: restaurantsReducer,
  pagination: paginationReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

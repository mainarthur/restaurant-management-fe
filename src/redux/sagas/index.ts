import { all } from "redux-saga/effects";

import watchRestaurants from "./restaurants.js";

export default function* rootSaga() {
  yield all([watchRestaurants()]);
}

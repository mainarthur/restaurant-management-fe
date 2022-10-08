import { ApolloQueryResult } from "@apollo/client";
import { delay, put, takeEvery } from "redux-saga/effects";

import { client } from "../../api/client.js";
import { searchQuery } from "../../api/queries/search.js";
import { paginationUpdateAction } from "../actions/pagination.js";
import { RestaurantsActionsAsync, searchAction } from "../actions/restaurants";
import AsyncAction from "../types/AsyncAction";
import { PaginatedRestaurants } from "../types/PaginatedRestaurants.js";
import { PagePayload } from "../types/payloads/PagePayload.js";
import { SearchPayload } from "../types/payloads/SearchPayload.js";

function* searchRequested(
  action: AsyncAction<{}, SearchPayload & PagePayload>,
) {
  const { payload, next } = action;

  if (!payload) return next(new Error("Payload is required for search action"));

  const result = (yield client.query({
    query: searchQuery,
    variables: payload,
  })) as ApolloQueryResult<{ searchRestaurants: PaginatedRestaurants }>;
  const data = result.data.searchRestaurants;
  yield put(searchAction(data));
  yield put(paginationUpdateAction({ ...payload, total: data.total }));

  next();
}

function* watchRestaurants() {
  yield takeEvery(RestaurantsActionsAsync.SEARCH, searchRequested);
}

export default watchRestaurants;

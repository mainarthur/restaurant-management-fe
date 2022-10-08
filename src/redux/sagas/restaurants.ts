import { ApolloQueryResult } from "@apollo/client";
import { put, takeEvery } from "redux-saga/effects";

import { client } from "../../api/client.js";
import { createQuery } from "../../api/queries/create.js";
import { deleteQuery } from "../../api/queries/delete.js";
import { searchQuery } from "../../api/queries/search.js";
import { updateQuery } from "../../api/queries/update.js";
import { paginationUpdateAction } from "../actions/pagination.js";
import { RestaurantsActionsAsync, searchAction } from "../actions/restaurants";
import AsyncAction from "../types/AsyncAction";
import { PaginatedRestaurants } from "../types/PaginatedRestaurants.js";
import { CreateRestaurantPayload } from "../types/payloads/CreateRestaurantPayload.js";
import { DeleteRestaurantPayload } from "../types/payloads/DeleteRestaurantPayload.js";
import { PagePayload } from "../types/payloads/PagePayload.js";
import { SearchPayload } from "../types/payloads/SearchPayload.js";
import { UpdateRestaurantPayload } from "../types/payloads/UpdateRestaurantPayload.js";

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

function* deleteRequested(action: AsyncAction<{}, DeleteRestaurantPayload>) {
  const { payload, next } = action;

  if (!payload) return next(new Error("Payload is required for delete action"));

  yield client.mutate({
    mutation: deleteQuery,
    variables: payload,
  });

  next();
}

function* createRequested(action: AsyncAction<{}, CreateRestaurantPayload>) {
  const { payload, next } = action;

  if (!payload) return next(new Error("Payload is required for create action"));

  yield client.mutate({
    mutation: createQuery,
    variables: payload,
  });

  next();
}

function* updateRequested(action: AsyncAction<{}, UpdateRestaurantPayload>) {
  const { payload, next } = action;

  if (!payload) return next(new Error("Payload is required for update action"));

  yield client.mutate({
    mutation: updateQuery,
    variables: payload,
  });

  next();
}

function* watchRestaurants() {
  yield takeEvery(RestaurantsActionsAsync.SEARCH, searchRequested);
  yield takeEvery(RestaurantsActionsAsync.DELETE, deleteRequested);
  yield takeEvery(RestaurantsActionsAsync.CREATE, createRequested);
  yield takeEvery(RestaurantsActionsAsync.UPDATE, updateRequested);
}

export default watchRestaurants;

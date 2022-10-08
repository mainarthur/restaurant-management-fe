import { createAction } from "../helpers.js";
import { PaginatedRestaurants } from "../types/PaginatedRestaurants.js";
import { CreateRestaurantPayload } from "../types/payloads/CreateRestaurantPayload.js";
import { DeleteRestaurantPayload } from "../types/payloads/DeleteRestaurantPayload.js";
import { PagePayload } from "../types/payloads/PagePayload.js";
import { SearchPayload } from "../types/payloads/SearchPayload.js";
import { UpdateRestaurantPayload } from "../types/payloads/UpdateRestaurantPayload.js";

export enum RestaurantsActions {
  SEARCH = "RESTAURANTS_SEARCH",
  LIST_PAGE = "RESTAURANTS_LIST",
  CREATE = "RESTAURANTS_CREATE",
  UPDATE = "RESTAURANTS_UPDATE",
  DELETE = "RESTAURANTS_DELETE",
}

export enum RestaurantsActionsAsync {
  SEARCH = "ASYNC_RESTAURANTS_SEARCH",
  LIST_PAGE = "ASYNC_RESTAURANTS_LIST",
  CREATE = "ASYNC_RESTAURANTS_CREATE",
  UPDATE = "ASYNC_RESTAURANTS_UPDATE",
  DELETE = "ASYNC_RESTAURANTS_DELETE",
}

export const searchActionAsync = createAction<SearchPayload & PagePayload>(
  RestaurantsActionsAsync.SEARCH,
);

export const searchAction = createAction<PaginatedRestaurants>(
  RestaurantsActions.SEARCH,
);

// export const listPageAction = createAction<PagePayload>(
//   RestaurantsActions.LIST_PAGE,
// );

export const createRestaurantAction = createAction<CreateRestaurantPayload>(
  RestaurantsActions.CREATE,
);

export const updateRestaurantAction = createAction<SearchPayload>(
  RestaurantsActions.UPDATE,
);

export const deleteRestaurantAction = createAction<DeleteRestaurantPayload>(
  RestaurantsActions.DELETE,
);

export const createRestaurantActionAsync =
  createAction<CreateRestaurantPayload>(RestaurantsActionsAsync.CREATE);

export const updateRestaurantActionAsync =
  createAction<UpdateRestaurantPayload>(RestaurantsActionsAsync.UPDATE);

export const deleteRestaurantActionAsync =
  createAction<DeleteRestaurantPayload>(RestaurantsActionsAsync.DELETE);

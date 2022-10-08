import { searchAction } from "../actions/restaurants";
import Action from "../types/Action";
import { Restaurant } from "../types/Restaurant.js";

export type RestaurantsState = Restaurant[];

const initialState: RestaurantsState = [];

export default function restaurantsReducer(
  state = initialState,
  action: Action<any>,
): RestaurantsState {
  if (searchAction.match(action) && action.payload) {
    console.log(action);
    return action.payload.result;
  }

  return state;
}

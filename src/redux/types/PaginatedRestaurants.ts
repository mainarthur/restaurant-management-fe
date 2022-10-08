import { Restaurant } from "./Restaurant.js";

export interface PaginatedRestaurants {
  total: number;
  result: Restaurant[];
}

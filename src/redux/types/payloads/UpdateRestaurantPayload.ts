import { CreateRestaurantPayload } from "./CreateRestaurantPayload.js";

export type UpdateRestaurantPayload = CreateRestaurantPayload & {
  id: number;
};

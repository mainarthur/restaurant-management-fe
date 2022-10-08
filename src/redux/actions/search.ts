import { createAction } from "../helpers.js";
import { SearchPayload } from "../types/payloads/SearchPayload.js";

export const searchAction = createAction<SearchPayload>("SEARCH");

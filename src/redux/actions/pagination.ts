import { createAction } from "../helpers.js";
import { PaginationPayload } from "../types/payloads/PaginationPayload.js";

export enum Pagination {
  UPDATE = "PAGINATION_UPDATE",
}

export const paginationUpdateAction = createAction<PaginationPayload>(
  Pagination.UPDATE,
);

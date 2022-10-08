import { PaginationState } from "../../reducers/pagination.js";

export type PaginationPayload = PaginationState & { total: number };

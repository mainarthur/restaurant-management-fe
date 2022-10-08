import { DEFAULT_PAGE_SIZE } from "../../constants.js";
import { paginationUpdateAction } from "../actions/pagination.js";
import Action from "../types/Action";

export type PaginationState = {
  total?: number;
  page: number;
  pageSize: number;
  searchTerm: string;
};

const initialState: PaginationState = {
  page: 0,
  pageSize: DEFAULT_PAGE_SIZE,
  searchTerm: "",
};

export default function paginationReducer(
  state = initialState,
  action: Action<any>,
): PaginationState {
  if (paginationUpdateAction.match(action) && action.payload) {
    return action.payload;
  }

  return state;
}

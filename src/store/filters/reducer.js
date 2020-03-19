import {MAXPRICE, MINPRICE} from "../../constants/filterOptions";
import {
  RESET_ALL_FILTERS,
  RESET_ORIGINS,
  SET_EDITABLE, SET_FILTERS_FROM_OBJ,
  SET_NOT_EDITABLE,
  SET_ORIGINS,
  SET_PAGE,
  SET_PAGE_ITEMS,
  SET_PAGINATION,
  SET_PRICES
} from "./actionTypes";

const initialState = {
  origin: [],
  minPrice: MINPRICE,
  maxPrice: MAXPRICE,
  page: null,
  perPage: null,
  totalItems: null,
  editable: false,
};

export default function filtersReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ORIGINS:
      return {
        ...state,
        origin: [...action.checkedValues]
      };
    case RESET_ORIGINS:
      return {
        ...state,
        origin: []
      };
    case SET_PRICES:
      return {
        ...state,
        minPrice: action.value[0],
        maxPrice: action.value[1]
      };
    case SET_PAGINATION:
      return {
        ...state,
        page: action.data.page,
        perPage: action.data.perPage,
        totalItems: action.data.totalItems
      };
    case SET_PAGE:
      return {
        ...state,
        page: action.page
      };
    case SET_PAGE_ITEMS:
      return {
        ...state,
        page: action.current,
        perPage: action.size
      };
    case SET_EDITABLE:
      return {
        ...state,
        editable: true,
      };
    case SET_NOT_EDITABLE:
      return {
        ...state,
        editable: false,
      };
    case SET_FILTERS_FROM_OBJ:
      return Object.assign({...state}, action.data);
    case RESET_ALL_FILTERS:
      return {
        origin: [],
        minPrice: MINPRICE,
        maxPrice: MAXPRICE,
        page: null,
        perPage: null,
        totalItems: null,
        editable: false,
      };
    default:
      return state;
  }
}

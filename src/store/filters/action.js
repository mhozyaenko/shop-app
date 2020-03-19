import {
  RESET_ALL_FILTERS,
  RESET_ORIGINS,
  SET_EDITABLE,
  SET_FILTERS_FROM_OBJ,
  SET_NOT_EDITABLE,
  SET_ORIGINS,
  SET_PAGE,
  SET_PAGE_ITEMS,
  SET_PAGINATION,
  SET_PRICES
} from "./actionTypes";

export const setOrigins = data => ({
  type: SET_ORIGINS,
  ...data
});

export const resetOrigins = () => ({
  type: RESET_ORIGINS,
});

export const setPrices = data => ({
  type: SET_PRICES,
  ...data
});

export const setPagination = data => ({
  type: SET_PAGINATION,
  ...data
});

export const setPage = data => ({
  type: SET_PAGE,
  ...data
});

export const setPageItems = data => ({
  type: SET_PAGE_ITEMS,
  ...data
});

export const setEditable = () => ({
  type: SET_EDITABLE
});

export const setNotEditable = () => ({
  type: SET_NOT_EDITABLE
});

export const setFiltersFromObj = data => ({
  type: SET_FILTERS_FROM_OBJ,
  ...data
});

export const resetAllFilters = () => ({
  type: RESET_ALL_FILTERS
});

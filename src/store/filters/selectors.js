import { createSelector } from "reselect";

export const selectFilters = state => state.filters;

export const selectFiltersEditable = createSelector(
  selectFilters,
  state => state.editable
);

export const selectOrigins = createSelector(
  selectFilters,
  state => state.origin
);

export const selectPrices = createSelector(
  selectFilters,
  state => [state.minPrice, state.maxPrice]
);

export const selectPaginationData = createSelector(
  selectFilters,
  state => ({page: state.page, perPage: state.perPage, totalItems: state.totalItems})
);


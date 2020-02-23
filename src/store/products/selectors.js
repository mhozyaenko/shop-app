import { createSelector } from "reselect";

export const selectProducts = state => state.products;

export const selectProductsObj = createSelector(
  selectProducts,
  state => state.byIds
);

export const selectProductById = id => createSelector(
  selectProductsObj,
  state => state[id]
);

export const selectProductsIds = createSelector(
  selectProducts,
  state => state.idArray
);

export const selectProductOrigins = createSelector(
  selectProducts,
  state => state.origins
);
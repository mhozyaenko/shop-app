import { createSelector } from "reselect";

export const selectCart = state => state.cart;

export const selectCartIds = createSelector(
  selectCart,
  state => state.ids
);

export const selectCartDetails = createSelector(
  selectCart,
  state => state.products
);

export const selectProductInCart = id => createSelector(
  selectCartIds,
  ids => !!ids.includes(id)
);

export const selectCartEntities = createSelector(
  selectCart,
  state => state.counter
);

export const selectCartArray = createSelector(
  [selectCartEntities, selectCartIds],
  (counter, ids = []) => ids.map(id => counter[id])
);

export const selectCartItemsCount = createSelector(
  selectCartArray,
  (state) => state.reduce( (acc, cur) => (acc + cur.count), 0)
);

export const selectCartTotalSum = createSelector(
  [selectCartArray, selectCartDetails],
  (ids = [], products) => (
    ids.reduce(
      (acc, cur) => (
        acc + cur.count * (products[cur.id] ? products[cur.id].price : 0)), 0
    )
  )
);

import { createSelector } from "reselect";

export const selectOrders = state => state.orders;

export const selectOrdersItems = createSelector(
  selectOrders,
  state => state.byIds
);

export const selectOrdersIds = createSelector(
  selectOrders,
  state => state.idArray
);

export const selectOrderById = id => createSelector(
  selectOrdersItems,
  state => state[id]
);
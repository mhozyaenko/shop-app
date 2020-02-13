import { createSelector } from "reselect";

/**
 * products store
 * @param state
 * @returns {ProductsReducer|initialState.products|{}|products}
 */
export const selectProducts = state => state.products;

/**
 * cart store
 * @param state
 * @returns {cartReducer}
 */
export const selectCart = state => state.cart;

/**
 * filters store
 * @param state
 * @returns {filtersReducer|ColumnFilterItem[]|TableStateFilters}
 */
export const selectFilters = state => state.filters;

/**
 * is editable parameter
 */
export const selectFiltersEditable = createSelector(
  selectFilters,
  state => state.editable
);

/**
 *  get products object
 */
export const selectProductsObj = createSelector(
  selectProducts,
  state => state.byIds
);

/**
 * get product identifiers array
 */
export const selectProductsIds = createSelector(
  selectProducts,
  state => state.idArray
);

/**
 * get origins
 */
export const selectProductOrigins = createSelector(
  selectProducts,
  state => state.origins
);

/**
 * get identifiers array of cart items
 */
export const selectCartIds = createSelector(
  selectCart,
  state => state.ids
);

/**
 * get detailed info of products added to cart
 */
export const selectCartDetails = createSelector(
  selectCart,
  state => state.products
);

/**
 * check if product is in cart
 */
export const selectProductInCart = id => createSelector(
  selectCartIds,
  ids => !!ids.includes(id)
);

/**
 * get cart info
 */
export const selectCartEntities = createSelector(
  selectCart,
  state => state.counter
);

/**
 * transform cart items object to array
 */
export const selectCartArray = createSelector(
  [selectCartEntities, selectCartIds],
  (counter, ids = []) => ids.map(id => counter[id])
);

/**
 * count total items in cart
 */
export const selectCartItemsCount = createSelector(
  selectCartArray,
  (state) => state.reduce( (acc, cur) => (acc + cur.count), 0)
);

/**
 * count total sum of items in cart
 */
export const selectCartTotalSum = createSelector(
  [selectCartArray, selectCartDetails],
  (ids = [], products) => (
    ids.reduce(
      (acc, cur) => (
        acc + cur.count * (products[cur.id] ? products[cur.id].price : 0)), 0
    )
  )
);

/**
 * get selected options of origin filter
 */
export const selectOrigins = createSelector(
  selectFilters,
  state => state.origin
);

/**
 * get selected prices range
 */
export const selectPrices = createSelector(
  selectFilters,
  state => [state.minPrice, state.maxPrice]
);

/**
 * get pagination settings
 */
export const selectPaginationData = createSelector(
  selectFilters,
  state => ({page: state.page, perPage: state.perPage, totalItems: state.totalItems})
);

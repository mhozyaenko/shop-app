import {
  ADD_ITEM_TO_CART, CLEAR_CART,
  DECREMENT_ITEMS_COUNT,
  INCREMENT_ITEMS_COUNT,
  REMOVE_ITEMS_FROM_CART,
  SAVE_PRODUCT_DETAILS
} from "./actionTypes";

export const addItemsToCart = data => ({
    type: ADD_ITEM_TO_CART,
    ...data
  });

export const incrementItemsCount = data => ({
  type: INCREMENT_ITEMS_COUNT,
    ...data
});

export const decrementItemsCount = data => ({
  type: DECREMENT_ITEMS_COUNT,
  ...data
});

export const removeItemsFromCart = data => ({
  type: REMOVE_ITEMS_FROM_CART,
  ...data
});

export const saveProductDetails = data => ({
  type: SAVE_PRODUCT_DETAILS,
  ...data
});

export const clearCart = () => ({
  type: CLEAR_CART
});
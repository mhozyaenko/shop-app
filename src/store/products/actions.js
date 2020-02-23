import {
  ADD_PRODUCT,
  FIRST_UPLOAD_INIT,
  GET_ORIGINS_SUCCESS,
  GET_PRODUCTS_SUCCESS,
  SET_CHANGED_PRODUCT
} from "./actionTypes";

export const getProductsSuccess = data => ({
    type: GET_PRODUCTS_SUCCESS,
    ...data
});

export const getOriginsSuccess = data => ({
  type: GET_ORIGINS_SUCCESS,
  ...data
});

export const setChangedProduct = data => ({
  type: SET_CHANGED_PRODUCT,
  ...data
});

export const firstLoadInit = () => ({
  type: FIRST_UPLOAD_INIT
});

export const addProduct = data => ({
  type: ADD_PRODUCT,
  ...data
});

import {GET_PRODUCTS_SUCCESS} from "./actionTypes";

export const getProductsSuccess = data => ({
    type: GET_PRODUCTS_SUCCESS,
    ...data
});

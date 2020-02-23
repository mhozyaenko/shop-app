import {GET_ORDER_BY_ID_SUCCESS, GET_ORDERS_SUCCESS} from "./actionTypes";

export const getOrdersSuccess = data => ({
  type: GET_ORDERS_SUCCESS,
  ...data
});

export const getOrderByIdSuccess = data => ({
  type: GET_ORDER_BY_ID_SUCCESS,
  ...data
})
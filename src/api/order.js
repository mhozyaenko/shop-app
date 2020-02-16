import {createRequest} from "./base";

const withAuth = true;
/**
 * Post an order
 * @param data
 * @returns {Promise<Response | never>}
 */
export const postOrder = data => {
  return createRequest({
    config: () => ({
      url: '/orders',
      method: 'POST',
      data: JSON.stringify((data))
    }),
    withAuth
  })
    .then(response => response.data)
};

/**
 * get orders list
 * @returns {Promise<Response | never>}
 */
export const getOrdersList = () => {
  return createRequest({
    config: () => ({
      url: '/orders',
      method: 'GET'
    }),
    withAuth
  })
    .then(response => response.data)
};

/**
 * get order by id
 * @param id
 * @returns {Promise<Response | never>}
 */
export const getOrder = id => {
  return createRequest({
    config: () => ({
      url: `/orders/${id}`,
      method: 'GET'
    }),
    withAuth
  })
    .then(response => response.data)
};
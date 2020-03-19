import {createRequest} from "./base";

const withAuth = true;

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
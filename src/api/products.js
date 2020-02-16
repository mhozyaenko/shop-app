import {RESPONSE_STATUSES} from "../constants/httpResponses";
import {createRequest} from "./base";

/**
 * fetch products list
 * @returns {Promise<{dataObject, keys} | never>}
 */
export const getProducts = (queryString, withAuth) => {
  return createRequest({
    config: () => ({
      method: 'GET',
      url: `/products?${queryString}`,
    }),
    withAuth
  })
    .then(res => res.data)
};

/**
 * get product by id
 * @param id
 * @returns {Promise<Response | never>}
 */
export const getProduct = id => {
  return createRequest({
    config: () => ({
      method: 'GET',
      url: `/products/${id}`
    })
  })
    .then(res => res.data)
};

/**
 * fetch products origins
 */
export const getOrigins = () => {
  return createRequest({
    config: () => ({
      method: 'GET',
      url: '/products-origins/'
    })
  })
    .then(res => res.data)
};

/**
 * Create product
 * @param data
 * @returns {Promise<boolean | never>}
 */
export const postNewProduct = data => {
  const withAuth = true;
  return createRequest({
    config: () => ({
      url: '/products',
      method: 'POST',
      data: JSON.stringify({product: data})
    }),
    withAuth
  })
    .then(response => response.status === RESPONSE_STATUSES.OK)
};

/**
 * Update product
 * @param data
 * @returns {Promise<boolean | never>}
 */
export const postUpdateProduct = data => {
  const withAuth = true;
  return createRequest({
    config: () => ({
      url: `/products/${data.id}`,
      method: 'PATCH',
      data: JSON.stringify({product: {name: data.name, price: data.price, origin: data.origin}})
    }),
    withAuth
  })
    .then(response => response.status === RESPONSE_STATUSES.OK)
};

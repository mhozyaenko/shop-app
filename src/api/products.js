import {RESPONSE_STATUSES} from "../constants/httpResponses";

/**
 * fetch products list
 * @returns {Promise<{dataObject, keys} | never>}
 */
export const getProducts = (queryString, withAuth) => {
  const headers = withAuth ? {'Authorization': process.env.REACT_APP_API_KEY} : {};
  return fetch(
    `${process.env.REACT_APP_API_URL}/products${queryString}`, {
      headers: headers
    }
  )
    .then(res => res.json())
};

/**
 * get product by id
 * @param id
 * @returns {Promise<Response | never>}
 */
export const getProduct = id => {
  return fetch(`${process.env.REACT_APP_API_URL}/products/${id}`)
    .then(res => res.json())
};

/**
 * fetch products origins
 */
export const getOrigins = () => {
  return fetch(`${process.env.REACT_APP_API_URL}/products-origins`)
    .then(res => res.json())
};

/**
 * Create product
 * @param data
 * @returns {Promise<boolean | never>}
 */
export const postNewProduct = data => {
  return fetch(`${process.env.REACT_APP_API_URL}/products`, {
    method: 'POST',
    headers : {
      'Authorization': process.env.REACT_APP_API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({product: data})
  })
    .then(response => response.status === RESPONSE_STATUSES.OK);
};

/**
 * Update product
 * @param data
 * @returns {Promise<boolean | never>}
 */
export const postUpdateProduct = data => {
  return fetch(`${process.env.REACT_APP_API_URL}/products/${data.id}`,{
    method: 'PATCH',
    headers: {
      'Authorization': process.env.REACT_APP_API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({product: {name: data.name, price: data.price, origin: data.origin}})
  })
    .then(response => response.status === RESPONSE_STATUSES.OK);
};

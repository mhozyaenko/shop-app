/**
 * Post an order
 * @param data
 * @returns {Promise<Response | never>}
 */
export const postOrder = data => {
  return fetch(`${process.env.REACT_APP_API_URL}/orders`,{
    method: 'POST',
    headers: {
      'Authorization': process.env.REACT_APP_API_KEY,
      'Content-type': 'application/json'
    },
    body: JSON.stringify((data))
  })
    .then(response => response.json())
};

/**
 * get orders list
 * @returns {Promise<Response | never>}
 */
export const getOrdersList = () => {
  return fetch(`${process.env.REACT_APP_API_URL}/orders`, {
    headers: {
      'Authorization': process.env.REACT_APP_API_KEY
    }
  })
    .then(response => response.json())
};

/**
 * get order by id
 * @param id
 * @returns {Promise<Response | never>}
 */
export const getOrder = id => {
  return fetch(`${process.env.REACT_APP_API_URL}/orders/${id}`, {
    headers: {
      'Authorization': process.env.REACT_APP_API_KEY
    }
  })
    .then(response => response.json())
};
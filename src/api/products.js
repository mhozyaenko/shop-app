/**
 * fetch products list
 * @returns {Promise<{dataObject, keys} | never>}
 */
export function getProducts(queryString) {
  return fetch(
    `${process.env.REACT_APP_API_URL}/products${queryString}`
  )
    .then(res => res.json())
}

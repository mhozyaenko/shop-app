import React, { useState, useEffect } from "react";

export const ProductsContext = React.createContext({
  products: [],
  isLoading: false,
});

/**
 * Get list of products
 * @param children
 * @returns {*}
 * @constructor
 */
export default function ProductsProvider({ children }) {
  const [isLoading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setLoading(true);

    fetch(
      `${process.env.REACT_APP_API_URL}/products`
    )
      .then(res => res.json())
      .then(json => {
        setProducts(json.items);
        setLoading(false);
      });
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        isLoading,
        products
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}
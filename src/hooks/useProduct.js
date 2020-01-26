import { useState, useEffect } from "react";

/**
 * Get product details
 * @param productId
 * @returns {{product: any | ()}}
 */
export const useProduct = productId => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_API_URL}/products/${productId}`
    )
      .then(res => res.json())
      .then(product => {
        setProduct(product);
      });
  }, [productId]);

  return {
    product
  };
};
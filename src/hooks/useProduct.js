import {useEffect, useMemo, useState} from "react";
import {getProduct} from "../api/products";

/**
 * get product by id
 * @param id
 * @returns {{product: *}}
 */
export const useProduct = (id) => {
  const [product, setProduct] = useState(undefined);

  useEffect(() => {
    if (!product) {
      getProduct(id).then(product => {
        setProduct(product);
      });
    }
  },[product, id]);

  return useMemo(() => ({
    product
  }), [product]);
}
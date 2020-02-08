import {useSelector} from "react-redux";
import {useMemo} from "react";

/**
 * get product by id
 * @param id
 * @returns {{product: *}}
 */
export default function useProduct(id) {
  const product = useSelector(state => state.products.byIds[id]);

  return useMemo(() => ({
    product
  }), [product]);
}
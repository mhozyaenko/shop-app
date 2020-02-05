import {useSelector} from "react-redux";
import {useMemo} from "react";
import {selectProductById} from "../store/selectors";

/**
 * get product by id
 * @param id
 * @returns {{product: *}}
 */
export default function useProduct(id) {
  const product = useSelector(selectProductById(id));

  return useMemo(
    () => ({
      product
    }),
    [product]
  );
}